"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { MapLocation } from "./components/DayMap";

const DayMap = dynamic(() => import("./components/DayMap"), { ssr: false });

/* ─────────────────────── data ─────────────────────── */

interface TimeSlot {
  time: string;
  title: string;
  desc: string;
  icon: string;
  tip?: string;
  lat?: number;
  lng?: number;
}

interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  theme: string;
  themeIcon: string;
  color: string;
  slots: TimeSlot[];
}

const schedule: DayPlan[] = [
  {
    day: 1,
    date: "3월 3일",
    weekday: "월요일",
    theme: "출발 & 도착",
    themeIcon: "✈️",
    color: "from-rose-400 to-pink-500",
    slots: [
      {
        time: "01:50",
        title: "인천공항 출발",
        desc: "제주항공/비엣젯 직항 (약 5시간 30분)",
        icon: "🛫",
        tip: "퀸나연은 기내에서 잠을 자두세요! 석곰이도!",
      },
      {
        time: "05:20",
        title: "캄란(나트랑) 공항 도착",
        desc: "베트남 시간 기준 (한국 -2시간)",
        icon: "🛬",
        lat: 11.9981,
        lng: 109.2193,
      },
      {
        time: "06:30",
        title: "아나만다라 캄란 체크인",
        desc: "공항에서 리조트까지 약 20분 소요. 얼리체크인 요청 추천",
        icon: "🏨",
        tip: "얼리체크인이 안되면 짐 맡기고 조식부터!",
        lat: 12.0820,
        lng: 109.1943,
      },
      {
        time: "08:00",
        title: "리조트 조식",
        desc: "리조트 내 레스토랑에서 베트남 & 양식 뷔페",
        icon: "🍳",
      },
      {
        time: "10:00",
        title: "리조트 산책 & 휴식",
        desc: "프라이빗 비치 산책, 풀장에서 여유롭게",
        icon: "🏖️",
      },
      {
        time: "12:30",
        title: "점심 - 리조트 근처",
        desc: "리조트 내 레스토랑 또는 근처 로컬 식당",
        icon: "🍜",
      },
      {
        time: "14:00",
        title: "낮잠 & 휴식",
        desc: "비행 피로 회복! 퀸나연도 곰돌이도 충분히 쉬어주세요",
        icon: "😴",
      },
      {
        time: "16:30",
        title: "해변 산책 & 선셋",
        desc: "리조트 프라이빗 비치에서 일몰 감상",
        icon: "🌅",
      },
      {
        time: "18:30",
        title: "저녁 - Lanterns Restaurant",
        desc: "나트랑 인기 베트남 정통 레스토랑. 분위기 좋은 커플 맛집",
        icon: "🍽️",
        tip: "반미, 쌀국수, 스프링롤 추천!",
        lat: 12.2464,
        lng: 109.1960,
      },
      {
        time: "20:30",
        title: "나트랑 야경 산책",
        desc: "쩐푸 거리(Tran Phu St.) 해변도로 산책",
        icon: "🌙",
        lat: 12.2388,
        lng: 109.1968,
      },
    ],
  },
  {
    day: 2,
    date: "3월 4일",
    weekday: "화요일",
    theme: "나트랑 시내 맛집 투어",
    themeIcon: "🍜",
    color: "from-cyan-400 to-blue-500",
    slots: [
      {
        time: "08:00",
        title: "리조트 조식 & 출발 준비",
        desc: "가볍게 조식 후 나트랑 시내로 출발! (약 30분)",
        icon: "☀️",
        lat: 12.0820,
        lng: 109.1943,
      },
      {
        time: "09:30",
        title: "분짜까 응우옌론 (Bún Chả Cá Nguyên Loan)",
        desc: "나트랑 대표 로컬 음식 분짜까! 생선어묵 쌀국수",
        icon: "🍜",
        tip: "나트랑 현지인 소울푸드. 아침에 가야 줄이 짧아요!",
        lat: 12.2489,
        lng: 109.1878,
      },
      {
        time: "10:30",
        title: "콩카페 (Cong Caphe)",
        desc: "베트남 대표 감성카페. 코코넛커피 필수!",
        icon: "☕",
        tip: "코코넛커피(Cot Dua Ca Phe)가 시그니처!",
        lat: 12.2454,
        lng: 109.1935,
      },
      {
        time: "11:30",
        title: "마담프엉 (Madam Phuong)",
        desc: "나트랑 인기 베트남 레스토랑. 에어컨 완비, 깔끔한 분위기",
        icon: "🍽️",
        tip: "마담 볶음밥, 반쎄오, 분짜 추천!",
        lat: 12.2446,
        lng: 109.1928,
      },
      {
        time: "13:00",
        title: "촌촌킴 (Chuon Chuon Kim)",
        desc: "현지인 맛집! 베트남 가정식 백반. 미슐랭 추천",
        icon: "🥘",
        tip: "꼼빈잔(Com Binh Dan) 스타일 - 반찬 골라 담기",
        lat: 12.2471,
        lng: 109.1869,
      },
      {
        time: "14:30",
        title: "안토이 (Ăn Thôi)",
        desc: "미슐랭 빕구르망 선정! 베트남 퓨전 레스토랑",
        icon: "🏅",
        tip: "넴느엉(Nem Nướng), 반꾸온 추천. 예약 권장!",
        lat: 12.2462,
        lng: 109.1895,
      },
      {
        time: "16:00",
        title: "넴느엉 당반끄옌 (Nem Nướng Đặng Văn Quyên)",
        desc: "나트랑 넴느엉 원조 맛집. 숯불 돼지고기 꼬치구이",
        icon: "🥩",
        tip: "나트랑 3대 넴느엉 중 하나! 라이스페이퍼에 싸먹기",
        lat: 12.2488,
        lng: 109.1872,
      },
      {
        time: "17:30",
        title: "해변 산책 & 카페타임",
        desc: "쩐푸 해변도로 산책 후 감성카페에서 휴식",
        icon: "🌅",
        lat: 12.2388,
        lng: 109.1968,
      },
      {
        time: "19:00",
        title: "Lac Canh Restaurant",
        desc: "1975년 오픈한 전설의 숯불구이 맛집",
        icon: "🔥",
        tip: "소고기 숯불구이 + 새우 필수 주문!",
        lat: 12.2453,
        lng: 109.1921,
      },
      {
        time: "21:00",
        title: "나트랑 나이트마켓",
        desc: "야시장에서 디저트, 간식, 쇼핑으로 마무리",
        icon: "🏮",
        lat: 12.2445,
        lng: 109.1935,
      },
    ],
  },
  {
    day: 3,
    date: "3월 5일",
    weekday: "수요일",
    theme: "판랑 사막 일출",
    themeIcon: "🏜️",
    color: "from-amber-400 to-orange-500",
    slots: [
      {
        time: "03:30",
        title: "기상 & 출발 준비",
        desc: "판랑 사막까지 약 1시간 30분 소요",
        icon: "⏰",
        tip: "전날 일찍 자두세요! 따뜻한 겉옷 필수",
      },
      {
        time: "04:00",
        title: "판랑 사막으로 출발",
        desc: "택시/그랩 또는 투어 차량 (사전 예약 추천)",
        icon: "🚗",
        tip: "그랩보다는 호텔에서 차량 예약이 편해요",
      },
      {
        time: "05:30",
        title: "남끄엉 사막(Nam Cuong) 도착",
        desc: "일출 전 사막 포인트에서 대기",
        icon: "🏜️",
        lat: 11.5733,
        lng: 108.9872,
      },
      {
        time: "05:45",
        title: "사막 일출 감상",
        desc: "붉은 모래사막 위로 떠오르는 일출! 인생샷 타임",
        icon: "🌄",
        tip: "모래가 뜨거울 수 있으니 슬리퍼/운동화 준비",
      },
      {
        time: "07:00",
        title: "사막 포토타임",
        desc: "모래언덕 위에서 퀸나연 & 석곰이 커플 사진 촬영",
        icon: "📸",
      },
      {
        time: "08:30",
        title: "판랑 로컬 아침식사",
        desc: "판랑 시내에서 반깐(Banh Can) - 판랑 명물!",
        icon: "🥘",
        tip: "반깐은 판랑에서만 먹을 수 있는 특별한 음식!",
      },
      {
        time: "10:00",
        title: "복귀 & 호텔 휴식",
        desc: "리조트로 돌아와서 낮잠 & 수영",
        icon: "😴",
      },
      {
        time: "14:00",
        title: "나트랑 시내 탐방",
        desc: "포나가르 참탑, 롱선사 방문",
        icon: "🏛️",
        lat: 12.2654,
        lng: 109.1948,
      },
      {
        time: "16:00",
        title: "담 시장 (Dam Market)",
        desc: "로컬 시장에서 열대과일, 기념품 쇼핑",
        icon: "🛍️",
        tip: "흥정은 필수! 반값부터 시작하세요",
        lat: 12.2451,
        lng: 109.1881,
      },
      {
        time: "18:00",
        title: "저녁 - Lac Canh Restaurant",
        desc: "나트랑 전설의 숯불구이 맛집 (1975년 오픈)",
        icon: "🥩",
        tip: "소고기 숯불구이 + 새우 필수 주문!",
        lat: 12.2453,
        lng: 109.1921,
      },
      {
        time: "20:00",
        title: "나트랑 나이트마켓",
        desc: "야시장에서 간식, 쇼핑, 분위기 즐기기",
        icon: "🏮",
        lat: 12.2445,
        lng: 109.1935,
      },
    ],
  },
  {
    day: 4,
    date: "3월 6일",
    weekday: "목요일",
    theme: "나트랑 탐험",
    themeIcon: "🤿",
    color: "from-emerald-400 to-teal-500",
    slots: [
      {
        time: "07:30",
        title: "조식 & 준비",
        desc: "호텔 조식 후 나트랑 탐험 준비",
        icon: "🍳",
      },
      {
        time: "09:00",
        title: "호핑투어 출발",
        desc: "4개 섬 호핑투어: 혼문(Hon Mun), 혼못(Hon Mot) 등",
        icon: "⛵",
        tip: "스노쿨링 장비는 투어에 포함! 멀미약 챙기세요",
        lat: 12.2360,
        lng: 109.1970,
      },
      {
        time: "10:00",
        title: "스노쿨링 & 다이빙",
        desc: "혼문 섬 산호초 스노쿨링. 니모를 찾아보세요!",
        icon: "🐠",
      },
      {
        time: "12:00",
        title: "섬 위에서 점심",
        desc: "해산물 BBQ 점심 (투어 포함)",
        icon: "🦐",
      },
      {
        time: "14:00",
        title: "빈펄랜드 (VinWonders)",
        desc: "케이블카 타고 빈펄랜드로! 놀이기구 & 아쿠아리움",
        icon: "🎢",
        tip: "케이블카에서 보는 바다 전경이 최고!",
        lat: 12.2227,
        lng: 109.2340,
      },
      {
        time: "17:00",
        title: "카페 타임",
        desc: "나트랑 시내 감성카페에서 코코넛 커피",
        icon: "☕",
      },
      {
        time: "18:30",
        title: "저녁 - Sailing Club",
        desc: "나트랑 해변 유명 레스토랑 & 바. 라이브 음악과 함께",
        icon: "🍷",
        tip: "해변 테이블 예약 추천! 분위기 최고",
        lat: 12.2448,
        lng: 109.1955,
      },
      {
        time: "21:00",
        title: "해변 바에서 마무리",
        desc: "Sailing Club 또는 Louisiane Brewhouse에서 맥주 한잔",
        icon: "🍺",
      },
    ],
  },
  {
    day: 5,
    date: "3월 7일",
    weekday: "금요일",
    theme: "마지막 날 & 귀국",
    themeIcon: "💕",
    color: "from-violet-400 to-purple-500",
    slots: [
      {
        time: "08:00",
        title: "마지막 조식",
        desc: "퀸나연과 곰돌이의 리조트 마지막 아침. 여유롭게 즐기기",
        icon: "🌞",
      },
      {
        time: "10:00",
        title: "리조트 마지막 수영",
        desc: "체크아웃 전 마지막 풀장 & 비치 타임",
        icon: "🏊",
      },
      {
        time: "12:00",
        title: "체크아웃 & 짐 보관",
        desc: "호텔에 짐 맡기고 자유시간",
        icon: "🧳",
      },
      {
        time: "12:30",
        title: "점심 - Mix Restaurant",
        desc: "나트랑 인기 그리스/지중해 레스토랑",
        icon: "🥙",
        lat: 12.2486,
        lng: 109.1932,
      },
      {
        time: "14:00",
        title: "마지막 쇼핑",
        desc: "나트랑 센터(Nha Trang Center) 쇼핑몰, 기념품",
        icon: "🛒",
        tip: "베트남 커피(G7), 캐슈넛, 코코넛사탕 추천!",
        lat: 12.2395,
        lng: 109.1932,
      },
      {
        time: "16:00",
        title: "마사지",
        desc: "시내 마사지샵에서 여행 마무리 마사지",
        icon: "💆",
        tip: "Su Spa, Galina Spa 추천",
      },
      {
        time: "18:00",
        title: "마지막 저녁 - Yen's Restaurant",
        desc: "나트랑 분위기 좋은 베트남식당. 정원이 아름다운 곳",
        icon: "🍽️",
        tip: "반쎄오, 분짜, 씨푸드 추천!",
        lat: 12.2482,
        lng: 109.1951,
      },
      {
        time: "20:00",
        title: "공항으로 출발",
        desc: "나트랑 시내에서 공항까지 약 40분",
        icon: "🚗",
      },
      {
        time: "22:45",
        title: "나트랑 출발",
        desc: "캄란공항에서 인천으로! 안녕 나트랑~ 퀸나연과 석곰이 또 올게 👑💕🐻",
        icon: "🛫",
        lat: 11.9981,
        lng: 109.2193,
      },
    ],
  },
];

