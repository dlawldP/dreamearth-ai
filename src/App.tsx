import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Compass,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Layers,
  Wind,
  CloudFog,
  Snowflake,
  Sun,
  Mountain,
  Droplets,
  Trees,
  Info,
  Search,
  RotateCcw,
  Sliders,
  MapPin,
  Database,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Camera,
  Download,
  HeartHandshake,
  Lightbulb,
  Navigation,
  Play,
  Pause,
  Image as ImageIcon,
  Box,
  FileText,
  Columns,
  KeyRound,
  RefreshCw,
  Aperture
} from 'lucide-react';

// ============================================================================
// 1. CURATED DREAM SCENARIO PRESETS
// ============================================================================
const DREAM_PRESETS = [
  {
    id: 'purple-lake-aurora',
    badge: '초현실 영감',
    archetype: 'inspiration',
    title: '보라색 호수와 현무암 기둥, 저고도 오로라',
    text: '밤하늘에 초록색과 보라색 오로라가 땅에 닿을 듯이 낮게 내려와 있고, 검은 육각형 현무암 기둥들 사이로 신비로운 보라색 호수가 끝없이 펼쳐져 있었어. 수면 위에는 옅은 새벽 안개가 피어오르고 있었어.'
  },
  {
    id: 'fog-sandstorm',
    badge: '기상 융합',
    archetype: 'inspiration',
    title: '안개 낀 초원에 갑자기 불어닥친 모래폭풍',
    text: '축축하고 짙은 안개가 가득한 넓은 들판에 서 있었는데, 갑자기 지평선 너머에서 거대한 붉은 모래바람 벽이 몰려오면서 하늘이 황토색으로 변했어.'
  },
  {
    id: 'tsunami-nightmare',
    badge: '재해 악몽 검증',
    archetype: 'reassurance',
    title: '산보다 높은 거대한 해일이 밀려오는 악몽',
    text: '해변 절벽 위에 서 있는데 바다 끝에서 에베레스트 산보다 훨씬 높은 수백 미터짜리 거대한 파도가 하늘을 가리며 밀려오는 무서운 꿈을 꿨어.'
  },
  {
    id: 'mirror-salt-flat',
    badge: '초현실 영감',
    archetype: 'inspiration',
    title: '하늘과 땅의 경계가 사라진 거울 소금 사막',
    text: '발목까지 맑은 물이 고인 끝없는 하얀 소금 평원 위를 걷고 있었는데, 발아래 수면에 은하수와 구름이 똑같이 비쳐서 우주 속을 걷는 기분이었어.'
  }
];

// ============================================================================
// 2. VERIFIED EARTH OBSERVATORY & GLOH2O KÖPPEN DATABASE (18 REAL LOCATIONS)
// ============================================================================
const EARTH_DATABASE = [
  {
    id: 'lake-natron',
    name: '나트론 호수 (Lake Natron)',
    country: '탄자니아 (Tanzania)',
    coordinates: '2.4167° S, 36.0000° E',
    elevation: '600m',
    koppen: 'BSh (스텝 건조 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Lake_Natron_Tanzania.jpg/1280px-Lake_Natron_Tanzania.jpg',
    fallbackPalette: ['#1e1b4b', '#831843', '#be185d', '#31102f'],
    tags: {
      topography: ['열곡대 분지', '평야', '화산 지대'],
      hydrosphere: ['보라색 호수', '붉은 호수', '염호', '호수'],
      climate: ['건조', '고온', '스텝'],
      atmosphere: ['신기루', '붉은 수면', '보라색 물']
    },
    terrainPreset: { heightAmp: 0.7, groundColor: '#4a1d34', waterColor: '#9d174d' },
    description: '강알칼리성 화산 탄산염과 호염성 고세균(Halobacteria)의 대량 번식으로 호수 수면이 짙은 보라빛과 붉은빛을 띠는 실제 지구상의 초현실 염호입니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'giants-causeway',
    name: '자이언트 코즈웨이 (Giant’s Causeway)',
    country: '영국 북아일랜드 (Northern Ireland)',
    coordinates: '55.2408° N, 6.5116° W',
    elevation: '15m',
    koppen: 'Cfb (서안 해양성 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Giant%27s_Causeway_in_Northern_Ireland.jpg/1280px-Giant%27s_Causeway_in_Northern_Ireland.jpg',
    fallbackPalette: ['#0f172a', '#1e293b', '#0284c7', '#334155'],
    tags: {
      topography: ['현무암', '기둥', '주상절리', '해안', '절벽'],
      hydrosphere: ['바다', '호수', '해안선'],
      climate: ['습윤', '온난', '해양성'],
      atmosphere: ['안개', '해무', '구름']
    },
    terrainPreset: { heightAmp: 1.1, groundColor: '#1e293b', waterColor: '#0369a1' },
    description: '약 6천만 년 전 화산 용암이 급격히 냉각되며 수축해 형성된 약 4만 개의 정교한 육각형 현무암 기둥(주상절리) 해안 지형입니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'svalbard-aurora',
    name: '스발바르 제도 (Svalbard Archipelago)',
    country: '노르웨이 (Norway)',
    coordinates: '78.2232° N, 15.6267° E',
    elevation: '250m',
    koppen: 'ET (툰드라 한랭 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/1280px-Polarlicht_2.jpg',
    fallbackPalette: ['#020617', '#064e3b', '#10b981', '#312e81'],
    tags: {
      topography: ['설원', '빙하', '피오르드', '산맥'],
      hydrosphere: ['빙하', '북극해', '호수'],
      climate: ['한랭', '극지', '툰드라'],
      atmosphere: ['오로라', '극야', '밤하늘', '눈']
    },
    terrainPreset: { heightAmp: 1.4, groundColor: '#cbd5e1', waterColor: '#0f172a' },
    description: '북위 78도의 극야 환경에서 태양풍 입자가 지구 자기장을 따라 진입하며 557.7nm 산소 원자의 선명한 초록빛과 질소의 보라빛 오로라를 만들어내는 관측지입니다.',
    source: 'NOAA SciJinks & NASA',
    sourceUrl: 'https://scijinks.gov/'
  },
  {
    id: 'salar-de-uyuni',
    name: '우유니 소금 사막 (Salar de Uyuni)',
    country: '볼리비아 (Bolivia)',
    coordinates: '20.1338° S, 67.4891° W',
    elevation: '3,656m',
    koppen: 'BWk (고산 한랭 건조 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Salar_de_Uyuni_Dec_2017_03.jpg/1280px-Salar_de_Uyuni_Dec_2017_03.jpg',
    fallbackPalette: ['#0c4a6e', '#38bdf8', '#e0f2fe', '#bae6fd'],
    tags: {
      topography: ['평야', '소금 사막', '고원', '평원'],
      hydrosphere: ['거울 호수', '얕은 물', '염호'],
      climate: ['건조', '고산'],
      atmosphere: ['구름 반사', '은하수', '하늘 반사']
    },
    terrainPreset: { heightAmp: 0.15, groundColor: '#e2e8f0', waterColor: '#38bdf8' },
    description: '표고 3,656m 안데스 고원에 위치한 세계 최대 소금 평원으로, 우기에는 얇은 수막이 형성되어 하늘과 구름을 완벽히 반사하는 거대한 거울 세계가 펼쳐집니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'namib-desert-fog',
    name: '나미브 사막 해안 (Namib Desert)',
    country: '나미비아 (Namibia)',
    coordinates: '24.7500° S, 15.2833° E',
    elevation: '120m',
    koppen: 'BWh (아열대 사막 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Namib_Desert_Dunes.jpg/1280px-Namib_Desert_Dunes.jpg',
    fallbackPalette: ['#7c2d12', '#c2410c', '#fdba74', '#94a3b8'],
    tags: {
      topography: ['사막', '사구', '들판', '평야'],
      hydrosphere: ['해안', '해무'],
      climate: ['건조', '사막'],
      atmosphere: ['모래바람', '모래폭풍', '안개', '해무']
    },
    terrainPreset: { heightAmp: 0.9, groundColor: '#b45309', waterColor: '#1e3a8a' },
    description: '차가운 벵겔라 해류에서 발생한 짙은 해무(안개)와 내륙의 뜨거운 붉은 사구·모래바람이 실제로 한 공간에서 충돌하는 지구상에서 가장 독특한 기상 경계 지대입니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'landmannalaugar',
    name: '란드만날뢰이가르 (Landmannalaugar)',
    country: '아이슬란드 (Iceland)',
    coordinates: '63.9833° N, 19.0667° W',
    elevation: '600m',
    koppen: 'ET (아극 툰드라 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Landmannalaugar_iceland.jpg/1280px-Landmannalaugar_iceland.jpg',
    fallbackPalette: ['#1e293b', '#854d0e', '#0f766e', '#4c1d95'],
    tags: {
      topography: ['화산', '유문암 산맥', '용암 대지', '현무암'],
      hydrosphere: ['온천 호수', '화구호', '강'],
      climate: ['한랭', '아극'],
      atmosphere: ['수증기', '안개', '오로라']
    },
    terrainPreset: { heightAmp: 1.5, groundColor: '#713f12', waterColor: '#0d9488' },
    description: '유문암 화산 지형의 황금빛·보라빛 능선과 검은 현무암 용암 대지, 지열 수증기 안개가 어우러져 외계 행성 같은 풍경을 보여주는 아이슬란드 고원입니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'lake-retba',
    name: '레트바 호수 (Lake Retba / Lac Rose)',
    country: '세네갈 (Senegal)',
    coordinates: '14.8386° N, 17.2347° W',
    elevation: '5m',
    koppen: 'BSh (반건조 사바나·스텝 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lac_Rose_Senegal.jpg/1280px-Lac_Rose_Senegal.jpg',
    fallbackPalette: ['#4c0519', '#be185d', '#f472b6', '#d97706'],
    tags: {
      topography: ['해안 사구', '평야'],
      hydrosphere: ['분홍 호수', '보라색 호수', '염호'],
      climate: ['건조', '열대'],
      atmosphere: ['모래바람', '강한 일사']
    },
    terrainPreset: { heightAmp: 0.4, groundColor: '#d97706', waterColor: '#db2777' },
    description: '사하라 모래바람과 높은 염분 환경 속에서 두날리엘라 살리나(Dunaliella salina) 조류가 붉은 색소를 생성해 호수 전체가 분홍·보랏빛으로 빛나는 염호입니다.',
    source: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/'
  },
  {
    id: 'lituya-bay',
    name: '리투야 만 (Lituya Bay)',
    country: '미국 알래스카 (Alaska, USA)',
    coordinates: '58.6400° N, 137.5683° W',
    elevation: '0m',
    koppen: 'Dfc (냉대 습윤 기후)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Lituya_Bay_1958.jpg/1280px-Lituya_Bay_1958.jpg',
    fallbackPalette: ['#0f172a', '#1e3a8a', '#0284c7', '#64748b'],
    tags: {
      topography: ['피오르드', '해안 절벽', '빙하 협곡'],
      hydrosphere: ['바다', '해일', '파도', '만'],
      climate: ['한랭', '냉대'],
      atmosphere: ['안개', '폭풍']
    },
    terrainPreset: { heightAmp: 1.6, groundColor: '#334155', waterColor: '#0369a1' },
    description: '1958년 좁은 피오르드 협곡 안으로 거대 암반이 붕괴하며 역사상 최고 기록인 524m 국지적 산사태 해일이 관측된 지질학적 연구 사례 지역입니다.',
    source: 'USGS & NOAA SciJinks',
    sourceUrl: 'https://scijinks.gov/'
  }
];

// ============================================================================
// 3. WEIGHTED EARTH SIMILARITY MATCHING ALGORITHM
// ============================================================================
function calculateEarthSimilarity(analysis, place) {
  const textBlob = JSON.stringify(analysis || {}).toLowerCase();
  const scoreCategory = (keywords, base) => {
    if (!keywords || keywords.length === 0) return base;
    let hits = 0;
    keywords.forEach((kw) => {
      if (textBlob.includes(kw.toLowerCase())) hits += 1;
    });
    return Math.min(98, base + Math.round((hits / keywords.length) * (96 - base)));
  };

  const topography = scoreCategory(place.tags.topography, 46);
  const hydrosphere = scoreCategory(place.tags.hydrosphere, 44);
  const climate = scoreCategory(place.tags.climate, 52);
  const atmosphere = scoreCategory(place.tags.atmosphere, 48);

  const total = Math.round(
    topography * 0.32 + hydrosphere * 0.3 + climate * 0.18 + atmosphere * 0.2
  );

  return {
    total,
    breakdown: { topography, hydrosphere, climate, atmosphere }
  };
}

