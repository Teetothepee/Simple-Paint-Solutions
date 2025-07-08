// assets/js/header.js
document.addEventListener('DOMContentLoaded', () => {
  const navbarTarget = document.getElementById('navbar');
  if (navbarTarget) {
    const basePath = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    fetch('/Simple-Paint-Solutions/header.html')

      .then(res => res.text())
      .then(html => {
        navbarTarget.innerHTML = html;
      })
      .catch(err => console.error('Failed to load header:', err));
  }
});


