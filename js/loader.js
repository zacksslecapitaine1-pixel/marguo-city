/* ================================================================
   LOADER.JS v4 — Hôtel Marguo City
   Smooth page transitions · Floating Réserver · Scroll progress
   Back-to-top · Toast · Bot modal trigger
   ================================================================ */
'use strict';

(function () {

  var IS_RES = document.body.classList.contains('is-reservation-page');

  /* 1. PAGE TRANSITION OVERLAY */
  function injectTransition() {
    if (document.querySelector('.mc-pt')) return;
    var el = document.createElement('div');
    el.className = 'mc-pt';
    document.body.prepend(el);
    requestAnimationFrame(function () {
      el.classList.add('leaving');
      setTimeout(function () { el.classList.remove('leaving'); }, 480);
    });
  }

  /* 2. INTERCEPT INTERNAL LINKS */
  function initLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href');
      if (!h || h.startsWith('http') || h.startsWith('#') ||
          h.startsWith('tel:') || h.startsWith('mailto:') ||
          h.startsWith('whatsapp:') || a.target === '_blank') return;

      /* Nav Réserver → open bot modal */
      if (!IS_RES && (a.classList.contains('nav-book') || a.id === 'navBookBtn')) {
        e.preventDefault();
        if (window.openMCBot) window.openMCBot();
        return;
      }

      /* Internal page link → slide transition */
      e.preventDefault();
      var overlay = document.querySelector('.mc-pt');
      if (overlay) {
        overlay.classList.add('entering');
        setTimeout(function () { window.location.href = h; }, 380);
      } else {
        window.location.href = h;
      }
    }, { capture: true });
  }

  /* 3. SCROLL PROGRESS BAR */
  function injectScrollProgress() {
    if (document.querySelector('.mc-sp')) return;
    var bar = document.createElement('div');
    bar.className = 'mc-sp';
    document.body.prepend(bar);
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* 4. BACK TO TOP */
  function injectBackToTop() {
    if (document.getElementById('mcBackTop')) return;
    var btn = document.createElement('button');
    btn.className = 'mc-back-top';
    btn.id = 'mcBackTop';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Haut de page');
    document.body.appendChild(btn);
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 380);
    }, { passive: true });
  }

  /* 5. FLOATING RÉSERVER BUTTON */
  function injectFloatBtn() {
    if (IS_RES || document.getElementById('mcFloatReserve')) return;
    var btn = document.createElement('button');
    btn.className = 'mc-float-reserve';
    btn.id = 'mcFloatReserve';
    btn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' +
      ' Réserver';
    btn.addEventListener('click', function () {
      window.location.href = 'reservation.html';
    });
    document.body.appendChild(btn);
  }

  /* 6. TOAST */
  window.showMCToast = function (icon, msg, duration) {
    duration = duration || 5000;
    var toast = document.getElementById('mc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mc-toast';
      toast.className = 'mc-toast';
      toast.innerHTML =
        '<span class="mc-t-icon"></span>' +
        '<span class="mc-t-msg"></span>' +
        '<button class="mc-t-close">✕</button>';
      document.body.appendChild(toast);
      toast.querySelector('.mc-t-close').addEventListener('click', function () {
        toast.classList.remove('show');
      });
    }
    toast.querySelector('.mc-t-icon').textContent = icon;
    toast.querySelector('.mc-t-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, duration);
  };

  /* INIT */
  function init() {
    injectTransition();
    initLinks();
    injectScrollProgress();
    injectBackToTop();
    injectFloatBtn();
    setTimeout(function () {
      var lang = localStorage.getItem('mc_lang') || 'fr';
      window.showMCToast('🏨',
        lang === 'en' ? 'Welcome to Hôtel Marguo City!' : 'Bienvenue chez Hôtel Marguo City !');
    }, 2600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
