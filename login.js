const loginButton = document.getElementById('login-button');
const serverTimeDisplay = document.getElementById('server-time');

if (loginButton && serverTimeDisplay) {
  // --- 1. 설정 ---
  const COUNTDOWN_SECONDS = 5;
  const GO_LIVE_TIME_MS = Date.now() + COUNTDOWN_SECONDS * 1000;

  // --- 2. 가상 시간 설정 (화면에 표시될 시간) ---
  const virtualBaseTime = new Date();
  virtualBaseTime.setHours(11, 59, 55, 0); // 시작 시간: 11:59:55.000
  const VIRTUAL_BASE_TIME_MS = virtualBaseTime.getTime();

  let timerInterval;

  // --- 3. 타이머 업데이트 함수 ---
  const updateTimer = () => {
    const now = Date.now();
    const remainingTime = GO_LIVE_TIME_MS - now;

    // --- 시간 계산 (항상 실행) ---
    const elapsedTime = COUNTDOWN_SECONDS * 1000 - remainingTime;
    const virtualCurrentTime = new Date(VIRTUAL_BASE_TIME_MS + elapsedTime);

    const hh = String(virtualCurrentTime.getHours()).padStart(2, '0');
    const mm = String(virtualCurrentTime.getMinutes()).padStart(2, '0');
    const ss = String(virtualCurrentTime.getSeconds()).padStart(2, '0');
    const ms = String(virtualCurrentTime.getMilliseconds()).padStart(3, '0');

    // 화면에 시간 표시
    serverTimeDisplay.textContent = `${hh}:${mm}:${ss}.${ms}`;

    // --- 색상 변경 로직 ---
    const currentHour = virtualCurrentTime.getHours();
    const currentMinute = virtualCurrentTime.getMinutes();

    if (currentHour === 11 && currentMinute >= 55) {
      // 11시 55분 ~ 11시 59분: 빨간색
      serverTimeDisplay.style.color = '#e74c3c';
    } else if (currentHour >= 12) {
      // 12시 이후: 초록색
      serverTimeDisplay.style.color = '#28a745';
    } else {
      // 그 외: 기본 회색
      serverTimeDisplay.style.color = '#888';
    }
  };

  // --- 4. 로그인 버튼 클릭 로직 ---
  loginButton.addEventListener('click', () => {
    if (Date.now() >= GO_LIVE_TIME_MS) {
      // 12시 정각 이후: 성공
      window.location.href = 'sugangPractice.html';
    } else {
      // 12시 정각 이전: 실패
      alert('수강신청 기간이 아닙니다.');
    }
  });

  // --- 5. 타이머 즉시 시작 ---
  updateTimer(); // 즉시 11:59:55.000으로 설정
  timerInterval = setInterval(updateTimer, 50); // 0.05초마다 시간 업데이트
}
