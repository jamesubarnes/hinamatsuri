// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });

  // Show selected page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile menu
  document.getElementById('mobile-menu').classList.add('hidden');
}

// Create falling sakura petals
function createSakuraPetals() {
  const container = document.getElementById('sakura-container');
  const petalCount = 15;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 10 + 15) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(petal);
  }
}

createSakuraPetals();

// Countdown Timer
function updateCountdown() {
  const festivalDate = new Date('2026-03-21T10:00:00');
  const now = new Date();
  const diff = festivalDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countdown-secs').textContent = String(secs).padStart(2, '0');
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.add('hidden');
    }
  });
});
