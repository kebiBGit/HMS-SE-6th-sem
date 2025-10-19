document.addEventListener('DOMContentLoaded', function () {
  // Lucide icons init
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      const isHidden = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      if (menuIcon && closeIcon) {
        menuIcon.classList.toggle('hidden', !isHidden);
        closeIcon.classList.toggle('hidden', isHidden);
      }
    });
  }

  // Rooms filter (present only on rooms page)
  const select = document.getElementById('typeFilter');
  const cards = document.querySelectorAll('#roomsGrid .room-card');
  if (select && cards.length) {
    function applyFilter() {
      const val = select.value;
      cards.forEach(card => {
        const type = (card.getAttribute('data-type') || '').toLowerCase();
        card.style.display = (val === 'all' || type === val) ? '' : 'none';
      });
    }
    select.addEventListener('change', applyFilter);
    applyFilter();
  }

  // Contact form validation (only on contact page)
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');
  const submitBtn = document.getElementById('contactSubmit');
  if (form && toast && submitBtn) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name) return showToast('Name is required', true);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('Invalid email address', true);
      if (message.length < 10) return showToast('Message must be at least 10 characters', true);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      await new Promise(r => setTimeout(r, 800));
      showToast("Thank you for contacting us. We'll get back to you soon!", false);
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
    function showToast(text, isError) {
      toast.textContent = text;
      toast.classList.remove('hidden');
      toast.classList.toggle('text-red-600', !!isError);
      toast.classList.toggle('text-green-600', !isError);
      setTimeout(() => toast.classList.add('hidden'), 3000);
    }
  }
});
