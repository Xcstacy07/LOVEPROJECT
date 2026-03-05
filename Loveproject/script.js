// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const icon = toggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Fade in sections on scroll
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.classList.add('visible');
      }
    });
  });

  // Contact form submission with mailto functionality
  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();

      if (name && email && msg.length > 10) {
        // Create mailto URL with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
          `Hello Xeno,\n\n` +
          `You have received a new message from your portfolio website.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${msg}\n\n` +
          `Best regards,\nPortfolio Contact Form`
        );

        const mailtoUrl = `mailto:xenosxcstacy@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoUrl;

        // Show success message
        messageEl.style.color = '#22d3ee';
        messageEl.textContent = 'Opening your email client... Please send the pre-filled email!';
        form.reset();

        // Clear message after 8 seconds
        setTimeout(() => {
          messageEl.textContent = '';
        }, 8000);
      } else {
        messageEl.style.color = '#f87171';
        messageEl.textContent = 'Please fill all fields properly.';
      }

      setTimeout(() => { messageEl.textContent = ''; }, 5000);
    });
  }

  // Initial check for visible sections
  window.dispatchEvent(new Event('scroll'));
});