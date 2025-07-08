document.addEventListener('DOMContentLoaded', () => {
  const footerTarget = document.getElementById('footer');
  if (footerTarget) {
    fetch('/Simple-Paint-Solutions/footer.html')
      .then(res => res.text())
      .then(html => {
        footerTarget.innerHTML = html;
      })
      .catch(err => console.error('Failed to load footer:', err));
  }
});