interface Restaurant {
  name: string;
  category: string;
  desc: string;
  price: string;
  mustTry: string;
  icon: string;
}

const restaurants: Restaurant[] = [
  {
    name: "Lanterns Restaurant",
    category: "베트남 정통",
    desc: "분위기 좋은 정원식 베트남 레스토랑. 퀸나연 & 석곰이 같은 커플에게 인기!",
    price: "₩15,000~25,000",
    mustTry: "반미, 스프링롤, 쌀국수",
    icon: "🏮",
  },
  {
    name: "Lac Canh Restaurant",
    category: "숯불구이",
    desc: "1975년 오픈한 전설의 맛집. 현지인도 인정하는 곳",
    price: "₩10,000~20,000",
    mustTry: "소고기 숯불구이, 새우구이",
    icon: "🔥",
  },
  {
    name: "Sailing Club Nha Trang",
    category: "레스토랑 & 바",
    desc: "나트랑 해변의 아이코닉한 레스토랑. 라이브 음악",
    price: "₩20,000~40,000",
    mustTry: "씨푸드 플래터, 칵테일",
    icon: "⛵",
  },
  {
    name: "Louisiane Brewhouse",
    category: "브루어리",
    desc: "해변 위 브루어리. 수제맥주와 수영장이 있는 곳",
    price: "₩15,000~30,000",
    mustTry: "수제맥주, 피자, 해산물",
    icon: "🍺",
  },
  {
    name: "Yen's Restaurant",
    category: "베트남/퓨전",
    desc: "아름다운 정원에서 즐기는 베트남 요리",
    price: "₩12,000~25,000",
    mustTry: "반쎄오, 분짜, 타이거새우",
    icon: "🌿",
  },
  {
    name: "Mix Restaurant",
    category: "그리스/지중해",
    desc: "그리스 셰프가 운영하는 지중해 요리 전문점",
    price: "₩15,000~30,000",
    mustTry: "무사카, 그릭샐러드, 파스타",
    icon: "🫒",
  },
  {
    name: "Alpaca Homestyle Cafe",
    category: "카페/브런치",
    desc: "감성 인테리어의 브런치 카페. 커피도 맛있는 곳",
    price: "₩5,000~12,000",
    mustTry: "코코넛커피, 에그베네딕트",
    icon: "☕",
  },
  {
    name: "판랑 반깐(Banh Can)",
    category: "로컬 길거리",
    desc: "판랑에서만 먹을 수 있는 특별한 로컬 음식!",
    price: "₩3,000~5,000",
    mustTry: "반깐 (계란+쌀가루 구이)",
    icon: "🥘",
  },
];

