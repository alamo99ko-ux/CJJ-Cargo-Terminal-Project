export interface AircraftConfig {
  id: string;
  name: string;
  capacityTon: number; // 1회 적재량 (톤)
  maxCapacityTon: number; // 최대 적재량 (톤)
  dailyFlights: number; // 1일 운항 횟수 (왕복 1회 = 2회)
  annualDays: number; // 연간 운항일수
  baseGeneralRate: number; // 일반 화물 영업단가 (원/kg)
  baseFreshRate: number; // 신선 화물 영업단가 (원/kg)
  baseDgRate: number; // 위험물 특수화물 단가 (원/kg)
  annualHours: number; // 연간 운항시간
  fixedLease: number; // 연간 리스료 (억원)
  fixedLabor: number; // 연간 인건비 (억원)
  fixedAdmin: number; // 연간 일반운영비 (억원)
  hourlyVarCost: number; // 시간당 변동비 (만원, 연료비 제외)
  fuelConsPerHr: number; // 시간당 연료소모량 (kg/h)
  fuelPricePerKg: number; // 연료 kg당 가격 (원)
  crewsPerAircraft: number; // 대당 조종사 수 (명)
  captainsPerAircraft: number; // 대당 기장 수 (명)
  firstOfficersPerAircraft: number; // 대당 부기장 수 (명)
  groundStaffPerAircraft: number; // 대당 지상 전문인력 수 (명)
  avgYearlySalaryPilot: number; // 조종사 평균 연봉 (만원)
  avgYearlySalaryStaff: number; // 지상직 평균 연봉 (만원)
  avgPayloadTon: number; // 1편당 평균 화물 적재톤수 (톤)
  dailyFlightHours: number; // 기종별 하루 비행시간 (시간)
  hoursPerFlight: number; // 편당 비행시간 (시간)
  maintenanceCostPerCheck: number; // 2000시간 주기 당 1회 중정비 비용 (억원)
  generalMaintenanceCost: number; // 연간 대당 일반정비비 (억원)
  routeAirportFee: number; // 연간 대당 항로 및 공항사용료 (억원)
}

export const AIRCRAFT_DATA: AircraftConfig[] = [
  {
    id: "atr72",
    name: "ATR72-600F (소형 화물기)",
    capacityTon: 6,
    maxCapacityTon: 9,
    dailyFlights: 6,
    annualDays: 300,
    baseGeneralRate: 1400,
    baseFreshRate: 2500,
    baseDgRate: 4000,
    annualHours: 7200,
    fixedLease: 20,
    fixedLabor: 38.4,
    fixedAdmin: 5,
    hourlyVarCost: 10,
    fuelConsPerHr: 700,
    fuelPricePerKg: 1200,
    crewsPerAircraft: 24,
    captainsPerAircraft: 6,
    firstOfficersPerAircraft: 18,
    groundStaffPerAircraft: 24,
    avgYearlySalaryPilot: 11000,
    avgYearlySalaryStaff: 5500,
    avgPayloadTon: 6,
    dailyFlightHours: 24,
    hoursPerFlight: 2,
    maintenanceCostPerCheck: 2.0,
    generalMaintenanceCost: 1.0,
    routeAirportFee: 1.0,
  },
  {
    id: "b737",
    name: "B737-800F (중형 화물기)",
    capacityTon: 15,
    maxCapacityTon: 23,
    dailyFlights: 2,
    annualDays: 300,
    baseGeneralRate: 2200,
    baseFreshRate: 2500,
    baseDgRate: 4000,
    annualHours: 4800,
    fixedLease: 45,
    fixedLabor: 51.2,
    fixedAdmin: 10,
    hourlyVarCost: 15,
    fuelConsPerHr: 2500,
    fuelPricePerKg: 1000,
    crewsPerAircraft: 32,
    captainsPerAircraft: 8,
    firstOfficersPerAircraft: 24,
    groundStaffPerAircraft: 32,
    avgYearlySalaryPilot: 14000,
    avgYearlySalaryStaff: 6000,
    avgPayloadTon: 15,
    dailyFlightHours: 16,
    hoursPerFlight: 4,
    maintenanceCostPerCheck: 4.0,
    generalMaintenanceCost: 2.0,
    routeAirportFee: 2.0,
  },
  {
    id: "b777",
    name: "B777-200F (대형 화물기)",
    capacityTon: 80,
    maxCapacityTon: 100,
    dailyFlights: 1,
    annualDays: 300,
    baseGeneralRate: 2500,
    baseFreshRate: 2500,
    baseDgRate: 4000,
    annualHours: 4800,
    fixedLease: 100,
    fixedLabor: 64.0,
    fixedAdmin: 15,
    hourlyVarCost: 30,
    fuelConsPerHr: 6000,
    fuelPricePerKg: 1000,
    crewsPerAircraft: 40,
    captainsPerAircraft: 10,
    firstOfficersPerAircraft: 30,
    groundStaffPerAircraft: 40,
    avgYearlySalaryPilot: 18000,
    avgYearlySalaryStaff: 7000,
    avgPayloadTon: 80,
    dailyFlightHours: 16,
    hoursPerFlight: 8,
    maintenanceCostPerCheck: 8.0,
    generalMaintenanceCost: 4.0,
    routeAirportFee: 4.0,
  }
];

