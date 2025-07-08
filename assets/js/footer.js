// assets/js/footer.js
document.addEventListener('DOMContentLoaded', () => {
  const footerTarget = document.getElementById('footer');
  if (footerTarget) {
    const basePath = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    fetch('/Simple-Paint-Solutions/header.html')

      .then(res => res.text())
      .then(html => {
        footerTarget.innerHTML = html;
      })
      .catch(err => console.error('Failed to load footer:', err));
  }
});




