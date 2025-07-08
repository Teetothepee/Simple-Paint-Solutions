document.addEventListener('DOMContentLoaded', () => {
  const navbarTarget = document.getElementById('navbar');
  if (navbarTarget) {
    fetch('/Simple-Paint-Solutions/header.html')
      .then(res => res.text())
      .then(html => {
        navbarTarget.innerHTML = html;
      })
      .catch(err => console.error('Failed to load header:', err));
  }
});



