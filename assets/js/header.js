document.addEventListener('DOMContentLoaded', () => {
  // Support either <div id="header"> or <div id="navbar">
  const target = document.getElementById('header') || document.getElementById('navbar');
  if (!target) return;

  const version = 'v=4'; // bump this when you update header.html
  fetch(`/header.html?${version}`)
    .then(res => res.text())
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => console.error('Failed to load header:', err));
});



