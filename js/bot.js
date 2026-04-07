/* ================================================================
   BOT.JS v4 — Hôtel Marguo City
   Modal fullscreen · Flow complet · WhatsApp confirm · FR/EN
   ================================================================ */
'use strict';

/* ── DONNÉES CHAMBRES ── */
var ROOMS = [
  {id:'clim-premium',  fr:{name:'Climatisée Premium',  desc:'Clim · Lit 3 places · Mini frigo · Placard · Chauffe-eau · WiFi'}, en:{name:'Premium A/C Room',   desc:'A/C · Triple bed · Mini fridge · Wardrobe · Water heater · WiFi'}, priceNight:15000, repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'clim-confort',  fr:{name:'Climatisée Confort',  desc:'Clim · Lit 3 places · Mini frigo ou Placard · WiFi'},              en:{name:'Comfort A/C Room',   desc:'A/C · Triple bed · Mini fridge or Wardrobe · WiFi'},             priceNight:12000, repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'clim-standard', fr:{name:'Climatisée Standard', desc:'Clim · Lit 3 places · WiFi'},                                      en:{name:'Standard A/C Room',  desc:'A/C · Triple bed · WiFi'},                                        priceNight:10000, repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'vent-confort',  fr:{name:'Ventilée Confort',    desc:'Ventilateur · Lit 3 places · Placard · Chauffe-eau · WiFi'},        en:{name:'Comfort Fan Room',   desc:'Fan · Triple bed · Wardrobe · Water heater · WiFi'},              priceNight:10000, repos:{type:'vent','1h':2500,'2h-3h':5000,'4h':6000}},
  {id:'vent-standard', fr:{name:'Ventilée Standard',   desc:'Ventilateur · Lit 3 places · Placard · WiFi'},                     en:{name:'Standard Fan Room',  desc:'Fan · Triple bed · Wardrobe · WiFi'},                            priceNight:8000,  repos:{type:'vent','1h':2500,'2h-3h':5000,'4h':6000}},
];

var WA_NUMBER = '22899204638';

