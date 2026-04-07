/* ================================================================
   BOT.JS v7 — Hôtel Marguo City
   Bot embarqué (reservation.html) + Modal (autres pages)
   Fullscreen mobile · Flow complet · WhatsApp confirmation
   ================================================================ */
'use strict';

/* ── CHAMBRES ── */
var ROOMS = [
  { id:'clim-premium',  fr:{ name:'Climatisée Premium',  desc:'Clim · Lit 3 places · Mini frigo · Placard · Chauffe-eau · WiFi' }, en:{ name:'Premium A/C Room',  desc:'A/C · Triple bed · Mini fridge · Wardrobe · Water heater · WiFi' }, priceNight:15000, repos:{ type:'clim', '1h':3000, '2h':5000, '3h-4h':8000 } },
  { id:'clim-confort',  fr:{ name:'Climatisée Confort',  desc:'Clim · Lit 3 places · Mini frigo ou Placard · WiFi' },              en:{ name:'Comfort A/C Room',  desc:'A/C · Triple bed · Mini fridge or Wardrobe · WiFi' },             priceNight:12000, repos:{ type:'clim', '1h':3000, '2h':5000, '3h-4h':8000 } },
  { id:'clim-standard', fr:{ name:'Climatisée Standard', desc:'Clim · Lit 3 places · WiFi' },                                      en:{ name:'Standard A/C Room', desc:'A/C · Triple bed · WiFi' },                                        priceNight:10000, repos:{ type:'clim', '1h':3000, '2h':5000, '3h-4h':8000 } },
  { id:'vent-confort',  fr:{ name:'Ventilée Confort',    desc:'Ventilateur · Lit 3 places · Placard · Chauffe-eau · WiFi' },        en:{ name:'Comfort Fan Room',  desc:'Fan · Triple bed · Wardrobe · Water heater · WiFi' },              priceNight:10000, repos:{ type:'vent', '1h':2500, '2h-3h':5000, '4h':6000 } },
  { id:'vent-standard', fr:{ name:'Ventilée Standard',   desc:'Ventilateur · Lit 3 places · Placard · WiFi' },                     en:{ name:'Standard Fan Room', desc:'Fan · Triple bed · Wardrobe · WiFi' },                            priceNight:8000,  repos:{ type:'vent', '1h':2500, '2h-3h':5000, '4h':6000 } }
];

var WA = '22899204638';
var IBOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 3v4m0 0a4 4 0 014 4H8a4 4 0 014-4z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>';

