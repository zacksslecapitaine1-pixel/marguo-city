/* ================================================================
   BOT.JS — Hôtel Marguo City
   Reservation Chatbot — State Machine
   ================================================================ */

'use strict';

/* ── ROOM DATA ── */
const ROOMS = [
  {
    id: 'clim-premium',
    fr: { name: 'Climatisée Premium', desc: 'Climatisation · Lit 3 places · Mini frigo · Placard · Chauffe-eau · WiFi' },
    en: { name: 'Premium A/C Room',   desc: 'A/C · Triple bed · Mini fridge · Wardrobe · Water heater · WiFi' },
    badge: 'PREMIUM',
    priceNight: 15000,
    priceRest: { clim: true,
      '1h': 3000, '2h': 5000, '3h-4h': 8000,
    },
    type: 'clim',
  },
  {
    id: 'clim-confort',
    fr: { name: 'Climatisée Confort', desc: 'Climatisation · Lit 3 places · Mini frigo ou Placard · WiFi' },
    en: { name: 'Comfort A/C Room',   desc: 'A/C · Triple bed · Mini fridge or Wardrobe · WiFi' },
    badge: 'CONFORT',
    priceNight: 12000,
    priceRest: { clim: true, '1h': 3000, '2h': 5000, '3h-4h': 8000 },
    type: 'clim',
  },
  {
    id: 'clim-standard',
    fr: { name: 'Climatisée Standard', desc: 'Climatisation · Lit 3 places · WiFi' },
    en: { name: 'Standard A/C Room',   desc: 'A/C · Triple bed · WiFi' },
    badge: 'STANDARD',
    priceNight: 10000,
    priceRest: { clim: true, '1h': 3000, '2h': 5000, '3h-4h': 8000 },
    type: 'clim',
  },
  {
    id: 'vent-confort',
    fr: { name: 'Ventilée Confort', desc: 'Ventilateur · Lit 3 places · Placard · Chauffe-eau · WiFi' },
    en: { name: 'Comfort Fan Room',  desc: 'Fan · Triple bed · Wardrobe · Water heater · WiFi' },
    badge: 'CONFORT',
    priceNight: 10000,
    priceRest: { clim: false, '1h': 2500, '2h-3h': 5000, '4h': 6000 },
    type: 'vent',
  },
  {
    id: 'vent-standard',
    fr: { name: 'Ventilée Standard', desc: 'Ventilateur · Lit 3 places · Placard · WiFi' },
    en: { name: 'Standard Fan Room',  desc: 'Fan · Triple bed · Wardrobe · WiFi' },
    badge: 'STANDARD',
    priceNight: 8000,
    priceRest: { clim: false, '1h': 2500, '2h-3h': 5000, '4h': 6000 },
    type: 'vent',
  },
];

/* ── ICONS (inline SVG) ── */
const ICON_BOT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 3v4m0 0a4 4 0 014 4H8a4 4 0 014-4z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>`;
const ICON_USER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`;
const ICON_WA = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