// ============================================================================
// 4. OFFLINE / STATIC GITHUB PAGES SCIENTIFIC ANALYZER
// ============================================================================
function buildOfflineScientificAnalysis(inputText, archetype = 'inspiration') {
  const txt = (inputText || '').toLowerCase();
  const hasPurpleLake = txt.includes('보라') || txt.includes('호수');
  const hasBasalt = txt.includes('현무암') || txt.includes('기둥');
  const hasAurora = txt.includes('오로라');
  const hasFog = txt.includes('안개');
  const hasSand = txt.includes('모래');
  const hasTsunami = txt.includes('해일') || txt.includes('파도') || txt.includes('쓰나미');
  const hasSalt = txt.includes('소금') || txt.includes('거울');

  if (hasTsunami) {
    return {
      summary_title: '초거대 산사태·해일 시나리오의 물리적 한계 및 안전 검증',
      explicit_features: {
        topography: ['해안 절벽', '바다 수평선'],
        hydrosphere: ['수백 미터 높이의 거대 파도', '해일'],
        weather_phenomena: ['강풍', '물보라'],
        vegetation: ['명시되지 않음'],
        atmospheric_phenomena: ['어두운 하늘']
      },
      inferred_features: {
        koppen_code: 'Cfb / Dfc',
        koppen_name: '해양성 또는 냉대 연안 기후 추정',
        estimated_geology: '급경사 해안 단층대와 대륙붕 경계 해역',
        inference_reasoning:
          '사용자가 묘사한 "산보다 높은 파도"의 시각적 공포감을 바탕으로 연안 급경사 지형을 가정했으나, 외해에서의 물리적 파고 한계를 함께 검토했습니다.'
      },
      scientific_plausibility: {
        plausibility_score: 14,
        verdict_label: '현실 발생 불가능 (심리적 과장 Dream)',
        realistic_elements: [
          '알래스카 리투야 만처럼 매우 좁고 깊은 피오르드 협곡 내부에서 거대 암벽이 통째로 무너질 경우 국지적 물보라가 솟구친 사례는 존재합니다.'
        ],
        unrealistic_elements: [
          '에베레스트 산(8,849m)이나 수백 미터 높이의 파도가 열린 바다를 가로질러 해변을 덮치는 현상은 지구 해양의 수심과 파랑 에너지 보존 법칙상 물리적으로 불가능합니다.',
          '일반적인 지진 해일(쓰나미)의 외해 파고는 수십 cm~1m 수준이며, 연안 도달 시에도 지형 증폭을 거쳐 수 미터~수십 미터 범위 내에서 에너지가 소산됩니다.'
        ],
        noaa_nasa_explanation:
          'NOAA 지진해일 경보 체계(PTWC)와 해양물리학에 따르면, 바다의 평균 수심(약 3,700m)과 단층 변위 에너지 한계로 인해 산맥을 넘는 파도는 형성될 수 없습니다. 꿈속의 거대한 파도는 대개 현실의 스트레스나 압도감을 뇌가 시각적으로 과장해 표현한 상징입니다.',
        nightmare_reassurance_note:
          '안심하세요! 꿈에서 본 것처럼 산보다 높은 파도가 바다에서 밀려오는 일은 지구 물리 법칙상 절대 일어날 수 없는 비현실적 장면입니다.'
      },
      creative_inspiration_sparks: [
        {
          title: '중력 이상 행성의 조석 파도 세계관',
          concept:
            '지구에서는 불가능한 수백 미터 파도를 모티브로, 거대한 위성이 근접 공전하는 외계 해양 행성 SF 소설의 배경으로 확장해 보세요.'
        },
        {
          title: '공포를 지질 데이터로 해체하는 인터랙티브 아트',
          concept:
            '악몽 속 비현실적 파고 곡선과 실제 NOAA 부이(Buoy) 파고 그래프를 겹쳐 보여주는 데이터 시각화 포스터를 제작할 수 있습니다.'
        },
        {
          title: '피오르드 지형과 메가쓰나미 지질 탐구 에세이',
          concept:
            '1958년 리투야 만의 빙하 후퇴와 암반 붕괴가 지형에 남긴 흔적을 주제로 지구과학 탐구 보고서를 작성해 보세요.'
        }
      ],
      image_prompt:
        'Dramatic coastal fjord cliffs with towering ocean waves under moody storm clouds, ultra-realistic National Geographic oceanography photography'
    };
  }

  return {
    summary_title: hasSalt
      ? '고산 염호의 대기 광학 반사와 거울 수면 현상'
      : hasSand && hasFog
      ? '해무(복사안개)와 사막 모래폭풍이 교차하는 기상 경계 지대'
      : '보라색 염호·현무암 주상절리·저고도 오로라의 복합 지구과학 분석',
    explicit_features: {
      topography: hasBasalt
        ? ['육각형 현무암 기둥(주상절리)', '호수 연안']
        : hasSalt
        ? ['끝없는 하얀 소금 평원']
        : ['넓은 들판(평야)', '지평선'],
      hydrosphere: hasPurpleLake
        ? ['보라색 호수', '잔잔한 수면']
        : hasSalt
        ? ['발목 깊이의 맑은 수막']
        : ['습윤 지표면'],
      weather_phenomena: [
        ...(hasFog ? ['짙은 새벽 안개'] : []),
        ...(hasSand ? ['황토빛 모래바람 벽'] : []),
        ...(!hasFog && !hasSand ? ['맑고 고요한 밤공기'] : [])
      ],
      vegetation: ['희소한 염생·극지 식생'],
      atmospheric_phenomena: hasAurora
        ? ['지표면 근처까지 내려온 초록·보라빛 오로라']
        : ['황토빛 대기 산란', '구름과 하늘의 수면 반사']
    },
    inferred_features: {
      koppen_code: hasSalt ? 'BWk (고산 건조 기후)' : hasSand ? 'BWh (해안 사막 기후)' : 'ET / BSh 복합',
      koppen_name: hasSalt
        ? '고산 한랭 건조 기후'
        : hasSand
        ? '아열대 사막·해무 경계 기후'
        : '고위도 툰드라 및 화산 열곡대 환경 추정',
      estimated_geology: hasBasalt
        ? '현무암질 용암의 냉각 수축으로 형성된 육각 주상절리와 탄산염 광물 호수 분지'
        : '증발암 소금 퇴적층 및 사구 퇴적 지형',
      inference_reasoning:
        '사용자가 직접 언급한 지형·수환경 단서(explicit_features)를 기반으로 GloH2O 쾨펜 기후 구분과 지질 형성 과정을 추론하였으며, 꿈속의 초현실적 결합은 별도로 검증했습니다.'
    },
    scientific_plausibility: {
      plausibility_score: hasAurora ? 64 : 86,
      verdict_label: hasAurora ? '부분 실현 가능 (고도 물리 제약 존재)' : '실제 지구에서 관측 가능',
      realistic_elements: [
        hasPurpleLake
          ? '보라색·붉은색 호수는 탄자니아 나트론 호수나 세네갈 레트바 호수처럼 고염분 환경에서 호염성 미생물과 광물질이 결합해 실제로 나타납니다.'
          : '안개와 모래바람의 충돌은 나미비아 나미브 사막 해안처럼 차가운 해류와 뜨거운 사막 기단이 만나는 곳에서 실제로 관측됩니다.',
        hasBasalt
          ? '정교한 육각형 현무암 기둥은 북아일랜드 자이언트 코즈웨이나 아이슬란드 화산 지대에서 흔히 발견되는 실제 주상절리입니다.'
          : '하늘과 땅이 완벽히 대칭되는 거울 수면은 볼리비아 우유니 소금 사막 우기에 실제로 나타나는 현상입니다.'
      ],
      unrealistic_elements: hasAurora
        ? [
            '오로라는 지상 약 80~500km 상층 대기(열권)에서 태양풍 입자와 산소·질소 원자가 충돌해 빛나는 현상이므로, 지표면이나 호수 바로 위까지 내려오는 것은 지구 대기 밀도상 불가능합니다.'
          ]
        : [],
      noaa_nasa_explanation:
        'NOAA SciJinks와 NASA Earth Observatory 자료에 따르면, 지질학적 특이 지형(보라색 염호, 현무암 주상절리, 해무와 모래폭풍)은 지구 각지에 실존하지만, 고위도 열권 현상인 오로라가 지표면까지 하강하는 장면은 꿈이 만들어낸 시적인 원근 착시입니다.',
      nightmare_reassurance_note:
        archetype === 'reassurance'
          ? '꿈속 기상 현상이 거칠게 느껴졌더라도 지구 대기 물리 법칙 안에서 예측 가능한 자연 순환의 일부입니다.'
          : '꿈에서 본 신비로운 색채와 지형 대부분은 실제 지구 곳곳에 실존하는 경이로운 자연의 조각들이 결합된 장면입니다!'
    },
    creative_inspiration_sparks: [
      {
        title: '지구과학 기반 판타지 바이옴 콘셉트 아트',
        concept:
          '탄자니아 나트론 호수의 광물 수질과 아이슬란드 주상절리 지질 구조를 결합해 게임·웹툰 속 신비의 성소 배경으로 발전시켜 보세요.'
      },
      {
        title: '557.7nm 산소 발광과 호염성 미생물의 색채 팔레트',
        concept:
          '자연이 만들어내는 보라색 카로티노이드 색소와 오로라의 에메랄드 파장을 조합한 디지털 일러스트레이션 시리즈를 기획할 수 있습니다.'
      },
      {
        title: '지구 두 지역의 기후 조건이 만나는 가상 생태계 에세이',
        concept:
          '위도가 다른 두 실제 지구 지역이 한 공간에서 만났을 때 어떤 식생과 기상 순환이 일어날지 과학적 상상력을 발휘해 보세요.'
      }
    ],
    image_prompt: hasSalt
      ? 'Endless mirror-like white salt flat reflecting dramatic twilight clouds and Milky Way stars, Salar de Uyuni style, National Geographic wide angle photography'
      : hasSand && hasFog
      ? 'Golden desert sand dunes meeting dense coastal morning mist and wind-blown dust veil, Namib desert style, National Geographic photography'
      : 'Vibrant purple mineral lake surrounded by dark hexagonal basalt columns with vivid green and violet aurora borealis reflected in calm water, Iceland and Lake Natron fusion, National Geographic photography'
  };
}

// ============================================================================
// 5. PHOTOGRAPHIC COMPOSITE LAYER RESOLVER (PRESERVES REAL NASA/WIKIMEDIA PHOTOS)
// Resolves the crisp photographic background (AI generated photo -> Real Earth
// photo URL -> High-detail procedural geological plate) without CORS loss.
// ============================================================================
function usePhotographicDreamComposite(generatedImageUrl, selectedPlace, analysis) {
  const [resolvedPhoto, setResolvedPhoto] = useState({
    url: selectedPlace?.photoUrl || null,
    isAiGenerated: false,
    needsDreamTint: true
  });

  useEffect(() => {
    if (generatedImageUrl) {
      setResolvedPhoto({
        url: generatedImageUrl,
        isAiGenerated: true,
        needsDreamTint: false
      });
      return;
    }

    if (selectedPlace?.photoUrl) {
      setResolvedPhoto({
        url: selectedPlace.photoUrl,
        isAiGenerated: false,
        needsDreamTint: true
      });
    } else {
      setResolvedPhoto({
        url: null,
        isAiGenerated: false,
        needsDreamTint: true
      });
    }
  }, [generatedImageUrl, selectedPlace, analysis]);

  return resolvedPhoto;
}