interface Place {
  name: string;
  desc: string;
  icon: string;
  tag: string;
}

const places: Place[] = [
  {
    name: "판랑 사막 (Nam Cuong Sand Dunes)",
    desc: "붉은 모래사막에서 일출 감상. 베트남의 숨겨진 보석! 캄란에서 약 1시간 30분 거리.",
    icon: "🏜️",
    tag: "자연",
  },
  {
    name: "포나가르 참탑 (Po Nagar Cham Towers)",
    desc: "8세기 참파 왕국의 힌두교 사원. 나트랑의 역사적 랜드마크.",
    icon: "🏛️",
    tag: "역사",
  },
  {
    name: "빈펄랜드 (VinWonders)",
    desc: "세계에서 가장 긴 해상 케이블카로 연결된 테마파크. 놀이기구 + 아쿠아리움.",
    icon: "🎢",
    tag: "놀거리",
  },
  {
    name: "혼문 섬 (Hon Mun Island)",
    desc: "나트랑 최고의 스노쿨링 스팟. 산호초와 열대어의 천국.",
    icon: "🐠",
    tag: "자연",
  },
  {
    name: "롱선사 (Long Son Pagoda)",
    desc: "거대한 흰색 불상이 인상적인 사원. 나트랑 시내 전경 조망.",
    icon: "🛕",
    tag: "역사",
  },
  {
    name: "담 시장 (Dam Market)",
    desc: "나트랑 최대 재래시장. 열대과일, 해산물, 기념품 쇼핑.",
    icon: "🏪",
    tag: "쇼핑",
  },
  {
    name: "쩐푸 해변도로 (Tran Phu Street)",
    desc: "나트랑 메인 해변도로. 야경 산책과 해변 바가 즐비한 거리.",
    icon: "🌴",
    tag: "산책",
  },
  {
    name: "나트랑 나이트마켓",
    desc: "매일 저녁 열리는 야시장. 간식, 의류, 기념품 쇼핑.",
    icon: "🏮",
    tag: "쇼핑",
  },
];

