import React from "react";
import { Milestone, CheckCircle2, TrendingUp, Layers, Package, Construction, Printer } from "lucide-react";

interface RoadmapStep {
  phase: string;
  period: string;
  title: string;
  motto: string;
  goals: string[];
  infrastructure: string[];
  fleet: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    phase: "1단계: 거버넌스 및 자본 구조화",
    period: "2026년 상반기 ~ 2026년 하반기",
    title: "충북형 항공물류 펀드 조성 & SPC 협의체 구성",
    motto: "일을 개시할 ‘자본 그릇’과 ‘정치적 정당성’ 확보",
    goals: [
      "충청북도, 청주시 및 지역 금융권이 참여하는 민관 공동 300억 원 상당의 물류 펀드 기획 승인",
      "‘충북물류협회’ 및 ‘화물터미널주식회사’ 설립 추진",
      "위탁운항사 설립 및 안전운항증명(AOC;Air Operation Certificate) 준비 시작",
      "알리, 테무, 틱톡, 쉬인 앵커 화주 참여 유치",
      "LX판토스 등 주요 운송업체 수요파악 및 MOU진행",
      "항공 지입 투자자를 유치하여 초기 기체 대여 협상금(Deposit) 에스크로 구조 설계"
    ],
    infrastructure: [
      "현존 청주공항 화물터미널 공간 사무 임대철수 및 부지 반환 요청 조치",
      "임시 통관 검사 및 조업 장비 투입 공간 리모델링 착수"
    ],
    fleet: "기종 준비 단계 (운항사 설립 및 항공운항증명[AOC] 신청 서류 마련)"
  },
  {
    phase: "2단계: 화물기 최초 시범 가동",
    period: "2027년 상반기 ~ 2028년",
    title: "소형 전용기(ATR72-600F) 2대 시범 취항 & 실 가동",
    motto: "준공공형 ‘Skyking Air’ 운항 수립",
    goals: [
      "국토교통부 신생 화물 에어라인 국제 항공면허 및 안전운항증명(AOC) 득세",
      "중국 이우, 일본 후쿠오카 취항 루트 확보 및 고빈도 왕복 셔틀 개시",
      "알테쉬틱(알리, 테무, 쉬인, 틱톡) 및 직결 물류사와의 고정 물량 보장(MRG) 계약 실행"
    ],
    infrastructure: [
      "대형 화물용 X-ray 검색기 도입 및 보세창고 정식 지정 상시 통관 완료",
      "오송 바이오 제약 수송을 위한 소규모 신선 의약품 냉장 창고 완비"
    ],
    fleet: "ATR72-600F 2대 가동 (연간 처리 목표: 약 11,000톤)"
  },
  {
    phase: "3단계: 기단 중형화 및 노선 확장",
    period: "2029년 ~ 2030년",
    title: "B737-800BCF 추가 도입 및 아시아 메이저 연결",
    motto: "중부권 산업 클러스터 물량 전량 흡수 및 통관 자동화",
    goals: [
      "홍콩, 대만, 하노이, 광저우 등 아시아 남부 메이저 고부가 운송망 연장 개설",
      "오송 바이오 산업 연생 물량 및 청주 반도체, 이차전지 긴급 고가 부품 흡수율 극대화",
      "2대 가동에서 총 4대 기단 가동으로 시너지 확보 (고정비 분산 마진 확대)"
    ],
    infrastructure: [
      "화물터미널 내 컨베이어 벨트 자동 고속 분류기 구획 증설 구축",
      "지상 조업 견인차, GSE 장비 대규모 추가 마련으로 동시 가동 계류장 적합성 확보"
    ],
    fleet: "ATR72-600F 2대 + B737-800BCF 2대 (연간 처리 목표: 약 40,000 톤)"
  },
  {
    phase: "4단계: 대형 허브화 및 중간 기착 대륙 횡단",
    period: "2031년 ~ 2032년",
    title: "대형 B777F 도입 및 중간 급유 연계 미국/유럽 확장",
    motto: "2Hub 균형 발전 국가 물류관문 실현 (앵커리지, 알마티 연계)",
    goals: [
      "100톤급 대형 화물기 B777F 도입 완료",
      "앵커리지(ANC) 경유 미국 동부, 알마티(ALA)/나보이(NVI) 경유 유럽 직결 고부가 항공 물류 통로 대형화",
      "대한항공, 에어인천 등 대형사 과점 과밀 구조를 우회하는 틈새 독점 확보"
    ],
    infrastructure: [
      "청주공항 배후에 스마트 Cargo Complex 복합 자동화 화물 기지 신축 설계 착공",
      "냉각/방사능/특수 고위험 위험물 전용 물류 창고 부지 확보 및 가동"
    ],
    fleet: "ATR72-600F 2대 + B737-800BCF 2대 + B777F 2대 (연간 처리 목표: 약 100,000 톤 이상)"
  },
  {
    phase: "5단계: 영구적 기반 선도화",
    period: "2033년 이후 정착기",
    title: "실증적 성과에 기반한 3,200m 전용 활주로 예산 승인 획득",
    motto: "활주로 확장 명분의 궁극적 목표 및 준공영 지자체 항공공사 정착",
    goals: [
      "연간 10만 톤 초과 실증적 통계에 기반하여 활주로 길이 연장 방안의 KDI 예비타당성 면제 및 득세",
      "물류기업 컨소시엄 독립 SPC를 ‘충북항공물류공사’ 공공 거버넌스로 법인 상정 완료",
      "청주국제공항을 충청 배후를 넘어 경기 남부, 영호남을 포함하는 완전한 제2국가 물류 관문으로 격상"
    ],
    infrastructure: [
      "신규 3,200m 민간 전용 독립 활주로 가동 전면 도입 및 초대형 계류장 확보 완료"
    ],
    fleet: "하이브리드 메이저기 합산 8대 이상 확장 (연간 처리 역량 16만 톤 완비)"
  }
];

