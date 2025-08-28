document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('footer');
  if (!target) return;

  const version = 'v=4'; // bump this when you update footer.html
  fetch(`/footer.html?${version}`)
    .then(res => res.text())
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => console.error('Failed to load footer:', err));
});






