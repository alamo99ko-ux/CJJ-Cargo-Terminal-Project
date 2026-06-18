import React, { useState } from "react";
import { Plane, BarChart3, Milestone, HelpCircle, FileText, Anchor, Sliders, RefreshCw, Layers, Sparkles, Printer, DollarSign } from "lucide-react";
import ReportView from "./components/ReportView";
import SimulatorView from "./components/SimulatorView";
import RoadmapView from "./components/RoadmapView";
import FaqView from "./components/FaqView";
import FinancialView from "./components/FinancialView";
import { PROPOSAL_TEXT } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"report" | "simulator" | "roadmap" | "financial" | "faq">("report");

  // 전역 인쇄 복제 모드 제어 함수 등록
  React.useEffect(() => {
    (window as any).runPrintMode = (mode: "tab" | "summary") => {
      // 기존에 남아있던 프린트 전용 클래스들을 확실하게 제거
      document.body.classList.remove("print-summary-mode");
      
      if (mode === "summary") {
        document.body.classList.add("print-summary-mode");
      }
      
      // 상태 변경 및 리렌더링 완료 시간을 준 뒤 브라우저 인쇄창을 실행합니다.
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          document.body.classList.remove("print-summary-mode");
        }, 1500);
      }, 150);
    };
  }, []);

  const handlePrintSummary = () => {
    if ((window as any).runPrintMode) {
      (window as any).runPrintMode("summary");
    } else {
      document.body.classList.add("print-summary-mode");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("print-summary-mode");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans block text-slate-900 selection:bg-slate-200">
      {/* 최고급 정책 자문용 헤더 - Editorial/Strategic Edition */}
      <header className="bg-blue-50 text-blue-900 border-b border-blue-200 sticky top-0 z-50 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2.5 rounded-sm text-white shadow-sm shrink-0">
              <Plane className="h-6 w-6 transform rotate-45" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-500/10 text-blue-700 text-[10px] tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-sm uppercase">
                  Strategic Proposal | 2026.06
                </span>
                <span className="flex items-center gap-0.5 text-[10px] text-blue-800 bg-blue-500/10 px-2 py-0.5 rounded-sm border border-blue-500/20 font-mono uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" />
                  PROPOSAL ADVISORY
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-blue-950 tracking-tight mt-1 font-serif">
                Cheongju Airport (CJJ) Cargo Hub Strategy <span className="font-sans text-sm font-normal text-blue-700">| 청주국제공항 항공물류 활성화</span>
              </h1>
            </div>
          </div>

          {/* 컨설턴트 및 조종사 정보 */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-slate-300 pl-3 md:pl-0 md:pr-4 py-0.5 max-w-sm">
              <p className="text-xs font-bold text-blue-950 leading-tight font-serif italic">Prepared by Seunghee Ko</p>
              <p className="text-[10px] text-blue-600 font-sans uppercase tracking-widest mt-1">
                고승희 기장 · 30년 운항 경력 조종사
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 대화형 메인 무대 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="main-content">
        {/* 요약 비주얼 카드 - Newspaper Headliner Style */}
        <section className="bg-white rounded-sm border border-slate-200 shadow-sm p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-1">
              <p className="text-blue-800 text-xs font-black uppercase tracking-widest">01. EXECUTIVE SUMMARY & CORE HYPOTHESIS</p>
              <button
                onClick={() => {
                  if ((window as any).runPrintMode) {
                    (window as any).runPrintMode("summary");
                  } else {
                    window.print();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-850 text-xs font-bold transition-colors rounded-sm border border-slate-200 cursor-pointer shadow-sm no-print"
                id="btn-print-summary"
              >
                <Printer className="h-3.5 w-3.5 text-slate-650" />
                <span>PDF 출력</span>
              </button>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-slate-950 font-serif leading-tight tracking-tight">
              청주공항 3,200미터 신설활주로 추진과 <br/> 화물전용터미널 조기가동의 시너지로 <br/>
              항공 여객 + 물류 경쟁력 확보
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed text-justify">
              충청북도가 추진 중인 1.5조 원 규모의 활주로 신설 안은 항공물류 거점 도약을 위한 장기 핵심 과제입니다. 이와 함께, 항공물류 전문가들의 엄밀한 분석에 따르면 
              연장하고자 법안을 제정하고 있으며, 또한 현재 청주 2,743m로도 충분히 화물기 운항 이 가능합니다.<br/>
              즉각적인 성과를 위해 보세창고 지정, 300억원 대 물류펀드 구축 및 독자 항공사(Skyking Air)의 준공공 거버넌스 출범으로 화물 전용 터미널을 조기 가동해야 합니다. 3,200미터 활주로 신설과 터미널 조기 가동을 상호 보완적으로 추진할 때, 화물기와 여객기의 시너지가 극대화되어 청주공항은 진정한 항공물류 허브로 거듭날 것입니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="flex items-center gap-2.5 p-3.5 bg-blue-50/80 text-blue-950 rounded-none border border-blue-200 transition-all shadow-xs">
                <div className="p-1.5 bg-blue-600 text-white rounded-none">
                  <Plane className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest font-mono">RUNWAY STATUS</p>
                  <p className="text-[13px] font-extrabold text-slate-900 leading-snug">
                    청주 활주로 <span className="text-blue-700 font-black">2,743m</span> 즉시 운항
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3.5 bg-amber-50/80 text-amber-950 rounded-none border border-amber-200 transition-all shadow-xs">
                <div className="p-1.5 bg-amber-500 text-white rounded-none">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest font-mono">PRIORITY TIER</p>
                  <p className="text-[13px] font-extrabold text-slate-900 leading-snug">
                    화물터미널 장비 확보 <span className="text-amber-700 font-black">0순위</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 text-slate-950 rounded-none border border-slate-200 transition-all shadow-xs">
                <div className="p-1.5 bg-slate-600 text-white rounded-none">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">GLOBAL STANDARD</p>
                  <p className="text-[13px] font-extrabold text-slate-900 leading-snug">
                    경유지 급유 글로벌 표준
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 text-blue-900 p-6 rounded-sm border border-blue-100 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-blue-600 font-mono tracking-widest uppercase">CJJ Terminal Corp.</p>
              <h3 className="font-serif font-black text-base text-blue-950">중부권 국가물류 다핵화(2Hub) 기여</h3>
            </div>
            <div className="space-y-2.5 text-xs text-blue-800 block">
              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                <span>2025년 청주공항 여객탑승인원</span>
                <span className="font-bold text-blue-950 font-mono">500만명 돌파</span>
              </div>
              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                <span>현재, 청주공항 화물 처리시설 한계</span>
                <span className="font-bold text-blue-950 font-mono">연 3.8만 톤</span>
              </div>
              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5 text-blue-700">
                <span>향후 년간 화물처리 능력 목표</span>
                <span className="font-bold font-mono text-blue-950">연 16만 톤</span>
              </div>
              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                <span>충북 산단 항공수요 잠재액</span>
                <span className="font-bold text-blue-950 font-mono text-right leading-tight">
                  연 308.8억 달러
                  <br />
                  <span className="text-[10px] text-blue-600 font-sans font-normal block mt-1">
                    (약 46조 3,200억 원 / KRW)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                <span className="text-left">
                  인천공항 O&D
                  <span className="text-[9px] text-blue-600 block font-sans">
                    (Origin & Destination: 기점 및 종점 화물)
                  </span>
                  청주 수용능력
                </span>
                <span className="font-bold text-blue-700 font-mono">최대 30% 가능</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-left text-blue-700">
                  현재 실제 수용률
                  <span className="text-[9px] text-blue-600 block font-sans">
                    (현재 화물 정기운항 전무 및 시설 마비)
                  </span>
                </span>
                <span className="font-bold text-rose-600 font-mono">0% (연 0톤)</span>
              </div>
              <div className="flex items-center border-b border-blue-200 pb-1.5">
                <span className="text-blue-700 text-[11px]">현재 청주-제주 구간 Belly Cargo를 이용한 제한적인 화물운용중</span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
            <p className="text-sm font-bold text-fuchsia-600">
              ※ 여객터미널과 달리 화물터미널은 사용자가 직접 검색장비, 콜드체인 등을 직접 준비해야합니다.
            </p>
          </div>
        </section>

        {/* 인터랙티브 네비게이션 탭 - Sharp Editorial Style */}
        <section className="space-y-6 normal-tabs-area">
          <div className="border-b-2 border-slate-300 flex flex-wrap gap-1 sm:gap-2 bg-slate-100/50 p-1.5 rounded-sm normal-tabs-nav">
            <button
              onClick={() => setActiveTab("report")}
              className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-black cursor-pointer transition-all uppercase tracking-tight border-b-4 -mb-[10px] ${
                activeTab === "report"
                  ? "border-blue-600 text-blue-800 bg-white shadow-sm font-black"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/40"
              }`}
              id="tab-report"
            >
              <FileText className="h-4 w-4" />
              <span>1. 국가 정책 마스터플랜 (건의서)</span>
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`animate-pulse-subtle flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-black cursor-pointer transition-all uppercase tracking-tight border-b-4 -mb-[10px] ${
                activeTab === "simulator"
                  ? "border-blue-600 text-blue-900 bg-white shadow-sm font-black"
                  : "border-transparent text-slate-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200"
              }`}
              id="tab-simulator"
            >
              <Sliders className="h-4 w-4" />
              <span>2. 경제성 및 세수 시뮬레이터</span>
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`animate-pulse-subtle flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-black cursor-pointer transition-all uppercase tracking-tight border-b-4 -mb-[10px] ${
                activeTab === "roadmap"
                  ? "border-blue-600 text-blue-900 bg-white shadow-sm font-black"
                  : "border-transparent text-slate-600 hover:text-green-900 bg-green-100 hover:bg-green-200"
              }`}
              id="tab-roadmap"
            >
              <Milestone className="h-4 w-4" />
              <span>3. 5개년 추진 로드맵</span>
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`animate-pulse-subtle flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-black cursor-pointer transition-all uppercase tracking-tight border-b-4 -mb-[10px] ${
                activeTab === "faq"
                  ? "border-blue-600 text-blue-900 bg-white shadow-sm font-black"
                  : "border-transparent text-slate-600 hover:text-purple-900 bg-purple-100 hover:bg-purple-200"
              }`}
              id="tab-faq"
            >
              <HelpCircle className="h-4 w-4" />
              <span>4. 핵심 정책 11문 11답</span>
            </button>
            <button
              onClick={() => setActiveTab("financial")}
              className={`animate-pulse-subtle flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-black cursor-pointer transition-all uppercase tracking-tight border-b-4 -mb-[10px] ${
                activeTab === "financial"
                  ? "border-blue-600 text-blue-900 bg-white shadow-sm font-black"
                  : "border-transparent text-slate-600 hover:text-blue-900 bg-sky-100 hover:bg-sky-200"
              }`}
              id="tab-financial"
            >
              <DollarSign className="h-4 w-4" />
              <span>5. 재무 성과 및 상세 분석</span>
            </button>
          </div>

          {/* 동적 컴포넌트 렌더 전용 영역 */}
          <div className="transition-all duration-300 normal-tabs-content">
            {activeTab === "report" && <ReportView />}
            {activeTab === "simulator" && <SimulatorView />}
            {activeTab === "roadmap" && <RoadmapView />}
            {activeTab === "financial" && <FinancialView />}
            {activeTab === "faq" && <FAQViewWrapper />}
          </div>
        </section>
      </main>

      {/* 우아한 풋터 */}
      <footer className="bg-blue-50 border-t border-blue-200 text-blue-800 py-12 mt-16" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-sm font-semibold text-blue-950 font-serif">청주공항 항공물류 정상화 기획 포털 및 마스터플랜 시뮬레이터</p>
          <p className="text-xs text-blue-700">이 포털은 충청북도의 제2항공화물 거점공항 육성 및 국토 균형 발전과 아시아 이커머스 수렴을 위해 항공조종사단 연대 주도로 제안 수립되었습니다.</p>
          <p className="text-[10px] text-blue-500 pt-4">© {new Date().getFullYear()} Skyking Air Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// FAQ 컴포넌트 래퍼 (아름답게 바인딩)
function FAQViewWrapper() {
  return <FaqView />;
}