/* ── BOT TEXTS ── */
const BT = {
  fr: {
    welcome:     'Bienvenue chez <strong>Hôtel Marguo City</strong>. Je suis votre assistant de réservation, disponible 24h/24 et 7j/7.',
    askName:     'Pour commencer, quel est votre <strong>prénom</strong> ?',
    askStay:     n => `Merci <strong>${n}</strong> ! Quel type de séjour souhaitez-vous ?`,
    optNight:    'Nuit complète',
    optRest:     'Repos (quelques heures)',
    askRoom:     'Voici nos chambres disponibles. Laquelle vous convient ?',
    askDate:     'Quelle est votre <strong>date d\'arrivée</strong> ?',
    askTime:     'À quelle <strong>heure</strong> prévoyez-vous d\'arriver ?',
    askNights:   'Combien de <strong>nuits</strong> souhaitez-vous séjourner ?',
    askDuration: 'Quelle <strong>durée</strong> de repos souhaitez-vous ?',
    askPersons:  'Combien de <strong>personnes</strong> ?',
    askPhone:    'Votre <strong>numéro de téléphone</strong> (avec indicatif pays) ?',
    askPayment:  'Quel est votre <strong>mode de paiement</strong> préféré ?',
    optCash:     'Espèces à l\'arrivée',
    optTransfer: 'Transfert mobile',
    thanks:      'Parfait ! Voici le récapitulatif de votre réservation. Confirmez via WhatsApp pour finaliser.',
    nightLabel:  'Nuit complète',
    restLabel:   'Repos',
    nights:      n => `${n} nuit${n > 1 ? 's' : ''}`,
    persons:     n => `${n} personne${n > 1 ? 's' : ''}`,
    placeholder: 'Tapez votre réponse…',
    send:        'Envoyer',
    confirm:     'Confirmer sur WhatsApp',
    labels: {
      name: 'Prénom', phone: 'Téléphone', stay: 'Type de séjour',
      room: 'Chambre', date: 'Date d\'arrivée', time: 'Heure d\'arrivée',
      duration: 'Durée', persons: 'Personnes', payment: 'Paiement',
      total: 'Total estimé', deposit: 'Acompte (50%)'
    }
  },
  en: {
    welcome:     'Welcome to <strong>Hôtel Marguo City</strong>. I am your booking assistant, available 24/7.',
    askName:     'To get started, what is your <strong>first name</strong>?',
    askStay:     n => `Thank you <strong>${n}</strong>! What type of stay would you like?`,
    optNight:    'Full night',
    optRest:     'Short stay (a few hours)',
    askRoom:     'Here are our available rooms. Which one suits you?',
    askDate:     'What is your <strong>arrival date</strong>?',
    askTime:     'What <strong>time</strong> do you plan to arrive?',
    askNights:   'How many <strong>nights</strong> would you like to stay?',
    askDuration: 'What <strong>duration</strong> of stay do you want?',
    askPersons:  'How many <strong>people</strong>?',
    askPhone:    'Your <strong>phone number</strong> (with country code)?',
    askPayment:  'Your preferred <strong>payment method</strong>?',
    optCash:     'Cash on arrival',
    optTransfer: 'Mobile transfer',
    thanks:      'Perfect! Here is your booking summary. Confirm on WhatsApp to finalize.',
    nightLabel:  'Full night',
    restLabel:   'Short stay',
    nights:      n => `${n} night${n > 1 ? 's' : ''}`,
    persons:     n => `${n} person${n > 1 ? 's' : ''}`,
    placeholder: 'Type your answer…',
    send:        'Send',
    confirm:     'Confirm on WhatsApp',
    labels: {
      name: 'Name', phone: 'Phone', stay: 'Stay type',
      room: 'Room', date: 'Arrival date', time: 'Arrival time',
      duration: 'Duration', persons: 'People', payment: 'Payment',
      total: 'Estimated total', deposit: 'Deposit (50%)'
    }
  }
};

/* ── STATE ── */
const S = {
  lang: localStorage.getItem('mc_lang') || 'fr',
  step: 0,          // 0-9
  name: '', phone: '', stay: '',
  room: null, date: '', time: '',
  duration: '', nights: 1, persons: 1, payment: '',
};

/* ── DOM ── */
let win, bar, steps;

/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  win   = document.getElementById('chatMsgs');
  bar   = document.getElementById('chatBar');
  steps = document.querySelectorAll('.bot-step');
  if (!win) return;

  // Update step labels
  updateStepLabels();

  // Start
  delay(() => {
    addBot(BT[S.lang].welcome);
    delay(() => { addBot(BT[S.lang].askName); showText(); }, 900);
  }, 500);
});

/* ================================================================
   PROGRESS
   ================================================================ */
function updateStepLabels() {
  const labels = S.lang === 'fr'
    ? ['Prénom','Séjour','Chambre','Date','Heure','Durée','Personnes','Téléphone','Paiement','Confirm.']
    : ['Name','Stay','Room','Date','Time','Duration','People','Phone','Payment','Confirm'];
  steps.forEach((el, i) => {
    el.textContent = labels[i] || '';
    el.classList.remove('active','done');
    if (i < S.step) el.classList.add('done');
    if (i === S.step) el.classList.add('active');
  });
}

function advanceStep() {
  S.step = Math.min(S.step + 1, steps.length - 1);
  updateStepLabels();
}

/* ================================================================
   MESSAGE HELPERS
   ================================================================ */
function addBot(html, extra = '') {
  const d = document.createElement('div');
  d.className = 'msg bot';
  d.innerHTML = `<div class="msg-av">${ICON_BOT}</div>
    <div><div class="msg-bub">${html}</div>${extra}</div>`;
  win.appendChild(d);
  scroll();
}

function addUser(text) {
  const d = document.createElement('div');
  d.className = 'msg user';
  d.innerHTML = `<div class="msg-bub">${text}</div><div class="msg-av">${ICON_USER}</div>`;
  win.appendChild(d);
  scroll();
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'msg bot _typing';
  d.innerHTML = `<div class="msg-av">${ICON_BOT}</div>
    <div class="msg-bub"><div class="typing-bubble"><span></span><span></span><span></span></div></div>`;
  win.appendChild(d);
  scroll();
  return d;
}

