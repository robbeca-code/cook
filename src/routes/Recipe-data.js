let recipe = [
  {
    id: 0,
    kind: 'tuna',
    img: '/public-assets/recipe/참치계란밥.png',
    img_alt: '참치계란밥',
    title: '참치계란밥',
    heart: '526',
    level: '하',
    time: '10분'
  },
  {
    id: 1,
    kind: 'tuna',
    img: '/public-assets/recipe/참치마요덮밥.png',
    img_alt: '참치마요덮밥',
    title: '참치마요덮밥',
    heart: '316',
    level: '하',
    time: '10분'
  },
  {
    id: 2,
    kind: 'tuna',
    img: '/public-assets/recipe/참치카나페.png',
    img_alt: '참치카나페',
    title: '참치카나페',
    heart: '526',
    level: '하',
    time: '10분'
  },
  {
    id: 3,
    kind: 'spam',
    img: '/public-assets/recipe/스팸떡갈비.png',
    img_alt: '스팸떡갈비',
    title: '스팸떡갈비',
    heart: '75',
    level: '중',
    time: '30분'
  },
  {
    id: 4,
    kind: 'spam',
    img: '/public-assets/recipe/스팸치즈토스트.png',
    img_alt: '스팸치즈토스트',
    title: '스팸 치즈 토스트',
    heart: '102',
    level: '하',
    time: '15분'
  },
  {
    id: 5,
    kind: 'spam',
    img: '/public-assets/recipe/스팸동.png',
    img_alt: '스팸동',
    title: '스팸동',
    heart: '316',
    level: '하',
    time: '20분'
  },
  {
    id: 6,
    kind: 'kimchi',
    img: '/public-assets/recipe/김치찌개.png',
    img_alt: '김치찌개',
    title: '김치찌개',
    heart: '75',
    level: '중',
    time: '30분'
  },
  {
    id: 7,
    kind: 'kimchi',
    img: '/public-assets/recipe/김치찜.png',
    img_alt: '김치찜',
    title: '김치찜',
    heart: '102',
    level: '하',
    time: '15분'
  },
  {
    id: 8,
    kind: 'kimchi',
    img: '/public-assets/recipe/김치말이국수.png',
    img_alt: '김치말이국수',
    title: '김치말이국수',
    heart: '316',
    level: '하',
    time: '20분'
  },
  {
    id: 9,
    kind: 'dumpling',
    img: '/public-assets/recipe/떡만두국.png',
    img_alt: '떡만두국',
    title: '떡만두국',
    heart: '75',
    level: '중',
    time: '30분'
  },
  {
    id: 10,
    kind: 'dumpling',
    img: '/public-assets/recipe/만두전.png',
    img_alt: '만두전',
    title: '만두전',
    heart: '102',
    level: '하',
    time: '15분'
  },
  {
    id: 11,
    kind: 'dumpling',
    img: '/public-assets/recipe/깐풍만두.png',
    img_alt: '깐풍만두',
    title: '깐풍만두',
    heart: '316',
    level: '하',
    time: '20분'
  },
  {
    id: 9,
    kind: 'ramen',
    img: '/public-assets/recipe/냉라면.png',
    img_alt: '냉라면',
    title: '냉라면',
    heart: '75',
    level: '중',
    time: '30분'
  },
  {
    id: 10,
    kind: 'ramen',
    img: '/public-assets/recipe/라면그라탕.png',
    img_alt: '라면그라탕',
    title: '라면그라탕',
    heart: '102',
    level: '하',
    time: '15분'
  },
  {
    id: 11,
    kind: 'ramen',
    img: '/public-assets/recipe/투움바라면.png',
    img_alt: '투움바라면',
    title: '투움바라면',
    heart: '316',
    level: '하',
    time: '20분'
  },
];

let tunaCan = [
  {
    id: 0,
    img: '/public-assets/recipe/참치계란밥.png',
    img_alt: '참치계란밥',
    title: '참치계란밥',
    heart: '526',
    level: '하',
    time: '10분',
    author: '자취달인'
  },
  {
    id: 1,
    kind: 'tuna',
    img: '/public-assets/recipe/참치마요덮밥.png',
    img_alt: '참치마요덮밥',
    title: '참치마요덮밥',
    heart: '316',
    level: '하',
    time: '10분',
    author: '오늘한끼'
  },
  {
    id: 2,
    kind: 'tuna',
    img: '/public-assets/recipe/참치카나페.png',
    img_alt: '참치카나페',
    title: '참치카나페',
    heart: '526',
    level: '하',
    time: '10분',
    author: '손맛'
  },
  {
    id: 3,
    kind: 'tuna',
    img: '/public-assets/recipe/참치계란말이.png',
    img_alt: '참치계란말이',
    title: '참치계란말이',
    heart: '336',
    level: '하',
    time: '30분',
    author: '선생님'
  },
  {
    id: 4,
    kind: 'tuna',
    img: '/public-assets/recipe/참치전.png',
    img_alt: '참치전',
    title: '참치전',
    heart: '74',
    level: '하',
    time: '20분',
    author: '밥셰프'
  },
  {
    id: 5,
    kind: 'tuna',
    img: '/public-assets/recipe/참치계란죽.png',
    img_alt: '참치계란죽',
    title: '참치계란죽',
    heart: '134',
    level: '하',
    time: '30분',
    author: '오늘한끼'
  },
  {
    id: 6,
    kind: 'tuna',
    img: '/public-assets/recipe/참치샌드위치.png',
    img_alt: '참치샌드위치',
    title: '참치샌드위치',
    heart: '92',
    level: '하',
    time: '30분',
    author: '노란장미'
  },
  {
    id: 7,
    kind: 'tuna',
    img: '/public-assets/recipe/참치김밥.png',
    img_alt: '참치김밥',
    title: '참치김밥',
    heart: '322',
    level: '하',
    time: '30분',
    author: '윤씨네삼남매'
  },
  {
    id: 8,
    kind: 'tuna',
    img: '/public-assets/recipe/참치깻잎전.png',
    img_alt: '참치깻잎전',
    title: '참치깻잎전',
    heart: '32',
    level: '하',
    time: '30분',
    author: '즐거운날랄라'
  },
  {
    id: 9,
    kind: 'tuna',
    img: '/public-assets/recipe/참치마요밥버거.png',
    img_alt: '참치마요밥버거',
    title: '참치마요밥버거',
    heart: '231',
    level: '하',
    time: '30분',
    author: '좋아좋아3'
  }
];

export {recipe, tunaCan};