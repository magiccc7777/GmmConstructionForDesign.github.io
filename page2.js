document.addEventListener('DOMContentLoaded', function() {
  const authLink = document.getElementById('authLink');
  
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  if (loggedInUser) {
    // غير النص والرابط
    authLink.textContent = 'Logout';
    authLink.href = '#';  // مش هيوجه لصفحة، هيبقى زرار logout
    
    authLink.addEventListener('click', function(e) {
      e.preventDefault();
      // مسح بيانات تسجيل الدخول
      localStorage.removeItem('loggedInUser');
      // تحديث النص والرابط لـ Sign Up
      authLink.textContent = 'Sign Up';
      authLink.href = 'login.html';
      // لو عايز تعيد تحميل الصفحة
      window.location.reload();
    });
  } else {
    authLink.textContent = 'Sign Up';
    authLink.href = 'login.html';
  }
});
window.onload = function() {
  const firstText = document.querySelector('.pg2');
  
  if (firstText) {
    firstText.scrollIntoView();
  }
};