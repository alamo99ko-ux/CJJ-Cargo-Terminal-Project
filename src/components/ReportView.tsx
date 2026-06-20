import React, { useState } from "react";
import { FileText, Copy, Printer, Check, Download, AlertTriangle } from "lucide-react";
import { PROPOSAL_TEXT } from "../data";

export default function ReportView() {
  const [copied, setCopied] = useState(false);

  // 긴 보고서의 텍스트 본문 (클립보드 복사 전용 및 다운로드용)
  const reportFullText = `
수신: 국무조정실, 국토교통부, 충청북도, 청주시 귀하
발신: 청주공항 화물터미널 활성화 추진위원회, Skyking Air 전략기획팀

제목: 청주국제공항 항공물류 활성화를 통한 국가균형발전 및 중부권 물류기지화 마스터플랜

1. 제안 개요 (Executive Summary)
- 청주국제공항은 24시간 운영 승인을 받은 국가 중요 교통 자산이나, 현재 화물 기능이 마비 상태로 청주공항 화물터미널은 단순 사무실 임대용으로 전용되는 자가당착적 상태에 놓여 있습니다.
- 충청북도는 현재 1조 5,000억 원의 재정이 소요되는 '3,200m 신규 민간 활주로 연장안'에 집중하고 있으나, 이는 10~15년이 소요되는 장기 국가 과제입니다.
- 항공물류 전문가(30년 운항 경력 고승희 기장단)의 분석에 의하면, 화물기 가동은 현존하는 2,743m 활주로만으로도 미주/유럽 노선까지 상업 제약 없이 즉시 운항이 가능합니다.
- 물리적인 인프라 확충보다 선행되어야 할 것은 보세구역 지정, 세관 검역 상주 인력 확보, 관세청 협조 하의 화물터미널 작동 및 화물기 운항사 설립(Skyking Air)이며, 이는 약 300억 원 규모의 시방 투자 펀드 구성과 공공-민간 협력(SPC) 구조를 통해 실현될 수 있습니다.

2. 청주공항 화물터미널 현재 능력 및 충북 물류 수요 분석
가. 화물터미널 현재 처리 능력
- 현재 청주공항의 물리적 화물터미널 최대 처리 역량은 '연간 3.8만 톤(38,000톤)' 구조로 승인되어 있으며, 이는 소형 터보프롭 화물기(ATR72-600F) 2대 및 중형 화물기(B737-800BCF) 1~2대를 수용하는 적정 스용 역량입니다.
- **향후 년간 16만톤 처리능력 목표**를 수립하여 중부권 및 전국 고부가 항공 화물 수요를 신속하고 안정적으로 수용하고자 합니다.
나. 충북 지역 수출입 잠재 수요
- 충청북도 및 중부 배후권(오송 바이오, SK 하이닉스 중심의 청주/오창 반도체·전자 디스플레이, 진천·음성 첨단 화학부품 신소재 벨트)의 연간 항공 화물 발생 유발액은 연간 308억 달러(1달러 1,500원 기준 한화 약 46조 2,000억 원 / KRW)에 달합니다. 중량 기준으로는 연간 9.4만 톤에 육박하며, 수도권 및 남부권 일부 고부가 긴급 화물 배후 수용 시 최대 16만 톤 이상의 항공 수출입 수요를 수렴할 수 있을 것으로 전망됩니다.

3. 화물기 운항 활성화의 당위성 및 기술적 오해 해소
가. 대형 화물기 운항과 활주로 거리에 관한 기술 분석
- 여객기는 장거리 미주/유럽 노선 직항 시 막대한 승객 중량과 함께 10시간 이상 비행을 위한 연료를 가득(Full Fuel) 채워야 하므로 평탄하고 긴 3,200m 활주로가 이륙 안전성 확보를 위해 절대적으로 필요합니다.
- 반면, 화물기 비행은 다릅니다. '연료 소모율 및 탑재 적재 효율'을 높이기 위해, 급유는 중간 거점 기착지 공항(미주 노선은 앵커리지 ANC, 유럽 노선은 알마티 ALA, 나보이 NVI, 타슈켄트 TAS 등)을 경유하여 홉-앤-홉(Hop-and-Hop) 방식으로 급유하는 것이 글로벌 항공 물류 운송사의 100년 넘는 표준 정석입니다.
- 따라서, 화물 중량을 만재하더라도 연료 탑재량을 40~50% 수준으로 소폭 가볍게 변경 탑재하여 2,743m 활주로 내에서 충분히 안전 이륙 성능(Climb Gradient)을 확보하여 출발할 수 있으며, 이로써 100톤급 보잉 777F 등 대형 광동체 화물기도 현 청주공항 활주로에서 전면 가동 가능합니다.
나. 24시간 실질 운영 자산 활용과 공군 슬롯 확보의 현실 대안
- 청주공항은 법적으로 24시간 가동되는 내륙 유일의 국제공항입니다. 야간 통행 금지 시간(Curfew) 제약을 받지 않고, 여객기가 몰리는 일과 주간 시간대 외인 저녁 21:00부터 익일 06:00까지 심야/새벽 슬롯을 집중적으로 가동하여 영토 소음에서 상대적으로 영향이 덜합니다.
- 소음 완화를 위해 저소음 이륙 기법(NADP 1/2)을 수립하여 공군 조종사 및 기지 안정성을 담보하며, 지자체 차원에서 탐색구조전대 헬기 부대 등 일부 조율 가능한 공군 군사 부지를 부수적인 서산 혹은 중원 공항으로 이전함으로써 슬롯 문제를 극도로 완만하게 해결 가능합니다.
다. 여객 터미널과 화물 터미널의 국가지원 및 기획의 근본적 차이
- 여객터미널의 수하물 컨베이어, 마샬링 야드, 상공 보안 검색용 X-ray, 무인 출입 통제 등은 공항공사(국가)가 전액 투자하여 설치합니다.
- 항공화물터미널은 국가가 건물 공벽 껍데기만 소극적으로 제공할 뿐, 컨베이어 정렬 시스템, 특수 위험물(DG) 전용 보안 격벽, 콜드체인 정온/냉장 보관시설, X-ray 탑재 정밀 검색 기기, 지상 조업 GSE 장비는 운영 전문 주체(청주공항 화물터미널 주식회사)가 직접 설계 조달하고 투자비를 감당해야 마스터 가동이 개시될 수 있습니다.

4. 청주공항 항공물류 추진 지배구조 및 민관학 협력 거버넌스(SPC)
- 한 행 항공사 단독의 리스크를 피하고 충북도와 금융권, 화주 대기업과의 공공 가치 연계를 위한 준공공기관 가치의 '충북형 항공물류 협의체' 구성을 제안합니다.
- 지배 구조 설계:
  ├── [주주/의사결정 주체]: 충북물류협회 (지분 51% 이상, 공적 컨트롤 타워 및 수혜 화주 주인의식 동시 부여)
  └── [산하 자회사 자산]: 
      ├── 화물터미널 운영사 (물류협회 100% 자회사)
      └── 항공사 법인: Skyking Air (물류협회 지분 위탁 자회사)
- 지자체와 공공기관(충북도, 청주시, 공항공사 등)은 황금주 소유 또는 거버넌스 이사회 참여를 통해 예산 연도별 PSO 및 인프라 부지 무상/장기 감면 대도적 융합을 추진합니다.

5. 단계적 기단(Fleet) 및 노선 확장 로드맵
- Phase A (초기 1~2년): ATR72-600F 2대 가동. (한중일 단거리 고빈도 셔틀 - 청주~이우, 오사카, 후쿠오카, 칭다오 중심. 연 1.1만 톤 소화)
- Phase B (확장 3~4년): B737-800BCF 2대 가동 추가. (중거리 중정비 고부가 긴급 화물 수렴 - 홍콩, 대만, 광저우, 하노이. 연 4만 톤 부근 확보)
- Phase C (완성 5년차 이후): B777F 2대 가동 추가. (중간 급유지 경유 미국 앵커리지/로스앤젤레스, 알마티 경유 프랑크푸르트 노선 확장. 연 10만 톤 이상 소화)

6. 일자리 및 도정 세수유발 성과 추정
가. 조종사 및 전문 항공직 일자리 창출:
- 화물기는 여객승무원(Cabin Crew)이 없으나 기장/부기장 등 전문 크루 수가 대당 조종사 소형기 14명 ~ 대형기 20명이 소요됩니다.
- 지상 정비, 운항관리, 화물 탑재 로딩마스터 등 직접 일자리는 기대당 평균 15~25명이 가배정됩니다.
- 특히 **Skyking Air는 부기장을 2배수로 채용(Double-Crewing)**하여 집중 훈련 및 경력을 쌓게 한 뒤, **비행시간 1,000시간을 충족하면 국내외 대형 항공사(FSC/LCC)로 자연스럽게 취업/전입을 연계시키는 '항공 경력 축적의 창구'** 역할을 담당합니다. 이는 국가적인 차원의 청년 일자리 대난을 해방하는 일자리 기여 책이며, 지역 전문 인프라 인구 유입과 자립 세수 확보에도 크게 이바지합니다.
- 5년 내 합산 기단 확보 및 터미널 상주 일자리, 보세창고 특송 포워더 GDC 상근직 정착 유치 시 약 400~500명의 신규 고연봉 고급 일자리 창출을 현장에 각인시키며 청년 인구 유입을 가속화합니다.
나. 도정 세수 기여도 추정 (10대 기단 상업가동 정착 환산 요율):
- 고소득 조종사 및 항공 지상 전문직 연봉 가중치 산출 시, 월 기본 소득세 배정으로 연간 약 35억~48억 원이 시세로 지방 수입 환산.
- 영업이익률 약 15%~30%의 운항 가동 보정형 민관지입 비즈니스 모델 안정 시, 항공사가 납부하는 법인세는 세법 기준 연평균 약 35억~110억 원으로 충북도 지방세 재정에 지대한 확보 명분을 달성.
- 항공기 정치장(Home Port) 청주 등록에 취득 지방세 및 재산세가 연간 추가로 시정 수입에 확고히 영구 존속.

7. 긴급 정책 업무진행순서
① 1단계: 공동투자 컨소시엄 구성 및 충북형 항공물류펀드(약 300억 규모) 시드 기획
② 2단계: 현지 화물업체(수출입 화주·포워더) 중심 물류협회 발기인단 창립
③ 3단계: 화물터미널 운영 주체(임시 터미널 주식회사) 설립 및 필수 세관 검색 장비 컨베이어 도입 준비
④ 4단계: 화물기 운항사(Skyking Air)의 설립 및 국사/외교적 항공 면허(AOC) 취득 
⑤ 5단계: 청주공항 내 화물터미널 증설 및 복합 물류 단지(Cargo Complex) 배후 에어로폴리스 지구 입주 연계 
⑥ 6단계: 중장기 정량 실적이 축적된 후 활주로 연장(3,200m) 국가 예산 승인 득세 (실제 데이터를 통한 명분 압박)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportFullText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([reportFullText.trim()], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "청주국제공항_항공물류_활성화_마스터플랜_보고서.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-none shadow-sm border border-slate-200 overflow-hidden" id="report-view-container">
      {/* 액션 헤더 */}
      <div className="bg-slate-50 print:bg-white px-6 py-4 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-700" />
          <span className="font-bold text-slate-800 tracking-tight font-serif text-sm">공식 정책 건의서 (DOC 한글/워드 원본 서식)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold cursor-pointer transition-colors bg-slate-100 hover:bg-slate-200 text-slate-850 border border-slate-200"
            id="btn-copy-clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-700">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>전체 복사 (Ctrl+C)</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if ((window as any).runPrintMode) {
                (window as any).runPrintMode("tab");
              } else {
                window.print();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold cursor-pointer transition-colors bg-orange-400 hover:bg-orange-500 text-white shadow-sm"
            id="btn-print-pdf"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>PDF 출력</span>
          </button>
        </div>
      </div>

      {/* 실물 편철 서식 스타일의 뷰어 */}
      <div className="p-4 md:p-12 bg-white flex justify-center">
        <div className="bg-white w-full max-w-3xl shadow-md border border-slate-350 p-6 md:p-14 font-sans text-slate-900 leading-relaxed text-sm relative" id="styled-paper">
          {/* 내부 로고형 워터마크 효과 */}
          <div className="absolute top-8 right-8 text-slate-400 border border-slate-400 px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
            CJJ CARGO HUB
          </div>

          {/* 수신인 주소 */}
          <div className="border-b border-slate-900 pb-6 mb-8">
            <table className="w-full text-slate-700 text-xs">
              <tbody>
                <tr>
                  <td className="w-16 font-bold py-1 text-slate-900">수신:</td>
                  <td>국무조정실, 국토교통부, 충청북도, 청주시</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 text-slate-900">참조:</td>
                  <td>한국공항공사</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 text-slate-900">발신:</td>
                  <td>청주공항 화물터미널 활성화 추진위원회, Skyking Air 전략기획팀</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 text-slate-900">날짜:</td>
                  <td>{new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 대제목 */}
          <h1 className="text-xl md:text-2xl font-black text-slate-950 font-serif leading-snug text-center mb-8 border-b-2 border-slate-800 pb-4">
            청주국제공항 항공물류 활성화를 위한 마스터플랜 및 <br/> 사업 타당성 정책 건의서
          </h1>

          {/* 본문 단락 */}
          <div className="space-y-6 text-slate-800 text-justify">
            <div className="bg-slate-50 print:bg-white border-l-4 border-blue-600 p-4 mb-6">
              <p className="font-bold text-slate-950 mb-1 flex items-center gap-1.5 font-serif text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                전문가 오피니언 고승희 기장 (30년 운항 경력 조종사):
              </p>
              <p className="text-sm text-slate-900 leading-relaxed">
                “현재 청주공항은 약 1.5조 원의 막대한 국비를 투입해 3,200m 신설 활주로를 연장하고자 법안을 제정하고 있으며, <strong>또한, 현재 청주공항 2,743m 활주로도 즉시 화물운항이 가능</strong>합니다. <strong>화물기는 연료를 가득 탑재하지 않은 전략적 경유 비행(앵커리지, 알마티)이 정석이므로 기존 2,743m 활주로에서 80~100톤급 대형 기종(B777F)도 아무런 성능 한계 없이 즉각 상업 비행이 가능합니다.</strong> 또한 신설 활주로 추진과 더불어, 당장의 핵심 과제인 <strong>화물터미널 장비 확보를 조기에 추진</strong>하여, 300억 대 설비비 투입을 통한 실질적 화물터미널 리모델링 및 상시 통관 지배구조의 조속한 작동이 요구됩니다.”
              </p>
            </div>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅰ. 청주공항 인프라 분석 및 당위성
            </h2>
            <p>
              청주국제공항은 지리적으로 국토의 중심에 위치하여 수도권 남부와 충청, 영호남 전반의 첨단 배후 물류를 관장할 천혜의 물리적 연접 요충입니다. 그럼에도 불구하고 대한민국 항공 화물의 무려 99% 이상이 인천국제공항에 고도로 집중되어 있어, 국가적 비상사태(기상 악화, 전쟁 위협, 허브 가동 마비 등)에 대처할 대체 물류 축이 전무한 상태입니다.
            </p>
            <p>
              중부권 주요 전략 클러스터(오송 제약바이오, SK 하이닉스 반도체, 진천·음성 이차전지, 디스플레이 및 첨단 전자 정밀 소재 산단)에서 생산되는 고도로 시간 민감하고 비체적 단가가 육강한 항공 적합 화물들은 청주공항 화물터미널이 미작동함에 따라, 심야에 일명 '트럭킹(Trucking)' 화물 트레일러로 매일 인천공항까지 기나긴 육상 운송을 수행하고 있습니다. 이로 인한 충북 내 기업들의 글로벌 납기 리드타임 지연 및 과다한 탄소 중량 연쇄 물류비 가중은 우리 산업의 근본적 이익률을 저해하고 있습니다.
            </p>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅱ. 청주공항 화물터미널 현재 능력 및 충북 물류 유치 잠재력
            </h2>
            <p className="my-3 text-slate-800 text-justify">
              충청북도 및 중부 배후권(오송 바이오, SK 하이닉스 반도체, 청주/오창 IT 및 첨단 소재 산단 벨트)에서 발생하는 연간 항공 화물유발 잠재액은 <strong>연간 약 308억 달러</strong>에 이르며, 이를 1달러당 1,500원으로 정산 시 <strong>한화 약 46조 2,000억 원(KRW)</strong>에 달하는 막대한 가치를 지니고 있습니다. 이는 독자적인 수·출입 화물터미널을 조속히 가동해야 할 강력한 재정적 명분입니다.
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-xs border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 print:bg-white text-slate-800">
                    <th className="border border-slate-300 p-2 text-left">구분</th>
                    <th className="border border-slate-300 p-2 text-center">청주국제공항 현황</th>
                    <th className="border border-slate-300 p-2 text-center">인천국제공항 현황</th>
                    <th className="border border-slate-300 p-2 text-left">분석 및 정상화 명분</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold bg-slate-50 print:bg-white">활주로 길이</td>
                    <td className="border border-slate-300 p-2 text-center font-bold text-rose-700 font-mono">2,743m <br/> (9,000 ft)</td>
                    <td className="border border-slate-300 p-2 text-center font-mono">3,750m ~ 4,000m</td>
                    <td className="border border-slate-300 p-2">화물 중량 탑재 후 연료는 중간 급유지 경유(앵커리지, 알마티) 기준 45%만 실으므로 2,743m 활주로에서 즉시 상용 대형 화물기 운전 완전 가능.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold bg-slate-50 print:bg-white">화물터미널 규모</td>
                    <td className="border border-slate-300 p-2 text-center font-bold text-rose-700 font-mono">2,257 ㎡</td>
                    <td className="border border-slate-300 p-2 text-center font-mono">1,219,896 ㎡</td>
                    <td className="border border-slate-300 p-2">현재 화물터미널 처리 역량은 <strong>연간 약 38,000톤</strong>으로 초기 거점 육성 기가에는 완전히 차고 넘치는 여력.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold bg-slate-50 print:bg-white font-serif">처리 목표 역량</td>
                    <td className="border border-slate-300 p-2 text-center font-bold text-blue-700 font-mono">연간 16만톤 목표</td>
                    <td className="border border-slate-300 p-2 text-center font-mono">약 272만톤 <br/> (가용 실적)</td>
                    <td className="border border-slate-300 p-2">인근 핵심 반도체/바이오 수출입 화물 수송 및 수도권 배후 유치 시, <strong>향후 연간 16만톤 처리능력 목표</strong> 달성이 무리 없이 가능함.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold bg-slate-50 print:bg-white">야간 통행(Curfew)</td>
                    <td className="border border-slate-300 p-2 text-center text-green-700 font-bold">제한 없음<br/> (24시간 가능)</td>
                    <td className="border border-slate-300 p-2 text-center">제한 없음<br/> (24시간 가능)</td>
                    <td className="border border-slate-300 p-2"> 초저녁과 새벽시간대 화물슬롯 활용이 가능하며, 전투기여객기 슬럿시간과 충돌이 없이 운영가능함</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              한국은행 충북본부조사자료에 분석된 구조적 명분에 의하면, 인천공항 화물 처리량 중 단순 출도착 O&D(Origin & Destination: 기점 및 종점) 화물량(약 1,830,000톤)의 1~3%만 청주로 선제 유입 조율하여 유치하여도 <strong>연간 18,000톤에서 최대 55,000톤 규모(일일 50~150톤)</strong>로 청주공항 자체 항공화물이 즉시 점프할 수 있으며, 인근 배후권을 모두 장악하여 통합 브릿지하면 <strong>16만톤 달성</strong>의 물류 흐름이 정량 시나리오로 입증됩니다.
            </p>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅲ. 시설 운영 주체의 기획/비용 부담의 근본적 차별
            </h2>
            <p className="leading-relaxed">
              여객기는 여객터미널 시설(공항 검색 장비, 컨베이어, 체크인 카운터 존 등) 일체를 국가 즉 공항공사가 직접 구비하는 것이 절차입니다. 그러나 <strong className="text-xl block py-3">※ 여객터미널과 다르게 화물터미널은 운영자(사용자)가 검색장비, 콜드체인 등을 직접 준비해야합니다.</strong>
            </p>
            <p>
              이 때문에 화물기 도입 의지만을 앞세우는 여타 지방 공항들은 인프라 준비 단계에서 좌절하는 사례가 빈번했습니다. 충청북도 주도의 300억 원 상당 공공-민간 혼합 항공물류 SPC 펀드를 설계하고 공동 투자하여 시설의 '시동 동력'을 확보하는 마스터 플랜을 0순위 과제로 상정하는 이유가 여기에 있습니다.
            </p>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅳ. 긴급 정책 업무진행순서 (지정 로드맵)
            </h2>
            <p>
              물류의 흐름은 정책이 먼저 인프라 판을 깔아 물량을 약정 보증해야 비행기가 안심하고 진입을 개시하는 역학 구조입니다. 이에 따른 실무 액션 플랜의 전력적 순서는 다음과 같이 입안됩니다:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-800">
              <li>
                <strong>투자 투자자 컨소시엄 및 충북 항공물류 펀드(300억 원 규모) 설계 완료:</strong> 충북도 예산 출금 50억 + 금융기관 및 공공·민간 모태 펀드 200억 + 배후 물류 대기업 컨소시엄 지분 참여 50억 구성.
              </li>
              <li>
                <strong>화물 대기업 및 포워더 중심의 '충북 물류협회' 설립:</strong> 고정 앵커 화주 물량을 확보하여 빈 항공기 예기치 못한 비행 리스크 보완 명분 구축.
              </li>
              <li>
                <strong>화물터미널 정상화 설비 설비 세팅:</strong> 건물 내 임시 사무실 철수 통보 후 대형 적외선 통관 화물 검색기, 마샬링 자동 분류 장비, 냉장 수·출입 화물창 보강 완료.
              </li>
              <li>
                <strong>화물기 운항사(Skyking Air) 설립:</strong> 지입/소유 형태의 항공기 리스 위탁을 진행하고 국토부 항공운항증명(AOC) 및 화물 비행 승인 가동.
              </li>
              <li>
                <strong>청주국제공항 내 정식 항공물류 복합 센터(Cargo Complex) 증설 추진:</strong> 에어로폴리스 3지구 자유무역지대 고도화 연계.
              </li>
              <li>
                <strong>정량 실적이 입증된 후, 활주로 3,200m 연장 정식 특별법 국비 투입 법제화:</strong> 국가에 확실한 경제 타당성 숫자를 제시하여 확실한 지원 유도.
              </li>
            </ol>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅴ. 부기장 일자리 창출 정책 훈련 혁신안 및 지역 경제 성과
            </h2>
            <p>
              <strong>Skyking Air</strong>는 단순히 화물을 나르는 항공 운송책에 멈추지 않고, 국가적 항공 인프라의 청년 기용 교두보가 될 것입니다. 본 계획안의 핵심은 <strong>부기장을 일반 항공사 대비 2배수로 고용(Double-Crewing)</strong>하여 이들에게 지속적이고 검증된 운항 훈련과 비행 경력을 전수하는 데 있습니다.
            </p>
            <p>
              이렇게 훈련된 신인 조종사들이 실무에서 <strong>비행시간 1,000시간</strong> 이상을 달성하게 되면 국내 대형 메이저 항공사(FSC) 및 우수 저비용항공사(LCC)로 무리 없이 전입하여 차세대 기장단으로 성장할 수 있도록 돋우어 주는 <strong>‘국가 항공 리크루팅 및 경력 축적의 창구’</strong> 역할을 주도합니다. 
            </p>
            <p>
              이 독창적인 선순환 고용 시스템은 국가적인 차원에서 <strong>청년 고급 일자리 창출</strong>에 획기적으로 기여하는 동시에, 충북 산하 시정 및 배후 도시로의 <strong>전문직 인구 유입</strong>을 유도하고, 이들의 풍부한 소비 지출과 가중 소득세 납부에 힘입어 충청북도 자체의 <strong>지방 세수 확보</strong>에도 막대하고 실효적인 기둥을 제공하게 될 것입니다.
            </p>

            <h2 className="text-base font-bold text-slate-950 border-b border-slate-300 pb-1 pt-4 font-serif">
              Ⅵ. 마스터 결론
            </h2>
            <p className="font-sans font-extrabold text-slate-950 text-center py-5 px-6 bg-blue-50/50 print:bg-white rounded-sm border-2 border-blue-300 text-base md:text-lg leading-relaxed shadow-sm">
              “청주국제공항 항공물류의 미래는 신설 활주로의 중장기적 추진과 화물터미널의 즉각적인 개방 가동을 상호 보완적으로 결합함에 있으며, 지자체가 보증하고 전문 운항사와 화주 포워더가 삼각 협치하는 준공공 거버넌스(SPC) 수립에 있습니다.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
