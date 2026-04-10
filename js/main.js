/* ================================================================
   MAIN.JS — Hôtel Marguo City
   Navigation · i18n · Scroll Reveal · Shared Logic
   ================================================================ */

'use strict';

/* ================================================================
   TRANSLATIONS
   ================================================================ */
const T = {
  fr: {
    nav: {
      home: 'Accueil', rooms: 'Chambres', restaurant: 'Restaurant',
      events: 'Événements', booking: 'Réservation', contact: 'Contact',
      book_cta: 'Réserver'
    },
    foot: {
      desc: 'Votre havre d\'élégance et de confort au cœur de Lomé.',
      open: 'Ouvert 24h/24 · 7j/7',
      links: 'Liens rapides', infos: 'Informations pratiques',
      ci: 'Check-in', ci_val: '24h/24 — Toujours disponible',
      co: 'Check-out', co_val: '24h/24 — Aucune contrainte',
      cancel: 'Annulation', cancel_val: '72h avant l\'arrivée',
      deposit: '', deposit_val: '',
      rights: '© 2025 Hôtel Marguo City · Lomé, Togo',
      dev: 'Conçu par <a href="https://dev-zak.netlify.app" target="_blank" rel="noopener">Dev.zak</a>'
    },
    pages: {
      index: {
        eyebrow: 'Lomé, Togo — MC Le Référentiel',
        title: 'Marguo City',
        subtitle: 'Hôtel · Bar · Restaurant',
        cta1: 'Réserver une chambre', cta2: 'Découvrir',
        scroll: 'Défiler',
        about_eye: 'Notre établissement',
        about_h2: 'Un art de vivre au cœur de Lomé',
        about_p: 'Niché à Adidogomé Soviépé, l\'Hôtel Marguo City vous accueille dans un cadre alliant élégance contemporaine et chaleur africaine. Chaque espace a été pensé pour votre confort absolu — des chambres au restaurant, en passant par nos salles événementielles.',
        about_btn: 'Notre histoire',
        stat1_n: '10+', stat1_l: 'Chambres',
        stat2_n: '24/7', stat2_l: 'Ouverture',
        stat3_n: '100', stat3_l: 'Places salle',
        stat4_n: '3', stat4_l: 'Espaces',
        rooms_eye: 'Hébergement', rooms_h2: 'Nos chambres',
        rooms_sub: 'Toutes nos chambres sont climatisées et offrent le même soin du détail.',
        rest_eye: 'Gastronomie & Bar', rest_h2: 'Restaurant & Bar',
        rest_p: 'Savourez une cuisine authentique dans un cadre chaleureux, ou détendez-vous au bar avec une sélection de boissons soigneusement choisies. Prix accessibles, qualité irréprochable.',
        rest_btn: 'Voir le menu',
        events_eye: 'Espaces', events_h2: 'Salle & Événements',
        events_p: 'Une salle climatisée et un espace extérieur aéré pour accueillir vos réunions, conférences et réceptions privées jusqu\'à 100 personnes.',
        events_btn: 'Demander un devis',
        cta_h2: 'Votre séjour commence ici',
        cta_p: 'Réservez en quelques clics, 24h/24. Notre assistant vous guide étape par étape.',
        cta_btn: 'Réserver maintenant'
      },
      rooms: {
        eye: 'Hébergement', h1: 'Nos chambres',
        sub: 'Chaque chambre est un refuge de sérénité — bienvenue dans votre espace.',
        types_eye: 'Types de séjour',
        night: 'la nuit', rest_label: 'Repos',
        book_btn: 'Réserver cette chambre',
        repos_title: 'Tarifs repos',
        amenities: {
          ac: 'Climatisation', fan: 'Ventilateur', bed3: 'Lit 3 places',
          fridge: 'Mini frigo', wardrobe: 'Placard', heater: 'Chauffe-eau', wifi: 'WiFi'
        }
      },
      restaurant: {
        eye: 'Gastronomie', h1: 'Restaurant & Bar',
        sub: 'Saveurs authentiques et ambiance raffinée, ouverts 24h/24.',
        rest_eye: 'Notre cuisine', rest_h3: 'Le Restaurant',
        rest_p: 'Une cuisine variée, préparée avec soin par nos équipes. Du petit-déjeuner au dîner, nos repas sont servis à des tarifs accessibles dans un cadre chaleureux et convivial.',
        rest_price: '1 000 – 4 500 FCFA',
        rest_price_l: 'par repas',
        bar_eye: 'Nos boissons', bar_h3: 'Le Bar',
        bar_p: 'Un large choix de bières locales et importées, cocktails maison et spiritueux sélectionnés. Profitez de l\'ambiance détendue du bar, ouvert toute la journée.',
        bar_price: '500 – 1 000 FCFA',
        bar_price_l: 'par bière',
        hours: 'Ouvert 24h/24 · 7j/7',
        book_table: 'Nous contacter'
      },
      events: {
        eye: 'Espaces', h1: 'Salle & Événements',
        sub: 'L\'écrin idéal pour vos événements professionnels et privés.',
        hall_eye: 'Salle de conférence', hall_h3: 'Espace climatisé & ventilé',
        hall_p: 'Notre salle polyvalente accueille jusqu\'à 80–100 personnes dans un cadre moderne, doté d\'un système audio professionnel, idéal pour réunions, formations, conférences et réceptions.',
        hall_feats: ['80 – 100 places assises', 'Climatisation & ventilation', 'Système audio professionnel', 'Vidéoprojecteur disponible', 'Événements autorisés'],
        outdoor_eye: 'Espace extérieur', outdoor_h3: 'Réceptions en plein air',
        outdoor_p: 'Notre espace extérieur aéré et verdoyant offre un cadre naturel et élégant pour vos cocktails, cérémonies et réceptions privées.',
        quote_h3: 'Demander un devis',
        quote_p: 'Les tarifs de nos espaces sont établis sur devis selon vos besoins, la durée et la configuration souhaitée. Contactez-nous pour une réponse rapide.',
        quote_btn: 'Nous contacter sur WhatsApp',
        capacity: 'Capacité',
        cap_val: '80 – 100 personnes'
      },
      contact: {
        eye: 'Nous trouver', h1: 'Contact',
        sub: 'Disponibles 24h/24 pour vous accueillir et répondre à vos questions.',
        addr_title: 'Adresse',
        addr: 'Adidogomé Soviépé, non loin de l\'École Primaire Soviépé, Lomé, Togo',
        phone_title: 'Téléphone',
        wa_title: 'WhatsApp',
        hours_title: 'Horaires',
        hours_val: 'Ouvert 24h/24 · 7 jours sur 7',
        write_wa: 'Écrire sur WhatsApp',
        map_btn: 'Voir sur Google Maps',
        form_h3: 'Nous écrire',
        form_name: 'Votre prénom', form_phone: 'Votre téléphone',
        form_msg: 'Votre message', form_send: 'Envoyer via WhatsApp'
      },
      booking: {
        eye: 'Réservation en ligne', h1: 'Réserver une chambre',
        sub: 'Notre assistant vous guide étape par étape. Simple, rapide, disponible 24h/24.'
      }
    }
  },

  en: {
    nav: {
      home: 'Home', rooms: 'Rooms', restaurant: 'Restaurant',
      events: 'Events', booking: 'Book', contact: 'Contact',
      book_cta: 'Book Now'
    },
    foot: {
      desc: 'Your haven of elegance and comfort in the heart of Lomé.',
      open: 'Open 24/7',
      links: 'Quick links', infos: 'Useful information',
      ci: 'Check-in', ci_val: '24/7 — Always available',
      co: 'Check-out', co_val: '24/7 — No constraints',
      cancel: 'Cancellation', cancel_val: '72h before arrival',
      deposit: '', deposit_val: '',
      rights: '© 2025 Hôtel Marguo City · Lomé, Togo',
      dev: 'Designed by <a href="https://dev-zak.netlify.app" target="_blank" rel="noopener">Dev.zak</a>'
    },
    pages: {
      index: {
        eyebrow: 'Lomé, Togo — MC Le Référentiel',
        title: 'Marguo City',
        subtitle: 'Hotel · Bar · Restaurant',
        cta1: 'Book a Room', cta2: 'Discover',
        scroll: 'Scroll',
        about_eye: 'Our establishment',
        about_h2: 'A way of life in the heart of Lomé',
        about_p: 'Nestled in Adidogomé Soviépé, Hôtel Marguo City welcomes you in a setting combining contemporary elegance and African warmth. Every space has been designed for your absolute comfort — from rooms to restaurant and event halls.',
        about_btn: 'Our story',
        stat1_n: '10+', stat1_l: 'Rooms',
        stat2_n: '24/7', stat2_l: 'Open',
        stat3_n: '100', stat3_l: 'Hall seats',
        stat4_n: '3', stat4_l: 'Spaces',
        rooms_eye: 'Accommodation', rooms_h2: 'Our Rooms',
        rooms_sub: 'All our rooms are air-conditioned and offer the same attention to detail.',
        rest_eye: 'Gastronomy & Bar', rest_h2: 'Restaurant & Bar',
        rest_p: 'Enjoy authentic cuisine in a warm setting, or relax at the bar with a carefully chosen selection of drinks. Affordable prices, impeccable quality.',
        rest_btn: 'See the menu',
        events_eye: 'Spaces', events_h2: 'Hall & Events',
        events_p: 'An air-conditioned hall and an open outdoor space to host your meetings, conferences and private receptions for up to 100 people.',
        events_btn: 'Request a quote',
        cta_h2: 'Your stay begins here',
        cta_p: 'Book in a few clicks, 24/7. Our assistant guides you step by step.',
        cta_btn: 'Book Now'
      },
      rooms: {
        eye: 'Accommodation', h1: 'Our Rooms',
        sub: 'Each room is a sanctuary of serenity — welcome to your space.',
        night: 'per night', rest_label: 'Short stay',
        book_btn: 'Book this room',
        repos_title: 'Short stay rates',
        amenities: {
          ac: 'Air conditioning', fan: 'Fan', bed3: 'Triple bed',
          fridge: 'Mini-fridge', wardrobe: 'Wardrobe', heater: 'Water heater', wifi: 'WiFi'
        }
      },
      restaurant: {
        eye: 'Gastronomy', h1: 'Restaurant & Bar',
        sub: 'Authentic flavors and refined atmosphere, open 24/7.',
        rest_eye: 'Our kitchen', rest_h3: 'The Restaurant',
        rest_p: 'A varied cuisine, carefully prepared by our team. From breakfast to dinner, our meals are served at affordable prices in a warm and friendly setting.',
        rest_price: '1,000 – 4,500 FCFA',
        rest_price_l: 'per meal',
        bar_eye: 'Our drinks', bar_h3: 'The Bar',
        bar_p: 'A wide choice of local and imported beers, homemade cocktails and selected spirits. Enjoy the relaxed atmosphere of the bar, open all day.',
        bar_price: '500 – 1,000 FCFA',
        bar_price_l: 'per beer',
        hours: 'Open 24/7',
        book_table: 'Contact us'
      },
      events: {
        eye: 'Spaces', h1: 'Hall & Events',
        sub: 'The ideal setting for your professional and private events.',
        hall_eye: 'Conference hall', hall_h3: 'Air-conditioned & ventilated space',
        hall_p: 'Our versatile hall accommodates up to 80–100 people in a modern setting with a professional audio system, ideal for meetings, training, conferences and receptions.',
        hall_feats: ['80 – 100 seats', 'Air conditioning & ventilation', 'Professional audio system', 'Projector available', 'Events allowed'],
        outdoor_eye: 'Outdoor space', outdoor_h3: 'Open-air receptions',
        outdoor_p: 'Our airy, green outdoor space offers a natural and elegant setting for cocktails, ceremonies and private receptions.',
        quote_h3: 'Request a quote',
        quote_p: 'Pricing for our spaces is established by quote according to your needs, duration and desired setup. Contact us for a quick response.',
        quote_btn: 'Contact us on WhatsApp',
        capacity: 'Capacity',
        cap_val: '80 – 100 people'
      },
      contact: {
        eye: 'Find us', h1: 'Contact',
        sub: 'Available 24/7 to welcome you and answer your questions.',
        addr_title: 'Address',
        addr: 'Adidogomé Soviépé, near École Primaire Soviépé, Lomé, Togo',
        phone_title: 'Phone',
        wa_title: 'WhatsApp',
        hours_title: 'Hours',
        hours_val: 'Open 24/7 · 7 days a week',
        write_wa: 'Message us on WhatsApp',
        map_btn: 'View on Google Maps',
        form_h3: 'Send a message',
        form_name: 'Your first name', form_phone: 'Your phone number',
        form_msg: 'Your message', form_send: 'Send via WhatsApp'
      },
      booking: {
        eye: 'Online Booking', h1: 'Book a Room',
        sub: 'Our assistant guides you step by step. Simple, fast, available 24/7.'
      }
    }
  }
};

