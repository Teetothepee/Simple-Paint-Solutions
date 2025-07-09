document.addEventListener('DOMContentLoaded', () => {
  const navbarTarget = document.getElementById('navbar');
  if (navbarTarget) {
    fetch('/header.html')
      .then(res => res.text())
      .then(html => {
        navbarTarget.innerHTML = html;
      })
      .catch(err => console.error('Failed to load header:', err));
  }
});