/* ── TRADUCTIONS ── */
var TX = {
  fr: {
    w1:'Bienvenue chez <strong>Hôtel Marguo City</strong> ! 🌟',
    w2:'Je suis votre assistant de réservation, disponible <strong>24h/24</strong>. Je vais vous guider étape par étape.',
    askName:'Quel est votre <strong>prénom</strong> ?',
    greet:function(n){ return 'Enchanté(e), <strong>'+n+'</strong> 😊<br>Quel type de séjour souhaitez-vous ?'; },
    askRoom:'Choisissez votre <strong>type de chambre</strong> :',
    askDate:'Quelle est votre <strong>date d\'arrivée</strong> ?',
    askTime:'À quelle <strong>heure</strong> arriverez-vous ?',
    askNights:'Combien de <strong>nuits</strong> souhaitez-vous ?',
    askDur:function(r){ return 'Pour la <strong>'+r+'</strong>, choisissez votre durée :'; },
    askPeople:'Combien de <strong>personnes</strong> ?<br><small style="opacity:.6">(Lit 3 places · Enfants &lt;10 ans gratuits)</small>',
    askPhone:'Votre <strong>numéro WhatsApp</strong> ?',
    askPay:'Votre <strong>mode de paiement</strong> ?',
    summary:'✅ Voici le <strong>récapitulatif</strong> de votre réservation :',
    oNight:'🌙 Nuitée complète', oRest:'⏱ Repos (quelques heures)',
    oCash:'💵 Espèces à l\'arrivée', oTransfer:'📲 Transfert mobile (Flooz / T-Money)',
    nights:function(n){ return n+' nuit'+(n>1?'s':''); },
    persons:function(n){ return n+' personne'+(n>1?'s':''); },
    ph:'Tapez ici…', send:'Envoyer',
    lName:'Prénom', lPhone:'Téléphone', lRoom:'Chambre', lStay:'Séjour',
    lDate:'Date d\'arrivée', lTime:'Heure', lDur:'Durée', lPeople:'Personnes',
    lPay:'Paiement', lTotal:'Total estimé', lDeposit:'Acompte (50%)',
    stNight:'Nuitée complète', stRest:'Repos',
    waBtn:'✅ Confirmer sur WhatsApp',
    restart:'🔄 Recommencer',
    endMsg:function(n){ return '🎉 Merci <strong>'+n+'</strong> ! Notre équipe vous répond très rapidement. À bientôt chez <strong>Marguo City</strong> ! 🏨'; },
    online:'En ligne · Réponse immédiate',
    title:'Assistant Marguo City'
  },
  en: {
    w1:'Welcome to <strong>Hôtel Marguo City</strong>! 🌟',
    w2:'I\'m your booking assistant, available <strong>24/7</strong>. I\'ll guide you step by step.',
    askName:'What is your <strong>first name</strong>?',
    greet:function(n){ return 'Nice to meet you, <strong>'+n+'</strong> 😊<br>What type of stay are you looking for?'; },
    askRoom:'Choose your <strong>room type</strong>:',
    askDate:'What is your <strong>arrival date</strong>?',
    askTime:'What <strong>time</strong> will you arrive?',
    askNights:'How many <strong>nights</strong>?',
    askDur:function(r){ return 'For the <strong>'+r+'</strong>, choose your duration:'; },
    askPeople:'How many <strong>people</strong>?<br><small style="opacity:.6">(Triple bed · Children under 10 free)</small>',
    askPhone:'Your <strong>WhatsApp number</strong>?',
    askPay:'Your <strong>payment method</strong>?',
    summary:'✅ Here is your booking <strong>summary</strong>:',
    oNight:'🌙 Full night', oRest:'⏱ Short stay',
    oCash:'💵 Cash on arrival', oTransfer:'📲 Mobile transfer',
    nights:function(n){ return n+' night'+(n>1?'s':''); },
    persons:function(n){ return n+' person'+(n>1?'s':''); },
    ph:'Type here…', send:'Send',
    lName:'Name', lPhone:'Phone', lRoom:'Room', lStay:'Stay',
    lDate:'Arrival date', lTime:'Time', lDur:'Duration', lPeople:'People',
    lPay:'Payment', lTotal:'Est. total', lDeposit:'Deposit (50%)',
    stNight:'Full night', stRest:'Short stay',
    waBtn:'✅ Confirm on WhatsApp',
    restart:'🔄 Start over',
    endMsg:function(n){ return '🎉 Thank you <strong>'+n+'</strong>! Our team will reach out shortly. See you at <strong>Marguo City</strong>! 🏨'; },
    online:'Online · Instant reply',
    title:'Marguo City Assistant'
  }
};

function gl()  { return localStorage.getItem('mc_lang') || 'fr'; }
function t()   { return TX[gl()]; }
function fmt(n){ return Number(n).toLocaleString('fr-FR') + ' FCFA'; }
function nowT(){ return new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); }