/* ================================================================
   CONSTANTS
   ================================================================ */
const WA = '22899204638';
const PAGES = [
  { href: 'index.html',      key: 'home'       },
  { href: 'chambres.html',   key: 'rooms'      },
  { href: 'restaurant.html', key: 'restaurant' },
  { href: 'evenements.html', key: 'events'     },
  { href: 'reservation.html',key: 'booking'    },
  { href: 'contact.html',    key: 'contact'    },
];

/* ================================================================
   STATE
   ================================================================ */
let lang = localStorage.getItem('mc_lang') || 'fr';

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initLangToggle();
  initScrollNav();
  initMobileMenu();
  initReveal();
  applyPageTranslations();
});

/* ================================================================
   NAV
   ================================================================ */
function buildNav() {
  const t = T[lang];
  const cur = location.pathname.split('/').pop() || 'index.html';

  const navLinks = document.getElementById('navLinks');
  const mobNav   = document.getElementById('mobNav');

  if (navLinks) {
    navLinks.innerHTML = PAGES.map(p =>
      `<a href="${p.href}" class="${cur === p.href ? 'active' : ''}">${t.nav[p.key]}</a>`
    ).join('');
  }
  if (mobNav) {
    mobNav.innerHTML = PAGES.map(p =>
      `<a href="${p.href}" onclick="closeMob()">${t.nav[p.key]}</a>`
    ).join('') + `<div class="mob-lang"><div class="lang-sw" id="mobLangSw">
      <button data-l="fr" class="${lang==='fr'?'on':''}">FR</button>
      <button data-l="en" class="${lang==='en'?'on':''}">EN</button>
    </div></div>`;
    // bind mobile lang
    mobNav.querySelectorAll('[data-l]').forEach(b => b.addEventListener('click', () => switchLang(b.dataset.l)));
  }

  const bookBtn = document.getElementById('navBookBtn');
  if (bookBtn) bookBtn.textContent = t.nav.book_cta;
}

function initScrollNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const burger = document.getElementById('burger');
  const mobNav = document.getElementById('mobNav');
  const scrim  = document.getElementById('scrim');
  if (!burger) return;

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobNav.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  scrim.addEventListener('click', closeMob);
}

window.closeMob = function () {
  document.getElementById('burger')?.classList.remove('open');
  document.getElementById('mobNav')?.classList.remove('open');
  document.getElementById('scrim')?.classList.remove('on');
  document.body.style.overflow = '';
};

/* ================================================================
   FOOTER
   ================================================================ */
function buildFooter() {
  const el = document.getElementById('footerInner');
  if (!el) return;
  const f = T[lang].foot;
  const n = T[lang].nav;
  el.innerHTML = `
    <div class="foot-top">
      <div class="foot-brand">
        <img class="foot-brand-logo" src="images/logo.png" alt="Marguo City Logo" onerror="this.style.display='none'">
        <p>${f.desc}</p>
        <div class="foot-badge"><span>${f.open}</span></div>
      </div>
      <div class="foot-col">
        <h5>${f.links}</h5>
        <ul>
          ${PAGES.map(p => `<li><a href="${p.href}">${n[p.key]}</a></li>`).join('')}
        </ul>
      </div>
      <div class="foot-col">
        <h5>${f.infos}</h5>
        <ul>
          <li><span>${f.ci} :</span> ${f.ci_val}</li>
          <li><span>${f.co} :</span> ${f.co_val}</li>
          <li><span>${f.cancel} :</span> ${f.cancel_val}</li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>${f.rights}</span>
      <span>${f.dev}</span>
    </div>`;
}

/* ================================================================
   LANG
   ================================================================ */
function initLangToggle() {
  document.querySelectorAll('[data-l]').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.l === lang);
    btn.addEventListener('click', () => switchLang(btn.dataset.l));
  });
}

function switchLang(l) {
  lang = l;
  localStorage.setItem('mc_lang', l);
  document.querySelectorAll('[data-l]').forEach(b => b.classList.toggle('on', b.dataset.l === l));
  buildNav();
  buildFooter();
  applyPageTranslations();
}

/* ================================================================
   PAGE-SPECIFIC TRANSLATIONS
   Apply [data-t="key.sub"] attributes
   ================================================================ */
function applyPageTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const path = el.dataset.t.split('.');
    let val = T[lang];
    for (const k of path) { val = val?.[k]; }
    if (typeof val === 'string') {
      if (el.dataset.tAttr) el.setAttribute(el.dataset.tAttr, val);
      else el.innerHTML = val;
    }
  });
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -55px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ================================================================
   SHARED HELPERS (used by other pages)
   ================================================================ */
window.MC = {
  lang: () => lang,
  t:    (path) => {
    const keys = path.split('.');
    let val = T[lang];
    for (const k of keys) val = val?.[k];
    return val;
  },
  wa: WA,
  waLink: (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
};
