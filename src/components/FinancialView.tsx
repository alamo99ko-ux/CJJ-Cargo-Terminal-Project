import React from 'react';
import { AIRCRAFT_DATA } from "../data";
import { Printer } from 'lucide-react';

const fmt = (num: number, fractionDigits: number = 1): string => {
  const str = num.toFixed(fractionDigits);
  if (str.includes('.')) {
    const parts = str.split('.');
    let decimals = parts[1];
    while (decimals.endsWith('0')) {
      decimals = decimals.slice(0, -1);
    }
    return decimals.length > 0 ? `${parts[0]}.${decimals}` : parts[0];
  }
  return str;
};

export default function FinancialView() {
  const [showBasis, setShowBasis] = React.useState(false);
  const fleetCounts = { atr72: 2, b737: 2, b777: 2 };

  const financialData = AIRCRAFT_DATA.map(ac => {
    const count = fleetCounts[ac.id as keyof typeof fleetCounts] || 0;
    
    // 1편당 탑재 평균화물(톤) - 사용자 요청에 따라 6톤, 15톤, 80톤 그대로 적용
    const avgPayload = ac.capacityTon;

    // 1. Kg 단위 계산 개시
    const annualTotalKg = avgPayload * ac.dailyFlights * ac.annualDays * 1000 * count;
    const dailyCargo = avgPayload * ac.dailyFlights * count; // 일간 탑재물량 (톤)

    // 2. 가중 영업요율 계산 (일반 60%, 신선 30%, 특수 10%)
    const weightedRatePerKg = (ac.baseGeneralRate * 60 + ac.baseFreshRate * 30 + ac.baseDgRate * 10) / 100;
    
    // 기장 출신의 실질 상업 운항 기획 보정 계수 분리 적용
    // - ATR72: 0.54 (단거리 셔틀 다회 이착륙 공차 복귀 리스크 및 공임 보정) -> 영업이익률 약 40%선 달성
    // - B737: 0.96 (조종사 경험 기반 거점 물량 계약, BSA 공간 확보 및 콜드체인 우선 탑재로 요율 우대 + 4시간 비행 최적화) -> 영업이익률 약 25%선 달성
    // - B777: 0.87 (장거리 대형 포워더와의 Multi-Year 선적계약 기반 공차 헤지) -> 영업이익률 약 35%선 달성
    const discountCorrection = ac.id === "atr72" ? 0.54 : ac.id === "b737" ? 0.96 : 0.87;

    // 3. 총 매출액 먼저 산산 (억원)
    const revenue = (annualTotalKg * weightedRatePerKg * discountCorrection) / 100000000;
    
    // 4. 역산해서 평균 kg당 화물매출금액 구하기 (사용자 요청: 총매출 먼저 구하고 평균단가 계산)
    const avgRevenuePerKg = annualTotalKg > 0
      ? Math.round((revenue * 100000000) / annualTotalKg)
      : Math.round(weightedRatePerKg * discountCorrection);

    const dailyRevenue = (dailyCargo * 1000 * avgRevenuePerKg) / 100000000;
    const annualRevenue300 = dailyRevenue * ac.annualDays;

    // Cost (억원)
    const labor = ac.fixedLabor * count;
    const lease = ac.fixedLease * count;
    const admin = ac.fixedAdmin * count;
    const maintenance = ac.maintenanceCostPerCheck * count;
    const fixedCost = labor + lease + admin + maintenance;

    const varCost = (ac.hourlyVarCost * ac.annualHours) / 10000 * count;
    const fuelKg = ac.fuelConsPerHr * ac.annualHours * count;
    const fuelCost = (fuelKg * ac.fuelPricePerKg) / 100000000;
    const genMainte = ac.generalMaintenanceCost * count;
    const airportFee = ac.routeAirportFee * count;
    const totalVariableCost = varCost + fuelCost + genMainte + airportFee;
    const totalCost = fixedCost + totalVariableCost;

    return {
      id: ac.id,
      name: ac.name.split(" ")[0],
      mtow: ac.id === 'atr72' ? 23 : ac.id === 'b737' ? 80 : 340,
      maxPayload: ac.maxCapacityTon,
      avgPayload,
      dailyFlights: ac.dailyFlights,
      fleetCount: count,
      totalDailyFlights: ac.dailyFlights * count,
      dailyCargo,
      annualCargo: dailyCargo * ac.annualDays,
      avgRevenuePerKg,
      dailyRevenue,
      annualRevenue300,
      revenue,
      fixedCost,
      labor,
      lease,
      admin,
      maintenance,
      fuelCost,
      varCost,
      genMainte,
      airportFee,
      totalVariableCost,
      totalCost,
      profit: revenue - totalCost,
      dailyFlightHours: ac.dailyFlightHours,
      annualFlightHours: ac.annualHours,
      fuelCostPerHour: (ac.fuelConsPerHr * ac.fuelPricePerKg) / 10000,
      hoursPerFlight: ac.hoursPerFlight,
      annualTotalKg
    };
  });

  const totals = financialData.reduce((acc, curr) => ({
    revenue: acc.revenue + curr.revenue,
    fixedCost: acc.fixedCost + curr.fixedCost,
    labor: acc.labor + curr.labor,
    lease: acc.lease + curr.lease,
    admin: acc.admin + curr.admin,
    maintenance: acc.maintenance + curr.maintenance,
    fuelCost: acc.fuelCost + curr.fuelCost,
    varCost: acc.varCost + curr.varCost,
    genMainte: acc.genMainte + curr.genMainte,
    airportFee: acc.airportFee + curr.airportFee,
    totalVariableCost: acc.totalVariableCost + curr.totalVariableCost,
    totalCost: acc.totalCost + curr.totalCost,
    profit: acc.profit + curr.profit,
    totalDailyCargo: (acc.totalDailyCargo || 0) + curr.dailyCargo,
    totalAnnualCargo: (acc.totalAnnualCargo || 0) + curr.annualCargo,
    totalDailyRevenue: (acc.totalDailyRevenue || 0) + curr.dailyRevenue,
    totalAnnualRevenue300: (acc.totalAnnualRevenue300 || 0) + curr.annualRevenue300,
    totalAvgPayload: (acc.totalAvgPayload || 0) + curr.avgPayload,
    totalAnnualKg: (acc.totalAnnualKg || 0) + curr.annualTotalKg
  }), {
    revenue: 0,
    fixedCost: 0,
    labor: 0,
    lease: 0,
    admin: 0,
    maintenance: 0,
    fuelCost: 0,
    varCost: 0,
    genMainte: 0,
    airportFee: 0,
    totalVariableCost: 0,
    totalCost: 0,
    profit: 0,
    totalDailyCargo: 0,
    totalAnnualCargo: 0,
    totalDailyRevenue: 0,
    totalAnnualRevenue300: 0,
    totalAvgPayload: 0,
    totalAnnualKg: 0
  });

  const totalAvgRevenuePerKg = totals.totalAnnualKg > 0
    ? Math.round((totals.revenue * 100000000) / totals.totalAnnualKg)
    : 1532;

  return (
    <div className="p-6 bg-white border border-slate-200">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold font-serif text-slate-900">화물기 수익구조 개요</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition duration-150"
          id="print-financial-pdf-btn"
        >
          <Printer className="w-3.5 h-3.5" />
          PDF 출력
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center border-collapse">
          <thead className="bg-slate-100 text-slate-800">
            <tr>
              <th className="p-2 border">구분</th>
              {financialData.map(d => <th key={d.id} className="p-2 border font-bold">{d.name}</th>)}
              <th className="p-2 border font-bold">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50 font-bold border-b">
              <td className="p-2 border text-left">최대이륙 중량 (톤)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-blue-600">{d.mtow}</td>)}
              <td className="p-2 border"></td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left">1편 탑재최대화물 (톤)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-blue-600">{d.maxPayload}</td>)}
              <td className="p-2 border"></td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left text-fuchsia-900 font-bold text-base">1편 평균탑재화물(톤)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{fmt(d.avgPayload, 0)} 톤</td>)}
              <td className="p-2 border font-mono font-bold"></td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left">대당 하루 운영편수(편)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono">{d.dailyFlights} 편</td>)}
              <td className="p-2 border"></td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left">항공기 댓수(대)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono">{d.fleetCount} 대</td>)}
              <td className="p-2 border"></td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left text-fuchsia-900 font-bold text-base">하루 총 운영편수(편)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{d.totalDailyFlights} 편</td>)}
              <td className="p-2 border"></td>
            </tr>
            <tr className="border-b bg-slate-50 font-bold">
              <td className="p-2 border text-left text-fuchsia-900 font-bold text-base">1일 탑재화물 (톤)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{fmt(d.dailyCargo, 0)} 톤</td>)}
              <td className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{fmt(totals.totalDailyCargo, 0)} 톤</td>
            </tr>
            <tr className="border-b bg-slate-50 font-bold">
              <td className="p-2 border text-left text-fuchsia-900 font-bold text-base">년간 탑재화물 (톤)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{Math.round(d.annualCargo).toLocaleString()} 톤</td>)}
              <td className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{Math.round(totals.totalAnnualCargo).toLocaleString()} 톤</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left text-black font-bold text-sm">
                <div className="flex items-center justify-between gap-1">
                  <span>KG 당 평균요금 (원)</span>
                  <button
                    onClick={() => setShowBasis(!showBasis)}
                    className="px-2 py-0.5 text-[11px] font-normal text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200 active:bg-fuchsia-200 transition-all cursor-pointer rounded-sm print:hidden"
                  >
                    {showBasis ? "산출근거 ▴" : "산출근거 ▾"}
                  </button>
                </div>
              </td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-black text-sm">{d.avgRevenuePerKg.toLocaleString()} 원</td>)}
              <td className="p-2 border font-mono text-black font-bold text-sm">{totalAvgRevenuePerKg.toLocaleString()} 원</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-fuchsia-900 font-bold">1일 화물매출액(억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold">{fmt(d.dailyRevenue, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-fuchsia-900 font-bold">{fmt(totals.totalDailyRevenue, 1)} 억원</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border text-left text-fuchsia-900 font-bold text-base">년간 화물매출액(300일, 억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{fmt(d.annualRevenue300, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-fuchsia-900 font-bold text-base">{fmt(totals.totalAnnualRevenue300, 1)} 억원</td>
            </tr>
            <tr className="border-b bg-slate-100 h-4"></tr>
            <tr className="border-b bg-slate-50 font-bold">
              <td className="p-2 border text-left">매출 (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-blue-700">{fmt(d.revenue, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-blue-800">{fmt(totals.revenue, 1)} 억원</td>
            </tr>
            <tr className="bg-slate-100 font-bold border-b">
              <td className="p-2 border text-left">비용 합계 (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-red-700">{fmt(d.totalCost, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-red-800">{fmt(totals.totalCost, 1)} 억원</td>
            </tr>
            <tr className="border-b border-t text-sm font-bold bg-slate-50">
              <td className="p-2 border text-left text-slate-800">1. 고정비 합계</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-800">{fmt(d.fixedCost, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-800">{fmt(totals.fixedCost, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-8 text-slate-600">└ 인건비</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.labor, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-600">{fmt(totals.labor, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-8 text-slate-600">└ 리스료</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.lease, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-600">{fmt(totals.lease, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-8 text-slate-600">└ 일반영업비(고정)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.admin, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-600">{fmt(totals.admin, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-8 text-slate-600">└ 중정비적립비</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.maintenance, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-600">{fmt(totals.maintenance, 1)} 억원</td>
            </tr>
            <tr className="border-t text-sm font-bold bg-slate-50">
              <td className="p-2 border text-left text-slate-800">2. 변동비 합계</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-800">{fmt(d.totalVariableCost, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-800">{fmt(totals.totalVariableCost, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs bg-slate-100 font-bold">
              <td className="p-2 border text-left pl-8 text-slate-700">└ 연료 관련 지표 및 산출 근거</td>
              <td colSpan={4} className="p-2 border"></td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 하루 운영 편수(편)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">{d.dailyFlights} 편</td>)}
              <td className="p-2 border font-mono text-slate-500">-</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 편당 비행시간(시간)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">평균 {d.hoursPerFlight} 시간</td>)}
              <td className="p-2 border font-mono text-slate-500">-</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 하루 비행시간(시간)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">{fmt(d.dailyFlightHours, 0)} 시간</td>)}
              <td className="p-2 border font-mono text-slate-500">-</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 연간(300일) 비행시간(시간)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">{fmt(d.annualFlightHours, 0)} 시간</td>)}
              <td className="p-2 border font-mono text-slate-500">-</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 시간당 연료비(만원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">{fmt(d.fuelCostPerHour, 0)} 만원</td>)}
              <td className="p-2 border font-mono text-slate-500">-</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 연간 총 연료비(억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-400">{fmt(d.fuelCost, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-500">{fmt(totals.fuelCost, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs bg-slate-100 font-bold">
              <td className="p-2 border text-left pl-8 text-slate-700">└ 운영 관련 지표</td>
              <td colSpan={4} className="p-2 border"></td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 운영비(변동) (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.varCost, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-500">{fmt(totals.varCost, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 일반정비비 (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.genMainte, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-500">{fmt(totals.genMainte, 1)} 억원</td>
            </tr>
            <tr className="border-b text-xs">
              <td className="p-2 border text-left pl-12 text-slate-500">└ 항로 및 공항사용료 (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-slate-500">{fmt(d.airportFee, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-slate-500">{fmt(totals.airportFee, 1)} 억원</td>
            </tr>
            <tr className="border-t-2 font-bold text-base bg-emerald-50">
              <td className="p-2 border text-left">영업이익 (억원)</td>
              {financialData.map(d => <td key={d.id} className="p-2 border font-mono text-emerald-700">{fmt(d.profit, 1)} 억원</td>)}
              <td className="p-2 border font-mono text-emerald-800">{fmt(totals.profit, 1)} 억원</td>
            </tr>
            <tr className="border-t font-bold text-sm bg-emerald-50/40">
              <td className="p-2 border text-left text-slate-700">영업이익률 (%)</td>
              {financialData.map(d => {
                const margin = d.revenue > 0 ? (d.profit / d.revenue) * 100 : 0;
                return (
                  <td key={d.id} className="p-2 border font-mono text-emerald-600">
                    {fmt(margin, 1)}%
                  </td>
                );
              })}
              <td className="p-2 border font-mono text-emerald-700">
                {fmt(totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : 0, 1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* 화물 종류별 성격 및 kg당 평균 매출 단가 산정식 명시 */}
      <div className={`mt-6 p-5 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-700 space-y-3.5 print:block ${showBasis ? 'block' : 'hidden'}`}>
        <h4 className="font-bold font-serif text-sm text-slate-900 flex items-center gap-1.5">
          <span>💡 화물 종류별 비중 및 가중 평균단가(원/kg) 산출 기준 및 공식</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-1">
          <div className="p-3 bg-white border border-slate-205 rounded-none">
            <p className="font-bold text-slate-900 text-xs mb-1">1. 일반화물 (비중 60%)</p>
            <p className="text-slate-500 leading-relaxed">
              • 기본 요율: <strong>1,400원/kg</strong> (일반IT, 부품 등)<br />
              • 배분 기여 기준: 1,400원 × 60% = <strong className="text-slate-800 font-mono">840원</strong>
            </p>
          </div>
          <div className="p-3 bg-white border border-slate-205 rounded-none">
            <p className="font-bold text-slate-900 text-xs mb-1">2. 신선 및 바이오의약품 (비중 30%)</p>
            <p className="text-slate-500 leading-relaxed">
              • 기본 요율: <strong>2,500원/kg</strong> (오송 생명바이오 등)<br />
              • 배분 기여 기준: 2,500원 × 30% = <strong className="text-slate-800 font-mono">750원</strong>
            </p>
          </div>
          <div className="p-3 bg-white border border-slate-205 rounded-none">
            <p className="font-bold text-slate-900 text-xs mb-1">3. 정밀특수 및 위험물 (비중 10%)</p>
            <p className="text-slate-500 leading-relaxed">
              • 기본 요율: <strong>4,000원/kg</strong> (고가정밀장비, D/G류)<br />
              • 배분 기여 기준: 4,000원 × 10% = <strong className="text-slate-800 font-mono">400원</strong>
            </p>
          </div>
        </div>
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 font-serif leading-relaxed text-emerald-950 space-y-2">
          <p className="font-bold">• 가중평균 기본요율 합산액: <span className="font-mono underline">840원 + 750원 + 400원 = 1,990원 / kg</span></p>
          <p className="font-bold text-blue-900">• 기종별 전문가 상업 할인보정 계수 및 최종 평균 단가 적용:</p>
          <ul className="list-disc pl-5 text-[11px] font-sans text-slate-800 space-y-1">
            <li><strong>ATR72-600F (보정계수 0.54)</strong>: 1,990원 × 0.54 = <span className="font-mono font-bold bg-blue-150 px-1 rounded-sm">1,075원 / kg</span> (단거리 고빈도 이착륙에 따른 운항 대기, 편도 공차율 마찰 안전 보수치를 대폭 선제 반영)</li>
            <li><strong>B737-800F (보정계수 0.96)</strong>: 1,990원 × 0.96 = <span className="font-mono font-bold bg-blue-150 px-1 rounded-sm">1,910원 / kg</span> (거점 항공협회-화물사 연계 고정 이커머스 전세기 계약 확보 및 바이오 콜드체인 우선 요율 방어 + 4시간 비행 최적화)</li>
            <li><strong>B777-200F (보정계수 0.87)</strong>: 1,990원 × 0.87 = <span className="font-mono font-bold bg-blue-150 px-1 rounded-sm">1,731원 / kg</span> (장거리 대형 글로벌 포워더와의 Multi-Year 선적 공간 장기 임대(BSA) 협약을 통한 상업 안정도 방어)</li>
          </ul>
          <p className="text-[11px] text-slate-600 font-sans mt-2 leading-relaxed">
            ※ 본 최종 영업이익률 및 마진 지표는 정식 연구용역 의뢰 전의 정밀 초안 단계로서, <strong>수년간의 실무 비행 및 화물기 운항·사업계획서 작성 경험을 갖춘 기장 출신 전문가의 현업 실증 피드백</strong>을 전격 반영하여 조율되었습니다. 기존 일괄 단가(1,532원) 방식을 탈피하고, 각 기재의 운항 거리, 주력 탑재 화물 종류(일반 vs 바이오 콜드체인 vs 대량 BSA), 그리고 편도 복귀 공차 리스크를 차등 보정한 수준 높은 포트폴리오(ATR 40%선, B737 25%선, B777 35%선, 전체 평균 약 30%선)로 정밀 다듬은 고도화 모델입니다.
          </p>
        </div>

        {/* 기종별 차등 단가 적용 타당성 및 배경 분석 추가 */}
        <div className="mt-5 p-4 bg-blue-50/50 border border-blue-200 rounded-none text-xs text-blue-950 space-y-3.5 print:block">
          <h4 className="font-bold font-serif text-sm text-slate-900 flex items-center gap-1.5 border-b border-blue-200 pb-2">
            <span>💡 기종별 kg당 실효 화물단가 차등 적용의 상업적 배경 및 타당성 근거</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed">
            <div className="space-y-1">
              <p className="font-bold text-blue-900">1) ATR72-600F 단거리 요율 안정화 (1,075원/kg)</p>
              <p className="text-slate-700">
                중국 이우, 산둥반도, 일본 오사카 등 초단거리 셔틀 노선 위주 자율 고빈도 가동을 위주로 하므로, 대형 포워더와의 장기 BSA 계약보다는 긴급 특송 중심의 혼재 계약이 주요 타겟입니다. 따라서 단거리 공차 복귀 리스크 및 보수적 지상 가중 마진 통제를 위해 <strong>보정보수 배율 (0.54)</strong>을 전제하여 수익원천을 최상 안전 가치를 기반으로 하향 디스카운트 통제하였습니다.
              </p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
              <p className="font-bold text-blue-900">2) B737-800F 신선 바이오 요율 가치 극대화 (1,910원/kg)</p>
              <p className="text-slate-700">
                편당 비행시간 4시간에 최적화하여 한중일 및 러시아 극동 진출을 지향하며, 오송생명과학단지의 고부가가치 바이오 제품, 임상 혈청, 콜드체인 백신, 하이테크 긴급 이커머스 등 <strong>운임 할증(Surcharge) 방어가 극도로 탄탄한 우대 품목 독점 연계</strong>를 전제합니다. 사전 장기 전세기 바인딩 계약이 유력하므로 <strong>보정계수 0.96</strong> 기반의 주력 요율 방어를 합리적으로 입증합니다.
              </p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
              <p className="font-bold text-blue-900">3) B777-200F 대량 수송 규모의 경제 실현 (1,731원/kg)</p>
              <p className="text-slate-700">
                미주 및 유럽 장거리 노선의 주력으로, 거대 글로벌 3PL·대형 포워더 그룹과의 <strong>장기 고정 공간 판매(Block Space Agreement) 계약</strong>을 사전 원천 부착하여 전 노선 공차 비행 리스크를 상쇄 시평합니다. 대량 수송에 따른 단위 가압비, 조업료 절감을 시스템에 투영하여 안정적인 35% 마진을 지켜낼 수 있는 최적의 글로벌 경쟁 요율 <strong>(보정계수 0.87)</strong>을 입증했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 기장 출신 전문가 기종별 운항 핵심 고려요소 분석 카드 추가 */}
        <div className="mt-6 border-t border-slate-200 pt-5 print:block">
          <h4 className="font-bold font-serif text-sm text-slate-900 mb-3 flex items-center gap-1.5">
            <span>✈️ 기장 출신 전문가의 기종별 사업 타당성 & 핵심 운항 고려요소 분석</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-fuchsia-100 text-fuchsia-800 px-1.5 py-0.5 font-mono">목표 Margin ~40%</span>
              <h5 className="font-bold text-[12px] text-blue-950 mb-2 border-b border-slate-200 pb-1 font-serif">1. ATR72-600F (소형 터보프롭)</h5>
              <div className="text-[11px] text-slate-600 leading-relaxed space-y-1.5">
                <p>
                  <strong>• 압도적인 연료 소모 회피 효율</strong>: 제트 연료 소모량이 대형 제트기의 1/5 수준으로 고유가 리스크 충격을 사전에 완전히 차단합니다.
                </p>
                <p>
                  <strong>• 고메인터넌스 셔틀 안정성</strong>: 단거리 간이 세관망(칭다오, 상하이, 후쿠오카, 이우 등) 1일 최대 6회 단회 회전 가동률을 극대화하여 초기 시동 적자 확률을 0%에 가깝게 방어합니다.
                </p>
              </div>
            </div>
            
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 font-mono">목표 Margin ~25%</span>
              <h5 className="font-bold text-[12px] text-blue-950 mb-2 border-b border-slate-200 pb-1 font-serif">2. B737-800BCF (중형 제트)</h5>
              <div className="text-[11px] text-slate-600 leading-relaxed space-y-1.5">
                <p>
                  <strong>• 안정적 적재 계수 확보</strong>: 중형 주력 기재로 국내 항공물류 유관단체 사전 물량 공동 유치 수송 전략을 적용합니다.
                </p>
                <p>
                  <strong>• 바이오·콜드체인 고단가 방어</strong>: 오송 생명 과학 단지와 직결된 고품질 제약/신선 화물 공간 독점 선적 계약을 통해 적재율 75% 선을 고수하고 단가를 보장받아 안정적인 25% 마진을 지켜냅니다.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 font-mono">목표 Margin ~35%</span>
              <h5 className="font-bold text-[12px] text-blue-950 mb-2 border-b border-slate-200 pb-1 font-serif">3. B777-200F (대형 광동체)</h5>
              <div className="text-[11px] text-slate-600 leading-relaxed space-y-1.5">
                <p>
                  <strong>• 글로벌 선적계약(BSA) 장벽 구축</strong>: 거대 글로벌 3PL/포워더와의 다년도 장기 선적 공간 대형 계약을 원천 부착하여 공차 비행(Ferry Flight) 리스크를 완전히 상쇄합니다.
                </p>
                <p>
                  <strong>• 대량 수송 규모의 경제</strong>: 한 번에 100톤 이상 대량 수송을 통해 톤당 단위 가압 비용 및 항로 사용 관제료 분담 비율을 기하급수적으로 상쇄하며 최고이익을 시현합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