export interface ProposalContent {
  title: string;
  sections: {
    id: string;
    title: string;
    subsections?: {
      subtitle: string;
      paragraphs: string[];
    }[];
  }[];
}

export const PROPOSAL_TEXT = {
  title: "청주국제공항 항공물류 활성화 마스터플랜 및 사업 타당성 건의서",
  subtitle: "중부권 차세대 항공물류 다핵 허브 포지셔닝 및 민관학 협력 모델",
  author: "항공물류 및 운항 정책 전문가 그룹",
  summary: `본 보고서는 대한민국 국가균형발전의 핵심 인프라 자산인 청주국제공항(CJJ)의 항공물류 기능을 정상화하고, 이를 중부권의 지리적 강점을 극대화한 독자적인 항공화물 유치 거점(Regional Air Cargo Hub)으로 육성하기 위한 정책 및 비즈니스 마스터플랜을 담고 있습니다. 

최근 청주공항 활주로 연장(3,200m)에 약 1.5조 원의 국비 투입 법안이 논의되고 있으나, 조종사 및 화물기 전문가 관점에서 볼 때 화물기 활성화는 현존하는 2,743m 활주로만으로도 충분히 미주/유럽 노선까지 상업 가동이 가능합니다. 화물기는 여객기와 달리 만재 상태에서도 연료 탑재량을 조절하는 중간 급유 경유지 비행(앵커리지, 알마티 등)이 글로벌 표준이기 때문입니다. 

실질적인 보틀넥은 활주로가 아닌 세관·보세창고 등의 행정 인프라 미비와 화물 전용 운하 주체의 부재입니다. 이에 따라 충청북도와 민간자본이 공동으로 컨소시엄을 구성하고, 물류협회와 준공공 형태의 화물공사를 설립하여 소형 화물기(ATR72-600F)부터 대형 화물기(B777F)까지 단계적으로 기단을 확장해 나간다면, 인천공항의 과밀 물동량을 효과적으로 분산 수용하고 연간 8.7만 톤 이상의 물류 처리와 충북 미래 먹거리 산업의 물류비 70% 절감을 즉시 달성할 수 있습니다.`,
  
  coreLogics: [
    {
      title: "화물기 운항의 구조적 오해 해소 (현 활주로 2,743m로 즉시 가동 가능)",
      desc: "여객기는 미국/유럽까지 직항하기 위해 연료를 가득 채워야 하므로 3,200m 활주로가 필수적이나, 화물기는 연료를 절반만 채우고 화물을 만재한 채 이륙하여 중간 허브공항(알마티, 나보이, 앵커리지 등)에서 급유하는 전략을 상시 취합니다. 따라서 청주공항의 현재 활주로 2,743m(9,000피트)는 100톤급 대형 기종(B777F)까지도 완벽히 이착륙할 수 있는 충분한 규격입니다."
    },
    {
      title: "24시간 운영 공항 슬롯 및 소음 우려의 입증된 대안",
      desc: "청주공항은 국내에 몇 안 되는 공식 '24시간 무중단 운영 공항'입니다. 화물기는 여객기가 몰리지 않는 초저녁 및 심야, 이른 새벽 시간대를 표준 골든타임으로 활용하므로 주간 여객기/전투기 슬롯 간섭 문제를 자연스럽게 해결합니다. 또한 이륙 즉시 1,500ft까지 가파른 고각 상승 후 추력을 차등 감소시키는 소음 저감 이륙 절차(NADP)와 차음 구조물 보강, 특정 야간 비행코리더(Corridor) 설정 및 국토부 관제 인력 지원을 통해 공군 소음 및 야간 근무 우려를 기술적으로 타당하게 완충할 수 있습니다."
    },
    {
      title: "화물터미널 인프라 준비의 핵심 차별화",
      desc: "여객용 상공 검색 및 편의 검사는 전액 공항공사(국가)가 세팅하지만, 항공화물터미널은 철저히 전문 운영 및 투자 주체가 전용 수입 검색 장비(X-ray), 고성능 컨베이어, 보안 통제 시스템 및 냉장/의약품 콜드체인 시설(오송 바이오 배후 단지용)을 지자체와 민간 펀드가 주도하여 갖추고 준비해야 비로소 터미널 및 물류가 가동을 개시할 수 있습니다. 활주로가 아닌 기체 지입 펀드와 터미널 설비 시동을 위한 '300억 원 규모 펀드 및 거버넌스 주체'가 일의 '0순위'입니다."
    }
  ]
};