function removeTyping() { document.querySelector('._typing')?.remove(); }
function scroll() { win.scrollTop = win.scrollHeight; }
function clearBar() { bar.innerHTML = ''; }
function delay(fn, ms = 700) { setTimeout(fn, ms); }

/* ================================================================
   INPUT MODES
   ================================================================ */
function showText(type = 'text', ph = null) {
  const t = BT[S.lang];
  clearBar();
  bar.innerHTML = `<div class="text-input-row">
    <input class="bot-input" id="bInput" type="${type}" placeholder="${ph || t.placeholder}" autocomplete="off">
    <button class="bot-send" id="bSend">${t.send}</button>
  </div>`;
  const inp = document.getElementById('bInput');
  const btn = document.getElementById('bSend');
  inp.focus();
  const go = () => { const v = inp.value.trim(); if (v) onText(v); };
  btn.addEventListener('click', go);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
}

function showQR(options) {
  clearBar();
  const wrap = document.createElement('div');
  wrap.className = 'qr-wrap';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'qr' + (opt.cls ? ' ' + opt.cls : '');
    btn.innerHTML = opt.html || opt.label;
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.qr').forEach(b => b.classList.add('disabled'));
      btn.classList.add('picked');
      onChoice(opt.val, opt.label);
    });
    wrap.appendChild(btn);
  });
  bar.appendChild(wrap);
}

/* ================================================================
   FLOW HANDLERS
   ================================================================ */
function onText(val) {
  addUser(val);
  clearBar();
  const typing = showTyping();

  delay(() => {
    removeTyping();

    if (S.step === 0) {
      S.name = val; advanceStep();
      addBot(BT[S.lang].askStay(S.name));
      showQR([
        { val: 'night', label: BT[S.lang].optNight },
        { val: 'rest',  label: BT[S.lang].optRest  },
      ]);

    } else if (S.step === 3) {
      // date
      S.date = val; advanceStep();
      addBot(BT[S.lang].askTime);
      showText('time');

    } else if (S.step === 4) {
      // time
      S.time = val; advanceStep();
      if (S.stay === 'night') {
        addBot(BT[S.lang].askNights);
        showQR([1,2,3,4].map(n => ({
          val: String(n),
          label: BT[S.lang].nights(n)
        })));
      } else {
        askDuration();
      }

    } else if (S.step === 7) {
      // phone
      S.phone = val; advanceStep();
      addBot(BT[S.lang].askPayment);
      showQR([
        { val: 'cash',     label: BT[S.lang].optCash     },
        { val: 'transfer', label: BT[S.lang].optTransfer },
      ]);
    }
  });
}

function onChoice(val, label) {
  addUser(label);
  clearBar();
  const typing = showTyping();

  delay(() => {
    removeTyping();

    if (S.step === 1) {
      // stay type
      S.stay = val; advanceStep();
      addBot(BT[S.lang].askRoom);
      showRoomQR();

    } else if (S.step === 2) {
      // room
      S.room = ROOMS.find(r => r.id === val); advanceStep();
      addBot(BT[S.lang].askDate);
      showText('date');

    } else if (S.step === 5) {
      // nights or duration
      if (S.stay === 'night') S.nights = parseInt(val);
      else S.duration = label;
      advanceStep();
      addBot(BT[S.lang].askPersons);
      showQR([1,2,3].map(n => ({
        val: String(n),
        label: BT[S.lang].persons(n)
      })));

    } else if (S.step === 6) {
      // persons
      S.persons = parseInt(val); advanceStep();
      addBot(BT[S.lang].askPhone);
      showText('tel', '+228…');

    } else if (S.step === 8) {
      // payment
      S.payment = label; advanceStep();
      buildSummary();
    }
  });
}

function askDuration() {
  const r = S.room;
  addBot(BT[S.lang].askDuration);
  const opts = r.type === 'clim'
    ? [
        { val: '1h',    label: `1h — ${(3000).toLocaleString('fr-FR')} FCFA` },
        { val: '2h',    label: `2h — ${(5000).toLocaleString('fr-FR')} FCFA` },
        { val: '3h-4h', label: `3h-4h — ${(8000).toLocaleString('fr-FR')} FCFA` },
      ]
    : [
        { val: '1h',    label: `1h — ${(2500).toLocaleString('fr-FR')} FCFA` },
        { val: '2h-3h', label: `2h-3h — ${(5000).toLocaleString('fr-FR')} FCFA` },
        { val: '4h',    label: `4h — ${(6000).toLocaleString('fr-FR')} FCFA` },
      ];
  showQR(opts);
}