interface PackingItem {
  category: string;
  items: string[];
  icon: string;
}

const packingList: PackingItem[] = [
  {
    category: "필수 서류",
    items: ["여권 (유효기간 6개월 이상)", "항공권 e-티켓", "호텔 바우처", "여행자보험 증서", "비자 (15일 이내 무비자)"],
    icon: "📄",
  },
  {
    category: "의류 & 소품",
    items: ["수영복 2세트", "얇은 원피스/반팔", "얇은 긴팔 (냉방용)", "선글라스", "모자/썬캡", "비치 샌들", "운동화 (사막용)"],
    icon: "👗",
  },
  {
    category: "세면도구",
    items: ["선크림 SPF50+", "모기약/패치", "상비약 (멀미/지사제)", "세안용품", "보습제"],
    icon: "🧴",
  },
  {
    category: "전자기기",
    items: ["보조배터리", "충전기 (C타입)", "멀티 어댑터", "카메라/셀카봉", "이어폰"],
    icon: "📱",
  },
  {
    category: "기타",
    items: ["현금 (VND, 50만원 정도)", "그랩(Grab) 앱 설치", "구글맵 오프라인 저장", "방수팩", "비닐백 (젖은옷용)"],
    icon: "🎒",
  },
  {
    category: "퀸나연 & 석곰이 필수템",
    items: ["커플 셀카봉", "커플 슬리퍼/비치웨어", "곰돌이 인형 (여행메이트)", "퀸 왕관 머리띠 (인생샷용)", "서로에게 쓴 편지"],
    icon: "👑🐻",
  },
];

