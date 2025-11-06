const loginButton = document.getElementById('login-button');
if (loginButton) {
  loginButton.addEventListener('click', () => {
    window.location.href = 'sugangPractice.html'; // 로그인 성공 시 sugangPractice.html로 이동
  });
}
