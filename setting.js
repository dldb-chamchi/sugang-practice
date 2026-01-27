// 1. "개설 강좌" 목록 데이터 (원본) - ★ 데이터 풀로 계속 사용
const availableCourses = [
  {
    id: 1,
    name: '과목1',
    classCode: '01',
    professor: '코룡이',
    subjectType: '전공필수',
  },
  {
    id: 2,
    name: '과목2',
    classCode: '01',
    professor: '코룡이',
    subjectType: '전공선택',
  },
  {
    id: 3,
    name: '과목3',
    classCode: '01',
    professor: '코룡이',
    subjectType: '교양',
  },
  {
    id: 4,
    name: '과목4',
    classCode: '01',
    professor: '코룡이',
    subjectType: '전공선택',
  },
  {
    id: 5,
    name: '과목5',
    classCode: '01',
    professor: '코룡이',
    subjectType: '전공필수',
  },
  {
    id: 6,
    name: '과목6',
    classCode: '01',
    professor: '코룡이',
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

// --- DOM 요소에 난이도 선택 변수 추가 ---
const difficultySelect = document.getElementById('difficulty-select');

function saveSettingsAndStart() {
  const selectedCount = parseInt(countSelect.value, 10);
  // (추가) 난이도 값 가져오기
  const selectedDifficulty = difficultySelect.value;

  if (isNaN(selectedCount) || selectedCount <= 0) {
    alert('유효한 과목 개수를 선택하세요.');
    return;
  }

  const shuffled = [...availableCourses].sort(() => 0.5 - Math.random());
  const practiceCourses = shuffled.slice(0, selectedCount);

  sessionStorage.setItem('practiceCourses', JSON.stringify(practiceCourses));

  // (추가) 난이도 저장
  sessionStorage.setItem('difficulty', selectedDifficulty);

  window.location.href = 'login.html';
}
