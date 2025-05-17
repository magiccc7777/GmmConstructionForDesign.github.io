document.addEventListener('DOMContentLoaded', () => {
  // لو فيه حد مسجل دخوله فعلاً، وديه على الهوم
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    window.location.href = 'home.html';
    return;
  }

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    // نجيب كل المستخدمين من localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // ندوّر على المستخدم المناسب
    const matchedUser = users.find(user =>
      user.username === usernameInput && user.password === passwordInput
    );

    if (matchedUser) {
      // نسجل دخوله
      localStorage.setItem('loggedInUser', matchedUser.username);
      message.style.color = 'green';
      message.textContent = 'Login successful ✅';

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      message.style.color = 'red';
      message.textContent = 'Incorrect username or password ❌';
    }
  });
});
