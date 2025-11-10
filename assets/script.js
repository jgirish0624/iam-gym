document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile menu toggle ---
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // --- 24-hour countdown ---
  const badgeSpans = document.querySelectorAll('#countdownText, #countdownTextSmall, #countdownTextBranches');
  const key = 'iamgym_timer';
  let expiry = localStorage.getItem(key);
  if (!expiry) {
    expiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(key, expiry);
  }
  function updateCountdown() {
    const ms = expiry - Date.now();
    if (ms <= 0) {
      badgeSpans.forEach(el => el.textContent = 'Expired');
      return;
    }
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const text = `${hrs}h ${mins}m ${secs}s`;
    badgeSpans.forEach(el => (el.textContent = text));
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- Scroll animations ---
  const revealEls = document.querySelectorAll('.feature, .fee-card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach(el => observer.observe(el));

  // --- Contact form ---
  const form = document.querySelector('#trialForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const branch = data.get('branch');
      alert(`Thank you ${name}! Your trial request for ${branch} has been received.`);
      form.reset();
    });
  }
});
