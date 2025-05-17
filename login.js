document.addEventListener('DOMContentLoaded', function () {
  // لو فيه حد مسجل دخول فعلاً، نوديه مباشرة على الهوم
  if (localStorage.getItem('loggedInUser')) {
    window.location.href = 'home.html';
    return;
  }

  document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const message = document.getElementById('message');

    message.style.color = 'red';
    message.textContent = '';

    if (!username || !email || !phone || !password || !confirmPassword) {
      message.textContent = 'Please fill all fields.';
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = 'Passwords do not match.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = 'Invalid email format.';
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      message.textContent = 'Phone number must be 10 digits.';
      return;
    }

    // نجيب كل المستخدمين من localStorage أو نعمل مصفوفة فاضية لو مفيش
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // نشوف لو اسم المستخدم موجود أصلاً
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      message.textContent = 'Username already exists. Please login.';
      return;
    }

    // نضيف المستخدم الجديد
    const newUser = {
      username,
      email,
      phone,
      password
    };
    users.push(newUser);

    // نخزن كل المستخدمين بعد الإضافة
    localStorage.setItem('users', JSON.stringify(users));

    // نسجل المستخدم الجديد كمسجل دخول
    localStorage.setItem('loggedInUser', username);

    message.style.color = 'green';
    message.textContent = 'Signup successful! Redirecting to home...';

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1500);
  });
});