/* ================================================================
   ██████  BOT EMBARQUÉ — reservation.html
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var chatMsgs = document.getElementById('chatMsgs');
  var chatBar  = document.getElementById('chatBar');
  if (!chatMsgs || !chatBar) return; /* Pas sur cette page → stop */

  var stepEls = document.querySelectorAll('.bot-step');
  var stepIdx = 0;
  var ES = {};

  /* Fullscreen sur mobile : on ajoute la classe au chat-shell quand le focus entre */
  var shell = document.querySelector('.chat-shell');
  if (shell) {
    chatBar.addEventListener('focusin', function(){ shell.classList.add('chat-focus'); }, true);
  }

  function advStep() {
    stepIdx = Math.min(stepIdx + 1, stepEls.length - 1);
    stepEls.forEach(function(el, i) {
      el.classList.remove('active', 'done');
      if (i < stepIdx) el.classList.add('done');
      if (i === stepIdx) el.classList.add('active');
    });
  }

  function sc() { chatMsgs.scrollTop = chatMsgs.scrollHeight; }

  /* Message bot avec typing indicator */
  function eBotMsg(html) {
    return new Promise(function(resolve) {
      var tp = document.createElement('div');
      tp.className = 'msg bot _typ';
      tp.innerHTML = '<div class="msg-av">' + IBOT + '</div><div class="msg-bub"><div class="typing-bubble"><span></span><span></span><span></span></div></div>';
      chatMsgs.appendChild(tp); sc();
      setTimeout(function() {
        tp.remove();
        var m = document.createElement('div');
        m.className = 'msg bot';
        m.innerHTML = '<div class="msg-av">' + IBOT + '</div><div><div class="msg-bub">' + html + '</div></div>';
        chatMsgs.appendChild(m); sc(); resolve();
      }, 680);
    });
  }

  /* Message utilisateur */
  function eUserMsg(txt) {
    var m = document.createElement('div');
    m.className = 'msg user';
    m.innerHTML = '<div class="msg-bub">' + txt + '</div>';
    chatMsgs.appendChild(m); sc();
  }

  /* Boutons de choix */
  function eChoices(opts) {
    chatBar.innerHTML = '';
    var w = document.createElement('div'); w.className = 'qr-wrap';
    opts.forEach(function(o) {
      var b = document.createElement('button');
      b.className = 'qr' + (o.cls ? ' ' + o.cls : '');
      b.innerHTML = o.html || o.label;
      b.addEventListener('click', function() {
        w.querySelectorAll('.qr').forEach(function(x){ x.classList.add('disabled'); });
        b.classList.add('picked');
        o.action(o.val, o.show || o.label);
      });
      w.appendChild(b);
    });
    chatBar.appendChild(w);
  }

  /* Input texte */
  function eTextInput(ph, cb) {
    chatBar.innerHTML = '';
    var row = document.createElement('div'); row.className = 'text-input-row';
    row.innerHTML = '<input class="bot-input" id="eInp" type="text" placeholder="' + ph + '" autocomplete="off"/>' +
                    '<button class="bot-send" id="eBtn">' + t().send + '</button>';
    chatBar.appendChild(row);
    var inp = document.getElementById('eInp');
    var btn = document.getElementById('eBtn');
    inp.focus();
    var go = function() {
      var v = inp.value.trim();
      if (!v) return;
      chatBar.innerHTML = '';
      cb(v);
    };
    btn.addEventListener('click', go);
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') go(); });
  }

  /* ── DÉMARRAGE ── */
  setTimeout(function() {
    eBotMsg(t().w1).then(function() {
      setTimeout(function() {
        eBotMsg(t().w2).then(function() {
          setTimeout(function() {
            eBotMsg(t().askName).then(function() {
              eTextInput(t().ph, eStep_name);
            });
          }, 300);
        });
      }, 300);
    });
  }, 500);

  /* ── ÉTAPES ── */
  function eStep_name(v) {
    ES.name = v; eUserMsg(v); advStep();
    eBotMsg(t().greet(v)).then(function() {
      eChoices([
        { val:'night', label: t().oNight, action: eStep_stay },
        { val:'rest',  label: t().oRest,  action: eStep_stay }
      ]);
    });
  }

  function eStep_stay(v) {
    ES.stay = v; eUserMsg(v === 'night' ? t().oNight : t().oRest); advStep();
    eBotMsg(t().askRoom).then(eRooms);
  }

  function eRooms() {
    chatBar.innerHTML = '';
    var w = document.createElement('div'); w.className = 'qr-wrap';
    ROOMS.forEach(function(room) {
      var b = document.createElement('button'); b.className = 'qr room';
      b.innerHTML = '<span class="r-name">' + room[gl()].name + '</span><span class="r-desc">' + room[gl()].desc + '</span>';
      b.addEventListener('click', function() {
        w.querySelectorAll('.qr').forEach(function(x){ x.classList.add('disabled'); });
        b.classList.add('picked');
        eStep_room(room);
      });
      w.appendChild(b);
    });
    chatBar.appendChild(w);
  }

  function eStep_room(room) {
    ES.room = room; eUserMsg(room[gl()].name); advStep();
    var ro = Object.entries(room.repos)
      .filter(function(e){ return e[0] !== 'type'; })
      .map(function(e){ return e[0] + ' → <strong>' + fmt(e[1]) + '</strong>'; })
      .join(' · ');
    eBotMsg('✅ <strong>' + room[gl()].name + '</strong><br>' +
            'Nuit : <strong>' + fmt(room.priceNight) + '</strong> · Repos : ' + ro).then(function() {
      setTimeout(function() {
        eBotMsg(t().askDate).then(function() {
          eTextInput('Ex : 10/04/2026', eStep_date);
        });
      }, 200);
    });
  }

  function eStep_date(v) {
    ES.date = v; eUserMsg(v); advStep();
    eBotMsg(t().askTime).then(function() {
      eChoices(['06h00','08h00','10h00','12h00','14h00','16h00','18h00','20h00','22h00+'].map(function(h) {
        return { val: h, label: h, action: eStep_time };
      }));
    });
  }

  function eStep_time(v) {
    ES.time = v; eUserMsg(v); advStep();
    if (ES.stay === 'night') {
      eBotMsg(t().askNights).then(function() {
        eChoices([1,2,3,4,5,6,7].map(function(n) {
          return { val: String(n), label: t().nights(n), action: eStep_nights };
        }));
      });
    } else {
      eStep_askDur();
    }
  }

  function eStep_nights(v) {
    ES.nights = parseInt(v); eUserMsg(t().nights(ES.nights)); advStep();
    eStep_askPeople();
  }

  function eStep_askDur() {
    var r = ES.room.repos;
    var opts = r.type === 'clim'
      ? [{ v:'3000', l:'1h — ' + fmt(3000) }, { v:'5000', l:'2h — ' + fmt(5000) }, { v:'8000', l:'3h-4h — ' + fmt(8000) }]
      : [{ v:'2500', l:'1h — ' + fmt(2500) }, { v:'5000', l:'2h-3h — ' + fmt(5000) }, { v:'6000', l:'4h — ' + fmt(6000) }];
    eBotMsg(t().askDur(ES.room[gl()].name)).then(function() {
      eChoices(opts.map(function(o) {
        return { val: o.v, label: o.l, action: function(val, lbl) {
          ES.durPrice = parseInt(val);
          ES.duration = (lbl || o.l).split('—')[0].trim();
          eUserMsg(lbl || o.l); advStep(); eStep_askPeople();
        }};
      }));
    });
  }

  function eStep_askPeople() {
    eBotMsg(t().askPeople).then(function() {
      eChoices([1,2,3,4].map(function(n) {
        return { val: String(n), label: t().persons(n), action: eStep_people };
      }));
    });
  }

  function eStep_people(v) {
    ES.persons = parseInt(v); eUserMsg(t().persons(ES.persons)); advStep();
    eBotMsg(t().askPhone).then(function() {
      eTextInput('+228…', eStep_phone);
    });
  }

  function eStep_phone(v) {
    ES.phone = v; eUserMsg(v); advStep();
    eBotMsg(t().askPay).then(function() {
      eChoices([
        { val: t().oCash,     label: t().oCash,     action: eStep_pay },
        { val: t().oTransfer, label: t().oTransfer, action: eStep_pay }
      ]);
    });
  }

  function eStep_pay(v) {
    ES.payment = v; eUserMsg(v); advStep();
    var total   = ES.stay === 'night' ? ES.room.priceNight * ES.nights : ES.durPrice;
    var deposit = Math.round(total * 0.5);
    var rn      = ES.room[gl()].name;
    var sejStr  = ES.stay === 'night'
      ? t().stNight + ' · ' + t().nights(ES.nights)
      : t().stRest + ' · ' + ES.duration;

    eBotMsg(t().summary).then(function() {
      /* Carte récap */
      var card = document.createElement('div'); card.className = 'msg bot';
      card.innerHTML = '<div class="msg-av">' + IBOT + '</div>' +
        '<div><div class="sum-card">' +
          '<div class="sum-card-title">📋 Récapitulatif — Hôtel Marguo City</div>' +
          sRow(t().lName,   ES.name) +
          sRow(t().lPhone,  ES.phone) +
          sRow(t().lRoom,   rn) +
          sRow(t().lStay,   sejStr) +
          sRow(t().lDate,   ES.date + ' à ' + ES.time) +
          sRow(ES.stay === 'night' ? t().lDur : 'Durée', ES.stay === 'night' ? t().nights(ES.nights) : ES.duration) +
          sRow(t().lPeople, t().persons(ES.persons)) +
          sRow(t().lPay,    ES.payment) +
          '<div class="sum-total">' +
            '<div class="sum-total-row"><span class="slabel">' + t().lTotal + '</span><span class="sval-total">' + fmt(total) + '</span></div>' +
            '<div class="sum-total-row"><span class="slabel">' + t().lDeposit + '</span><span class="sval-dep">' + fmt(deposit) + '</span></div>' +
          '</div>' +
        '</div></div>';
      chatMsgs.appendChild(card); sc();

      /* Message final */
      setTimeout(function() {
        eBotMsg(t().endMsg(ES.name)).then(function() {
          /* Bouton WhatsApp */
          var waLines = [
            '🏨 *RÉSERVATION — Hôtel Marguo City*',
            '─────────────────────────────',
            '👤 *' + t().lName + ' :* ' + ES.name,
            '📞 *' + t().lPhone + ' :* ' + ES.phone,
            '─────────────────────────────',
            '🛏️ *' + t().lRoom + ' :* ' + rn,
            '🎯 *' + t().lStay + ' :* ' + sejStr,
            '📅 *' + t().lDate + ' :* ' + ES.date,
            '🕐 *' + t().lTime + ' :* ' + ES.time,
            ES.stay === 'night'
              ? '🌙 *Durée :* ' + t().nights(ES.nights)
              : '⏳ *Durée :* ' + ES.duration,
            '👥 *' + t().lPeople + ' :* ' + t().persons(ES.persons),
            '─────────────────────────────',
            '💳 *' + t().lPay + ' :* ' + ES.payment,
            '─────────────────────────────',
            '💰 *' + t().lTotal + ' :* ' + fmt(total),
            '💵 *' + t().lDeposit + ' :* ' + fmt(deposit),
            '─────────────────────────────',
            '✅ Merci de confirmer cette réservation.'
          ].join('\n');

          chatBar.innerHTML = '';
          var div = document.createElement('div');
          div.innerHTML =
            '<a href="https://wa.me/' + WA + '?text=' + encodeURIComponent(waLines) + '" ' +
               'target="_blank" rel="noopener" class="wa-confirm">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
              ' ' + t().waBtn +
            '</a>';
          chatBar.appendChild(div);

          if (stepEls.length) stepEls[stepEls.length - 1].classList.add('done');
        });
      }, 400);
    });
  }

  function sRow(l, v) {
    return '<div class="sum-row"><span class="slabel">' + l + '</span><span class="sval">' + v + '</span></div>';
  }
}); /* fin DOMContentLoaded embedded */