/* ─────────────────────── components ─────────────────────── */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "일정", href: "#schedule" },
    { label: "맛집", href: "#restaurants" },
    { label: "관광지", href: "#places" },
    { label: "준비물", href: "#packing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-lg font-bold text-rose-600 no-underline">
          <span className="text-xl">👑</span>
          <span>퀸나연 & 석곰이</span>
          <span className="text-xl">🐻</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden text-rose-500 text-xl bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-rose-100 px-4 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-sm text-gray-600 hover:text-rose-500 no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Decorative elements - bear & queen themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🐻</div>
        <div className="absolute top-40 right-16 text-5xl opacity-20 animate-float delay-200">👑</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-float delay-300">🐚</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float delay-100">🌊</div>
        <div className="absolute top-60 left-1/2 text-4xl opacity-15 animate-float delay-500">👑</div>
        <div className="absolute bottom-48 right-1/3 text-5xl opacity-15 animate-float delay-400">🧸</div>
        <div className="absolute top-32 left-1/3 text-4xl opacity-15 animate-float delay-100">👑</div>
      </div>

      <div className="text-center px-4 relative z-10">
        <div className="animate-fade-in-up">
          {/* Couple Profile */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center text-4xl md:text-5xl shadow-lg border-4 border-white">
                👑
              </div>
              <p className="mt-2 font-bold text-gray-700 text-lg">퀸나연</p>
              <p className="text-xs text-gray-400">나연</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl animate-pulse-heart">💕</span>
              <span className="text-xs text-rose-400 font-medium">with</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl md:text-5xl shadow-lg border-4 border-white">
                🐻
              </div>
              <p className="mt-2 font-bold text-gray-700 text-lg">석곰이</p>
              <p className="text-xs text-gray-400">석권</p>
            </div>
          </div>

          <p className="text-rose-400 text-lg mb-2 font-medium">2025. 03. 03 — 03. 07</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">나트랑</span>
          </h1>
          <p className="text-3xl md:text-4xl font-light text-gray-700 mb-2">Nha Trang, Vietnam</p>
          <div className="flex items-center justify-center gap-3 my-6">
            <span className="h-px w-16 bg-rose-300"></span>
            <span className="text-sm text-rose-400 font-medium">퀸나연과 석곰이의 달콤한 여행</span>
            <span className="h-px w-16 bg-rose-300"></span>
          </div>
          <p className="text-xl text-gray-500 mb-2">아나만다라 캄란 리조트</p>
          <p className="text-gray-400 text-sm">Ana Mandara Cam Ranh</p>
        </div>

        <div className="animate-fade-in-up delay-300 mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#schedule"
            className="px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-rose-200 transition-all no-underline"
          >
            일정 보기
          </a>
          <a
            href="#restaurants"
            className="px-8 py-3 bg-white text-rose-500 border border-rose-200 rounded-full font-medium hover:bg-rose-50 transition-all no-underline"
          >
            맛집 보기
          </a>
        </div>

        <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: "4박 5일", icon: "📅" },
            { label: "퀸나연 & 석곰이", icon: "👑🐻" },
            { label: "리조트", icon: "🏖️" },
            { label: "사막 일출", icon: "🌅" },
          ].map((item) => (
            <div key={item.label} className="bg-white/60 rounded-2xl px-4 py-3 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm text-gray-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400">스크롤하여 일정 보기</span>
        <div className="w-5 h-8 border-2 border-rose-300 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

function TripOverview() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">👑 퀸나연 & 석곰이의 여행 🐻</h2>
        <div className="section-divider mb-6"></div>
        <p className="text-gray-500 mb-10">퀸나연이와 곰돌이 석권이의 첫 베트남 모험!</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6">
            <div className="text-4xl mb-3">🛫</div>
            <h3 className="font-semibold text-gray-700 mb-2">출발</h3>
            <p className="text-sm text-gray-500">3월 3일 (월) 01:50</p>
            <p className="text-sm text-gray-500">인천 → 나트랑 직항</p>
            <p className="text-xs text-gray-400 mt-1">약 5시간 30분</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
            <div className="text-4xl mb-3">🏨</div>
            <h3 className="font-semibold text-gray-700 mb-2">숙소</h3>
            <p className="text-sm text-gray-500">아나만다라 캄란</p>
            <p className="text-sm text-gray-500">Ana Mandara Cam Ranh</p>
            <p className="text-xs text-gray-400 mt-1">4박</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6">
            <div className="text-4xl mb-3">🛬</div>
            <h3 className="font-semibold text-gray-700 mb-2">귀국</h3>
            <p className="text-sm text-gray-500">3월 7일 (금) 22:45</p>
            <p className="text-sm text-gray-500">나트랑 → 인천 직항</p>
            <p className="text-xs text-gray-400 mt-1">약 5시간</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DayCard({ plan }: { plan: DayPlan }) {
  const [open, setOpen] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const mapLocations: MapLocation[] = plan.slots
    .filter((slot) => slot.lat !== undefined && slot.lng !== undefined)
    .map((slot) => ({
      lat: slot.lat!,
      lng: slot.lng!,
      title: slot.title,
      icon: slot.icon,
      time: slot.time,
    }));

  return (
    <div className="day-card bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        className={`w-full px-6 py-5 bg-gradient-to-r ${plan.color} text-white flex items-center justify-between cursor-pointer border-none`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{plan.themeIcon}</span>
          <div className="text-left">
            <div className="text-sm opacity-80">
              Day {plan.day} · {plan.date} ({plan.weekday})
            </div>
            <div className="text-xl font-bold">{plan.theme}</div>
          </div>
        </div>
        <span className={`text-2xl transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="p-6">
          {mapLocations.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>🗺️</span>
                <span>{showMap ? "지도 숨기기" : "지도 보기"}</span>
              </button>
              {showMap && <DayMap locations={mapLocations} color={plan.color} />}
            </div>
          )}

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-200 to-rose-100"></div>

            <div className="space-y-4">
              {plan.slots.map((slot, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Timeline dot */}
                  <div className="flex-none w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-lg z-10 shadow-sm">
                    {slot.icon}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs font-mono text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                        {slot.time}
                      </span>
                      <span className="font-semibold text-gray-800">{slot.title}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{slot.desc}</p>
                    {slot.tip && (
                      <div className="mt-2 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg inline-block">
                        💡 {slot.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="py-20 px-4 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🗓️ 우리의 일정표</h2>
          <div className="section-divider mb-4"></div>
          <p className="text-gray-500">퀸나연과 석곰이의 5일간 나트랑 대모험 👑🐻</p>
        </div>

        <div className="space-y-6">
          {schedule.map((day) => (
            <DayCard key={day.day} plan={day} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Restaurants() {
  return (
    <section id="restaurants" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🍽️ 맛집 리스트</h2>
          <div className="section-divider mb-4"></div>
          <p className="text-gray-500">퀸나연이 맛있게 먹고 석곰이가 많이 먹을 곳들 👑🍯🐻</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {restaurants.map((r) => (
            <div
              key={r.name}
              className="bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-5 border border-rose-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-none">{r.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800">{r.name}</h3>
                    <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">{r.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>💰 {r.price}</span>
                  </div>
                  <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                    ⭐ 추천: {r.mustTry}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Places() {
  const tagColors: Record<string, string> = {
    자연: "bg-emerald-100 text-emerald-700",
    역사: "bg-amber-100 text-amber-700",
    놀거리: "bg-blue-100 text-blue-700",
    쇼핑: "bg-purple-100 text-purple-700",
    산책: "bg-cyan-100 text-cyan-700",
  };

  return (
    <section id="places" className="py-20 px-4 bg-gradient-to-b from-white to-cyan-50/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📍 관광지 & 볼거리</h2>
          <div className="section-divider mb-4"></div>
          <p className="text-gray-500">퀸나연과 곰돌이가 함께 탐험할 곳들 👑🐻</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {places.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-none">{p.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tagColors[p.tag] || "bg-gray-100 text-gray-600"}`}>
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packing() {
  return (
    <section id="packing" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎒 준비물 체크리스트</h2>
          <div className="section-divider mb-4"></div>
          <p className="text-gray-500">퀸나연도 석곰이도 빠뜨리지 말고 챙기세요!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packingList.map((cat) => (
            <div
              key={cat.category}
              className="bg-gradient-to-br from-white to-rose-50/30 rounded-2xl p-5 border border-rose-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-gray-700">{cat.category}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded border-2 border-rose-300 flex-none"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UsefulInfo() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">💡 알아두면 좋은 정보</h2>
          <div className="section-divider mb-4"></div>
          <p className="text-gray-500 mb-6">퀸나연과 석곰이의 안전하고 즐거운 여행을 위해!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">💰</span> 환율 & 물가
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 1,000 VND ≈ 약 55원</li>
              <li>• 쌀국수 한 그릇: 40,000~60,000 VND (약 2,200~3,300원)</li>
              <li>• 그랩 택시 시내이동: 30,000~50,000 VND</li>
              <li>• 마사지 1시간: 200,000~300,000 VND</li>
              <li>• 팁 문화: 필수는 아니지만 만족 시 10% 정도</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">🌤️</span> 3월 나트랑 날씨
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 평균 기온: 25~31°C (건기)</li>
              <li>• 비 올 확률 낮음 (최적의 여행 시기!)</li>
              <li>• 자외선 지수 매우 높음 (선크림 필수)</li>
              <li>• 아침/저녁은 약간 선선할 수 있음</li>
              <li>• 바다 수온: 약 26°C (수영하기 좋음)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">📱</span> 필수 앱
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Grab</strong> - 택시 (동남아 우버)</li>
              <li>• <strong>Google Maps</strong> - 길찾기 (오프라인 저장!)</li>
              <li>• <strong>Google 번역</strong> - 베트남어 번역</li>
              <li>• <strong>Klook/KKday</strong> - 투어/티켓 예약</li>
              <li>• <strong>환율계산기</strong> - VND ↔ KRW</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">⚠️</span> 주의사항
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 수돗물 마시지 마세요 (생수 구매)</li>
              <li>• 길거리 음식 얼음 주의</li>
              <li>• 소매치기 주의 (핸드폰, 가방)</li>
              <li>• 택시 미터기 확인 또는 그랩 이용</li>
              <li>• 사원 방문 시 긴 옷 착용</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-5xl">👑</span>
          <span className="text-4xl animate-pulse-heart">💕</span>
          <span className="text-5xl">🐻</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">퀸나연 & 석곰이의 나트랑 여행</h3>
        <p className="text-rose-100 mb-2">나연이와 석권이의 달콤한 모험</p>
        <p className="text-rose-200 text-sm mb-6">2025. 03. 03 — 03. 07</p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-20 bg-rose-300"></span>
          <span className="text-lg">👑 ✈️ 🏖️ 🌅 🏜️ 🧸</span>
          <span className="h-px w-20 bg-rose-300"></span>
        </div>
        <p className="text-sm text-rose-200 mb-2">
          퀸나연과 곰돌이의 행복한 여행이 되길 바라며
        </p>
        <p className="text-xs text-rose-300">
          사랑해 나연아 👑💕🐻
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────── main page ─────────────────────── */

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TripOverview />
      <Schedule />
      <Restaurants />
      <Places />
      <Packing />
      <UsefulInfo />
      <Footer />
    </main>
  );
}