function showRoomQR() {
  clearBar();
  const wrap = document.createElement('div');
  wrap.className = 'qr-wrap';
  ROOMS.forEach(room => {
    const btn = document.createElement('button');
    btn.className = 'qr room';
    const rname = room[S.lang].name;
    btn.innerHTML = `
      <span class="r-name">${rname}</span>
      <span class="r-price">${room.priceNight.toLocaleString('fr-FR')} FCFA <small style="font-family:var(--sans);font-size:.62rem;color:var(--muted)">/ nuit</small></span>
      <span class="r-desc">${room[S.lang].desc}</span>`;
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.qr').forEach(b => b.classList.add('disabled'));
      btn.classList.add('picked');
      onChoice(room.id, rname);
    });
    wrap.appendChild(btn);
  });
  bar.appendChild(wrap);
}

/* ================================================================
   SUMMARY
   ================================================================ */
function calcTotal() {
  const r = S.room;
  if (!r) return 0;
  if (S.stay === 'night') return r.priceNight * S.nights;
  const map = {
    '1h': r.priceRest['1h'],
    '2h': r.priceRest['2h'],
    '3h-4h': r.priceRest['3h-4h'],
    '2h-3h': r.priceRest['2h-3h'],
    '4h': r.priceRest['4h'],
  };
  return map[S.duration] || 0;
}

function buildSummary() {
  const t   = BT[S.lang];
  const lb  = t.labels;
  const total   = calcTotal();
  const deposit = Math.ceil(total * 0.5);
  const rName   = S.room[S.lang].name;
  const fmt = n => n.toLocaleString('fr-FR');

  const durLabel = S.stay === 'night'
    ? t.nights(S.nights)
    : S.duration;

  const waMsg = buildWA(rName, total, deposit, durLabel, t);

  addBot(t.thanks, `
    <div class="sum-card">
      <div class="sum-card-title">${S.lang === 'fr' ? 'Récapitulatif' : 'Summary'}</div>
      ${row(lb.name,    S.name)}
      ${row(lb.phone,   S.phone)}
      ${row(lb.stay,    S.stay === 'night' ? t.nightLabel : t.restLabel)}
      ${row(lb.room,    rName)}
      ${row(lb.date,    S.date)}
      ${row(lb.time,    S.time)}
      ${row(lb.duration, durLabel)}
      ${row(lb.persons, t.persons(S.persons))}
      ${row(lb.payment, S.payment)}
      <div class="sum-total">
        <span class="slabel">${lb.total}</span>
        <span class="sval">${fmt(total)} FCFA</span>
      </div>
      <div class="sum-acompte">${lb.deposit} : <span>${fmt(deposit)} FCFA</span></div>
    </div>
    <a href="${waMsg}" target="_blank" rel="noopener" class="wa-confirm">
      ${ICON_WA} ${t.confirm}
    </a>`);

  clearBar();
  steps[steps.length - 1].classList.add('done');
}

function row(label, val) {
  return `<div class="sum-row"><span class="slabel">${label}</span><span class="sval">${val}</span></div>`;
}

function buildWA(rName, total, deposit, durLabel, t) {
  const fmt = n => n.toLocaleString('fr-FR');
  const msg = [
    `🏨 *Hôtel Marguo City — ${S.lang === 'fr' ? 'Nouvelle Réservation' : 'New Booking'}*`,
    ``,
    `👤 ${t.labels.name} : ${S.name}`,
    `📞 ${t.labels.phone} : ${S.phone}`,
    `🛏️ ${t.labels.room} : ${rName}`,
    `📋 ${t.labels.stay} : ${S.stay === 'night' ? t.nightLabel : t.restLabel}`,
    `📅 ${t.labels.date} : ${S.date}`,
    `🕐 ${t.labels.time} : ${S.time}`,
    `⏳ ${t.labels.duration} : ${durLabel}`,
    `👥 ${t.labels.persons} : ${t.persons(S.persons)}`,
    `💳 ${t.labels.payment} : ${S.payment}`,
    ``,
    `💰 Total : ${fmt(total)} FCFA`,
    `💵 Acompte (50%) : ${fmt(deposit)} FCFA`,
    ``,
    `_${S.lang === 'fr' ? 'Réservation effectuée via le site Hôtel Marguo City' : 'Booking made via Hôtel Marguo City website'}_`
  ].join('\n');

  return `https://wa.me/22899204638?text=${encodeURIComponent(msg)}`;
}
