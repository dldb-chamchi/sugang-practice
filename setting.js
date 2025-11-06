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
  const selectedCount = parseInt(countSelect.value, 10);

  if (isNaN(selectedCount) || selectedCount <= 0) {
    alert('유효한 과목 개수를 선택하세요.');
    return;
  }

  const shuffled = [...availableCourses].sort(() => 0.5 - Math.random());
  const practiceCourses = shuffled.slice(0, selectedCount);

  sessionStorage.setItem('practiceCourses', JSON.stringify(practiceCourses));

  // ★★★ 여기가 변경됨 ★★★
  window.location.href = 'login.html'; // setting.html -> login.html로 이동
}