/* ── TRADUCTIONS ── */
var TX = {
  fr: {
    w1: 'Bienvenue chez <strong>Hôtel Marguo City</strong> ! 🌟',
    w2: 'Je suis votre assistant de réservation, disponible <strong>24h/24</strong>.',
    askName: 'Quel est votre <strong>prénom</strong> ?',
    greet: function(n){ return 'Enchanté(e), <strong>'+n+'</strong> 😊<br>Quel type de séjour souhaitez-vous ?'; },
    askRoom: 'Quelle chambre vous convient ?',
    askDate: 'Quelle est votre <strong>date d\'arrivée</strong> ?',
    askTime: 'À quelle <strong>heure</strong> arriverez-vous ?',
    askNights: 'Combien de <strong>nuits</strong> souhaitez-vous ?',
    askDur: function(r){ return 'Pour la chambre <strong>'+r+'</strong>, choisissez votre durée :'; },
    askPeople: 'Combien de <strong>personnes</strong> ?<br><small style="opacity:.6">(Lit 3 places · Enfants &lt;10 ans gratuits)</small>',
    askPhone: 'Votre <strong>numéro de téléphone</strong> (WhatsApp) ?',
    askPay: 'Votre <strong>mode de paiement</strong> préféré ?',
    summary: 'Voici votre <strong>récapitulatif</strong>. Confirmez sur WhatsApp en un clic ! ✅',
    oNight: 'Nuit complète', oRest: 'Repos (quelques heures)',
    oCash: 'Espèces à l\'arrivée', oTransfer: 'Transfert mobile (Flooz / T-Money)',
    nights: function(n){ return n+' nuit'+(n>1?'s':''); },
    persons: function(n){ return n+' personne'+(n>1?'s':''); },
    ph: 'Tapez ici…', send: 'Envoyer',
    lName:'Prénom', lPhone:'Téléphone', lRoom:'Chambre', lStay:'Séjour',
    lDate:'Arrivée', lTime:'Heure', lDur:'Durée', lPeople:'Personnes',
    lPay:'Paiement', lTotal:'Total estimé', lDeposit:'Acompte (50%)',
    stNight:'Nuit complète', stRest:'Repos',
    waBtn: '✅ Confirmer sur WhatsApp',
    restart: '🔄 Recommencer',
    online: 'En ligne · Réponse immédiate',
    title: 'Assistant Marguo City'
  },
  en: {
    w1: 'Welcome to <strong>Hôtel Marguo City</strong>! 🌟',
    w2: 'I\'m your booking assistant, available <strong>24/7</strong>.',
    askName: 'What is your <strong>first name</strong>?',
    greet: function(n){ return 'Nice to meet you, <strong>'+n+'</strong> 😊<br>What type of stay are you looking for?'; },
    askRoom: 'Which room suits you?',
    askDate: 'What is your <strong>arrival date</strong>?',
    askTime: 'What <strong>time</strong> will you arrive?',
    askNights: 'How many <strong>nights</strong> would you like?',
    askDur: function(r){ return 'For the <strong>'+r+'</strong> room, choose your duration:'; },
    askPeople: 'How many <strong>people</strong>?<br><small style="opacity:.6">(Triple bed · Children under 10 free)</small>',
    askPhone: 'Your <strong>phone number</strong> (WhatsApp)?',
    askPay: 'Your preferred <strong>payment method</strong>?',
    summary: 'Here is your <strong>summary</strong>. Confirm on WhatsApp in one click! ✅',
    oNight: 'Full night', oRest: 'Short stay',
    oCash: 'Cash on arrival', oTransfer: 'Mobile transfer (Flooz / T-Money)',
    nights: function(n){ return n+' night'+(n>1?'s':''); },
    persons: function(n){ return n+' person'+(n>1?'s':''); },
    ph: 'Type here…', send: 'Send',
    lName:'Name', lPhone:'Phone', lRoom:'Room', lStay:'Stay type',
    lDate:'Arrival', lTime:'Time', lDur:'Duration', lPeople:'People',
    lPay:'Payment', lTotal:'Est. total', lDeposit:'Deposit (50%)',
    stNight:'Full night', stRest:'Short stay',
    waBtn: '✅ Confirm on WhatsApp',
    restart: '🔄 Start over',
    online: 'Online · Instant reply',
    title: 'Marguo City Assistant'
  }
};

/* ── STATE ── */
var S = {};

function gl() { return localStorage.getItem('mc_lang') || 'fr'; }
function t()  { return TX[gl()]; }
function fmt(n){ return Number(n).toLocaleString('fr-FR') + ' FCFA'; }
function nowTime(){ return new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); }

/* ── BOT AVATAR SVG ── */
var IBOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 3v4m0 0a4 4 0 014 4H8a4 4 0 014-4z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>';

/* ── MODAL INJECTION ── */
function injectModal() {
  if (document.getElementById('mc-bot-overlay')) return;
  var overlay = document.createElement('div');
  overlay.className = 'mc-bot-overlay';
  overlay.id = 'mc-bot-overlay';
  overlay.innerHTML =
    '<div class="mc-bot-panel" id="mc-bot-panel">' +
      '<div class="mc-bot-handle"></div>' +
      '<div class="mc-bot-header">' +
        '<div class="mc-bot-av">' + IBOT +
          '<span class="mc-bot-online"></span>' +
        '</div>' +
        '<div class="mc-bot-hinfo">' +
          '<strong id="mc-bot-htitle">' + t().title + '</strong>' +
          '<span id="mc-bot-hstatus">' + t().online + '</span>' +
        '</div>' +
        '<button class="mc-bot-close" id="mc-bot-close" aria-label="Fermer">✕</button>' +
      '</div>' +
      '<div class="mc-bot-progress"><div class="mc-bot-prog-fill" id="mc-bot-prog"></div></div>' +
      '<div class="mc-bot-msgs" id="mc-bot-msgs"></div>' +
      '<div class="mc-bot-input" id="mc-bot-input">' +
        '<div class="mc-bot-choices" id="mc-bot-choices"></div>' +
        '<div class="mc-bot-textrow" id="mc-bot-textrow" style="display:none;">' +
          '<input class="mc-bot-field" id="mc-bot-field" type="text"/>' +
          '<button class="mc-bot-sendbtn" id="mc-bot-sendbtn">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('mc-bot-close').addEventListener('click', closeMCBot);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) closeMCBot(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMCBot(); });
}

