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
const difficultySelect = document.getElementById('difficulty-select');

// --- 초기 실행 ---
document.addEventListener('DOMContentLoaded', () => {
  startButton.addEventListener('click', saveSettingsAndStart);
});

function saveSettingsAndStart() {
  const selectedCount = parseInt(countSelect.value, 10);
  const selectedDifficulty = difficultySelect.value;
  const gameMode = sessionStorage.getItem('gameMode') || 'sugang';

  if (isNaN(selectedCount) || selectedCount <= 0) {
    alert('유효한 과목 개수를 선택하세요.');
    return;
  }

  const shuffled = [...availableCourses].sort(() => 0.5 - Math.random());
  const practiceCourses = shuffled.slice(0, selectedCount);

  sessionStorage.setItem('practiceCourses', JSON.stringify(practiceCourses));
  sessionStorage.setItem('difficulty', selectedDifficulty);

  if (gameMode === 'jeongjung') {
    // 정정 모드: 기존 신청 과목으로 남은 과목 중 최대 2개 사용
    const remaining = shuffled.slice(selectedCount);
    const preRegistered = remaining.slice(0, Math.min(2, remaining.length));
    sessionStorage.setItem(
      'preRegisteredCourses',
      JSON.stringify(preRegistered),
    );
    window.location.href = 'jeongjungPractice.html'; // ← 로그인 없이 바로 이동
  } else {
    sessionStorage.removeItem('preRegisteredCourses');
    window.location.href = 'login.html'; // ← 기존 수강신청 흐름 유지
  }
}
