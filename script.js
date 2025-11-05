// --- script.js (게임 실행 전용) ---

// --- DOM 요소 가져오기 ---
const tableBody = document.getElementById('pre-register-body');
const courseCountSpan = document.getElementById('pre-course-count');
const timerDiv = document.getElementById('timer');
const resultFooter = document.getElementById('result-footer');
// ★★★ (추가) 수강신청과목 테이블 body ★★★
const registeredCoursesBody = document.getElementById(
  'registered-courses-body'
);

// --- 게임 상태 변수 ---
let startTime = 0;
let gameInterval;
let appliedCount = 0;
let successCount = 0;
let gameCourses = []; // 이번 게임에서 사용할 과목 배열

// --- 페이지가 로드되면 즉시 게임 시작 ---
document.addEventListener('DOMContentLoaded', () => {
  const savedCoursesJSON = sessionStorage.getItem('practiceCourses');

  if (!savedCoursesJSON || savedCoursesJSON === '[]') {
    alert('연습할 과목이 설정되지 않았습니다. 설정 페이지로 이동합니다.');
    window.location.href = 'setting.html';
    return;
  }

  const coursesToPlay = JSON.parse(savedCoursesJSON);
  initializeGame(coursesToPlay);
});

/** 1. 게임 초기화 및 시작 함수 */
function initializeGame(coursesToPlay) {
  // 1. 초기화
  appliedCount = 0;
  successCount = 0;
  tableBody.innerHTML = '';
  resultFooter.innerHTML = '';
  timerDiv.textContent = '0.000초';
  // ★★★ (추가) 수강신청과목 테이블 비우기 ★★★
  registeredCoursesBody.innerHTML = '';

  // 2. 불러온 데이터에 게임 속성 추가
  gameCourses = coursesToPlay.map((course) => ({
    ...course,
    threshold: Math.random() * 100 + 0.5, // 0.5초 ~ 2.0초 사이 랜덤 마감 시간
    applied: false,
  }));

  // 3. 과목을 화면 테이블에 표시
  gameCourses.forEach((course, index) => {
    const row = document.createElement('tr');

    const applyButton = document.createElement('button');
    applyButton.className = 'apply-button';
    applyButton.textContent = '신청';

    applyButton.addEventListener(
      'click',
      () => {
        applyCourse(course, applyButton, row);
      },
      { once: true }
    );

    row.innerHTML = `
            <td>${index + 1}</td>
            <td class="apply-button-cell"></td>
            <td>${course.subjectType}</td>
            <td>${course.name}</td>
            <td>${course.classCode}</td>
            <td>${course.professor}</td>
            <td class="result-cell"></td>
        `;

    row.querySelector('.apply-button-cell').appendChild(applyButton);
    tableBody.appendChild(row);
  });

  // 4. 과목 건수 업데이트
  courseCountSpan.textContent = `${gameCourses.length} 건`;

  // 5. 타이머 시작
  startTime = performance.now();
  gameInterval = setInterval(updateTimer, 10);
}

/** 2. 타이머 업데이트 함수 */
function updateTimer() {
  if (startTime === 0) return;
  const elapsedTime = (performance.now() - startTime) / 1000;
  timerDiv.textContent = `${elapsedTime.toFixed(3)}초`;
}

/** 3. 수강신청 '신청' 버튼 클릭 함수 (★ 수정된 부분 ★) */
function applyCourse(course, button, row) {
  if (course.applied) return;

  const clickTime = performance.now();
  const elapsedTime = (clickTime - startTime) / 1000;

  course.applied = true;
  appliedCount++;
  button.disabled = true;

  // 판정
  if (elapsedTime <= course.threshold) {
    // --- 성공 ---
    button.textContent = '신청 성공';
    button.classList.add('success');
    successCount++; // 성공 카운트 증가

    // ★★★ (추가) 성공한 과목을 '수강신청과목' 테이블에 추가 ★★★
    addCourseToRegisteredList(course);
  } else {
    // --- 실패 ---
    alert('정원이 초과됐습니다..!');
    button.textContent = '정원 초과!';
    button.classList.add('fail');
  }

  // 결과 표시
  row.querySelector('.result-cell').textContent = `${elapsedTime.toFixed(
    3
  )}초 (컷: ${course.threshold.toFixed(3)}초)`;

  // 모든 과목을 신청했는지 확인
  if (appliedCount === gameCourses.length) {
    endGame();
  }
}

/** 4. (신규 추가) 수강신청목록에 과목 추가하는 함수 */
function addCourseToRegisteredList(course) {
  // 1. 새 <tr> (행) 생성
  const row = document.createElement('tr');

  // 2. 행 내용 채우기 (성공 카운트를 No.로 사용)
  row.innerHTML = `
        <td>${successCount}</td>
        <td>${course.subjectType}</td>
        <td>${course.name}</td>
        <td>${course.classCode}</td>
        <td>${course.professor}</td>
    `;

  // 3. '수강신청과목' 테이블(tbody)에 행 추가
  registeredCoursesBody.appendChild(row);
}

/** 5. 게임 종료 함수 (기존 4번) */
function endGame() {
  clearInterval(gameInterval);
  const finalTime = (performance.now() - startTime) / 1000;
  timerDiv.textContent = `${finalTime.toFixed(3)}초`;

  // 최종 결과 메시지
  const totalColumns = tableBody.rows[0].cells.length;
  resultFooter.innerHTML = `
        <tr>
            <td colspan="${totalColumns}">
                게임 종료! 총 ${
                  gameCourses.length
                }개 중 ${successCount}개 성공! (총 시간: ${finalTime.toFixed(
    3
  )}초)
            </td>
        </tr>
    `;

  // (선택적) 게임이 끝나면 설정값(세션 스토리지)을 지울 수 있습니다.
  // sessionStorage.removeItem('practiceCourses');
}