/* ================================================================
   ██████  MODAL BOT — toutes pages sauf reservation.html
   ================================================================ */

function injectModal() {
  if (document.getElementById('mc-bot-overlay')) return;
  var ov = document.createElement('div');
  ov.className = 'mc-bot-overlay'; ov.id = 'mc-bot-overlay';
  ov.innerHTML =
    '<div class="mc-bot-panel" id="mc-bot-panel">' +
      '<div class="mc-bot-handle"></div>' +
      '<div class="mc-bot-header">' +
        '<div class="mc-bot-av">' + IBOT + '<span class="mc-bot-online"></span></div>' +
        '<div class="mc-bot-hinfo">' +
          '<strong id="mc-ht"></strong><span id="mc-hs"></span>' +
        '</div>' +
        '<button class="mc-bot-close" id="mc-bot-close">✕</button>' +
      '</div>' +
      '<div class="mc-bot-progress"><div class="mc-bot-prog-fill" id="mc-prog"></div></div>' +
      '<div class="mc-bot-msgs" id="mc-msgs"></div>' +
      '<div class="mc-bot-input" id="mc-input">' +
        '<div class="mc-choices" id="mc-choices"></div>' +
        '<div class="mc-textrow" id="mc-textrow" style="display:none">' +
          '<input class="mc-field" id="mc-field" type="text"/>' +
          '<button class="mc-sendbtn" id="mc-sendbtn">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
  document.getElementById('mc-bot-close').addEventListener('click', closeMCBot);
  ov.addEventListener('click', function(e){ if (e.target === ov) closeMCBot(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMCBot(); });
}

window.openMCBot = function() {
  if (document.body.classList.contains('is-reservation-page')) return;
  injectModal();
  var ov = document.getElementById('mc-bot-overlay');
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!document.getElementById('mc-msgs').children.length) mBotStart();
};

