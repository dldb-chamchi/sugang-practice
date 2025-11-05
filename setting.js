// --- setting.js ---

// 1. "개설 강좌" 목록 데이터 (원본)
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
const offeredBody = document.getElementById('offered-courses-body');
const selectedBody = document.getElementById('selected-courses-body');
const startButton = document.getElementById('start-practice-button');

// --- 상태 변수 ---
let wishlistCourses = []; // 사용자가 선택한 과목

// --- 초기 실행 ---
document.addEventListener('DOMContentLoaded', () => {
  loadAvailableCourses();
  startButton.addEventListener('click', saveSettingsAndStart);
});

/** 1. 수강 가능한 강좌 목록을 화면에 표시 */
function loadAvailableCourses() {
  offeredBody.innerHTML = '';
  availableCourses.forEach((course) => {
    const row = document.createElement('tr');

    const addButton = document.createElement('button');
    addButton.textContent = '담기';
    addButton.className = 'add-to-wishlist-btn';

    addButton.addEventListener(
      'click',
      () => {
        addCourseToWishlist(course, addButton);
      },
      { once: true }
    );

    row.innerHTML = `
            <td class="add-button-cell"></td>
            <td>${course.name}</td>
            <td>${course.classCode}</td>
            <td>${course.professor}</td>
            <td>${course.subjectType}</td>
        `;

    row.querySelector('.add-button-cell').appendChild(addButton);
    offeredBody.appendChild(row);
  });
}

/** 2. '담기' 버튼 클릭 시 연습할 과목 목록에 추가 */
function addCourseToWishlist(course, button) {
  // 1. 버튼 비활성화
  button.disabled = true;
  button.textContent = '추가됨';

  // 2. 선택 목록에 과목 추가
  wishlistCourses.push(course);

  // 3. '연습할 과목' 테이블에 행 추가
  const row = document.createElement('tr');
  row.innerHTML = `
        <td>${wishlistCourses.length}</td>
        <td>${course.name}</td>
        <td>${course.classCode}</td>
        <td>${course.subjectType}</td>
    `;
  selectedBody.appendChild(row);

  // 4. '연습 시작' 버튼 활성화
  startButton.disabled = false;
}

/** 3. '연습 시작하기' 버튼 클릭 시 */
function saveSettingsAndStart() {
  if (wishlistCourses.length === 0) {
    alert('연습할 과목을 1개 이상 선택하세요.');
    return;
  }

  // ★★★ 세션 스토리지에 선택한 과목 목록을 저장
  sessionStorage.setItem('practiceCourses', JSON.stringify(wishlistCourses));

  // ★★★ 로그인 페이지로 이동
  window.location.href = 'login.html';
}