export default function RoadmapView() {
  return (
    <div className="space-y-4" id="roadmap-view-container">
      {/* 액션 헤더 */}
      <div className="bg-slate-50 px-6 py-4 border border-slate-200 flex flex-wrap gap-3 items-center justify-between no-print mb-1">
        <div className="flex items-center gap-2">
          <Milestone className="h-5 w-5 text-slate-700" />
          <span className="font-bold text-slate-800 tracking-tight font-serif text-sm">청주국제공항 항공물류 정상화 5개년 액션 플랜</span>
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
          id="btn-roadmap-print-pdf"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>PDF 출력</span>
        </button>
      </div>

      <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6 md:p-8" id="roadmap-section">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
          <Milestone className="h-5 w-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-sm font-serif">5개년 세부 추진 로드맵</h3>
        </div>

      <div className="relative border-l-2 border-slate-350 ml-4 md:ml-8 pl-6 md:pl-8 space-y-12">
        {ROADMAP_STEPS.map((step, idx) => {
          return (
            <div key={idx} className="relative" id={`roadmap-step-${idx}`}>
              {/* 노드 마커 */}
              <div className="absolute -left-11 md:-left-13 top-1 flex items-center justify-center">
                <span className="bg-white rounded-none p-1 border-2 border-slate-800 shadow-sm text-slate-900">
                  {idx === 0 ? (
                    <Layers className="h-4 w-4 text-blue-600" />
                  ) : idx === 1 ? (
                    <Package className="h-4 w-4 text-blue-600" />
                  ) : idx === 2 ? (
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  ) : idx === 3 ? (
                    <Construction className="h-4 w-4 text-blue-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                </span>
              </div>

              {/* 디테일 내용 구조 */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 uppercase tracking-wider">
                    {step.phase}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-900 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20 uppercase tracking-widest text-[#a16207]">
                    {step.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-black text-slate-950 text-base md:text-lg tracking-tight font-serif">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-serif italic">“ {step.motto} ”</p>
                </div>

                {/* 추진 핵심 과제 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-slate-50 p-4 rounded-none border border-slate-200">
                    <p className="text-xs font-bold text-slate-950 mb-2 font-serif border-b border-slate-200 pb-1">핵심 추진 비즈니스 과제</p>
                    <ul className="space-y-1.5 text-xs text-slate-650 list-disc pl-4 leading-relaxed">
                      {step.goals.map((g, gIdx) => (
                        <li key={gIdx}>{g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-none border border-slate-200">
                    <p className="text-xs font-bold text-slate-950 mb-2 font-serif border-b border-slate-200 pb-1">필수 화물터미널/행정 인프라 보강</p>
                    <ul className="space-y-1.5 text-xs text-slate-650 list-disc pl-4 leading-relaxed">
                      {step.infrastructure.map((inf, iIdx) => (
                        <li key={iIdx}>{inf}</li>
                      ))}
                    </ul>
                    <div className="border-t border-slate-200 pt-2 mt-3 text-xs flex justify-between font-bold text-slate-850">
                      <span>도입 기단 기재:</span>
                      <span className="text-blue-800 font-mono text-[11px]">{step.fleet}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