window.openMCBot = function () {
  injectModal();
  var overlay = document.getElementById('mc-bot-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  var msgs = document.getElementById('mc-bot-msgs');
  if (!msgs || msgs.children.length === 0) botStart();
};

function closeMCBot() {
  var overlay = document.getElementById('mc-bot-overlay');
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── HELPERS ── */
function msgs()    { return document.getElementById('mc-bot-msgs'); }
function choices() { return document.getElementById('mc-bot-choices'); }
function textrow() { return document.getElementById('mc-bot-textrow'); }
function progFill(){ return document.getElementById('mc-bot-prog'); }

function setProg(pct) {
  var f = progFill();
  if (f) f.style.width = pct + '%';
}

function scrollDown() {
  var el = msgs();
  if (el) el.scrollTop = el.scrollHeight;
}

function addMsg(html, type, delay) {
  type = type || 'bot'; delay = delay || 0;
  return new Promise(function(resolve){
    setTimeout(function(){
      var el = msgs();
      if (!el) { resolve(); return; }
      if (type === 'bot') {
        /* Typing indicator */
        var typing = document.createElement('div');
        typing.className = 'mc-msg mc-bot-msg';
        typing.innerHTML =
          '<div class="mc-av">' + IBOT + '</div>' +
          '<div class="mc-typing-dots"><span></span><span></span><span></span></div>';
        el.appendChild(typing); scrollDown();
        setTimeout(function(){
          typing.remove();
          var m = document.createElement('div');
          m.className = 'mc-msg mc-bot-msg';
          m.innerHTML =
            '<div class="mc-av">' + IBOT + '</div>' +
            '<div><div class="mc-bubble mc-bubble-bot">' + html + '</div>' +
            '<div class="mc-time">' + nowTime() + '</div></div>';
          el.appendChild(m); scrollDown(); resolve();
        }, 750);
      } else {
        var m = document.createElement('div');
        m.className = 'mc-msg mc-user-msg';
        m.innerHTML =
          '<div><div class="mc-bubble mc-bubble-user">' + html + '</div>' +
          '<div class="mc-time" style="text-align:right">' + nowTime() + '</div></div>';
        el.appendChild(m); scrollDown(); resolve();
      }
    }, delay);
  });
}

function showChoices(list) {
  var c = choices(), r = textrow();
  if (!c || !r) return;
  c.innerHTML = ''; r.style.display = 'none';
  list.forEach(function(item){
    var btn = document.createElement('button');
    btn.className = 'mc-choice';
    btn.innerHTML = item.label;
    btn.addEventListener('click', function(){
      c.querySelectorAll('.mc-choice').forEach(function(b){ b.disabled = true; });
      btn.classList.add('sel');
      item.action(item.value || item.label);
    });
    c.appendChild(btn);
  });
}

function showTextInput(placeholder, cb) {
  var c = choices(), r = textrow();
  if (!c || !r) return;
  c.innerHTML = ''; r.style.display = 'flex';
  var inp = document.getElementById('mc-bot-field');
  var btn = document.getElementById('mc-bot-sendbtn');
  inp.placeholder = placeholder;
  inp.value = '';
  setTimeout(function(){ inp.focus(); }, 80);
  var send = function(){
    var v = inp.value.trim();
    if (!v) return;
    r.style.display = 'none';
    cb(v);
  };
  /* Remove old listeners by cloning */
  var newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  var newInp = inp.cloneNode(true);
  inp.parentNode.replaceChild(newInp, inp);
  newBtn.addEventListener('click', send);
  newInp.placeholder = placeholder;
  newInp.value = '';
  newInp.addEventListener('keydown', function(e){ if(e.key==='Enter') send(); });
  setTimeout(function(){ newInp.focus(); }, 80);
}

function clearInput() {
  var c = choices(), r = textrow();
  if (c) c.innerHTML = '';
  if (r) r.style.display = 'none';
}

/* ── BOT FLOW ── */
function botStart() {
  S = { name:'', phone:'', stay:'', room:null, date:'', time:'',
        duration:'', durPrice:0, nights:1, persons:1, payment:'' };
  var m = msgs();
  if (m) m.innerHTML = '';
  setProg(0);
  /* Update header language */
  var ht = document.getElementById('mc-bot-htitle');
  var hs = document.getElementById('mc-bot-hstatus');
  if (ht) ht.textContent = t().title;
  if (hs) hs.textContent = t().online;

  addMsg(t().w1).then(function(){
    addMsg(t().w2, 'bot', 100).then(function(){
      addMsg(t().askName, 'bot', 200).then(function(){
        showTextInput(t().ph, step_name);
      });
    });
  });
}

async function step_name(v) {
  S.name = v;
  await addMsg(v, 'user');
  setProg(10);
  await addMsg(t().greet(S.name));
  showChoices([
    { label: '🌙 ' + t().oNight, value: 'night', action: step_stayType },
    { label: '⏱ ' + t().oRest,  value: 'rest',  action: step_stayType }
  ]);
}

async function step_stayType(v) {
  S.stay = v;
  var lab = v === 'night' ? '🌙 ' + t().oNight : '⏱ ' + t().oRest;
  await addMsg(lab, 'user');
  setProg(20);
  await addMsg(t().askRoom);
  showRooms();
}

function showRooms() {
  var c = choices(), r = textrow();
  if (!c || !r) return;
  c.innerHTML = ''; r.style.display = 'none';
  ROOMS.forEach(function(room){
    var btn = document.createElement('button');
    btn.className = 'mc-choice mc-room';
    var n = room[gl()].name, d = room[gl()].desc;
    btn.innerHTML = '<span class="mc-rn">' + n + '</span><span class="mc-rd">' + d + '</span>';
    btn.addEventListener('click', function(){
      c.querySelectorAll('.mc-choice').forEach(function(b){ b.disabled = true; });
      btn.classList.add('sel');
      step_room(room.id, n);
    });
    c.appendChild(btn);
  });
}

async function step_room(id, label) {
  S.room = ROOMS.find(function(r){ return r.id === id; });
  await addMsg(label, 'user');
  setProg(32);
  var r = S.room;
  var ro = Object.entries(r.repos)
    .filter(function(e){ return e[0] !== 'type'; })
    .map(function(e){ return e[0] + ' → <strong>' + fmt(e[1]) + '</strong>'; })
    .join(' · ');
  await addMsg('✅ <strong>' + r[gl()].name + '</strong><br>Nuit : <strong>' + fmt(r.priceNight) + '</strong> · Repos : ' + ro);
  await addMsg(t().askDate, 'bot', 150);
  showTextInput('Ex : 10/04/2026', step_date);
}

async function step_date(v) {
  S.date = v;
  await addMsg(v, 'user');
  setProg(45);
  await addMsg(t().askTime);
  showChoices(['06h00','08h00','10h00','12h00','14h00','16h00','18h00','20h00','22h00+'].map(function(h){
    return { label: h, value: h, action: step_time };
  }));
}

async function step_time(v) {
  S.time = v;
  await addMsg(v, 'user');
  setProg(55);
  if (S.stay === 'night') {
    await addMsg(t().askNights);
    showChoices([1,2,3,4,5,6,7].map(function(n){
      return { label: t().nights(n), value: String(n), action: step_nights };
    }));
  } else {
    step_askDur();
  }
}

async function step_nights(v) {
  S.nights = parseInt(v);
  await addMsg(t().nights(S.nights), 'user');
  setProg(65);
  step_askPeople();
}

async function step_askDur() {
  var rn = S.room[gl()].name;
  await addMsg(t().askDur(rn));
  var r = S.room.repos;
  var opts = r.type === 'clim'
    ? [{val:'3000',lab:'1h — '+fmt(3000)},{val:'5000',lab:'2h — '+fmt(5000)},{val:'8000',lab:'3h-4h — '+fmt(8000)}]
    : [{val:'2500',lab:'1h — '+fmt(2500)},{val:'5000',lab:'2h-3h — '+fmt(5000)},{val:'6000',lab:'4h — '+fmt(6000)}];
  showChoices(opts.map(function(o){
    return { label: o.lab, value: o.val, action: function(val){ step_dur(val, o.lab); } };
  }));
}

async function step_dur(val, label) {
  S.durPrice = parseInt(val);
  S.duration = label.split('—')[0].trim();
  await addMsg(label, 'user');
  setProg(65);
  step_askPeople();
}

async function step_askPeople() {
  setProg(72);
  await addMsg(t().askPeople);
  showChoices([1,2,3,4].map(function(n){
    return { label: t().persons(n), value: String(n), action: step_people };
  }));
}

async function step_people(v) {
  S.persons = parseInt(v);
  await addMsg(t().persons(S.persons), 'user');
  setProg(82);
  await addMsg(t().askPhone);
  showTextInput('+228…', step_phone);
}

async function step_phone(v) {
  S.phone = v;
  await addMsg(v, 'user');
  setProg(90);
  await addMsg(t().askPay);
  showChoices([
    { label: '💵 ' + t().oCash,     value: t().oCash,     action: step_payment },
    { label: '📲 ' + t().oTransfer, value: t().oTransfer, action: step_payment }
  ]);
}

async function step_payment(v) {
  S.payment = v;
  await addMsg(v, 'user');
  setProg(96);

  var total = S.stay === 'night'
    ? S.room.priceNight * S.nights
    : S.durPrice;
  var deposit = Math.round(total * 0.5);
  var rn = S.room[gl()].name;
  var sejStr = S.stay === 'night'
    ? t().stNight + ' · ' + t().nights(S.nights)
    : t().stRest + ' · ' + S.duration;

  await addMsg(t().summary);

  /* Summary card */
  var card = document.createElement('div');
  card.className = 'mc-msg mc-bot-msg';
  card.innerHTML =
    '<div class="mc-av">' + IBOT + '</div>' +
    '<div class="mc-sum-card">' +
      '<div class="mc-sum-title">🏨 Hôtel Marguo City</div>' +
      row(t().lName, S.name) +
      row(t().lPhone, S.phone) +
      row(t().lRoom, rn) +
      row(t().lStay, sejStr) +
      row(t().lDate, S.date + ' à ' + S.time) +
      row(t().lDur, S.stay==='night' ? t().nights(S.nights) : S.duration) +
      row(t().lPeople, t().persons(S.persons)) +
      row(t().lPay, S.payment) +
      '<div class="mc-sum-totals">' +
        '<div class="mc-st-row"><span>' + t().lTotal + '</span><span class="mc-st-val">' + fmt(total) + '</span></div>' +
        '<div class="mc-st-row"><span>' + t().lDeposit + '</span><span class="mc-st-dep">' + fmt(deposit) + '</span></div>' +
      '</div>' +
    '</div>';
  msgs().appendChild(card); scrollDown();

  await new Promise(function(res){ setTimeout(res, 400); });

  /* WhatsApp & restart buttons */
  clearInput();
  var input = document.getElementById('mc-bot-input');
  var div = document.createElement('div');
  div.className = 'mc-confirm-area';

  var waLines = [
    '🏨 *Réservation — Hôtel Marguo City*','',
    '👤 *'+t().lName+' :* '+S.name,
    '📞 *'+t().lPhone+' :* '+S.phone,
    '🛏️ *'+t().lRoom+' :* '+rn,
    '📋 *'+t().lStay+' :* '+sejStr,
    '📅 *'+t().lDate+' :* '+S.date,
    '🕐 *Heure :* '+S.time,
    S.stay==='night'?'🌙 *'+t().nights(S.nights)+'*':'⏳ *Durée :* '+S.duration,
    '👥 *'+t().lPeople+' :* '+t().persons(S.persons),
    '💳 *'+t().lPay+' :* '+S.payment,'',
    '💰 *'+t().lTotal+' :* '+fmt(total),
    '💵 *'+t().lDeposit+' :* '+fmt(deposit),'',
    '_Réservation via marguocity.github.io_'
  ].join('\n');

  var waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waLines);
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.className = 'mc-wa-btn';
  waBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
    ' ' + t().waBtn;
  div.appendChild(waBtn);

  var restBtn = document.createElement('button');
  restBtn.className = 'mc-restart-btn';
  restBtn.textContent = t().restart;
  restBtn.addEventListener('click', function(){ botStart(); });
  div.appendChild(restBtn);

  input.appendChild(div);
  setProg(100);

  addMsg('🎉 Merci <strong>' + S.name + '</strong> ! Notre équipe vous contacte très rapidement. À bientôt chez <strong>Hôtel Marguo City</strong> ! 🏨');
}

function row(label, value) {
  return '<div class="mc-sum-row"><span>' + label + '</span><strong>' + value + '</strong></div>';
}

/* Init on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {
  /* Pre-inject modal silently so it's ready */
  injectModal();
});

