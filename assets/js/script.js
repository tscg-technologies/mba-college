/**
 * MBA COLLEGE WEBSITE - VANILLA JAVASCRIPT
 * Implements:
 * - Mobile navigation (smooth open/close, close on link click)
 * - Sticky header
 * - Smooth scrolling
 * - Scroll reveal animations
 * - FAQ accordion
 * - Admission enquiry form & contact form validation (Indian mobile, email, required fields)
 * - Success notification & form reset
 * - Animated statistics counters
 * - Campus image lightbox
 * - Back-to-top button
 * - Program navigation / filter
 * - Active navigation highlighting
 * - Elegant AI Image Fallback handling
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initAIImageFallbacks();
    initStickyHeader();
    initMobileNav();
    initDropdownNav();
    initActiveNavHighlight();
    initSmoothScroll();
    initScrollReveal();
    initStatCounters();
    initProgramFilter();
    initFaqAccordion();
    initGalleryLightbox();
    initFormsValidation();
    initBackToTop();
    initDemoLinks();
  });

  /* ========================================================================
     1. ELEGANT AI IMAGE FALLBACK HANDLER
     If an AI WebP asset is not yet placed or fails to load, ensures the
     styled placeholder remains visible without broken image icons.
     ======================================================================== */
  function initAIImageFallbacks() {
    var mediaContainers = document.querySelectorAll('.ai-media');
    mediaContainers.forEach(function (container) {
      var img = container.querySelector('img');
      if (!img) return;

      function markFallback() {
        container.classList.add('img-fallback');
      }

      function markLoaded() {
        if (img.naturalWidth > 0) {
          container.classList.remove('img-fallback');
        } else {
          markFallback();
        }
      }

      img.addEventListener('error', markFallback);
      img.addEventListener('load', markLoaded);

      if (img.complete) {
        if (img.naturalWidth === 0) {
          markFallback();
        } else {
          markLoaded();
        }
      }
    });
  }

  /* ========================================================================
     2. STICKY HEADER
     ======================================================================== */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function checkScroll() {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ========================================================================
     3. MOBILE NAVIGATION
     ======================================================================== */
  function initMobileNav() {
    var toggleBtn = document.querySelector('.menu-toggle');
    var mainNav = document.querySelector('.main-nav');
    if (!toggleBtn || !mainNav) return;

    function closeMenu() {
      toggleBtn.classList.remove('active');
      mainNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a standard navigation link or dropdown item is selected (ignore dropdown-toggle itself)
    var navLinks = mainNav.querySelectorAll('a:not(.dropdown-toggle)');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu on Escape key or clicking outside
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        closeMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ========================================================================
     3B. DROPDOWN NAVIGATION
     ======================================================================== */
  function initDropdownNav() {
    var dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(function (item) {
      var toggle = item.querySelector('.dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function (e) {
        // On mobile/tablet screens, toggle open state without leaving page
        if (window.innerWidth <= 991) {
          e.preventDefault();
          var isOpen = item.classList.toggle('open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });
    });
  }

  /* ========================================================================
     4. ACTIVE NAVIGATION HIGHLIGHTING
     ======================================================================== */
  function initActiveNavHighlight() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-list .nav-link, .nav-list .dropdown-item');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var cleanHref = href.split('#')[0] || 'index.html';
      if (cleanHref === currentPath) {
        link.classList.add('active');
        // If this link is inside a dropdown, also highlight the parent dropdown toggle
        var parentDropdown = link.closest('.nav-item-dropdown');
        if (parentDropdown) {
          var toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ========================================================================
     5. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
     ======================================================================== */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerOffset = 88;
          var elementPosition = targetEl.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ========================================================================
     6. SCROLL REVEAL ANIMATIONS
     ======================================================================== */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========================================================================
     7. ANIMATED STATISTICS COUNTERS
     ======================================================================== */
  function initStatCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-counter')) || 0;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1800;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var currentVal = (target * easeOut).toFixed(decimals);
        el.textContent = prefix + currentVal + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }

      window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  /* ========================================================================
     8. PROGRAM NAVIGATION / CATEGORY FILTER
     ======================================================================== */
  function initProgramFilter() {
    var filterBtns = document.querySelectorAll('.program-filter-btn');
    var programCards = document.querySelectorAll('.program-card[data-category]');
    if (!filterBtns.length || !programCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filterValue = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        programCards.forEach(function (card) {
          var cardCat = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCat === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ========================================================================
     9. FAQ ACCORDION
     ======================================================================== */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      var content = item.querySelector('.faq-content');
      if (!trigger || !content) return;

      // Initialize default open item if active
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close other FAQ items in same container
        faqItems.forEach(function (otherItem) {
          var otherContent = otherItem.querySelector('.faq-content');
          var otherTrigger = otherItem.querySelector('.faq-trigger');
          otherItem.classList.remove('active');
          if (otherContent) otherContent.style.maxHeight = null;
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ========================================================================
     10. CAMPUS IMAGE LIGHTBOX
     ======================================================================== */
  function initGalleryLightbox() {
    var galleryItems = document.querySelectorAll('.gallery-item');
    var modal = document.getElementById('campusLightbox');
    if (!galleryItems.length || !modal) return;

    var modalMediaBox = modal.querySelector('.lightbox-media-box');
    var modalTitle = modal.querySelector('#lightboxTitle');
    var modalSub = modal.querySelector('#lightboxSubtitle');
    var closeBtn = modal.querySelector('.lightbox-close');
    var prevBtn = modal.querySelector('[data-lightbox-prev]');
    var nextBtn = modal.querySelector('[data-lightbox-next]');
    var currentIndex = 0;

    function renderSlide(index) {
      if (index < 0) index = galleryItems.length - 1;
      if (index >= galleryItems.length) index = 0;
      currentIndex = index;

      var item = galleryItems[currentIndex];
      var title = item.getAttribute('data-title') || 'Campus Life Showcase';
      var subtitle = item.getAttribute('data-subtitle') || 'Fictional Demonstration Environment';
      var sourceMedia = item.querySelector('.ai-media');

      if (modalTitle) modalTitle.textContent = title;
      if (modalSub) modalSub.textContent = subtitle;

      if (modalMediaBox && sourceMedia) {
        modalMediaBox.innerHTML = sourceMedia.outerHTML;
        var clonedMedia = modalMediaBox.querySelector('.ai-media');
        if (clonedMedia) {
          clonedMedia.style.height = '100%';
          clonedMedia.style.borderRadius = '0';
        }
        initAIImageFallbacks();
      }
    }

    function openLightbox(index) {
      renderSlide(index);
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item, idx) {
      item.addEventListener('click', function () {
        openLightbox(idx);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        renderSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        renderSlide(currentIndex + 1);
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') renderSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') renderSlide(currentIndex + 1);
    });
  }

  /* ========================================================================
     11. ADMISSION ENQUIRY & CONTACT FORM VALIDATION
     Frontend-only demo validation:
     - Required fields
     - Indian mobile number (10 digits starting with 6-9, or 0000000000 demo)
     - Email validation
     - Graduation percentage (between 35 and 100)
     - Inline error messages & success banner
     ======================================================================== */
  function initFormsValidation() {
    var forms = document.querySelectorAll('.js-demo-form');
    if (!forms.length) return;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var indianMobileRegex = /^([6-9]\d{9}|0000000000)$/;

    forms.forEach(function (form) {
      var inputs = form.querySelectorAll('.form-control[required]');
      var successBox = form.querySelector('.form-success-alert');

      function setFieldError(field, message) {
        var group = field.closest('.form-group');
        if (!group) return;
        field.classList.add('is-invalid');
        group.classList.add('has-error');
        var errEl = group.querySelector('.error-msg');
        if (errEl && message) {
          errEl.textContent = message;
        }
      }

      function clearFieldError(field) {
        var group = field.closest('.form-group');
        if (!group) return;
        field.classList.remove('is-invalid');
        group.classList.remove('has-error');
      }

      function validateField(field) {
        var val = field.value.trim();
        var name = field.getAttribute('name') || '';

        if (field.hasAttribute('required') && !val) {
          setFieldError(field, 'This field is required.');
          return false;
        }

        if (name === 'fullName' && val.length < 2) {
          setFieldError(field, 'Please enter a valid full name (at least 2 characters).');
          return false;
        }

        if (name === 'mobile') {
          var cleanedPhone = val.replace(/[\s\-+]/g, '').replace(/^91/, '');
          if (!indianMobileRegex.test(cleanedPhone)) {
            setFieldError(field, 'Please enter a valid 10-digit Indian mobile number.');
            return false;
          }
        }

        if (name === 'email' && !emailRegex.test(val)) {
          setFieldError(field, 'Please enter a valid email address.');
          return false;
        }

        if (name === 'percentage' && val !== '') {
          var num = parseFloat(val);
          if (isNaN(num) || num < 35 || num > 100) {
            setFieldError(field, 'Please enter a valid percentage between 35 and 100.');
            return false;
          }
        }

        clearFieldError(field);
        return true;
      }

      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          validateField(input);
        });
        input.addEventListener('input', function () {
          if (input.classList.contains('is-invalid')) {
            validateField(input);
          }
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (successBox) {
          successBox.classList.remove('visible');
        }

        var isFormValid = true;
        inputs.forEach(function (input) {
          if (!validateField(input)) {
            isFormValid = false;
          }
        });

        if (!isFormValid) {
          var firstInvalid = form.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Demo submission success - do not transmit or store data
        form.reset();
        inputs.forEach(clearFieldError);

        if (successBox) {
          successBox.classList.add('visible');
          setTimeout(function () {
            successBox.classList.remove('visible');
          }, 7000);
        }
      });
    });
  }

  /* ========================================================================
     12. BACK TO TOP BUTTON
     ======================================================================== */
  function initBackToTop() {
    var backBtn = document.getElementById('backToTop');
    if (!backBtn) return;

    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 420) {
          backBtn.classList.add('visible');
        } else {
          backBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========================================================================
     13. STUDENT PORTAL & DEMO TOAST NOTIFICATION
     ======================================================================== */
  function initDemoLinks() {
    var demoTriggers = document.querySelectorAll('[data-demo-notice]');
    var toast = document.getElementById('demoToast');
    if (!demoTriggers.length || !toast) return;

    var toastTimer = null;

    demoTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var msg =
          trigger.getAttribute('data-demo-notice') ||
          'Student Portal is a demonstration link. No backend login is connected in this static website demo.';
        toast.textContent = msg;
        toast.classList.add('show');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove('show');
        }, 4500);
      });
    });
  }
})();