function closeMCBot() {
  var ov = document.getElementById('mc-bot-overlay');
  if (ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── HELPERS MODAL ── */
var MS = {};

function mMsgs()    { return document.getElementById('mc-msgs'); }
function mChoices() { return document.getElementById('mc-choices'); }
function mTextrow() { return document.getElementById('mc-textrow'); }
function mProg(p)   { var f = document.getElementById('mc-prog'); if(f) f.style.width = p + '%'; }
function mScroll()  { var el = mMsgs(); if(el) el.scrollTop = el.scrollHeight; }

function mAddMsg(html, type, delay) {
  type = type || 'bot'; delay = delay || 0;
  return new Promise(function(resolve) {
    setTimeout(function() {
      var el = mMsgs(); if (!el) { resolve(); return; }
      if (type === 'bot') {
        var tp = document.createElement('div'); tp.className = 'mc-msg mc-bot-msg';
        tp.innerHTML = '<div class="mc-av">' + IBOT + '</div><div class="mc-typing-dots"><span></span><span></span><span></span></div>';
        el.appendChild(tp); mScroll();
        setTimeout(function() {
          tp.remove();
          var m = document.createElement('div'); m.className = 'mc-msg mc-bot-msg';
          m.innerHTML = '<div class="mc-av">' + IBOT + '</div>' +
            '<div><div class="mc-bubble mc-bubble-bot">' + html + '</div>' +
            '<div class="mc-time">' + nowT() + '</div></div>';
          el.appendChild(m); mScroll(); resolve();
        }, 700);
      } else {
        var m = document.createElement('div'); m.className = 'mc-msg mc-user-msg';
        m.innerHTML = '<div><div class="mc-bubble mc-bubble-user">' + html + '</div>' +
          '<div class="mc-time" style="text-align:right">' + nowT() + '</div></div>';
        el.appendChild(m); mScroll(); resolve();
      }
    }, delay);
  });
}

function mShowChoices(list) {
  var c = mChoices(), r = mTextrow(); if (!c || !r) return;
  c.innerHTML = ''; r.style.display = 'none';
  list.forEach(function(item) {
    var btn = document.createElement('button'); btn.className = 'mc-choice';
    btn.innerHTML = item.label;
    btn.addEventListener('click', function() {
      c.querySelectorAll('.mc-choice').forEach(function(b){ b.disabled = true; });
      btn.classList.add('sel');
      item.action(item.value || item.label);
    });
    c.appendChild(btn);
  });
}

function mShowText(ph, cb) {
  var c = mChoices(), r = mTextrow(); if (!c || !r) return;
  c.innerHTML = ''; r.style.display = 'flex';
  var oInp = document.getElementById('mc-field');
  var oBtn = document.getElementById('mc-sendbtn');
  var inp = oInp.cloneNode(true); oInp.parentNode.replaceChild(inp, oInp);
  var btn = oBtn.cloneNode(true); oBtn.parentNode.replaceChild(btn, oBtn);
  inp.placeholder = ph; inp.value = '';
  setTimeout(function(){ inp.focus(); }, 60);
  var send = function() {
    var v = inp.value.trim(); if (!v) return;
    r.style.display = 'none'; cb(v);
  };
  btn.addEventListener('click', send);
  inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') send(); });
}

function mClearInput() {
  var c = mChoices(), r = mTextrow();
  if (c) c.innerHTML = '';
  if (r) r.style.display = 'none';
}

/* ── FLOW MODAL ── */
function mBotStart() {
  MS = { name:'', phone:'', stay:'', room:null, date:'', time:'', duration:'', durPrice:0, nights:1, persons:1, payment:'' };
  var m = mMsgs(); if (m) m.innerHTML = '';
  mProg(0);
  var ht = document.getElementById('mc-ht'); if (ht) ht.textContent = t().title;
  var hs = document.getElementById('mc-hs'); if (hs) hs.textContent = t().online;

  mAddMsg(t().w1).then(function() {
    mAddMsg(t().w2, 'bot', 200).then(function() {
      mAddMsg(t().askName, 'bot', 200).then(function() {
        mShowText(t().ph, mStep_name);
      });
    });
  });
}

function mStep_name(v) {
  MS.name = v;
  mAddMsg(v, 'user').then(function() {
    mProg(10);
    mAddMsg(t().greet(v)).then(function() {
      mShowChoices([
        { label: t().oNight, value: 'night', action: mStep_stay },
        { label: t().oRest,  value: 'rest',  action: mStep_stay }
      ]);
    });
  });
}

function mStep_stay(v) {
  MS.stay = v;
  mAddMsg(v === 'night' ? t().oNight : t().oRest, 'user').then(function() {
    mProg(22);
    mAddMsg(t().askRoom).then(mRooms);
  });
}

function mRooms() {
  var c = mChoices(), r = mTextrow(); if (!c||!r) return;
  c.innerHTML = ''; r.style.display = 'none';
  ROOMS.forEach(function(room) {
    var btn = document.createElement('button'); btn.className = 'mc-choice mc-room';
    btn.innerHTML = '<span class="mc-rn">' + room[gl()].name + '</span><span class="mc-rd">' + room[gl()].desc + '</span>';
    btn.addEventListener('click', function() {
      c.querySelectorAll('.mc-choice').forEach(function(b){ b.disabled = true; });
      btn.classList.add('sel'); mStep_room(room);
    });
    c.appendChild(btn);
  });
}

function mStep_room(room) {
  MS.room = room;
  mAddMsg(room[gl()].name, 'user').then(function() {
    mProg(35);
    var ro = Object.entries(room.repos).filter(function(e){ return e[0] !== 'type'; })
      .map(function(e){ return e[0] + ' → <strong>' + fmt(e[1]) + '</strong>'; }).join(' · ');
    mAddMsg('✅ <strong>' + room[gl()].name + '</strong><br>Nuit : <strong>' + fmt(room.priceNight) + '</strong> · Repos : ' + ro).then(function() {
      mAddMsg(t().askDate, 'bot', 150).then(function() { mShowText('Ex: 10/04/2026', mStep_date); });
    });
  });
}

function mStep_date(v) {
  MS.date = v;
  mAddMsg(v, 'user').then(function() {
    mProg(48);
    mAddMsg(t().askTime).then(function() {
      mShowChoices(['06h00','08h00','10h00','12h00','14h00','16h00','18h00','20h00','22h00+'].map(function(h) {
        return { label: h, value: h, action: mStep_time };
      }));
    });
  });
}

function mStep_time(v) {
  MS.time = v;
  mAddMsg(v, 'user').then(function() {
    mProg(58);
    if (MS.stay === 'night') {
      mAddMsg(t().askNights).then(function() {
        mShowChoices([1,2,3,4,5,6,7].map(function(n) {
          return { label: t().nights(n), value: String(n), action: mStep_nights };
        }));
      });
    } else { mStep_askDur(); }
  });
}

function mStep_nights(v) {
  MS.nights = parseInt(v);
  mAddMsg(t().nights(MS.nights), 'user').then(function() { mProg(68); mStep_askPeople(); });
}

function mStep_askDur() {
  var r = MS.room.repos;
  var opts = r.type === 'clim'
    ? [{ v:'3000', l:'1h — ' + fmt(3000) }, { v:'5000', l:'2h — ' + fmt(5000) }, { v:'8000', l:'3h-4h — ' + fmt(8000) }]
    : [{ v:'2500', l:'1h — ' + fmt(2500) }, { v:'5000', l:'2h-3h — ' + fmt(5000) }, { v:'6000', l:'4h — ' + fmt(6000) }];
  mAddMsg(t().askDur(MS.room[gl()].name)).then(function() {
    mShowChoices(opts.map(function(o) {
      return { label: o.l, value: o.v, action: function(val) {
        MS.durPrice = parseInt(val); MS.duration = o.l.split('—')[0].trim();
        mAddMsg(o.l, 'user').then(function() { mProg(68); mStep_askPeople(); });
      }};
    }));
  });
}

function mStep_askPeople() {
  mAddMsg(t().askPeople).then(function() {
    mShowChoices([1,2,3,4].map(function(n) {
      return { label: t().persons(n), value: String(n), action: mStep_people };
    }));
  });
}

function mStep_people(v) {
  MS.persons = parseInt(v);
  mAddMsg(t().persons(MS.persons), 'user').then(function() {
    mProg(78);
    mAddMsg(t().askPhone).then(function() { mShowText('+228…', mStep_phone); });
  });
}

function mStep_phone(v) {
  MS.phone = v;
  mAddMsg(v, 'user').then(function() {
    mProg(88);
    mAddMsg(t().askPay).then(function() {
      mShowChoices([
        { label: t().oCash,     value: t().oCash,     action: mStep_pay },
        { label: t().oTransfer, value: t().oTransfer, action: mStep_pay }
      ]);
    });
  });
}

function mStep_pay(v) {
  MS.payment = v;
  mAddMsg(v, 'user').then(function() {
    mProg(96);
    var total   = MS.stay === 'night' ? MS.room.priceNight * MS.nights : MS.durPrice;
    var deposit = Math.round(total * 0.5);
    var rn      = MS.room[gl()].name;
    var sejStr  = MS.stay === 'night'
      ? t().stNight + ' · ' + t().nights(MS.nights)
      : t().stRest + ' · ' + MS.duration;

    mAddMsg(t().summary).then(function() {
      var card = document.createElement('div'); card.className = 'mc-msg mc-bot-msg';
      card.innerHTML = '<div class="mc-av">' + IBOT + '</div>' +
        '<div class="mc-sum-card">' +
          '<div class="mc-sum-title">🏨 Hôtel Marguo City</div>' +
          mRow(t().lName, MS.name) + mRow(t().lPhone, MS.phone) +
          mRow(t().lRoom, rn) + mRow(t().lStay, sejStr) +
          mRow(t().lDate, MS.date + ' à ' + MS.time) +
          mRow(MS.stay === 'night' ? t().lDur : 'Durée', MS.stay === 'night' ? t().nights(MS.nights) : MS.duration) +
          mRow(t().lPeople, t().persons(MS.persons)) + mRow(t().lPay, MS.payment) +
          '<div class="mc-sum-totals">' +
            '<div class="mc-st-row"><span>' + t().lTotal + '</span><span class="mc-st-val">' + fmt(total) + '</span></div>' +
            '<div class="mc-st-row"><span>' + t().lDeposit + '</span><span class="mc-st-dep">' + fmt(deposit) + '</span></div>' +
          '</div>' +
        '</div>';
      mMsgs().appendChild(card); mScroll();

      setTimeout(function() {
        mAddMsg(t().endMsg(MS.name)).then(function() {
          mClearInput();
          var inp = document.getElementById('mc-input');
          var waLines = [
            '🏨 *RÉSERVATION — Hôtel Marguo City*',
            '─────────────────────────────',
            '👤 *' + t().lName + ' :* ' + MS.name,
            '📞 *' + t().lPhone + ' :* ' + MS.phone,
            '─────────────────────────────',
            '🛏️ *' + t().lRoom + ' :* ' + rn,
            '🎯 *' + t().lStay + ' :* ' + sejStr,
            '📅 *' + t().lDate + ' :* ' + MS.date,
            '🕐 *Heure :* ' + MS.time,
            MS.stay === 'night' ? '🌙 *Durée :* ' + t().nights(MS.nights) : '⏳ *Durée :* ' + MS.duration,
            '👥 *' + t().lPeople + ' :* ' + t().persons(MS.persons),
            '─────────────────────────────',
            '💳 *' + t().lPay + ' :* ' + MS.payment,
            '─────────────────────────────',
            '💰 *' + t().lTotal + ' :* ' + fmt(total),
            '💵 *' + t().lDeposit + ' :* ' + fmt(deposit),
            '─────────────────────────────',
            '✅ Merci de confirmer cette réservation.'
          ].join('\n');

          var div = document.createElement('div'); div.className = 'mc-confirm-area';
          var wa = document.createElement('a');
          wa.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waLines);
          wa.target = '_blank'; wa.rel = 'noopener'; wa.className = 'mc-wa-btn';
          wa.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> ' + t().waBtn;
          div.appendChild(wa);
          var rb = document.createElement('button'); rb.className = 'mc-restart-btn'; rb.textContent = t().restart;
          rb.addEventListener('click', mBotStart); div.appendChild(rb);
          inp.appendChild(div);
          mProg(100);
        });
      }, 400);
    });
  });
}

function mRow(l, v) { return '<div class="mc-sum-row"><span>' + l + '</span><strong>' + v + '</strong></div>'; }
