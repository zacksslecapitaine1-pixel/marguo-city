/* ================================================================
   LOADER.JS — Page Transition Loader
   Logo + progress bar on every page load
   ================================================================ */

(function () {
  'use strict';

  /* ── Inject loader HTML ── */
  const loader = document.createElement('div');
  loader.id = 'pageLoader';
  loader.className = 'page-loader';
  loader.innerHTML = `
    <img class="pl-logo"
         src="images/logo.png"
         alt="Marguo City"
         onerror="this.style.display='none'; document.getElementById('plLogoText').style.display='block'"/>
    <div class="pl-logo-text" id="plLogoText" style="display:none;">Marguo City</div>
    <div class="pl-bar-wrap">
      <div class="pl-bar" id="plBar"></div>
    </div>
    <div class="pl-sub">Hôtel · Bar · Restaurant</div>
  `;

  /* Insert as first child of body — runs before DOMContentLoaded */
  if (document.body) {
    document.body.insertBefore(loader, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.insertBefore(loader, document.body.firstChild);
    });
  }

  /* ── Hide loader after page load ── */
  function hideLoader() {
    const l = document.getElementById('pageLoader');
    if (!l) return;
    /* Small delay so animation completes gracefully */
    setTimeout(() => {
      l.classList.add('hidden');
      /* Remove from DOM after transition */
      setTimeout(() => l.remove(), 600);
    }, 680);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    /* Fallback: hide after max 2.2s even if resources lag */
    setTimeout(hideLoader, 2200);
  }

  /* ── Trigger loader on internal link clicks ── */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    /* Skip: external, anchor-only, tel, mailto, whatsapp, new tab */
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('whatsapp:') ||
      link.target === '_blank'
    ) return;

    /* Show loader */
    const newLoader = document.createElement('div');
    newLoader.id = 'pageLoader';
    newLoader.className = 'page-loader';
    newLoader.innerHTML = `
      <img class="pl-logo"
           src="images/logo.png"
           alt="Marguo City"
           onerror="this.style.display='none'"/>
      <div class="pl-logo-text">Marguo City</div>
      <div class="pl-bar-wrap">
        <div class="pl-bar"></div>
      </div>
      <div class="pl-sub">Hôtel · Bar · Restaurant</div>
    `;
    document.body.appendChild(newLoader);

    /* Let the bar animation play then navigate */
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 820);
  }, { capture: true });

})();
