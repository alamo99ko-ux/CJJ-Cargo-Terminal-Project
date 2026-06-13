import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Printer } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Q1. 항공사가 먼저 청주공항에 들어와야 물류 수요가 모이지 않겠습니까?",
    a: "항공 생태계를 잘못 이해한 전제입니다. 항공사는 비행기를 1시간만 띄워도 수백만 원의 연료비가 소모되는 철저한 수행자입니다. 물량이 확보되지 않고, 세관·보세창고 검증 검색 시스템이 설치되지 않은 공항에는 어떠한 민간 항공사도 리스 장비를 안고 먼저 진입하지는 않습니다. 지자체와 운영사가 먼저 보세창고 정비, 세관 준비, 신선제품 취급 설비 장비를 준비하면 항공사(Skyking Air)가 안심하고 들어옵니다."
  },
  {
    q: "Q2. 청주공항의 짧은 활주로(2,743m)로는 대형 화물기(B777F 등)의 미주/유럽 이륙이 성능상 불가능하지 않나요?",
    a: "전혀 그렇지 않습니다. 이륙에 필요한 활주로 거리를 결정하는 것은 총 무게 즉 '연료 무게'와 '화물 무게'의 합산입니다. 여객기는 미주까지 직항하기 위해 비행기에 막대한 15시간용 연료를 가득 채워 이륙하므로 긴 활주로가 필수적입니다. 반면 화물 전용기는 항공 선적 성능을 최적화하기 위해, 연료는 50%만 가볍게 탑재한 채 이륙하여 중간 거점 급유지 공항들(미주는 앵커리지 ANC, 유럽은 알마티 ALA / 나보이 NVI 등)을 경유하여 홉-앤-홉으로 운영하는 것이 전 세계 100년 넘는 표준 정석 운항입니다. 따라서 현 2,743m 활주로에서도 B777F 등 100톤급 광동체 대용량 항공기 이착륙 상업 가동은 당장이라도 제한없이 가동 가능합니다."
  },
  {
    q: "Q3. 청주공항 밤샘 가동에 조종사 피로 및 인근 주민 소음 피해 우려는 어떻게 무마합니까?",
    a: "화물 비행은 주간의 복잡한 여객/전투기 슬롯 혼잡을 피해 야간 심야(저녁 21시 ~ 새벽 6시) 시간대를 골든타임으로 활용합니다. 조종사 숙소 주변에 고성능 방음 및 차음벽 구조물을 조속히 증설 보완하고, 이륙 즉시 신속히 1,500피트 고도까지 도달한 뒤 추력을 차등 감쇄하는 공항 소음저감 이륙 절차(NADP) 기법을 인가한다면 소음 영향을 획기적으로 낮출 수 있습니다. 또한, 군 관제 본부의 야간 근무 및 병력 부담은 국토교통부 정규 관제 인력을 파견해 '민·군 합동 공동 야간 관제 체계'를 정립하면 충분히 완충 타결이 완료되었습니다."
  },
  {
    q: "Q4. 일반 여객기 설비는 국가(공항공사)가 다 세팅해 주는데, 화물 전용 시설도 조금 기다리면 공항공사가 투자해주지 않나요?",
    a: "그것이 정책적 병목의 근원입니다. 여객 수하물 카운터나 상공 검색대는 한국공항공사가 전액 투자 구비하는 수속입니다. 하지만 항공 화물 터미널은 철저히 다릅니다. 국가가 건물 외격 자체는 공여 대여하더라도, 그 안을 작동시킬 대형 관세 X-ray 화물 정밀 검색 장비, 컨베이어 지상 연생 화물 셔틀, 오송 산단을 위한 온도 제어용 냉장 저온창, 보세 보안 인프라는 실 운영 주체(임시 터미널 주식회사 및 지입 연대)가 투자 설계비를 감당해야 마스터 게이트가 가동을 개시하는 것이 법적 규정입니다. 300억원 대 SPC 공동 조성 펀드가 우선순위 1순위인 이유입니다."
  },
  {
    q: "Q5. 왜 충청북도지사 주도로 구성되는 공공성 ‘물류협회 지배 준공공 구조’가 유치에 절대적인가요?",
    a: "전국 각 지방 공항들이 '민간 자율'에 전적으로 맡겼던 항공화물 가동책은 100% 한계에 도달해 영구 폐업했습니다. 민간 항공사는 비행에 수반되는 유가 변동, 고율의 금융 리스크를 감당하지 못하여 적자 구간에서 즉시 도망치기 마련입니다. 공공 주도(물류협회 지분 51% 이상 지배력)를 확보하여 정책 영속성을 제공하고, 협회 내 SK 하이닉스 등 대기업 포워더가 고정 물량을 선구매 계약(Block Space 또는 최소매출보장 MRG)으로 채워주고, 운항 조종 전문사(Skyking Air)는 안전 비행 대행에만 전수 집중하는 삼각 준공공 분할 구조만이 한국형 생존의 유일한 해법입니다."
  },
  {
    q: "Q6. 항공사 Skyking Air의 운항 기종 영업이익률 및 원가 15% 영업이익 구조는 현실성 있나요?",
    a: "매우 안정적이고 우수한 비즈니스 연동책입니다. 화물 항공사는 항공 기재를 아웃소싱 형태로 포워더에게 위탁(지입)받아 ACMI(항공기·승무원·정비·보험 일괄 위탁) 형태로 비행 안전 통제만 전수 대행합니다. 즉, 운항사는 유가/환율 폭등 및 여객 시정 한계 변동 리스크를 짊어지지 않으므로, 충북도가 인가해 주는 정규 운항 원가의 약15% 마진만을 청구 받는 구조를 취해 운항사 경영 건전성을 상시로 최상 확보하게 됩니다."
  },
  {
    q: "Q7. 청주 정치장 장비 등록 및 조종사 유입으로 보전 가능한 세수 기여 성과는 어떻게 됩니까?",
    a: "화물기 대당 평균 연봉 1.5억원 대 조종사 14~20명 및 항공정비사, 운항관리사 및 직원 20여 명이 직접 고용 유발됩니다. 억대 전문 인력이 다수 포진되어 납입하는 갑종근로소득세만 대당 연간 수억원 안팎이 시 시세에 완벽히 환산 유입됩니다. 또한, 항공 자산의 '취적 정치장'을 인가를 통해 청주로 정식 등록하면 등록세 및 연간 부과되는 지방 재산세 부과로 항공기 수에 따라 매년 수십억 원 한도의 확고한 장기 세정 수입을 조창할 수 있어 충북도 조세 이득이 월등합니다."
  },
  {
    q: "Q8. 청주공항 내 위치한 군 탐색구조전대 헬기 부대를 서산이나 중원으로 이전한다는 제안의 타당성은?",
    a: "향후 청주공항의 주간 셔틀 슬롯이 완전히 포화되어 여객 정기편 확장이 물리적으로 차단될 때를 대비한 중장기 용지 확보 및 군사적 조율안입니다. 전투 대비 무장 작전과 직결되지 않는 평시 소방/탐색 위주 구조 헬기 전대 부지 및 계류장을 상대적으로 인근 내륙 비행장(서산 공군기지, 충주 중원기지)으로 정중히 부처 간 이전 제안하여 통합한다면, 청주공항 주간 여객/화물 이착륙 주간 슬롯을 하루 최대 30회 이상 추가로 기하급수적으로 창출해 내어 지역 산업 폭발 성장의 핵심 원동력이 됩니다."
  },
  {
    q: "Q9. 소형 터보프롭 기종인 ATR72-600F가 초기 1단계 기재로 추천되는 이유는?",
    a: "ATR72-600F는 화물9톤급(최대이륙 23톤급) 카고 하이브리드 전용기로서 제트유 소모량이 대형기의 1/5수준에 불과하며, 조류 충돌 리스크 및 단거리 활주로 이착륙 안전도가 지구상에서 가장 공인받은 항공기입니다. 이우, 상하이, 후쿠오카 취항 시 기동성 있는 회전율(1일 최대 6회 왕복 가능)을 제공해 정밀 이커머스 긴급 화물을 딜리버리 하는데 가동률을 극대화하여 적자 확률이 사실상 제로에 수렴하게 하는 최유리한 기종입니다."
  },
  {
    q: "Q10. 활주로 연장 특별법 추진이 우선이지, '터미널 선가동'이 왜 지름길입니까?",
    a: "국비 3조 원급 신규 토목 건설은 여야 대치 및 국가 예비타당성 면제, 착공 설계, 안전 실 검사 평가에 최소 10~15년이 걸리며 그사이 청주가 유치해야 할 아시아 이커머스(알리, 테무, 틱톡) 고부가 황금 물량 수송은 타 신공항(부산 가덕도, 대구 군위)으로 영구적으로 이탈해 버립니다. 반면 화물은 현 2,743m 활주로에서 즉시 운항 실적을 낼 수 있어, 매년 축적되는 수십만 톤 한도의 통계와 세수, 인구 창출 실증 데이터를 가지고 중앙 부처를 역 상륙 압박하여 활주로 확장 인가를 국가 계획에 획기적으로 일찍 선 반영시킬 수 있는 영리한 트랙레코드 비책입니다."
  },
  {
    q: "Q11. 현재 청주공항에서 처리되는 여객기 벨리카고(Belly Cargo) 화물 실적은 얼마나 됩니까?",
    a: "국토교통부 항공포털(Airportal) 및 국토교통부 보도자료 통계에 따르면, 현재 청주공항에서 여객기 하부 화물칸(Belly Cargo)을 통해 처리되는 연간 항공화물 처리량은 최근 약 15,000 ~ 18,000톤 수준(월평균 약 1,200 ~ 1,500톤)에 머물러 있습니다. 이 중 99% 이상이 제주 노선을 오가는 국내선 화물(주로 농수산물, 긴급 수하물, 특산품 등)입니다.\n\n국제선 벨리카고의 경우, 연간 약 160 ~ 200톤(월평균 겨우 13 ~ 17톤 내외)으로 극히 영세합니다. 대다수 국제선 여객기(B737, A320 계열 소형 LCC 위주)가 승객 캐리어 위주로만 하부 적재칸을 대부분 소모하는 데다, 저온 유통(Cold Chain)이나 정밀 제어 등 화물 처리 인프라 및 보세 시설이 청주공항에 준비되어 있지 않기 때문입니다. 따라서 화물칸 공간을 100% 항공 전용 팔레트로 채우는 Skyking Air 같은 '화물 전용기(Freighter)' 체계와 보세 설비 도입이야말로 청주공항 항공 경제 활성화의 정석이자 돌파구입니다."
  }
];

export default function FaqView() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4" id="faq-view-container">
      {/* 액션 헤더 */}
      <div className="bg-slate-50 px-6 py-4 border border-slate-200 flex flex-wrap gap-3 items-center justify-between no-print mb-1">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-slate-700" />
          <span className="font-bold text-slate-800 tracking-tight font-serif text-sm">청주공항 항공물류 활성화 핵심 11문 11답</span>
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
          id="btn-faq-print-pdf"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>PDF 출력</span>
        </button>
      </div>

      <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6 md:p-8" id="faq-section">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
        <HelpCircle className="h-5 w-5 text-slate-700" />
        <h3 className="font-bold text-slate-900 text-sm font-serif">충북도정 및 관계기관 설득을 위한 안보/정책 핵심 11문 11답</h3>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border transition-all rounded-none ${
                isOpen ? "border-slate-800 bg-slate-50/50" : "border-slate-200 bg-white"
              }`}
              id={`faq-item-${idx}`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-black text-slate-900 text-sm md:text-base cursor-pointer focus:outline-none font-serif"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-750 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[500px] opacity-100 border-t border-slate-200" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-4 text-slate-750 text-xs md:text-sm leading-relaxed text-justify whitespace-pre-line bg-white">
                  {faq.a}
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
