import React, { useState, useEffect } from "react";
import { AIRCRAFT_DATA, AircraftConfig } from "../data";
import { Calculator, Users, DollarSign, ArrowRight, ShieldAlert, Award, Printer } from "lucide-react";

export default function SimulatorView() {
  // 기종별 구매/리스 수량 상태
  const [fleetCounts, setFleetCounts] = useState<{ [key: string]: number }>({
    atr72: 2,
    b737: 2,
    b777: 2,
  });

  // 화물 비중 상태 (%)
  const [cargoMix, setCargoMix] = useState<{
    general: number; // 일반 화물
    fresh: number;   // 신선 화물
    dg: number;      // 특수 위험물 등
  }>({
    general: 60,
    fresh: 30,
    dg: 10,
  });

  // 수익 구조 모드 토글
  // 'value' : 기존 데이터 구조 (기단 고효율 마진 20% ~ 65%)
  // 'cost15' : 사용자가 원한 "실제 운항원가 + 원가 15% 수준 영업이익 보전 모델" 구조
  const [pricingMode, setPricingMode] = useState<"value" | "cost15">("value");

  // 탑제 하한율 / 적재율 (%)
  const [loadFactor, setLoadFactor] = useState<number>(75);

  // 시뮬레이션 계산 결과
  const [results, setResult] = useState({
    totalDailyTon: 0,
    totalAnnualTon: 0,
    totalAnnualRevenue: 0,
    totalAnnualCost: 0,
    totalAnnualProfit: 0,
    totalOPMargin: 0,
    pilotsHire: 0,
    captainsHire: 0,
    firstOfficersHire: 0,
    groundStaffHire: 0,
    totalJobs: 0,
    taxIncome: 0, // 갑근세 + 법인세 + 지방 재산세 합산
    pilotSalaryAvg: 0,
    staffSalaryAvg: 0,
    totalTaxLabor: 0,
    totalTaxCorporate: 0,
    totalTaxLocal: 0,
  });

  useEffect(() => {
    let dailyTonSum = 0;
    let annualTonSum = 0;
    let totalRevenue = 0;
    let totalCost = 0;
    let pilotsCount = 0;
    let captainsCount = 0;
    let firstOfficersCount = 0;
    let groundCount = 0;
    let totalLaborCostSum = 0;
    let localTaxSum = 0;

    AIRCRAFT_DATA.forEach((ac) => {
      const count = fleetCounts[ac.id] || 0;
      if (count === 0) return;

      // 1. 적반 톤수 계산
      const actualCapacityPerFlight = ac.capacityTon * (loadFactor / 100);
      const dailyFlightsTon = actualCapacityPerFlight * ac.dailyFlights;
      const annualFlightsTon = dailyFlightsTon * ac.annualDays;

      dailyTonSum += dailyFlightsTon * count;
      annualTonSum += annualFlightsTon * count;

      // 2. 인력 유발 (기장 1 : 부기장 2 비율 계산)
      const captainsPerAc = Math.round(ac.crewsPerAircraft / 3);
      const firstOfficersPerAc = captainsPerAc * 2;
      captainsCount += captainsPerAc * count;
      firstOfficersCount += firstOfficersPerAc * count;
      pilotsCount += ac.crewsPerAircraft * count;
      groundCount += ac.groundStaffPerAircraft * count;

      // 지방 재산세 (지방세법상 도입가액/시가표준액의 약 0.3% + 지방교육세 20% 포함 총 0.36% 실효요율 기준)
      // 대당 도입가격 고려: ATR72-600F (약 250억 원) -> 약 0.9억 원/년, B737-800BCF (약 600억 원) -> 약 2.2억 원/년, B777F (약 1,500억 원) -> 약 5.5억 원/년
      const localTaxPerAircraft = ac.id === "atr72" ? 0.9 : ac.id === "b737" ? 2.2 : 5.5;
      localTaxSum += localTaxPerAircraft * count; // 억원

      // 3. 비용 산정 (고정비 + 변동비)
      // 고정비 = 리스료 + 인건비 + 일반운영비 (억원)
      const annualFixedCost = ac.fixedLease + ac.fixedLabor + ac.fixedAdmin;
      // 변동비(연간) = 시간당 변동비 * 연간 운항시간 (만원 -> 억원 변환)
      const annualVariableCost = (ac.hourlyVarCost * ac.annualHours) / 10000;
      const costPerAircraft = annualFixedCost + annualVariableCost;
      totalCost += costPerAircraft * count; // 억원 sum

      // 4. 매출 산정 (화물 믹스 적용 단가 결정)
      // 믹스 비중에 따른 가중 단가 (원/kg)
      const weightedRatePerKg =
        (ac.baseGeneralRate * cargoMix.general +
          ac.baseFreshRate * cargoMix.fresh +
          ac.baseDgRate * cargoMix.dg) /
        100;

      // 연 매출 = 연간 화물 수송량(톤) * 1,000(kg) * 가중단가(원) / 100,000,000 (억원 변환)
      let revenuePerAircraft = (annualFlightsTon * 1000 * weightedRatePerKg) / 100000000;

      if (pricingMode === "cost15") {
        // 실제 운항원가 + 원가 15% 수준 영업이익 보전 모델
        revenuePerAircraft = costPerAircraft * 1.15;
      } else {
        // 실제 화물 가동률, 백홀(Backhaul) 복귀 시의 빈 비행(Ferry Flight) 및 할인 요율 등을 고려하여
        // 30% 수준의 현실적인 종합 이익 보정 계수(약 0.77 배율)를 적용합니다.
        revenuePerAircraft = revenuePerAircraft * 0.77;
      }

      totalRevenue += revenuePerAircraft * count;
    });

    // 최종 이익액 계산
    const profit = Math.max(0, totalRevenue - totalCost);
    const opMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    // 세수 추정 계산 (갑근세, 법인세, 지방세)
    // 갑근세 계산: 조종사 평균 실효 소득세율 약 15% 적용, 일반 지상직 약 6% 적용
    // 이 수치는 약 연봉 구간대의 누진세를 개략 적용한 값입니다.
    let laborTax = 0; // 억원
    AIRCRAFT_DATA.forEach((ac) => {
      const count = fleetCounts[ac.id] || 0;
      if (count === 0) return;

      const pilotsSalaryTotal = ac.crewsPerAircraft * ac.avgYearlySalaryPilot * count; // 만원
      const groundSalaryTotal = ac.groundStaffPerAircraft * ac.avgYearlySalaryStaff * count; // 만원

      // 갑근세 집계 (조종사 15% 실효, 지상직 6% 실효)
      laborTax += (pilotsSalaryTotal * 0.15 + groundSalaryTotal * 0.06) / 10000; // 억원 단위 변환
    });

    // 법인세: 총 영업이익의 20% (억원)
    const corporateTax = profit * 0.2;

    // 총 기여 세수 (억원)
    const totalTaxGains = laborTax + corporateTax + localTaxSum;

    setResult({
      totalDailyTon: dailyTonSum,
      totalAnnualTon: annualTonSum,
      totalAnnualRevenue: totalRevenue,
      totalAnnualCost: totalCost,
      totalAnnualProfit: profit,
      totalOPMargin: opMargin,
      pilotsHire: pilotsCount,
      captainsHire: captainsCount,
      firstOfficersHire: firstOfficersCount,
      groundStaffHire: groundCount,
      totalJobs: pilotsCount + groundCount,
      taxIncome: totalTaxGains,
      pilotSalaryAvg: 14333, // 단순 가중 가이드
      staffSalaryAvg: 6166,
      totalTaxLabor: laborTax,
      totalTaxCorporate: corporateTax,
      totalTaxLocal: localTaxSum,
    });
  }, [fleetCounts, cargoMix, pricingMode, loadFactor]);

  // 대수 및 비율 조절 함수들
  const updateFleet = (id: string, count: number) => {
    setFleetCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(20, count)),
    }));
  };

  const handleCargoMixChange = (field: "general" | "fresh" | "dg", value: number) => {
    // 믹스 합이 100%이 되도록 자동 비례 조정
    const safeVal = Math.max(0, Math.min(100, value));
    const otherFields = (["general", "fresh", "dg"] as const).filter((f) => f !== field);

    const remaining = 100 - safeVal;
    let otherSum = cargoMix[otherFields[0]] + cargoMix[otherFields[1]];

    if (otherSum === 0) {
      // 0 일때는 분배
      otherSum = 2;
      cargoMix[otherFields[0]] = 1;
      cargoMix[otherFields[1]] = 1;
    }

    const share1 = Math.round((cargoMix[otherFields[0]] / otherSum) * remaining);
    const share2 = remaining - share1;

    setCargoMix((prev) => ({
      ...prev,
      [field]: safeVal,
      [otherFields[0]]: share1,
      [otherFields[1]]: share2,
    }));
  };

  return (
    <div className="space-y-4" id="simulator-view-container">
      {/* 액션 헤더 */}
      <div className="bg-slate-50 px-6 py-4 border border-slate-200 flex flex-wrap gap-3 items-center justify-between no-print mb-1">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-slate-700" />
          <span className="font-bold text-slate-800 tracking-tight font-serif text-sm">경제성 및 지방세 수입 예측 시뮬레이터</span>
        </div>
        <button
          onClick={() => {
            if ((window as any).runPrintMode) {
              (window as any).runPrintMode("tab");
            } else {
              window.print();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold cursor-pointer transition-colors bg-orange-400 hover:bg-orange-500 text-white shadow-sm"
          id="btn-simulator-print-pdf"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>PDF 출력</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="simulator-section">
      {/* 왼쪽 통제 패널 */}
      <div className="lg:col-span-2 space-y-6">
        {/* 기단 구성 리스트 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Calculator className="h-5 w-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">청주 거점 화물전용 기단 도입 대수 구성</h3>
          </div>

          <div className="space-y-6">
            {AIRCRAFT_DATA.map((ac) => {
              const count = fleetCounts[ac.id] || 0;
              return (
                <div key={ac.id} className="p-4 bg-slate-50/50 rounded-none border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-950 text-sm tracking-tight font-serif">{ac.name}</p>
                    <p className="text-xs text-slate-650">
                      편당 운용용량: <span className="font-bold text-slate-900">{ac.capacityTon}톤</span> (최대 {ac.maxCapacityTon}톤) · 일일 운항편수: <span className="font-bold text-slate-900">{ac.dailyFlights}회</span>
                    </p>
                    <p className="text-[11px] text-slate-450 font-mono">
                      (연간 감가 및 리스료 기여: {ac.fixedLease}억원 · 직접 고용: 대당 {ac.crewsPerAircraft + ac.groundStaffPerAircraft}명 [기장 {Math.round(ac.crewsPerAircraft / 3)}명 / 부기장 {Math.round(ac.crewsPerAircraft / 3) * 2}명])
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateFleet(ac.id, count - 1)}
                      className="w-8 h-8 rounded-none border border-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center font-bold text-lg select-none text-slate-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black text-base text-slate-950 font-mono">{count}대</span>
                    <button
                      onClick={() => updateFleet(ac.id, count + 1)}
                      className="w-8 h-8 rounded-none border border-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center font-bold text-lg select-none text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 화물 성질 믹스 비중 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-slate-700" />
              <h3 className="font-bold text-slate-900 text-sm font-serif">고부가가치 화물 유형 구성비 및 적재율</h3>
            </div>
          </div>

          <div className="space-y-4">
            {/* 적재율 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700 font-bold">
                <span>평균 화물기 적재 수송율 (Load Factor)</span>
                <span className="font-black text-slate-950 font-mono">{loadFactor}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={loadFactor}
                onChange={(e) => setLoadFactor(Number(e.target.value))}
                className="w-full accent-blue-600 h-1 bg-slate-200 rounded-none appearance-none cursor-pointer"
                id="range-load-factor"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              {/* 일반 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>일반화물 비중</span>
                  <span className="font-mono text-slate-950">{cargoMix.general}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cargoMix.general}
                  onChange={(e) => handleCargoMixChange("general", Number(e.target.value))}
                  className="w-full accent-blue-600 h-1 bg-slate-200 rounded-none appearance-none cursor-pointer"
                  id="range-general"
                />
                <span className="text-[10px] text-slate-450 block font-mono">기본가: 1,400원/kg (일반 반도체 등)</span>
              </div>

              {/* 신선/의약 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>신선·의약품 바이오 비중</span>
                  <span className="font-mono text-slate-950">{cargoMix.fresh}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cargoMix.fresh}
                  onChange={(e) => handleCargoMixChange("fresh", Number(e.target.value))}
                  className="w-full accent-blue-600 h-1 bg-slate-200 rounded-none appearance-none cursor-pointer"
                  id="range-fresh"
                />
                <span className="text-[10px] text-slate-450 block font-mono">기본가: 2,500원/kg (오송 바이오의약품)</span>
              </div>

              {/* DG */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>정밀 특수(위험물·D/G) 비중</span>
                  <span className="font-mono text-slate-950">{cargoMix.dg}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cargoMix.dg}
                  onChange={(e) => handleCargoMixChange("dg", Number(e.target.value))}
                  className="w-full accent-blue-600 h-1 bg-slate-200 rounded-none appearance-none cursor-pointer"
                  id="range-dg"
                />
                <span className="text-[10px] text-slate-450 block font-mono">기본가: 4,000원/kg (방사성의약품 등)</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-none border border-slate-200 text-xs text-slate-600 block mt-2">
              ※ 화물 특성 믹스 성비 조절 시 총 합산 배분은 100%가 상호 자동 보정되도록 정밀 조절 설계되었습니다.
            </div>
          </div>
        </div>

        {/* 운항 요율 보정 옵션 선택 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <DollarSign className="h-5 w-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">지자체 및 가동 주체 예산 정산 Pricing 요율 구성</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setPricingMode("value")}
              className={`p-4 rounded-none border-2 cursor-pointer transition-all ${
                pricingMode === "value"
                  ? "border-blue-600 bg-slate-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              id="pricing-mode-value"
            >
              <p className="font-bold text-slate-950 text-sm font-serif">지입형 시장 마진 모델 (고효율형)</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                기종별 축적 데이터에 근거한 독자 화물 단가 수렴. 누적 마진 21%~65%를 영업자산 가치로 축계하는 시장 자유 경쟁 요율입니다.
              </p>
            </div>

            <div
              onClick={() => setPricingMode("cost15")}
              className={`p-4 rounded-none border-2 cursor-pointer transition-all ${
                pricingMode === "cost15"
                  ? "border-blue-600 bg-slate-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              id="pricing-mode-cost15"
            >
              <p className="font-bold text-slate-950 text-sm font-serif">실제 운항원가 + 원가 15% 영업이익 보전 모델</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                충청북도 지자체가 위탁하고 지입사에 안정적 최저 생존 여력을 약정하는 공영 요율입니다. 실 운항원가의 정직한 15% 마진을 보전하여 안정적 노선 존립이 가능하므로 정책금융 선호도가 높습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 결과 종합 패널 */}
      <div className="space-y-6">
        {/* 핵심 실적 대시보드 */}
        <div className="bg-blue-50 text-blue-900 p-6 rounded-none shadow-sm border border-blue-100 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-blue-600/10 text-blue-700 text-[10px] tracking-widest font-mono font-bold uppercase px-2.5 py-0.5 rounded-sm">
              FINANCIAL RESULTS
            </span>
            <div className="space-y-1">
              <p className="text-blue-800 text-xs font-bold font-serif">연간 예상 총 매출</p>
              <p className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight font-mono">
                {results.totalAnnualRevenue.toFixed(1)} <span className="text-xs font-light text-blue-800">억 원/년</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-blue-200 pt-4">
              <div className="space-y-0.5">
                <p className="text-blue-800 text-[10px]">연간 소요 원가총액</p>
                <p className="text-sm font-bold text-blue-950 font-mono">
                  {results.totalAnnualCost.toFixed(1)} 억
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-blue-800 text-[10px]">운항사 순수 영업이익</p>
                <p className="text-sm font-black text-emerald-700 font-mono" id="text-profit">
                  {results.totalAnnualProfit.toFixed(1)} 억
                </p>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-3 flex justify-between items-center text-xs">
              <span className="text-blue-800 font-serif">가중 총 평균 이익률</span>
              <span className="font-bold text-blue-950 text-sm font-mono">
                {results.totalOPMargin.toFixed(2)} %
              </span>
            </div>

            <div className="border-t border-blue-200/60 pt-2.5 mt-2.5 text-[10px] text-blue-800 space-y-1.5 leading-relaxed font-sans">
              <p>
                <span className="text-blue-950 font-bold block mb-0.5">※ 화물항공업계 주요 영업이익률 참고치:</span>
                국내 유일 화물 전용 항공사인 <span className="text-orange-700 font-bold">에어인천(Air Incheon)</span> 및 글로벌 주요 화물 전용 항공사(Polar Air, Atlas Air 등)의 안정기 영업이익률은 운항 가동률, 백홀(Backhaul) 복귀 편의 빈 비행(Ferry Flight) 및 고가의 기재 인프라 관리비 등을 종합 감안하여 평균 <strong className="text-orange-800 font-mono">15% ~ 30%</strong> 수준을 유지하는 것이 모범적인 정석입니다.
              </p>
              <p>
                본 시뮬레이터에서는 이러한 실제 비행 운영 변수와 원가 마찰을 반영하여, 기본 단가에 종합 보정 계수(0.77 배율)를 적용함으로써 <span className="text-blue-950">현실적인 30% 수준의 상업 가중 마진</span>이 도출되도록 조정 설계되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 물동량 성과 지시 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200 space-y-4">
          <span className="bg-slate-100 text-slate-800 text-[10px] tracking-widest font-mono font-bold uppercase px-2.5 py-0.5 rounded-sm">
            CARGO CAPACITY
          </span>
          <div className="space-y-3">
            <div className="flex justify-between items-end border-b border-slate-100 pb-2">
              <div className="space-y-0.5">
                <p className="text-slate-500 text-[10px]">일평균 소화 화물 톤수</p>
                <p className="font-black text-slate-950 text-lg font-mono">
                  {results.totalDailyTon.toFixed(1)} 톤/일
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">한계여력대비</span>
                <span className={`text-xs font-bold ${results.totalDailyTon > 126 ? "text-rose-600" : "text-slate-700"}`}>
                  {((results.totalDailyTon / 104) * 100).toFixed(1)}% 가동
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end border-b border-slate-100 pb-2">
              <div className="space-y-0.5">
                <p className="text-slate-500 text-[10px]">연간 누적 물량 처리 톤수</p>
                <p className="font-black text-slate-950 text-lg font-mono">
                  {results.totalAnnualTon.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 톤/년
                </p>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              ※ 청주공항 공인 화물 처리 한계(수용력 연 3.8만 톤)를 초과 시 화물터미널 주식회사 증설 마스터플랜(3단계)이 병렬 작동됩니다. (향후 년간 16만톤 처리능력 확보 목표)
            </p>
          </div>
        </div>

        {/* 직접 간접 일자리 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-slate-100 text-slate-800 text-[10px] tracking-widest font-mono font-bold uppercase px-2.5 py-0.5 rounded-sm">
              EMPLOYMENT EFFECT
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-600 font-bold">
              <Users className="h-4 w-4 text-slate-500" />
              <span>직접 채용</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-2.5 rounded-none border border-slate-100 text-center col-span-2">
                <span className="text-slate-500 text-[10px] block font-serif">조종사 구성 (총 {results.pilotsHire}명)</span>
                <div className="flex justify-around items-center mt-1.5 pt-1 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[9px] mb-0.5">기장 (Captains)</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{results.captainsHire}명</span>
                  </div>
                  <div className="border-l border-slate-200 h-6"></div>
                  <div>
                    <span className="text-slate-400 block text-[9px] mb-0.5">부기장 (First Officers)</span>
                    <span className="font-bold text-blue-600 font-mono text-sm">{results.firstOfficersHire}명</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 block mt-1 hover:text-slate-500 font-sans transition-colors cursor-help">
                  * 부기장 2배수 상업 교육 고용 구조적 특성 반영
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-none border border-slate-100 text-center">
                <span className="text-slate-500 text-[10px] block font-serif">지상 안전·정비사</span>
                <span className="font-black text-slate-950 text-base font-mono">{results.groundStaffHire} 명</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-none border border-slate-100 text-center">
                <span className="text-slate-500 text-[10px] block font-serif">총 직접 고용 인원</span>
                <span className="font-black text-slate-950 text-base font-mono">{results.totalJobs} 명</span>
              </div>
              <div className="bg-rose-50/50 p-3 rounded-none border border-rose-100 text-center col-span-2">
                <span className="text-rose-600 text-[10px] block font-bold font-serif">4인 가구 기준 예상 유입인구</span>
                <span className="font-black text-rose-600 text-base font-mono">{(results.totalJobs * 4).toLocaleString()} 명</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-bold">기장 배치 인원</span>
              <span className="font-bold text-slate-950 text-sm font-mono">{results.captainsHire} 명</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">부기장 영입 인원 (기장의 2배수)</span>
              <span className="font-black text-blue-600 text-sm font-mono">{results.firstOfficersHire} 명</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">지상직 및 기타 간접 전문직</span>
              <span className="font-black text-slate-950 text-sm font-mono">{results.groundStaffHire} 명</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200">
              <span className="text-slate-600 font-bold">총 직접 고용 인원</span>
              <span className="font-black text-slate-950 text-sm font-mono">{results.totalJobs} 명</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">4인 가구 동반 이주 인구 유입</span>
              <span className="font-black text-rose-600 text-sm font-mono">{(results.totalJobs * 4).toLocaleString()} 명 예상</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">GDC 유관 간접 고용 유발</span>
              <span className="font-black text-slate-950 text-sm font-mono">
                {Math.round(results.totalAnnualTon / 300)} 명 내외
              </span>
            </div>

            <div className="relative overflow-hidden bg-slate-50 p-3 mt-3 border border-slate-200 text-[11px] leading-relaxed text-slate-600">
              <span className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[7px] font-semibold px-1.5 uppercase tracking-wider">
                TRAINING PIPELINE
              </span>
              <p className="font-bold text-slate-950 mb-1 font-serif">부기장 영입 및 청년 일자리 선순환</p>
              <p className="text-justify text-slate-650">
                <strong>Skyking Air</strong>는 부기장을 <strong>2배수로 고용</strong>하여 비행 경력을 전폭 지원하고, <strong>1,000시간</strong> 축적 완료 시 대형 항공사(FSC/LCC)로 취업/전입시키는 실무 사관학교 역할을 합니다. 이는 국가 차원의 <strong>청년 일자리 창출</strong>에 적극 공헌할 뿐만 아니라, 지역 전문 유입 증대 및 지방 <strong>세수 기여</strong>에도 핵심 역할을 수행합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 세수 기여 성과 */}
        <div className="bg-white p-6 rounded-none shadow-sm border border-slate-200 space-y-4">
          <span className="bg-slate-100 text-slate-800 text-[10px] tracking-widest font-mono font-bold uppercase px-2.5 py-0.5 rounded-sm">
            LOCAL TAX GAINS
          </span>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">지방 근로소득 기여 (갑근세분)</span>
              <span className="font-bold text-slate-900 font-mono">{(results.totalTaxLabor).toFixed(2)} 억 원/년</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">충북도 환산 법인세 수입 (20% 요율)</span>
              <span className="font-bold text-slate-900 font-mono">{(results.totalTaxCorporate).toFixed(2)} 억 원/년</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">등록 항공기 정치장 재산세 기여</span>
              <span className="font-bold text-slate-900 font-mono">{(results.totalTaxLocal).toFixed(2)} 억 원/년</span>
            </div>
            <div className="flex justify-between pt-1 text-slate-950 font-bold border-t border-slate-200">
              <span className="font-serif">합산 연간 세수 기여액</span>
              <span className="text-emerald-700 font-black text-sm font-mono">+ {results.taxIncome.toFixed(2)} 억 원/년</span>
            </div>
            
            <div className="mt-3.5 pt-3 border-t border-slate-100 text-[10px] text-slate-500 space-y-1 bg-slate-50/50 p-2.5">
              <p className="font-bold text-slate-700">💡 정치장 등록 항공기 재산세 산출 기준 안내</p>
              <p className="text-justify leading-normal">
                지방세법상 항공기 등록 재산세율은 <strong>0.3%</strong>(지방세법 제111조)이며, 여기에 20%의 <strong>지방교육세</strong>가 가산되어 총 <strong>0.36%</strong>의 실효 세액이 부과됩니다. 
              </p>
              <p className="text-justify leading-normal mt-1 text-slate-500">
                • <strong>ATR72-600F</strong> (도입가 약 250억 원, 감가 고려 시적표준액 기준): 대당 연 평균 약 <strong>0.9억 원</strong><br />
                • <strong>B737-800BCF</strong> (도입가 약 600억 원, 감가 고려 시적표준액 기준): 대당 연 평균 약 <strong>2.2억 원</strong><br />
                • <strong>B777F</strong> (도입가 약 1,500억 원, 신규/준신비 기준 높은 표준액): 대당 연 평균 약 <strong>5.5억 원</strong>
              </p>
              <p className="text-justify leading-normal mt-1 border-t border-slate-200/60 pt-1 font-semibold text-slate-600">
                기단이 총 6대(각 2대 운영)일 경우 연간 재산세 세정 수입은 합산 약 <strong>17.2억 원/년</strong> 규모로 정확하게 연동됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
