// 1. "개설 강좌" 목록 데이터 (원본) - ★ 데이터 풀로 계속 사용
const availableCourses = [
  {
    id: 1,
    name: '자료구조',
    classCode: '01',
    professor: '김철수',
    subjectType: '전공필수',
  },
  {
    id: 2,
    name: '웹프로그래밍기초',
    classCode: '02',
    professor: '이영희',
    subjectType: '전공선택',
  },
  {
    id: 3,
    name: '미래사회와기술',
    classCode: 'A1',
    professor: '박지성',
    subjectType: '교양',
  },
  {
    id: 4,
    name: '운영체제',
    classCode: '01',
    professor: '홍길동',
    subjectType: '전공선택',
  },
  {
    id: 5,
    name: '알고리즘',
    classCode: '01',
    professor: '김유신',
    subjectType: '전공필수',
  },
  {
    id: 6,
    name: '데이터베이스',
    classCode: '01',
    professor: '강감찬',
    subjectType: '전공필수',
  },
];

// --- DOM 요소 ---
const startButton = document.getElementById('start-practice-button');
const countSelect = document.getElementById('course-count-select');

// --- (삭제) 상태 변수 ---
// let wishlistCourses = []; (필요 없음)

// --- 초기 실행 ---
document.addEventListener('DOMContentLoaded', () => {
  // (삭제) loadAvailableCourses();
  // 시작 버튼에 이벤트 리스너 연결
  startButton.addEventListener('click', saveSettingsAndStart);
});

/** 1. (삭제) loadAvailableCourses() */
/** 2. (삭제) addCourseToWishlist() */

/** 3. '연습 시작하기' 버튼 클릭 시 (★ 수정됨) */
function saveSettingsAndStart() {
  // 1. 드롭다운에서 선택한 '개수'를 가져옴
  const selectedCount = parseInt(countSelect.value, 10);

  if (isNaN(selectedCount) || selectedCount <= 0) {
    alert('유효한 과목 개수를 선택하세요.');
    return;
  }

  // 2. availableCourses를 무작위로 섞음 (Fisher-Yates Shuffle)
  // (원본 배열을 수정하지 않기 위해 [...availableCourses]로 복사본 생성)
  const shuffled = [...availableCourses].sort(() => 0.5 - Math.random());

  // 3. 섞인 배열에서 선택한 개수(selectedCount)만큼 잘라냄
  //    (slice는 selectedCount가 배열 길이보다 커도, 최대 길이까지만 반환)
  const practiceCourses = shuffled.slice(0, selectedCount);

  // 4. 세션 스토리지에 *선택된 과목 객체 배열*을 저장
  // (script.js가 이 형식을 기대하고 있음)
  sessionStorage.setItem('practiceCourses', JSON.stringify(practiceCourses));

  // 5. 로그인 페이지로 이동
  window.location.href = 'login.html';
}