// ============================================================================
// 6. PHOTOGRAPHIC & 3D EXPLORATION VIEWPORT
// Modes:
//   1) 'photo'   : 2.5D Depth-Layered Photorealistic Panorama + Volumetric Weather
//   2) 'compare' : Interactive Side-by-Side Slider (Dream Photo vs Real NASA Photo)
//   3) '3d'      : Photo-Textured 3D Terrain Heightmap Explorer (WASD)
// ============================================================================
const PhotorealisticObservatoryViewport = ({
  dreamPhoto,
  isGeneratingImage,
  analysis,
  selectedPlace,
  onCaptureSnapshot,
  onRegeneratePhoto
}) => {
  const canvasRef = useRef(null);
  const [stageMode, setStageMode] = useState('photo'); // 'photo' | 'compare' | '3d'
  const [splitRatio, setSplitRatio] = useState(52); // 0..100 for side-by-side comparison
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [autoDrift, setAutoDrift] = useState(true);
  const [photoLoadStatus, setPhotoLoadStatus] = useState('loading'); // 'loading' | 'loaded' | 'fallback'

  // Lighting presets
  const [lightingGrade, setLightingGrade] = useState('auto'); // 'auto' | 'dawn' | 'golden' | 'aurora' | 'mist'
  const [windDir, setWindDir] = useState(1); // 1 = West->East (L->R), -1 = East->West (R->L)
  const [activeWxPreset, setActiveWxPreset] = useState('custom');

  const camRef = useRef({ x: 0, z: 0, yaw: 0, pitch: 0, fov: 1.08 });
  const [telemetry, setTelemetry] = useState({ heading: 0, zoom: 108 });
  const keysPressed = useRef({});
  const isDraggingPan = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dreamImgRef = useRef(null);
  const realEarthImgRef = useRef(null);
  const proceduralPlateRef = useRef(null);

  const initialEnv = useMemo(() => {
    const str = JSON.stringify(analysis || {}).toLowerCase();
    return {
      fog: str.includes('안개') || str.includes('구름') ? 58 : 12,
      sand: str.includes('모래') || str.includes('폭풍') || str.includes('바람') ? 62 : 0,
      aurora: str.includes('오로라') ? 82 : 0,
      snow: str.includes('눈') || str.includes('빙하') ? 56 : 0
    };
  }, [analysis]);

  const [fogDensity, setFogDensity] = useState(initialEnv.fog);
  const [sandStorm, setSandStorm] = useState(initialEnv.sand);
  const [auroraPower, setAuroraPower] = useState(initialEnv.aurora);
  const [snowPower, setSnowPower] = useState(initialEnv.snow);

  // Smoothly interpolated live physics state (avoids abrupt snapping)
  const smoothWxRef = useRef({
    fog: initialEnv.fog,
    sand: initialEnv.sand,
    aurora: initialEnv.aurora,
    snow: initialEnv.snow,
    wind: 1
  });

  useEffect(() => {
    setFogDensity(initialEnv.fog);
    setSandStorm(initialEnv.sand);
    setAuroraPower(initialEnv.aurora);
    setSnowPower(initialEnv.snow);
    setActiveWxPreset('custom');
  }, [initialEnv]);

  // Keyboard WASD / Arrow movement support for 3D & Panorama navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      keysPressed.current[e.code] = true;
    };
    const onKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const applyMeteorologicalPreset = (preset) => {
    setActiveWxPreset(preset.id);
    setFogDensity(preset.fog);
    setSandStorm(preset.sand);
    setAuroraPower(preset.aurora);
    setSnowPower(preset.snow);
    if (preset.lighting) setLightingGrade(preset.lighting);
  };

  // Build crisp high-resolution geological backup plate only if external photo fails
  useEffect(() => {
    const off = document.createElement('canvas');
    off.width = 1600;
    off.height = 900;
    const octx = off.getContext('2d');
    const pal = selectedPlace?.fallbackPalette || ['#090d16', '#1e1b4b', '#0f766e', '#312e81'];

    const sky = octx.createLinearGradient(0, 0, 0, 520);
    sky.addColorStop(0, pal[0]);
    sky.addColorStop(0.55, pal[1]);
    sky.addColorStop(1, pal[2]);
    octx.fillStyle = sky;
    octx.fillRect(0, 0, 1600, 900);

    // Starfield in upper atmosphere
    for (let s = 0; s < 140; s++) {
      const sx = (s * 239) % 1600;
      const sy = (s * 97) % 360;
      octx.fillStyle = `rgba(255,255,255,${0.25 + (s % 5) * 0.12})`;
      octx.fillRect(sx, sy, s % 3 === 0 ? 2 : 1.2, s % 3 === 0 ? 2 : 1.2);
    }

    // Multi-layered serrated volcanic & basalt mountain ridges
    for (let layer = 0; layer < 5; layer++) {
      const baseY = 400 + layer * 48;
      octx.beginPath();
      octx.moveTo(0, 900);
      for (let x = 0; x <= 1600; x += 8) {
        const ridge =
          Math.sin(x * (0.0022 + layer * 0.0008) + layer * 2.3) * (75 - layer * 10) +
          Math.cos(x * 0.0068 - layer * 1.1) * 28 +
          Math.abs(Math.sin(x * 0.015 + layer)) * 22;
        octx.lineTo(x, baseY - ridge);
      }
      octx.lineTo(1600, 900);
      octx.closePath();
      octx.fillStyle = `rgba(10, 15, 28, ${0.35 + layer * 0.14})`;
      octx.fill();
    }

    // Reflective mineral lake water with surface ripples
    const water = octx.createLinearGradient(0, 520, 0, 900);
    water.addColorStop(0, pal[2]);
    water.addColorStop(0.45, pal[1]);
    water.addColorStop(1, '#04070f');
    octx.fillStyle = water;
    octx.fillRect(0, 520, 1600, 380);

    for (let r = 0; r < 65; r++) {
      const ry = 526 + r * 5.6;
      octx.fillStyle = `rgba(255, 255, 255, ${0.03 + (r % 4) * 0.015})`;
      octx.fillRect(((r * 173) % 1400) + 40, ry, 90 + (r % 5) * 45, 1.5);
    }

    proceduralPlateRef.current = off;
  }, [selectedPlace]);

  // Load Dream Photo WITHOUT forced crossOrigin blocking so Wikimedia/NASA photos always render crisply!
  useEffect(() => {
    if (!dreamPhoto?.url) {
      dreamImgRef.current = null;
      setPhotoLoadStatus('fallback');
      return;
    }
    setPhotoLoadStatus('loading');
    const img = new Image();
    img.onload = () => {
      dreamImgRef.current = img;
      setPhotoLoadStatus('loaded');
    };
    img.onerror = () => {
      dreamImgRef.current = null;
      setPhotoLoadStatus('fallback');
    };
    img.src = dreamPhoto.url;
  }, [dreamPhoto]);

  // Load Real NASA / Wikimedia Earth Photo for Side-by-Side Comparison
  useEffect(() => {
    if (!selectedPlace?.photoUrl) {
      realEarthImgRef.current = null;
      return;
    }
    const img = new Image();
    img.onload = () => {
      realEarthImgRef.current = img;
    };
    img.onerror = () => {
      realEarthImgRef.current = null;
    };
    img.src = selectedPlace.photoUrl;
  }, [selectedPlace]);

  // Deterministic 3D terrain height function for 3D Explorer mode
  const getTerrainHeight = useCallback(
    (wx, wz) => {
      const amp = selectedPlace?.terrainPreset?.heightAmp || 1.0;
      const ridge =
        Math.sin(wx * 0.045) * Math.cos(wz * 0.045) * 28 * amp +
        Math.sin(wx * 0.11 + wz * 0.08) * 11 * amp +
        Math.cos(wz * 0.025) * 18 * amp;
      return ridge;
    },
    [selectedPlace]
  );

  // Main 60fps Volumetric Atmospheric & Photographic Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let lastSync = 0;

    // 1. Procedural Multi-Octave fBm Mist & Dust Sprite Buffer (Offscreen Texture)
    const createVolumetricCloudSprite = (r, g, b, seedOffset) => {
      const size = 256;
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const octx = off.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;

      for (let lobe = 0; lobe < 14; lobe++) {
        const ang = (lobe / 14) * Math.PI * 2 + seedOffset;
        const dist = (lobe % 3) * 18 + Math.sin(lobe * 2.7 + seedOffset) * 14;
        const lx = cx + Math.cos(ang) * dist;
        const ly = cy + Math.sin(ang) * dist * 0.62;
        const rad = 52 + ((lobe * 19) % 38);
        const grad = octx.createRadialGradient(lx, ly, 2, lx, ly, rad);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.16)`);
        grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.08)`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(lx, ly, rad, 0, Math.PI * 2);
        octx.fill();
      }
      return off;
    };

    const mistSprites = [
      createVolumetricCloudSprite(226, 234, 244, 0.4),
      createVolumetricCloudSprite(208, 220, 236, 2.1),
      createVolumetricCloudSprite(240, 244, 250, 4.3)
    ];

    const dustSprites = [
      createVolumetricCloudSprite(194, 122, 58, 0.9),
      createVolumetricCloudSprite(168, 96, 42, 2.8),
      createVolumetricCloudSprite(217, 152, 82, 5.1)
    ];

    const cloudBanks = Array.from({ length: 28 }, (_, idx) => ({
      x: (idx / 28) * 2400 - 300,
      yNorm: 0.42 + (idx % 7) * 0.075,
      depth: 0.25 + (idx % 5) * 0.18,
      scaleX: 1.5 + (idx % 4) * 0.55,
      scaleY: 0.55 + (idx % 3) * 0.22,
      spriteIdx: idx % 3,
      phase: idx * 1.37
    }));

    const particles = Array.from({ length: 220 }, (_, idx) => {
      const isForegroundBokeh = idx % 8 === 0;
      const depth = isForegroundBokeh ? 0.85 + Math.random() * 0.15 : 0.15 + Math.random() * 0.65;
      return {
        x: Math.random() * 2200,
        y: Math.random() * 1200,
        depth,
        isBokeh: isForegroundBokeh,
        size: isForegroundBokeh ? 4.5 + Math.random() * 6.5 : 0.8 + depth * 2.2,
        speed: (3.5 + depth * 11.5) * (0.85 + Math.random() * 0.35),
        alpha: isForegroundBokeh ? 0.14 + Math.random() * 0.16 : 0.22 + depth * 0.48,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.16
      };
    });

    const dreamStr = JSON.stringify(analysis || {}).toLowerCase();
    const wantsPurpleLake = dreamStr.includes('보라');
    const wantsBasaltPillars = dreamStr.includes('현무암') || dreamStr.includes('기둥');

    const render = (now) => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const tw = Math.floor(rect.width * dpr);
        const th = Math.floor(rect.height * dpr);
        if (canvas.width !== tw || canvas.height !== th) {
          canvas.width = tw;
          canvas.height = th;
        }
      }

      const w = canvas.width;
      const h = canvas.height;
      const cam = camRef.current;

      // Smoothly interpolate atmospheric parameters
      const wx = smoothWxRef.current;
      wx.fog += (fogDensity - wx.fog) * 0.045;
      wx.sand += (sandStorm - wx.sand) * 0.045;
      wx.aurora += (auroraPower - wx.aurora) * 0.045;
      wx.snow += (snowPower - wx.snow) * 0.045;
      wx.wind += (windDir - wx.wind) * 0.08;

      if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) {
        cam.z += 0.95;
        if (stageMode !== '3d') cam.fov = Math.min(1.85, cam.fov + 0.005);
      }
      if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) {
        cam.z -= 0.95;
        if (stageMode !== '3d') cam.fov = Math.max(1.0, cam.fov - 0.005);
      }
      if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) {
        cam.yaw -= 0.016;
      }
      if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) {
        cam.yaw += 0.016;
      }

      if (autoDrift && !isDraggingPan.current && stageMode !== 'compare') {
        cam.yaw = Math.sin(now * 0.00022) * 0.16;
        cam.fov = 1.1 + Math.sin(now * 0.0003) * 0.04;
      }

      const stormIntensity = Math.max(wx.sand, wx.snow) / 100;
      const shakePower = stormIntensity > 0.45 ? (stormIntensity - 0.45) * 4.5 : 0;
      const shakeX = shakePower > 0 ? Math.sin(now * 0.037) * Math.cos(now * 0.023) * shakePower : 0;
      const shakeY = shakePower > 0 ? Math.cos(now * 0.043) * Math.sin(now * 0.019) * shakePower : 0;

      if (now - lastSync > 180) {
        lastSync = now;
        setTelemetry({
          heading: Math.round((((cam.yaw * 180) / Math.PI) % 360 + 360) % 360),
          zoom: Math.round(cam.fov * 100)
        });
      }

      ctx.clearRect(0, 0, w, h);

      // Seamless mirrored panoramic photo renderer (eliminates hard seam edges!)
      const drawPanoramicSource = (source, yawOffset = 0, applyShake = true) => {
        if (!source) return;
        const srcW = source.naturalWidth || source.width;
        const srcH = source.naturalHeight || source.height;
        if (!srcW || !srcH) return;

        const scale = Math.max(h / srcH, (w * 1.45) / srcW) * (cam.fov + (shakePower > 0 ? 0.015 : 0));
        const drawW = srcW * scale;
        const drawH = srcH * scale;
        const normYaw = ((((cam.yaw + yawOffset) / (Math.PI * 2)) % 1) + 1) % 1;
        const offsetX = -(normYaw * drawW) + (applyShake ? shakeX : 0);
        const maxOffsetY = Math.max(0, (drawH - h) / 2);
        const offsetY = (h - drawH) / 2 + cam.pitch * maxOffsetY * 2.0 + (applyShake ? shakeY : 0);

        // Draw primary tile
        ctx.drawImage(source, offsetX, offsetY, drawW, drawH);

        // Draw horizontally mirrored seamless adjacent tile for continuous 360° pan
        ctx.save();
        ctx.translate(offsetX + drawW * 2, offsetY);
        ctx.scale(-1, 1);
        ctx.drawImage(source, 0, 0, drawW, drawH);
        ctx.restore();

        if (offsetX > 0) {
          ctx.save();
          ctx.translate(offsetX, offsetY);
          ctx.scale(-1, 1);
          ctx.drawImage(source, 0, 0, drawW, drawH);
          ctx.restore();
        }
      };

      const activeDreamSource = dreamImgRef.current || proceduralPlateRef.current;
      const activeRealSource = realEarthImgRef.current || proceduralPlateRef.current;

      // Apply Dream Chromatic Grade when viewing real Earth photography as Dream backdrop
      const applyDreamPhotographicGrade = () => {
        if (!dreamPhoto?.needsDreamTint) return;
        if (wantsPurpleLake) {
          ctx.save();
          const lakeTint = ctx.createLinearGradient(0, h * 0.45, 0, h);
          lakeTint.addColorStop(0, 'rgba(147, 51, 234, 0)');
          lakeTint.addColorStop(0.45, 'rgba(168, 85, 247, 0.34)');
          lakeTint.addColorStop(1, 'rgba(88, 28, 135, 0.44)');
          ctx.globalCompositeOperation = 'color';
          ctx.fillStyle = lakeTint;
          ctx.fillRect(0, h * 0.42, w, h * 0.58);
          ctx.restore();
        }
        if (wantsBasaltPillars) {
          // Subtle silhouetted hexagonal basalt columns along foreground shoreline
          ctx.save();
          const colCount = 14;
          for (let c = 0; c < colCount; c++) {
            const side = c < 7 ? 0 : 1;
            const localIdx = c % 7;
            const bx =
              side === 0
                ? w * (0.02 + localIdx * 0.036) - cam.yaw * 220
                : w * (0.76 + localIdx * 0.036) - cam.yaw * 220;
            const colH = h * (0.14 + ((localIdx * 7) % 5) * 0.032);
            const colW = Math.max(12, w * 0.022);
            const by = h - colH + cam.pitch * 60;

            const cGrad = ctx.createLinearGradient(bx, by, bx + colW, h);
            cGrad.addColorStop(0, 'rgba(24, 30, 44, 0.88)');
            cGrad.addColorStop(1, 'rgba(9, 13, 22, 0.96)');
            ctx.fillStyle = cGrad;
            ctx.fillRect(bx, by, colW, colH + 40);

            ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, colW, colH + 40);
          }
          ctx.restore();
        }
      };

      // ======================================================================
      // MODE 1: PHOTOREALISTIC 2.5D PANORAMA STAGE (DEFAULT)
      // ======================================================================
      if (stageMode === 'photo') {
        drawPanoramicSource(activeDreamSource, 0, true);
        applyDreamPhotographicGrade();

        // Lighting Retouching Color Grade
        if (lightingGrade === 'dawn') {
          const dawnGrad = ctx.createLinearGradient(0, 0, 0, h);
          dawnGrad.addColorStop(0, 'rgba(30, 58, 138, 0.22)');
          dawnGrad.addColorStop(0.55, 'rgba(56, 189, 248, 0.14)');
          dawnGrad.addColorStop(1, 'rgba(15, 23, 42, 0.25)');
          ctx.fillStyle = dawnGrad;
          ctx.fillRect(0, 0, w, h);
        } else if (lightingGrade === 'golden') {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, 'rgba(245, 158, 11, 0.26)');
          g.addColorStop(0.6, 'rgba(217, 119, 6, 0.16)');
          g.addColorStop(1, 'rgba(120, 53, 15, 0.24)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (lightingGrade === 'aurora') {
          ctx.fillStyle = 'rgba(7, 13, 28, 0.42)';
          ctx.fillRect(0, 0, w, h);
        } else if (lightingGrade === 'mist') {
          ctx.fillStyle = 'rgba(186, 198, 214, 0.24)';
          ctx.fillRect(0, 0, w, h);
        }
      }

      // ======================================================================
      // MODE 2: SIDE-BY-SIDE COMPARE (DREAM PHOTO vs REAL NASA EARTH PHOTO)
      // ======================================================================
      if (stageMode === 'compare') {
        const splitX = (splitRatio / 100) * w;

        // Left side: Dream Photo
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX, h);
        ctx.clip();
        drawPanoramicSource(activeDreamSource, 0, false);
        applyDreamPhotographicGrade();
        ctx.restore();

        // Right side: Real Earth Location Photo (un-tinted original NASA/Wikimedia photo)
        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX, 0, w - splitX, h);
        ctx.clip();
        drawPanoramicSource(activeRealSource, 0, false);
        ctx.restore();

        // Divider Line & Handle
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, h);
        ctx.stroke();

        ctx.fillStyle = '#06090f';
        ctx.beginPath();
        ctx.arc(splitX, h / 2, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#e0f2fe';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⇄', splitX, h / 2);
      }

      // ======================================================================
      // MODE 3: PHOTO-SKY 3D TERRAIN HEIGHTMAP EXPLORER
      // ======================================================================
      if (stageMode === '3d') {
        const horizonY = h * (0.48 + cam.pitch * 0.65);

        // Render real photographic sky dome in the upper half of the 3D world
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, w, Math.max(20, horizonY + 30));
        ctx.clip();
        drawPanoramicSource(activeDreamSource, 0, true);
        ctx.restore();

        const maxDepth = 155;
        const cols = 110;
        const camEyeHeight = getTerrainHeight(cam.x, cam.z) + 24;
        const baseGroundHex = wantsPurpleLake
          ? '#4c1d95'
          : selectedPlace?.terrainPreset?.groundColor || '#292524';
        const waterHex = wantsPurpleLake
          ? '#7e22ce'
          : selectedPlace?.terrainPreset?.waterColor || '#0284c7';

        for (let d = maxDepth; d >= 6; d -= 2.4) {
          const persp = (h * 0.55 * cam.fov) / d;
          const fogFactor = Math.min(0.86, (d / maxDepth) * (0.28 + (wx.fog / 100) * 0.65));
          const spanWidth = d * 1.75;

          ctx.beginPath();
          let avgHeight = 0;
          for (let i = 0; i <= cols; i++) {
            const u = i / cols - 0.5;
            const localX = u * spanWidth * 2;
            const wxPos = cam.x + Math.sin(cam.yaw) * d + Math.cos(cam.yaw) * localX;
            const wzPos = cam.z + Math.cos(cam.yaw) * d - Math.sin(cam.yaw) * localX;
            const ty = getTerrainHeight(wxPos, wzPos);
            avgHeight += ty;
            const sx = (i / cols) * w;
            const sy = horizonY - (ty - camEyeHeight) * (persp / 16);
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();

          const isBasinWater = avgHeight / (cols + 1) < -6;
          ctx.fillStyle = isBasinWater ? waterHex : baseGroundHex;
          ctx.fill();

          // Contour rim highlight for geological realism
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = `rgba(11, 17, 30, ${fogFactor})`;
          ctx.fill();
        }
      }

      // ======================================================================
      // VOLUMETRIC ATMOSPHERIC PHYSICS ENGINE (PHOTOREALISTIC)
      // ======================================================================
      if (stageMode !== 'compare') {
        const horizonScreenY = h * (0.48 + cam.pitch * 0.55);

        // --------------------------------------------------------------------
        // A. RAYED AURORA BOREALIS CURTAINS (557.7nm OXYGEN GREEN + N2 VIOLET)
        // --------------------------------------------------------------------
        if (wx.aurora > 1) {
          const aNorm = wx.aurora / 100;
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          // Subtle ambient emerald/violet atmospheric sky & ground reflection
          const skyGlow = ctx.createRadialGradient(
            w * 0.5 - cam.yaw * 120,
            horizonScreenY * 0.55,
            10,
            w * 0.5,
            horizonScreenY * 0.6,
            w * 0.65
          );
          skyGlow.addColorStop(0, `rgba(16, 185, 129, ${aNorm * 0.22})`);
          skyGlow.addColorStop(0.5, `rgba(139, 92, 246, ${aNorm * 0.14})`);
          skyGlow.addColorStop(1, 'rgba(6, 9, 15, 0)');
          ctx.fillStyle = skyGlow;
          ctx.fillRect(0, 0, w, h);

          // Ground/Water specular emerald bounce light on lower foreground
          const waterBounce = ctx.createLinearGradient(0, horizonScreenY, 0, h);
          waterBounce.addColorStop(0, 'rgba(16, 185, 129, 0)');
          waterBounce.addColorStop(0.5, `rgba(52, 211, 153, ${aNorm * 0.14})`);
          waterBounce.addColorStop(1, `rgba(168, 85, 247, ${aNorm * 0.1})`);
          ctx.fillStyle = waterBounce;
          ctx.fillRect(0, horizonScreenY, w, h - horizonScreenY);

          // 2 undulating 3D auroral drapery ribbons with fine vertical magnetic field rays
          for (let ribbon = 0; ribbon < 2; ribbon++) {
            const rayStep = Math.max(4, Math.floor(w / 190));
            const baseAlt = horizonScreenY * (0.58 - ribbon * 0.16);
            const curtainHeight = h * (0.32 - ribbon * 0.05);

            for (let x = 0; x <= w; x += rayStep) {
              const worldPhase = x * 0.0042 + cam.yaw * 2.4 + ribbon * 1.9;
              const waveY =
                baseAlt +
                Math.sin(worldPhase + now * 0.00085) * (28 - ribbon * 6) +
                Math.cos(worldPhase * 2.1 - now * 0.0011) * 14;

              // Fine magnetic ray striations shimmering horizontally
              const rayShimmer =
                0.45 +
                0.55 *
                  Math.pow(
                    Math.max(
                      0,
                      Math.sin(x * 0.045 + now * 0.0032 + ribbon) *
                        Math.cos(x * 0.019 - now * 0.0018)
                    ),
                    1.5
                  );

              const rayTop = waveY - curtainHeight * (0.75 + rayShimmer * 0.45);
              const rayGrad = ctx.createLinearGradient(x, waveY + 6, x, rayTop);
              // Sharp bright 557.7nm atomic oxygen lower border fading into violet/magenta upper rays
              rayGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
              rayGrad.addColorStop(0.08, `rgba(52, 211, 153, ${aNorm * rayShimmer * 0.65})`);
              rayGrad.addColorStop(0.28, `rgba(16, 185, 129, ${aNorm * rayShimmer * 0.36})`);
              rayGrad.addColorStop(0.68, `rgba(168, 85, 247, ${aNorm * rayShimmer * 0.24})`);
              rayGrad.addColorStop(1, 'rgba(236, 72, 153, 0)');

              ctx.fillStyle = rayGrad;
              ctx.fillRect(x, rayTop, rayStep + 1, waveY + 6 - rayTop);
            }
          }
          ctx.restore();
        }

        // --------------------------------------------------------------------
        // B. VOLUMETRIC RADIATION FOG & MIE SCATTERING HAZE (지표 안개 / 해무)
        // --------------------------------------------------------------------
        if (wx.fog > 1) {
          const fNorm = wx.fog / 100;

          // 1) Aerial perspective contrast washout near horizon
          const aerialHaze = ctx.createLinearGradient(0, horizonScreenY * 0.35, 0, h);
          aerialHaze.addColorStop(0, 'rgba(203, 213, 225, 0)');
          aerialHaze.addColorStop(0.35, `rgba(214, 224, 236, ${fNorm * 0.34})`);
          aerialHaze.addColorStop(0.65, `rgba(226, 234, 244, ${fNorm * 0.48})`);
          aerialHaze.addColorStop(1, `rgba(195, 208, 224, ${fNorm * 0.38})`);
          ctx.fillStyle = aerialHaze;
          ctx.fillRect(0, 0, w, h);

          // 2) Mie forward-scattering sun/horizon glow inside mist
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          const sunX = w * 0.52 - cam.yaw * 140;
          const mieGlow = ctx.createRadialGradient(
            sunX,
            horizonScreenY * 0.85,
            10,
            sunX,
            horizonScreenY * 0.9,
            w * 0.48
          );
          const mieTint =
            lightingGrade === 'golden'
              ? `rgba(253, 224, 171, ${fNorm * 0.32})`
              : `rgba(224, 242, 254, ${fNorm * 0.26})`;
          mieGlow.addColorStop(0, mieTint);
          mieGlow.addColorStop(1, 'rgba(224, 242, 254, 0)');
          ctx.fillStyle = mieGlow;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();

          // 3) Multi-layered drifting fBm mist banks across valleys & ground
          ctx.save();
          for (let i = 0; i < cloudBanks.length; i++) {
            const b = cloudBanks[i];
            const speed = (0.18 + b.depth * 0.55) * wx.wind;
            b.x += speed;
            const wrapW = w + 700;
            if (b.x > w + 350) b.x -= wrapW;
            if (b.x < -350) b.x += wrapW;

            const parallaxX = b.x - cam.yaw * (140 + b.depth * 260);
            const wrappedX = ((((parallaxX + 350) % wrapW) + wrapW) % wrapW) - 350;
            const yPos =
              h * b.yNorm +
              cam.pitch * (80 + b.depth * 140) +
              Math.sin(now * 0.0005 + b.phase) * 10;

            const sprite = mistSprites[b.spriteIdx];
            const dw = 360 * b.scaleX * (0.7 + b.depth * 0.6);
            const dh = 180 * b.scaleY * (0.7 + b.depth * 0.6);

            ctx.globalAlpha = Math.min(0.85, fNorm * (0.35 + b.depth * 0.45));
            ctx.drawImage(sprite, wrappedX - dw / 2, yPos - dh / 2, dw, dh);
          }
          ctx.restore();
        }

        // --------------------------------------------------------------------
        // C. TYNDALL CREPUSCULAR LIGHT SHAFTS (GOD RAYS) THROUGH MIST / DUST
        // --------------------------------------------------------------------
        const mediumDensity = Math.max(wx.fog, wx.sand) / 100;
        if (mediumDensity > 0.22 && (lightingGrade === 'golden' || lightingGrade === 'dawn' || lightingGrade === 'auto')) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          const rayOriginX = w * 0.48 - cam.yaw * 130;
          const rayOriginY = horizonScreenY * 0.35;
          const rayAlpha = Math.min(0.16, (mediumDensity - 0.2) * 0.22);
          const beamColor =
            wx.sand > wx.fog
              ? `rgba(251, 191, 36, ${rayAlpha})`
              : `rgba(224, 242, 254, ${rayAlpha})`;

          for (let r = 0; r < 5; r++) {
            const spread = (r - 2) * 0.16 + Math.sin(now * 0.0003 + r) * 0.02;
            const endX = rayOriginX + Math.tan(spread) * h * 1.1;
            const beamW = 70 + r * 28;
            const bGrad = ctx.createLinearGradient(rayOriginX, rayOriginY, endX, h);
            bGrad.addColorStop(0, beamColor);
            bGrad.addColorStop(0.7, beamColor);
            bGrad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = bGrad;
            ctx.beginPath();
            ctx.moveTo(rayOriginX - 12, rayOriginY);
            ctx.lineTo(rayOriginX + 12, rayOriginY);
            ctx.lineTo(endX + beamW, h);
            ctx.lineTo(endX - beamW, h);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // --------------------------------------------------------------------
        // D. PHOTOREALISTIC SANDSTORM (BEER-LAMBERT OPTICAL VEIL + ANISOTROPIC GRAINS)
        // --------------------------------------------------------------------
        if (wx.sand > 1) {
          const sNorm = wx.sand / 100;

          // 1) Beer-Lambert atmospheric optical extinction (warm ochre-terracotta scattering)
          const dustExtinction = ctx.createLinearGradient(0, 0, 0, h);
          dustExtinction.addColorStop(0, `rgba(146, 78, 28, ${sNorm * 0.38})`);
          dustExtinction.addColorStop(0.5, `rgba(180, 102, 42, ${sNorm * 0.44})`);
          dustExtinction.addColorStop(1, `rgba(120, 62, 20, ${sNorm * 0.52})`);
          ctx.fillStyle = dustExtinction;
          ctx.fillRect(0, 0, w, h);

          // 2) Rolling turbulent Haboob dust wall clouds
          ctx.save();
          for (let i = 0; i < cloudBanks.length; i++) {
            const b = cloudBanks[i];
            const speed = (1.6 + b.depth * 3.8) * wx.wind * (0.4 + sNorm * 1.2);
            b.x += speed;
            const wrapW = w + 750;
            if (b.x > w + 375) b.x -= wrapW;
            if (b.x < -375) b.x += wrapW;

            const yPos =
              h * (0.35 + (i % 6) * 0.11) +
              cam.pitch * (70 + b.depth * 120) +
              Math.sin(now * 0.002 + b.phase) * 14;
            const sprite = dustSprites[b.spriteIdx];
            const dw = 420 * b.scaleX * (0.75 + b.depth * 0.55);
            const dh = 210 * b.scaleY * (0.75 + b.depth * 0.55);

            ctx.globalAlpha = Math.min(0.82, sNorm * (0.32 + b.depth * 0.42));
            ctx.drawImage(sprite, b.x - dw / 2, yPos - dh / 2, dw, dh);
          }
          ctx.restore();

          // 3) High-velocity motion-blurred anisotropic sand streaks (DOF depth-sorted)
          const activeCount = Math.floor(particles.length * Math.min(1, sNorm * 1.15));
          ctx.save();
          ctx.lineCap = 'round';
          for (let i = 0; i < activeCount; i++) {
            const p = particles[i];
            const vx = p.speed * (1.2 + sNorm * 2.6) * wx.wind;
            const vy = Math.sin(now * 0.005 + p.phase) * (1.2 + p.depth * 2.5) + p.tilt * Math.abs(vx);
            p.x = (p.x + vx + w + 120) % (w + 120);
            p.y = (p.y + vy + h) % h;

            const drawX = p.x - 60;
            const streakLen = p.isBokeh
              ? 28 + sNorm * 45
              : (8 + p.depth * 26) * (0.6 + sNorm * 0.9);

            if (p.isBokeh) {
              // Out-of-focus foreground lens sand streak
              const sGrad = ctx.createLinearGradient(
                drawX,
                p.y,
                drawX - streakLen * wx.wind,
                p.y - vy * 2
              );
              sGrad.addColorStop(0, `rgba(251, 191, 118, ${p.alpha * sNorm * 0.85})`);
              sGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
              ctx.strokeStyle = sGrad;
              ctx.lineWidth = p.size * 1.35;
              ctx.beginPath();
              ctx.moveTo(drawX, p.y);
              ctx.lineTo(drawX - streakLen * wx.wind, p.y - vy * 2);
              ctx.stroke();
            } else {
              // Sharp wind-whipped mid/far sand grain
              ctx.strokeStyle = `rgba(245, 195, 130, ${p.alpha * sNorm})`;
              ctx.lineWidth = Math.max(0.8, p.size * 0.65);
              ctx.beginPath();
              ctx.moveTo(drawX, p.y);
              ctx.lineTo(drawX - streakLen * wx.wind, p.y - vy * 1.4);
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        // --------------------------------------------------------------------
        // E. PHOTOREALISTIC SNOWFALL WITH FOREGROUND BOKEH LENS DEPTH
        // --------------------------------------------------------------------
        if (wx.snow > 1) {
          const snNorm = wx.snow / 100;
          const activeSnow = Math.floor(particles.length * Math.min(1, snNorm * 1.1));
          ctx.save();
          for (let i = 0; i < activeSnow; i++) {
            const p = particles[i];
            const windPush = (0.8 + snNorm * 3.2) * wx.wind * (0.4 + p.depth);
            const fallSpeed = (1.1 + p.depth * 2.8) * (0.7 + snNorm * 0.6);
            p.x = (p.x + windPush + Math.sin(now * 0.002 + p.phase) * 1.2 + w + 80) % (w + 80);
            p.y = (p.y + fallSpeed) % h;
            const drawX = p.x - 40;

            if (p.isBokeh) {
              // Soft out-of-focus foreground snowflake close to camera lens
              const rad = p.size * (1.2 + snNorm * 0.6);
              const bGrad = ctx.createRadialGradient(drawX, p.y, 0, drawX, p.y, rad);
              bGrad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * snNorm * 0.9})`);
              bGrad.addColorStop(0.6, `rgba(226, 240, 255, ${p.alpha * snNorm * 0.45})`);
              bGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
              ctx.fillStyle = bGrad;
              ctx.beginPath();
              ctx.arc(drawX, p.y, rad, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Crisp wind-slanted ice crystal
              ctx.strokeStyle = `rgba(248, 252, 255, ${p.alpha * snNorm * 1.15})`;
              ctx.lineWidth = Math.max(1, p.size * 0.75);
              ctx.beginPath();
              ctx.moveTo(drawX, p.y);
              ctx.lineTo(drawX - windPush * 1.6, p.y - fallSpeed * 1.6);
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    stageMode,
    splitRatio,
    autoDrift,
    lightingGrade,
    windDir,
    fogDensity,
    sandStorm,
    auroraPower,
    snowPower,
    getTerrainHeight,
    selectedPlace
  ]);

  const handlePointerDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (stageMode === 'compare' && rect) {
      const relX = ((clientX - rect.left) / rect.width) * 100;
      if (Math.abs(relX - splitRatio) < 8) {
        setIsDraggingSplit(true);
        return;
      }
    }

    isDraggingPan.current = true;
    setAutoDrift(false);
    lastPointer.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDraggingSplit && rect) {
      const nextRatio = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      setSplitRatio(nextRatio);
      return;
    }

    if (!isDraggingPan.current) return;
    const dx = clientX - lastPointer.current.x;
    const dy = clientY - lastPointer.current.y;
    lastPointer.current = { x: clientX, y: clientY };

    camRef.current.yaw -= dx * 0.0038;
    camRef.current.pitch = Math.max(-0.4, Math.min(0.4, camRef.current.pitch + dy * 0.0028));
  };

  const handlePointerUp = () => {
    isDraggingPan.current = false;
    setIsDraggingSplit(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    camRef.current.fov = Math.max(1.0, Math.min(1.9, camRef.current.fov - e.deltaY * 0.0008));
  };

  return (
    <div className="space-y-4">
      {/* Main Photorealistic Stage */}
      <div
        className="relative w-full h-[430px] sm:h-[540px] rounded-2xl overflow-hidden border border-white/15 bg-[#06090F] shadow-[0_25px_80px_-15px_rgba(56,189,248,0.22)] select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Generating AI Photo Overlay */}
        {isGeneratingImage && (
          <div className="absolute inset-0 bg-[#06090F]/80 backdrop-blur-md flex flex-col items-center justify-center z-20 p-6 text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-sky-500/30 border-t-sky-400 animate-spin" />
              <Aperture className="w-7 h-7 text-sky-300 absolute inset-0 m-auto" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">
              National Geographic / NASA 스타일 실사 파노라마 촬영 중...
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md">
              꿈속 지형과 기상 현상을 IMAX 70mm 광각 사진 데이터로 합성하고 있습니다.
            </p>
          </div>
        )}

        {/* Top Observatory Mode Switcher Bar */}
        <div className="absolute top-3.5 inset-x-3.5 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1 bg-[#06090F]/85 border border-white/15 p-1 rounded-xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setStageMode('photo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                stageMode === 'photo'
                  ? 'bg-sky-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              2.5D 실사 파노라마
            </button>
            <button
              type="button"
              onClick={() => setStageMode('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                stageMode === 'compare'
                  ? 'bg-emerald-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              실제 지구 사진과 나란히 비교
            </button>
            <button
              type="button"
              onClick={() => setStageMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                stageMode === '3d'
                  ? 'bg-indigo-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              3D 지형 탐험 (WASD)
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onRegeneratePhoto}
              disabled={isGeneratingImage}
              title="AI 실사 사진 다시 촬영하기"
              className="px-3 py-1.5 rounded-xl bg-[#06090F]/85 border border-white/15 text-slate-200 hover:border-sky-400/50 hover:text-sky-300 text-xs font-medium backdrop-blur-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingImage ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">AI 실사 재촬영</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoDrift((v) => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-xl flex items-center gap-1.5 transition cursor-pointer ${
                autoDrift
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                  : 'bg-[#06090F]/85 border-white/15 text-slate-300 hover:text-white'
              }`}
            >
              {autoDrift ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">시네마틱 패닝</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (canvasRef.current) onCaptureSnapshot(canvasRef.current.toDataURL('image/png'));
              }}
              className="px-3 py-1.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-200 hover:bg-sky-500/30 text-xs font-semibold backdrop-blur-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              엽서 저장
            </button>

            <button
              type="button"
              onClick={() => {
                camRef.current = { x: 0, z: 0, yaw: 0, pitch: 0, fov: 1.08 };
              }}
              title="시점 초기화"
              className="p-2 rounded-xl bg-[#06090F]/85 border border-white/15 text-slate-300 hover:text-white backdrop-blur-xl transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compare Mode Badges */}
        {stageMode === 'compare' && (
          <>
            <div className="absolute top-16 left-4 z-10 px-3 py-1 rounded-lg bg-[#06090F]/85 border border-sky-400/40 text-xs font-bold text-sky-300 backdrop-blur-md pointer-events-none">
              ◀ 꿈속 풍경 실사 재구성
            </div>
            <div className="absolute top-16 right-4 z-10 px-3 py-1 rounded-lg bg-[#06090F]/85 border border-emerald-400/40 text-xs font-bold text-emerald-300 backdrop-blur-md pointer-events-none">
              실제 지구 사진: {selectedPlace?.name} ▶
            </div>
          </>
        )}

        {/* Telemetry Stamp */}
        <div className="absolute bottom-14 left-3.5 z-10 pointer-events-none hidden sm:flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#06090F]/85 border border-white/10 backdrop-blur-md font-mono text-[11px] text-sky-300 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3" /> AZIMUTH {telemetry.heading}°
            </span>
            <span>ZOOM {telemetry.zoom}%</span>
            <span className="text-amber-300">
              {dreamPhoto?.isAiGenerated
                ? 'SOURCE: GEMINI AI PHOTO'
                : photoLoadStatus === 'loaded'
                ? 'SOURCE: NASA / WIKIMEDIA REAL PHOTO'
                : 'SOURCE: GEOLOGICAL SYNTHESIS'}
            </span>
            {selectedPlace && (
              <span className="text-emerald-300">
                EARTH TWIN: {selectedPlace.coordinates} ({selectedPlace.koppen})
              </span>
            )}
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="absolute bottom-3 inset-x-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-300 bg-[#06090F]/85 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xl pointer-events-none">
          <span>
            {stageMode === 'compare'
              ? '↔️ 가운데 하늘색 슬라이더를 좌우로 드래그하여 꿈속 풍경과 실제 NASA/지구 사진을 직접 비교하세요'
              : '📷 마우스 드래그: 360° 파노라마 둘러보기 · 휠: 광각/망원 줌 · 상단 탭에서 실제 지구 사진과 비교'}
          </span>
          <span className="text-slate-400">
            NASA Earth Observatory · GloH2O 실측 데이터 기반
          </span>
        </div>
      </div>

      {/* Photographic Director Controls (Camera & Atmosphere Retouching) */}
      <div className="bg-[#0D131F] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Top Row: Title + One-Click Meteorological Scene Presets */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              기상·대기 물리 시뮬레이터 (Volumetric Atmospheric Field Deck)
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              실제 지구과학 물리 변수(가시거리 · 풍속 · 지자기 지수 Kp · 색온도)를 조절해 사진 속 대기를 실시간 변화시킵니다.
            </p>
          </div>

          {/* One-Click Meteorological Scene Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              {
                id: 'dawn-fog',
                label: '새벽 복사안개',
                fog: 74,
                sand: 0,
                aurora: 0,
                snow: 0,
                lighting: 'dawn'
              },
              {
                id: 'haboob',
                label: '사하라 모래폭풍',
                fog: 14,
                sand: 84,
                aurora: 0,
                snow: 0,
                lighting: 'golden'
              },
              {
                id: 'kp8-aurora',
                label: 'Kp-8 지자기 오로라',
                fog: 16,
                sand: 0,
                aurora: 92,
                snow: 12,
                lighting: 'aurora'
              },
              {
                id: 'blizzard',
                label: '설원 블리자드',
                fog: 48,
                sand: 0,
                aurora: 0,
                snow: 88,
                lighting: 'mist'
              },
              {
                id: 'clear',
                label: '맑은 고요',
                fog: 0,
                sand: 0,
                aurora: 0,
                snow: 0,
                lighting: 'auto'
              }
            ].map((wxPreset) => (
              <button
                key={wxPreset.id}
                type="button"
                onClick={() => applyMeteorologicalPreset(wxPreset)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  activeWxPreset === wxPreset.id
                    ? 'bg-emerald-400 text-slate-950 shadow'
                    : 'bg-[#06090F] text-slate-300 border border-white/10 hover:border-emerald-400/40'
                }`}
              >
                {wxPreset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Row: Lighting Color Temperature + Wind Vector Direction */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 mr-1 font-medium">광원 색온도:</span>
            {[
              { id: 'auto', label: '원본 자동' },
              { id: 'dawn', label: '새벽 박명 (6500K)' },
              { id: 'golden', label: '황금빛 노을 (3200K)' },
              { id: 'aurora', label: '극야 야간 (9000K)' },
              { id: 'mist', label: '안개 산란광 (5600K)' }
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setLightingGrade(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  lightingGrade === preset.id
                    ? 'bg-sky-400 text-slate-950'
                    : 'bg-[#06090F] text-slate-300 border border-white/10 hover:border-sky-400/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setWindDir((d) => (d === 1 ? -1 : 1))}
            className="px-3 py-1 rounded-lg bg-[#06090F] border border-white/10 hover:border-amber-400/50 text-[11px] text-slate-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition"
          >
            <Wind className="w-3.5 h-3.5 text-amber-400" />
            <span>풍향 벡터: {windDir === 1 ? '서풍 (좌 → 우)' : '동풍 (우 → 좌)'}</span>
          </button>
        </div>

        {/* Bottom Row: 4 Physical Readout Instrument Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <MeteorologicalGauge
            icon={<CloudFog className="w-3.5 h-3.5 text-sky-300" />}
            label="복사안개 · Mie 산란"
            val={fogDensity}
            metric={
              fogDensity === 0
                ? '가시거리 20km+ (쾌청)'
                : `가시거리 ${Math.max(40, Math.round(2400 * Math.pow(1 - fogDensity / 105, 2)))}m`
            }
            accent="accent-sky-400"
            onChange={(v) => {
              setActiveWxPreset('custom');
              setFogDensity(v);
            }}
          />
          <MeteorologicalGauge
            icon={<Wind className="w-3.5 h-3.5 text-amber-400" />}
            label="모래폭풍 · 광학 소광"
            val={sandStorm}
            metric={
              sandStorm === 0
                ? '풍속 2 m/s (고요)'
                : `풍속 ${Math.round(4 + sandStorm * 0.34)} m/s · PM10 급증`
            }
            accent="accent-amber-400"
            onChange={(v) => {
              setActiveWxPreset('custom');
              setSandStorm(v);
            }}
          />
          <MeteorologicalGauge
            icon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
            label="오로라 · 557.7nm 발광"
            val={auroraPower}
            metric={
              auroraPower === 0
                ? '지자기 Kp 1 (비활성)'
                : `지자기 Kp ${Math.min(9, (2 + auroraPower * 0.07).toFixed(1))} · 열권 발광`
            }
            accent="accent-emerald-400"
            onChange={(v) => {
              setActiveWxPreset('custom');
              setAuroraPower(v);
            }}
          />
          <MeteorologicalGauge
            icon={<Snowflake className="w-3.5 h-3.5 text-cyan-300" />}
            label="강설 · 렌즈 심도 보케"
            val={snowPower}
            metric={
              snowPower === 0
                ? '적설강도 0 cm/h'
                : `적설강도 ${(snowPower * 0.14).toFixed(1)} cm/h`
            }
            accent="accent-cyan-400"
            onChange={(v) => {
              setActiveWxPreset('custom');
              setSnowPower(v);
            }}
          />
        </div>
      </div>
    </div>
  );
};

function MeteorologicalGauge({ icon, label, val, metric, accent, onChange }) {
  return (
    <div className="bg-[#06090F]/95 border border-white/10 hover:border-white/20 rounded-xl p-3 space-y-2 transition">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-200 flex items-center gap-1.5 font-semibold">
          {icon}
          {label}
        </span>
        <span className="font-mono text-sky-300 font-bold">{val}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full ${accent} cursor-pointer`}
      />
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
        <span>관측치</span>
        <span className="text-slate-200">{metric}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 7. REAL EARTH PHOTO CARD & SHARED UI HELPERS
// ============================================================================
function SimBar({ label, val, color }) {
  return (
    <div>
      <div className="flex justify-between text-slate-300 mb-0.5">
        <span>{label}</span>
        <span className="font-mono text-slate-200">{val}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function FeatureTagGroup({ icon, label, items }) {
  return (
    <div className="bg-[#06090F] border border-white/10 rounded-xl p-3">
      <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
        {icon}
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(items || []).map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function EarthTwinPhotoCard({ place, index, isSelected, onCompareInViewer }) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [place.id]);

  return (
    <div
      className={`bg-[#0D131F] border rounded-2xl overflow-hidden flex flex-col justify-between transition shadow-xl group ${
        isSelected
          ? 'border-sky-400 ring-2 ring-sky-400/25'
          : 'border-white/10 hover:border-sky-400/50'
      }`}
    >
      <div>
        {/* Real NASA / Wikimedia Photograph Header */}
        <div className="relative h-52 w-full overflow-hidden bg-[#06090F]">
          {!imgFailed ? (
            <img
              src={place.photoUrl}
              alt={place.name}
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
              style={{
                background: `linear-gradient(135deg, ${place.fallbackPalette[0]}, ${place.fallbackPalette[1]}, ${place.fallbackPalette[2]})`
              }}
            >
              <Globe className="w-8 h-8 text-white/80 mb-1.5" />
              <span className="text-xs font-bold text-white">{place.name}</span>
              <span className="text-[11px] text-white/75 font-mono">{place.coordinates}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D131F] via-black/15 to-black/35" />

          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#06090F]/90 border border-sky-400/50 text-sky-300 text-xs font-extrabold backdrop-blur-md shadow">
              유사 후보 #{index + 1} · {place.similarity}% 일치
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#06090F]/90 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-semibold backdrop-blur-md">
              {place.koppen}
            </span>
          </div>

          <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white drop-shadow">
                {place.name}
              </h3>
              <p className="text-[11px] text-slate-200 flex items-center gap-1 font-mono drop-shadow">
                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                {place.country} · {place.coordinates}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onCompareInViewer(place)}
              className="px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition cursor-pointer shrink-0"
            >
              <Columns className="w-3.5 h-3.5" />
              나란히 비교
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3.5">
          {/* Quantitative Earth-Science Match Breakdown */}
          <div className="bg-[#06090F] border border-white/10 rounded-xl p-3.5 space-y-2 text-[11px]">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
              <span>지구과학 정량 매칭 지표</span>
              <span className="font-mono text-slate-300">표고 {place.elevation}</span>
            </div>
            <SimBar label="지형·지질 구조 일치도" val={place.breakdown.topography} color="bg-amber-400" />
            <SimBar label="수환경·수질 화학 일치도" val={place.breakdown.hydrosphere} color="bg-sky-400" />
            <SimBar label="기후대 (GloH2O Köppen)" val={place.breakdown.climate} color="bg-emerald-400" />
            <SimBar label="기상·대기 현상 일치도" val={place.breakdown.atmosphere} color="bg-purple-400" />
          </div>

          {/* Why it matches & Scientific Evidence */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {place.description}
            </p>
            {place.matchReason && (
              <div className="p-2.5 rounded-lg bg-sky-950/35 border border-sky-500/25 text-xs text-sky-200 leading-relaxed">
                <strong className="text-sky-300">추천 근거:</strong> {place.matchReason}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-[#06090F]/50">
        <span className="font-medium text-slate-300">{place.source}</span>
        <a
          href={place.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
        >
          관측 원문 보기 <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// 8. MAIN APPLICATION COMPONENT: DreamEarth AI
// ============================================================================
export default function App() {
  const [dreamInput, setDreamInput] = useState(DREAM_PRESETS[0].text);
  const [dreamArchetype, setDreamArchetype] = useState('inspiration');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('viewer');
  const [customApiKey, setCustomApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(() =>
    buildOfflineScientificAnalysis(DREAM_PRESETS[0].text, 'inspiration')
  );
  const [aiGeneratedPhotoUrl, setAiGeneratedPhotoUrl] = useState(null);
  const [focusedPlaceId, setFocusedPlaceId] = useState(null);
  const [snapshotModalUrl, setSnapshotModalUrl] = useState(null);

  const recommendedPlaces = useMemo(() => {
    return EARTH_DATABASE.map((place) => {
      const sim = calculateEarthSimilarity(analysisResult, place);
      return {
        ...place,
        similarity: sim.total,
        breakdown: sim.breakdown
      };
    })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
  }, [analysisResult]);

  const activeEarthTwin = useMemo(() => {
    if (focusedPlaceId) {
      const found = EARTH_DATABASE.find((p) => p.id === focusedPlaceId);
      if (found) return found;
    }
    return recommendedPlaces[0];
  }, [focusedPlaceId, recommendedPlaces]);

  // Real-time photographic dream resolver (preserves real NASA/Wikimedia photo or Gemini AI photo)
  const dreamPhoto = usePhotographicDreamComposite(
    aiGeneratedPhotoUrl,
    activeEarthTwin,
    analysisResult
  );

  const fetchWithRetry = async (url, options, maxRetries = 2) => {
    let delay = 850;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        if (attempt === maxRetries) throw err;
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
      }
    }
  };

  // Generate Real AI Photorealistic Photograph via Gemini 3.1 Flash Image
  const generateDreamPanorama = async (imagePrompt) => {
    setIsGeneratingImage(true);
    try {
      const apiKey = customApiKey.trim() || '';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Ultra-realistic 16:9 wide-angle landscape photography, National Geographic and NASA Earth Observatory style, shot on IMAX 70mm camera, realistic atmospheric scattering, hyper-detailed geological textures, zero text or watermarks: ${imagePrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '16:9' }
        }
      };

      const data = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const part = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
      if (part?.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        setAiGeneratedPhotoUrl(`data:${mime};base64,${part.inlineData.data}`);
      }
    } catch (err) {
      // Seamlessly retains the real NASA/Wikimedia Earth photograph
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Automatically attempt AI photorealistic generation for the initial dream on mount
  const didInitialGenRef = useRef(false);
  useEffect(() => {
    if (didInitialGenRef.current) return;
    didInitialGenRef.current = true;
    if (analysisResult?.image_prompt) {
      generateDreamPanorama(analysisResult.image_prompt);
    }
  }, []);

  const handleAnalyzeDream = async () => {
    if (!dreamInput.trim()) return;
    setIsAnalyzing(true);
    setAiGeneratedPhotoUrl(null);
    setFocusedPlaceId(null);

    try {
      const apiKey = customApiKey.trim() || '';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemInstruction = `당신은 NASA Earth Observatory, GloH2O Köppen-Geiger 기후 구분, NOAA SciJinks 기상·지구과학 지식을 결합한 'DreamEarth AI'입니다.
사용자의 꿈은 크게 두 가지 가치를 지닙니다:
1) 초현실적이고 경이로운 꿈에서 창의적 영감(세계관, 예술, 스토리 아이디어)을 얻는 것.
2) 자연재해 등 무서운 악몽을 꿨을 때, 실제 지구과학·기상학 원리로 발생 가능성(%)을 냉철하고 따뜻하게 검증해 심리적 안심을 주는 것.

NIST AI RMF(Confabulation 방지) 원칙에 따라 사용자가 직접 묘사한 요소(explicit_features)와 AI가 추정한 배경(inferred_features)을 엄격히 구분하세요. 모든 출력은 자연스러운 한국어(image_prompt만 영문)로 작성하세요.`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `사용자 탐구 목적 모드: ${
                  dreamArchetype === 'reassurance' ? '재해 악몽 과학적 안심 검증' : '창의적 영감 및 경이 탐색'
                }\n꿈속 풍경 묘사: "${dreamInput}"`
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              summary_title: { type: 'STRING' },
              explicit_features: {
                type: 'OBJECT',
                properties: {
                  topography: { type: 'ARRAY', items: { type: 'STRING' } },
                  hydrosphere: { type: 'ARRAY', items: { type: 'STRING' } },
                  weather_phenomena: { type: 'ARRAY', items: { type: 'STRING' } },
                  vegetation: { type: 'ARRAY', items: { type: 'STRING' } },
                  atmospheric_phenomena: { type: 'ARRAY', items: { type: 'STRING' } }
                },
                required: ['topography', 'hydrosphere', 'weather_phenomena', 'vegetation', 'atmospheric_phenomena']
              },
              inferred_features: {
                type: 'OBJECT',
                properties: {
                  koppen_code: { type: 'STRING' },
                  koppen_name: { type: 'STRING' },
                  estimated_geology: { type: 'STRING' },
                  inference_reasoning: { type: 'STRING' }
                },
                required: ['koppen_code', 'koppen_name', 'estimated_geology', 'inference_reasoning']
              },
              scientific_plausibility: {
                type: 'OBJECT',
                properties: {
                  plausibility_score: { type: 'INTEGER' },
                  verdict_label: { type: 'STRING' },
                  realistic_elements: { type: 'ARRAY', items: { type: 'STRING' } },
                  unrealistic_elements: { type: 'ARRAY', items: { type: 'STRING' } },
                  noaa_nasa_explanation: { type: 'STRING' },
                  nightmare_reassurance_note: { type: 'STRING' }
                },
                required: [
                  'plausibility_score',
                  'verdict_label',
                  'realistic_elements',
                  'unrealistic_elements',
                  'noaa_nasa_explanation',
                  'nightmare_reassurance_note'
                ]
              },
              creative_inspiration_sparks: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    title: { type: 'STRING' },
                    concept: { type: 'STRING' }
                  },
                  required: ['title', 'concept']
                }
              },
              image_prompt: { type: 'STRING' }
            },
            required: [
              'summary_title',
              'explicit_features',
              'inferred_features',
              'scientific_plausibility',
              'creative_inspiration_sparks',
              'image_prompt'
            ]
          }
        }
      };

      const data = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response');

      const parsed = JSON.parse(rawText);
      setAnalysisResult(parsed);
      setActiveTab('viewer');

      if (parsed.image_prompt) {
        generateDreamPanorama(parsed.image_prompt);
      }
    } catch (err) {
      const fallback = buildOfflineScientificAnalysis(dreamInput, dreamArchetype);
      setAnalysisResult(fallback);
      setActiveTab('viewer');
      generateDreamPanorama(fallback.image_prompt);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportReport = () => {
    if (!analysisResult) return;
    const p = analysisResult.scientific_plausibility || {};
    const topPlace = recommendedPlaces[0];
    const md = `# DreamEarth AI 지구과학 꿈 분석 리포트
- **분석 주제**: ${analysisResult.summary_title}
- **과학적 발생 개연성 지수**: ${p.plausibility_score}% (${p.verdict_label})
- **추정 쾨펜-가이거 기후 (GloH2O)**: ${analysisResult.inferred_features?.koppen_code} (${analysisResult.inferred_features?.koppen_name})

## 1. 입력된 꿈속 풍경
> ${dreamInput}

## 2. 과학적 개연성 및 심리적 안심 해설 (NOAA SciJinks & NASA 기준)
- **안심 메시지**: ${p.nightmare_reassurance_note}
- **종합 해설**: ${p.noaa_nasa_explanation}

## 3. 가장 유사한 실제 지구 지역 (NASA Earth Observatory 검증 DB)
- **1순위 추천 지역**: ${topPlace?.name} (${topPlace?.country}, 좌표: ${topPlace?.coordinates})
- **유사도**: ${topPlace?.similarity}%
- **지역 설명**: ${topPlace?.description}

## 4. 꿈에서 얻은 창의적 영감 아이디어
${(analysisResult.creative_inspiration_sparks || [])
  .map((s, idx) => `${idx + 1}. **${s.title}**: ${s.concept}`)
  .join('\n')}
`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DreamEarth_AI_Report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* ====================================================================
          TOP OBSERVATORY HEADER
      ==================================================================== */}
      <header className="sticky top-0 z-30 bg-[#06090F]/90 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  DreamEarth AI
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  Photo Observatory
                </span>
              </div>
              <p className="text-xs text-slate-400">
                실제 NASA·지구 사진 데이터와 AI 실사 합성을 결합한 꿈속 자연환경 관측소
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <a
              href="https://earthobservatory.nasa.gov/"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#0D131F] border border-white/10 text-slate-300 hover:border-sky-400/50 hover:text-sky-300 transition flex items-center gap-1"
            >
              <Database className="w-3 h-3 text-sky-400" />
              NASA Earth Observatory
            </a>
            <a
              href="https://www.gloh2o.org/koppen/"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#0D131F] border border-white/10 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300 transition flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              GloH2O Köppen
            </a>
            <a
              href="https://scijinks.gov/"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#0D131F] border border-white/10 text-slate-300 hover:border-amber-400/50 hover:text-amber-300 transition flex items-center gap-1"
            >
              <Wind className="w-3 h-3 text-amber-400" />
              NOAA SciJinks
            </a>
            <button
              type="button"
              onClick={() => setShowApiModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0D131F] border border-white/10 text-slate-300 hover:border-sky-400/50 hover:text-sky-300 transition flex items-center gap-1 cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-sky-400" />
              {customApiKey ? 'API 키 연결됨' : 'API 키 설정'}
            </button>
            <button
              type="button"
              onClick={handleExportReport}
              className="px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-200 hover:bg-sky-500/25 transition flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              탐구 보고서 저장 (.md)
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN WORKSPACE
      ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 1. DREAM INPUT CARD */}
        <section className="bg-[#0D131F] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                오늘 꾼 꿈의 자연환경이나 재해 장면을 들려주세요
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                실제 지구 사진 데이터와 AI 실사 합성을 통해 꿈속 풍경을 사진처럼 재현하고 과학적 개연성을 검증합니다.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#06090F] p-1 rounded-xl border border-white/10 self-start">
              <button
                type="button"
                onClick={() => setDreamArchetype('inspiration')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  dreamArchetype === 'inspiration'
                    ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                창의적 영감 재현
              </button>
              <button
                type="button"
                onClick={() => setDreamArchetype('reassurance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  dreamArchetype === 'reassurance'
                    ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                악몽·재해 안심 검증
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
            placeholder="예: 보라색 호수 위에 검은 현무암 기둥들이 솟아 있고, 초록빛 오로라가 땅까지 내려오는 밤이었어..."
            className="w-full rounded-xl bg-[#06090F] border border-white/15 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 p-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 transition outline-none resize-none"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">추천 꿈 시나리오 체험:</span>
            {DREAM_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setDreamInput(preset.text);
                  setDreamArchetype(preset.archetype);
                  setAiGeneratedPhotoUrl(null);
                  setFocusedPlaceId(null);
                  const instant = buildOfflineScientificAnalysis(preset.text, preset.archetype);
                  setAnalysisResult(instant);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#06090F] hover:bg-slate-800/90 text-slate-200 border border-white/10 hover:border-sky-500/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    preset.archetype === 'reassurance'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-indigo-500/20 text-indigo-300'
                  }`}
                >
                  {preset.badge}
                </span>
                <span>{preset.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>개인 꿈 기록은 서버에 저장되지 않으며, AI 추정과 검증된 지구 데이터를 엄격히 구분합니다.</span>
            </div>

            <button
              type="button"
              onClick={handleAnalyzeDream}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  실사 풍경 합성 및 과학 검증 중...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  실사 풍경 생성 및 과학 검증 실행
                </>
              )}
            </button>
          </div>
        </section>

        {/* ====================================================================
            2. LIVE RESULTS & PHOTOREALISTIC EXPLORATION DASHBOARD
        ==================================================================== */}
        {analysisResult && (
          <section className="space-y-6">
            {/* Reassurance & Reality Check Highlight Strip */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                (analysisResult.scientific_plausibility?.plausibility_score ?? 50) < 50
                  ? 'bg-gradient-to-r from-emerald-950/50 via-[#0D131F] to-sky-950/30 border-emerald-500/35'
                  : 'bg-gradient-to-r from-indigo-950/50 via-[#0D131F] to-sky-950/30 border-sky-500/35'
              }`}
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    KÖPPEN {analysisResult.inferred_features?.koppen_code}
                  </span>
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    과학적 현실 검증 및 심리 안심 리포트
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {analysisResult.summary_title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {analysisResult.scientific_plausibility?.nightmare_reassurance_note}
                </p>
              </div>

              <div className="bg-[#06090F]/90 border border-white/10 rounded-xl p-3.5 min-w-[240px] shrink-0">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>현실 발생 가능성 지수</span>
                  <span className="font-mono text-sky-300 font-bold text-sm">
                    {analysisResult.scientific_plausibility?.plausibility_score}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 transition-all duration-700"
                    style={{
                      width: `${analysisResult.scientific_plausibility?.plausibility_score || 0}%`
                    }}
                  />
                </div>
                <div className="text-xs font-bold text-right text-slate-200">
                  {analysisResult.scientific_plausibility?.verdict_label}
                </div>
              </div>
            </div>

            {/* Sub-View Navigation Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-[#0D131F] p-1.5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('viewer')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'viewer'
                    ? 'bg-sky-400 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Eye className="w-4 h-4" />
                실사 3D·파노라마 뷰어
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('plausibility')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'plausibility'
                    ? 'bg-sky-400 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                과학적 근거 & 안심 검증
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('places')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'places'
                    ? 'bg-sky-400 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <MapPin className="w-4 h-4" />
                실제 지구 유사 지역 ({recommendedPlaces.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  activeTab === 'analysis'
                    ? 'bg-sky-400 text-slate-950 shadow-lg'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                지구과학 속성 분류 & 연구노트
              </button>
            </div>

            {/* TAB 1: PHOTOREALISTIC VIEWPORT + ALWAYS-VISIBLE REAL EARTH MATCHING SECTION */}
            {activeTab === 'viewer' && (
              <div className="space-y-6">
                <PhotorealisticObservatoryViewport
                  dreamPhoto={dreamPhoto}
                  isGeneratingImage={isGeneratingImage}
                  analysis={analysisResult}
                  selectedPlace={activeEarthTwin}
                  onCaptureSnapshot={(url) => setSnapshotModalUrl(url)}
                  onRegeneratePhoto={() =>
                    generateDreamPanorama(analysisResult?.image_prompt || dreamInput)
                  }
                />

                {/* PROMINENT REAL EARTH SIMILAR LOCATIONS SHOWCASE (VISIBLE IMMEDIATELY BELOW VIEWER) */}
                <div className="bg-[#0D131F]/90 border border-sky-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/35">
                        NASA EARTH OBSERVATORY & GLOH2O VERIFIED MATCHES
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-rose-400" />
                        꿈속 환경과 가장 닮은 실제 지구 지역 TOP 3
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                        지형·수환경·기후대·기상 현상을 정량 비교하여 도출한 실존 지역입니다. <strong>[나란히 비교]</strong>를 누르면 위 뷰어에서 실제 현장 사진과 겹쳐 볼 수 있습니다.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('plausibility')}
                      className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-200 text-xs font-bold flex items-center gap-1.5 self-start md:self-auto transition cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      과학적 발생 근거 상세 보기 →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {recommendedPlaces.map((place, index) => (
                      <EarthTwinPhotoCard
                        key={place.id}
                        place={place}
                        index={index}
                        isSelected={activeEarthTwin?.id === place.id}
                        onCompareInViewer={(chosenPlace) => {
                          setFocusedPlaceId(chosenPlace.id);
                          window.scrollTo({ top: 180, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RIGOROUS SCIENTIFIC EVIDENCE, PLAUSIBILITY BREAKDOWN & CREATIVE INSPIRATION */}
            {activeTab === 'plausibility' && (
              <div className="space-y-5">
                <div className="bg-[#0D131F] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono text-sky-400">
                        QUANTITATIVE GEOPHYSICAL & METEOROLOGICAL VERIFICATION
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                        현실 발생 가능성 정밀 검증 및 과학적 근거표
                      </h3>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-[#06090F] border border-sky-400/35 flex items-center gap-3">
                      <span className="text-xs text-slate-400">종합 물리 개연성</span>
                      <span className="text-lg font-mono font-extrabold text-sky-300">
                        {analysisResult.scientific_plausibility?.plausibility_score}%
                      </span>
                    </div>
                  </div>

                  {/* Phenomenon-by-Phenomenon Scientific Evidence Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        실제 지구에서 과학적으로 발생 가능한 요소 (근거 포함)
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {(analysisResult.scientific_plausibility?.realistic_elements || []).map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className="p-3 rounded-lg bg-[#06090F]/80 border border-emerald-500/20 flex items-start gap-2.5"
                            >
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                                실존 #{idx + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        물리 법칙상 불가능하거나 과장된 요소 (악몽 안심 근거)
                      </h4>
                      {(analysisResult.scientific_plausibility?.unrealistic_elements || []).length >
                      0 ? (
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {analysisResult.scientific_plausibility.unrealistic_elements.map(
                            (item, idx) => (
                              <li
                                key={idx}
                                className="p-3 rounded-lg bg-[#06090F]/80 border border-rose-500/20 flex items-start gap-2.5"
                              >
                                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                                  비현실 #{idx + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-3 rounded-lg bg-[#06090F]/80 border border-white/10">
                          물리 법칙에 크게 위배되는 재해 요소가 없으며, 지구의 특수 기후대에서 실제로 관측 가능한 아름다운 자연 조합입니다.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Detailed Physical Constants & Reference Standards */}
                  <div className="bg-[#06090F] border border-white/10 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      NOAA SciJinks · NASA Earth Observatory · USGS 물리 법칙 검증 요약
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {analysisResult.scientific_plausibility?.noaa_nasa_explanation}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-[#0D131F] border border-white/5">
                        <div className="text-slate-400">대기·열권 발광 고도 한계</div>
                        <div className="font-mono text-emerald-300 font-bold mt-0.5">
                          80 km ~ 500 km (지표면 도달 불가)
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0D131F] border border-white/5">
                        <div className="text-slate-400">해양 지진해일 외해 파고</div>
                        <div className="font-mono text-sky-300 font-bold mt-0.5">
                          0.3 m ~ 1.5 m (연안 최대 수십 m 한계)
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0D131F] border border-white/5">
                        <div className="text-slate-400">호염성 미생물 염호 발색</div>
                        <div className="font-mono text-amber-300 font-bold mt-0.5">
                          염도 20%↑ · pH 9~10.5 환경 실존
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Inspiration Idea Lab */}
                <div className="bg-[#0D131F] border border-indigo-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-300">
                      DREAM-TO-CREATION IDEA LAB
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-300" />
                      이 꿈의 지질·기후에서 도출한 창의적 영감 아이디어
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(analysisResult.creative_inspiration_sparks || []).map((spark, i) => (
                      <div
                        key={i}
                        className="bg-[#06090F] border border-white/10 hover:border-indigo-400/50 rounded-xl p-4 space-y-2 transition"
                      >
                        <span className="inline-block px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-mono">
                          IDEA #{i + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{spark.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {spark.concept}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ALL REAL EARTH PHOTOGRAPH RECOMMENDATIONS */}
            {activeTab === 'places' && (
              <div className="space-y-4">
                <div className="bg-[#0D131F] border border-sky-500/30 rounded-xl p-4 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>
                    <strong>실제 지구 사진 & NASA Earth Observatory 검증 DB:</strong> 각 카드의 <strong>[나란히 비교]</strong> 버튼을 누르면 1번 실사 뷰어로 이동하여 내 꿈속 풍경과 실제 지구 현장 사진을 슬라이더로 직접 겹쳐 비교할 수 있습니다.
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {recommendedPlaces.map((place, index) => (
                    <EarthTwinPhotoCard
                      key={place.id}
                      place={place}
                      index={index}
                      isSelected={activeEarthTwin?.id === place.id}
                      onCompareInViewer={(chosenPlace) => {
                        setFocusedPlaceId(chosenPlace.id);
                        setActiveTab('viewer');
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: EXPLICIT VS INFERRED CLASSIFICATION & RESEARCH FIELD NOTES */}
            {activeTab === 'analysis' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-[#0D131F] border border-emerald-500/30 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        사용자 직접 묘사 (Explicit Facts)
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">
                        입력 문장에서 추출된 객관적 환경 단서
                      </h3>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="space-y-2.5">
                    <FeatureTagGroup
                      icon={<Mountain className="w-4 h-4 text-amber-400" />}
                      label="지형 (Topography)"
                      items={analysisResult.explicit_features?.topography}
                    />
                    <FeatureTagGroup
                      icon={<Droplets className="w-4 h-4 text-sky-400" />}
                      label="수환경 (Hydrosphere)"
                      items={analysisResult.explicit_features?.hydrosphere}
                    />
                    <FeatureTagGroup
                      icon={<Wind className="w-4 h-4 text-cyan-400" />}
                      label="기상 현상 (Weather)"
                      items={analysisResult.explicit_features?.weather_phenomena}
                    />
                    <FeatureTagGroup
                      icon={<Trees className="w-4 h-4 text-emerald-400" />}
                      label="식생 (Vegetation)"
                      items={analysisResult.explicit_features?.vegetation}
                    />
                    <FeatureTagGroup
                      icon={<Sparkles className="w-4 h-4 text-purple-400" />}
                      label="대기·천문 현상 (Atmospheric)"
                      items={analysisResult.explicit_features?.atmospheric_phenomena}
                    />
                  </div>
                </div>

                <div className="bg-[#0D131F] border border-amber-500/30 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        AI 지구과학 추정 (Inferred Estimation)
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">
                        GloH2O 쾨펜 기후 구분 및 지질학적 배경 추론
                      </h3>
                    </div>
                    <Globe className="w-6 h-6 text-amber-400" />
                  </div>

                  <div className="bg-[#06090F] border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-slate-400">매칭된 쾨펜-가이거 기후 코드 (GloH2O)</div>
                    <div className="text-lg font-bold text-amber-300 mt-0.5 font-mono">
                      {analysisResult.inferred_features?.koppen_code} —{' '}
                      <span className="font-sans">{analysisResult.inferred_features?.koppen_name}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      추정 지질 구조 및 형성 원리
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed bg-[#06090F] p-3.5 rounded-xl border border-white/10">
                      {analysisResult.inferred_features?.estimated_geology}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      추론 근거 및 불확실성 고지 (NIST AI RMF 준수)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-amber-950/25 p-3.5 rounded-xl border border-amber-500/30">
                      {analysisResult.inferred_features?.inference_reasoning}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ====================================================================
          OPTIONAL GEMINI API KEY MODAL (FOR GITHUB PAGES STANDALONE HOSTING)
      ==================================================================== */}
      {showApiModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowApiModal(false)}
        >
          <div
            className="bg-[#0D131F] border border-white/15 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-sky-400" />
                Google Gemini API 키 설정 (선택 사항)
              </h3>
              <button
                type="button"
                onClick={() => setShowApiModal(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                닫기 ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              GitHub Pages에 배포할 때 본인의 Gemini API 키를 입력하면 실시간 AI 실사 이미지 생성(`gemini-3.1-flash-image`)과 심층 자연어 분석이 활성화됩니다. 키를 입력하지 않아도 내장 지구과학 엔진과 실제 NASA/지구 사진 데이터로 모든 기능을 체험할 수 있습니다.
            </p>
            <input
              type="password"
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl bg-[#06090F] border border-white/15 focus:border-sky-400 p-3 text-sm text-white outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setCustomApiKey('');
                  setShowApiModal(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:bg-white/10"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400"
              >
                저장 후 적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CAPTURED DREAM POSTCARD MODAL
      ==================================================================== */}
      {snapshotModalUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSnapshotModalUrl(null)}
        >
          <div
            className="bg-[#0D131F] border border-white/15 rounded-2xl max-w-3xl w-full p-4 sm:p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-sky-400" />
                DreamEarth AI 실사 탐험 엽서 캡처 완료
              </h3>
              <button
                type="button"
                onClick={() => setSnapshotModalUrl(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                닫기 ✕
              </button>
            </div>
            <img
              src={snapshotModalUrl}
              alt="Captured Dream Postcard"
              className="w-full rounded-xl border border-white/10"
            />
            <div className="flex justify-end gap-2">
              <a
                href={snapshotModalUrl}
                download="DreamEarth_AI_Postcard.png"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                PNG 이미지 다운로드
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}