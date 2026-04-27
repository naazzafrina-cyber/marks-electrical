/* =================================================================
   MARKS ELECTRICAL SERVICES — Interactivity
   - Mobile nav, smooth scroll
   - Form submission to Formspree (with mailto fallback)
   - Star rating, scroll reveal animations
================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Year in footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Mobile nav toggle ----- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isActive = nav.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- Star rating input ----- */
  const ratingStars = document.querySelectorAll('.rating-input__star');
  const ratingInput = document.getElementById('fb-rating');
  if (ratingStars.length && ratingInput) {
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value, 10);
        ratingInput.value = value;
        ratingStars.forEach(s => {
          const sv = parseInt(s.dataset.value, 10);
          s.classList.toggle('active', sv <= value);
        });
      });

      // Hover preview
      star.addEventListener('mouseenter', () => {
        const value = parseInt(star.dataset.value, 10);
        ratingStars.forEach(s => {
          const sv = parseInt(s.dataset.value, 10);
          s.style.color = sv <= value ? '' : 'rgba(255, 255, 255, 0.3)';
        });
      });
    });

    document.getElementById('ratingInput').addEventListener('mouseleave', () => {
      const value = parseInt(ratingInput.value, 10);
      ratingStars.forEach(s => {
        const sv = parseInt(s.dataset.value, 10);
        s.style.color = '';
        s.classList.toggle('active', sv <= value);
      });
    });
  }

  /* ----- Form submission helper -----
     Tries Formspree (configured in HTML action attribute).
     If the action still contains the placeholder, falls back to mailto. */

  function handleFormSubmit(form, statusEl, successMsg) {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = '';
      statusEl.className = 'form__status';

      const action = form.getAttribute('action') || '';
      const formData = new FormData(form);

      // -------- FALLBACK: open Gmail compose if Formspree not configured --------
      if (action.includes('YOUR_FORMSPREE_ID') || !action.startsWith('http')) {
        // Build mailto with all form data
        // ⚠️ REPLACE 'youremail@gmail.com' below with the real shop email
        const recipient = 'marks.electrical.udupi@gmail.com';
        const subject = formData.get('_subject') || 'Website Enquiry';
        let body = '';
        for (const [key, value] of formData.entries()) {
          if (key.startsWith('_') || !value) continue;
          body += `${key.toUpperCase()}: ${value}\n\n`;
        }
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        statusEl.textContent = '✓ Opening your email app... please send the message to complete.';
        statusEl.classList.add('success');
        return;
      }

      // -------- PRIMARY: submit to Formspree --------
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.textContent = successMsg;
          statusEl.classList.add('success');
          form.reset();
          // Reset rating stars to 5 if applicable
          if (form.id === 'feedbackForm' && ratingInput) {
            ratingInput.value = 5;
            ratingStars.forEach(s => s.classList.add('active'));
          }
        } else {
          const data = await response.json().catch(() => ({}));
          statusEl.textContent = data.error || '⚠️ Something went wrong. Please try calling us at +91 81054 64100.';
          statusEl.classList.add('error');
        }
      } catch (err) {
        statusEl.textContent = '⚠️ Network error. Please call us directly at +91 81054 64100.';
        statusEl.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  handleFormSubmit(
    document.getElementById('enquiryForm'),
    document.getElementById('enquiryStatus'),
    '✓ Thank you! We received your enquiry and will be in touch shortly.'
  );

  handleFormSubmit(
    document.getElementById('feedbackForm'),
    document.getElementById('feedbackStatus'),
    '✓ Thank you for your review! We truly appreciate your feedback.'
  );

  /* ----- Scroll reveal ----- */
  const revealEls = document.querySelectorAll(
    '.section__head, .service, .testimonial, .whyus__item, .about__visual, .about__content, .contact__info, .contact__form-wrap, .hero__stat'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Slight stagger for visual polish
        setTimeout(() => entry.target.classList.add('visible'), idx * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ----- Animated stat counters ----- */
  const statNums = document.querySelectorAll('.hero__stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const numMatch = text.match(/\d+/);
        if (!numMatch) return;
        const target = parseInt(numMatch[0], 10);
        const suffix = text.replace(numMatch[0], '');
        let current = 0;
        const duration = 1400;
        const startTime = performance.now();
        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(target * eased);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(update);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(s => statsObserver.observe(s));

  /* ----- Header shadow on scroll ----- */
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > 20) {
      header.style.boxShadow = '0 4px 20px rgba(11, 30, 63, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = cur;
  }, { passive: true });

});
