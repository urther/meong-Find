const users = [
  {
    id: 'ramndomda',
    email: 'ywc8851@naver.com',
    password: 'dyddn123',
    city: 'seoul',
    distrcit: 'gangnam-gu',
    nickname: '쪼용웅',
  },
  {
    id: 'asdffffwee',
    email: 'sian@naver.com',
    password: 'tldks123',
    city: 'seoul',
    distrcit: 'gangnam-gu',
    nickname: '박샤니',
  },
];
const posts = [
  {
    id: 'post1',
    userId: 'ramndomda',
    createdAt: '2021-01-12',
    images: [
      'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
      'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
    ],
    title: '저희 집 강아지 잃어버렸어요',
    animal: '강아지',
    type: 'siba',
    content: '집나간 강아지를 찾습니다',
    city: '부산광역시',
    district: '해운대구',
    comments: ['afsd', 'sadf'],
  },
  {
    id: 'post2',
    userId: 'asdffffwee',
    createdAt: '2021-01-12',
    images: ['https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg'],
    title: '우리애기 찾아주세요',
    animal: '고양이',
    type: 'siba',
    content: '집나간 강아지를 찾습니다',
    city: '서울특별시',
    district: '종로구',
    comments: ['afsd', 'sadf'],
  },
  {
    id: 'post3',
    userId: 'ramndomda',
    createdAt: '2021-01-12',
    images: ['https://image.msscdn.net/images/goods_img/20191216/1252014/1252014_1_500.jpg'],
    title: '귀여운 강쥐찾아주실분',
    animal: '기타',
    type: 'siba',
    content: '집나간 강아지를 찾습니다',
    city: '서울특별시',
    district: '강남구',
    comments: ['afsd', 'sadf'],
  },
];

module.exports = { users, posts };