/* ================================================================
   EMBEDDED MODE — reservation.html (chatMsgs / chatBar / bot-step)
   ================================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var chatMsgs = document.getElementById('chatMsgs');
    var chatBar  = document.getElementById('chatBar');
    if (!chatMsgs || !chatBar) return; /* not on reservation page */

    /* Step indicators */
    var stepEls = document.querySelectorAll('.bot-step');
    var step = 0;
    var ES = {}; /* embedded state */

    var IBOT_E = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 3v4m0 0a4 4 0 014 4H8a4 4 0 014-4z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>';

    function sc() { chatMsgs.scrollTop = chatMsgs.scrollHeight; }
    function fmtE(n){ return Number(n).toLocaleString('fr-FR') + ' FCFA'; }
    function glE(){ return localStorage.getItem('mc_lang')||'fr'; }
    function tE(){ return TX[glE()]; }
    function nowE(){ return new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); }

    function adv() { step = Math.min(step+1, stepEls.length-1); setSteps(); }
    function setSteps() {
      stepEls.forEach(function(el,i){
        el.classList.remove('active','done');
        if (i < step) el.classList.add('done');
        if (i === step) el.classList.add('active');
      });
    }

    function eBot(html) {
      return new Promise(function(resolve){
        var t = document.createElement('div');
        t.className = 'msg bot _typ';
        t.innerHTML = '<div class="msg-av">'+IBOT_E+'</div><div class="msg-bub"><div class="typing-bubble"><span></span><span></span><span></span></div></div>';
        chatMsgs.appendChild(t); sc();
        setTimeout(function(){
          t.remove();
          var m = document.createElement('div');
          m.className = 'msg bot';
          m.innerHTML = '<div class="msg-av">'+IBOT_E+'</div><div><div class="msg-bub">'+html+'</div></div>';
          chatMsgs.appendChild(m); sc(); resolve();
        }, 700);
      });
    }

    function eUser(txt) {
      var m = document.createElement('div');
      m.className = 'msg user';
      m.innerHTML = '<div class="msg-bub">'+txt+'</div>';
      chatMsgs.appendChild(m); sc();
    }

    function eChoices(opts) {
      chatBar.innerHTML = '';
      var w = document.createElement('div'); w.className = 'qr-wrap';
      opts.forEach(function(o){
        var b = document.createElement('button'); b.className = 'qr'+(o.cls?' '+o.cls:'');
        b.innerHTML = o.html || o.label;
        b.addEventListener('click', function(){
          w.querySelectorAll('.qr').forEach(function(x){x.classList.add('disabled');});
          b.classList.add('picked');
          o.action(o.val, o.show||o.label);
        });
        w.appendChild(b);
      });
      chatBar.appendChild(w);
    }

    function eText(ph, cb) {
      chatBar.innerHTML = '';
      var row = document.createElement('div'); row.className = 'text-input-row';
      row.innerHTML = '<input class="bot-input" id="eInp" type="text" placeholder="'+ph+'" autocomplete="off"/><button class="bot-send" id="eBtn">'+tE().send+'</button>';
      chatBar.appendChild(row);
      var inp = document.getElementById('eInp');
      var btn = document.getElementById('eBtn');
      inp.focus();
      var go = function(){ var v=inp.value.trim(); if(!v)return; chatBar.innerHTML=''; cb(v); };
      btn.addEventListener('click', go);
      inp.addEventListener('keydown', function(e){ if(e.key==='Enter') go(); });
    }

    /* FLOW */
    setTimeout(function(){
      eBot(tE().w1).then(function(){
        setTimeout(function(){
          eBot(tE().w2).then(function(){
            setTimeout(function(){
              eBot(tE().askName).then(function(){ eText(tE().ph, function(v){ eUser(v); ES.name=v; adv(); eBot(tE().greet(v)).then(function(){ eChoices([{val:'night',label:'🌙 '+tE().oNight,action:eStay},{val:'rest',label:'⏱ '+tE().oRest,action:eStay}]); }); }); });
            }, 500);
          });
        }, 500);
      });
    }, 400);

    function eStay(v) { ES.stay=v; eUser(v==='night'?'🌙 '+tE().oNight:'⏱ '+tE().oRest); adv();
      eBot(tE().askRoom).then(function(){ eRooms(); });
    }
    function eRooms() {
      chatBar.innerHTML='';
      var w=document.createElement('div'); w.className='qr-wrap';
      ROOMS.forEach(function(room){
        var b=document.createElement('button'); b.className='qr room';
        b.innerHTML='<span class="r-name">'+room[glE()].name+'</span><span class="r-desc">'+room[glE()].desc+'</span>';
        b.addEventListener('click',function(){
          w.querySelectorAll('.qr').forEach(function(x){x.classList.add('disabled');});
          b.classList.add('picked');
          ES.room=room; eUser(room[glE()].name); adv();
          var ro=Object.entries(room.repos).filter(function(e){return e[0]!=='type';}).map(function(e){return e[0]+' → '+fmtE(e[1]);}).join(' · ');
          eBot('✅ <strong>'+room[glE()].name+'</strong><br>Nuit : <strong>'+fmtE(room.priceNight)+'</strong> · Repos : '+ro).then(function(){
            eBot(tE().askDate).then(function(){ eText('Ex : 10/04/2026', function(v){ eUser(v); ES.date=v; adv(); eTime(); }); });
          });
        });
        w.appendChild(b);
      });
      chatBar.appendChild(w);
    }
    function eTime(){
      eBot(tE().askTime).then(function(){
        eChoices(['06h00','08h00','10h00','12h00','14h00','16h00','18h00','20h00','22h00+'].map(function(h){
          return {val:h,label:h,action:function(v){ ES.time=v; eUser(v); adv();
            if(ES.stay==='night'){ eNights(); } else { eDur(); } }};
        }));
      });
    }
    function eNights(){
      eBot(tE().askNights).then(function(){
        eChoices([1,2,3,4,5,6,7].map(function(n){
          return {val:String(n),label:tE().nights(n),action:function(v){ ES.nights=parseInt(v); eUser(tE().nights(ES.nights)); adv(); ePeople(); }};
        }));
      });
    }
    function eDur(){
      var r=ES.room.repos;
      var opts = r.type==='clim'
        ?[{val:'3000',lab:'1h — '+fmtE(3000)},{val:'5000',lab:'2h — '+fmtE(5000)},{val:'8000',lab:'3h-4h — '+fmtE(8000)}]
        :[{val:'2500',lab:'1h — '+fmtE(2500)},{val:'5000',lab:'2h-3h — '+fmtE(5000)},{val:'6000',lab:'4h — '+fmtE(6000)}];
      eBot(tE().askDur(ES.room[glE()].name)).then(function(){
        eChoices(opts.map(function(o){
          return {val:o.val,label:o.lab,action:function(v,lbl){
            ES.durPrice=parseInt(v); ES.duration=(lbl||o.lab).split('—')[0].trim();
            eUser(lbl||o.lab); adv(); ePeople();
          }};
        }));
      });
    }
    function ePeople(){
      eBot(tE().askPeople).then(function(){
        eChoices([1,2,3,4].map(function(n){
          return {val:String(n),label:tE().persons(n),action:function(v){ ES.persons=parseInt(v); eUser(tE().persons(ES.persons)); adv(); ePhone(); }};
        }));
      });
    }
    function ePhone(){
      eBot(tE().askPhone).then(function(){ eText('+228…', function(v){ eUser(v); ES.phone=v; adv(); ePay(); }); });
    }
    function ePay(){
      eBot(tE().askPay).then(function(){
        eChoices([
          {val:tE().oCash,label:'💵 '+tE().oCash,action:function(v){ ES.payment=v; eUser(v); adv(); eSum(); }},
          {val:tE().oTransfer,label:'📲 '+tE().oTransfer,action:function(v){ ES.payment=v; eUser(v); adv(); eSum(); }}
        ]);
      });
    }
    function eSum(){
      var total = ES.stay==='night' ? ES.room.priceNight*ES.nights : ES.durPrice;
      var deposit = Math.round(total*0.5);
      var rn = ES.room[glE()].name;
      var sejStr = ES.stay==='night' ? tE().stNight+' · '+tE().nights(ES.nights) : tE().stRest+' · '+ES.duration;
      var waLines = ['🏨 *Réservation — Hôtel Marguo City*','',
        '👤 *'+tE().lName+' :* '+ES.name,'📞 *'+tE().lPhone+' :* '+ES.phone,
        '🛏️ *'+tE().lRoom+' :* '+rn,'📋 *'+tE().lStay+' :* '+sejStr,
        '📅 *'+tE().lDate+' :* '+ES.date,'🕐 *Heure :* '+ES.time,
        ES.stay==='night'?'🌙 *'+tE().nights(ES.nights)+'*':'⏳ *Durée :* '+ES.duration,
        '👥 *'+tE().lPeople+' :* '+tE().persons(ES.persons),
        '💳 *'+tE().lPay+' :* '+ES.payment,'',
        '💰 *'+tE().lTotal+' :* '+fmtE(total),'💵 *'+tE().lDeposit+' :* '+fmtE(deposit),'',
        '_Réservation via marguocity.github.io_'
      ].join('\n');
      var waLink = 'https://wa.me/22899204638?text='+encodeURIComponent(waLines);

      eBot(tE().summary).then(function(){
        var el=document.createElement('div'); el.className='msg bot';
        el.innerHTML='<div class="msg-av">'+IBOT_E+'</div><div><div class="sum-card">'+
          '<div class="sum-card-title">📋 Récapitulatif</div>'+
          sumRow(tE().lName,ES.name)+sumRow(tE().lPhone,ES.phone)+
          sumRow(tE().lRoom,rn)+sumRow(tE().lStay,sejStr)+
          sumRow(tE().lDate,ES.date+' à '+ES.time)+
          sumRow(ES.stay==='night'?tE().lDur:'⏳ Durée', ES.stay==='night'?tE().nights(ES.nights):ES.duration)+
          sumRow(tE().lPeople,tE().persons(ES.persons))+sumRow(tE().lPay,ES.payment)+
          '<div class="sum-total"><div class="tr"><span>'+tE().lTotal+'</span><span class="tt">'+fmtE(total)+'</span></div>'+
          '<div class="tr"><span>'+tE().lDeposit+'</span><span class="ta">'+fmtE(deposit)+'</span></div></div>'+
        '</div></div>';
        chatMsgs.appendChild(el); sc();
        chatBar.innerHTML='';
        var d=document.createElement('div');
        d.innerHTML='<a href="'+waLink+'" target="_blank" rel="noopener" class="wa-confirm">'+
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>'+
          ' '+tE().waBtn+'</a>';
        chatBar.appendChild(d);
        if(stepEls.length) stepEls[stepEls.length-1].classList.add('done');
      });
    }
    function sumRow(l,v){ return '<div class="sum-row"><span class="slabel">'+l+'</span><span class="sval">'+v+'</span></div>'; }
  });
})();
