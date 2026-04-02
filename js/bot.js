/* ================================================================
   BOT.JS v2 — Hôtel Marguo City — CORRIGÉ
   ================================================================ */
'use strict';

const ROOMS=[
  {id:'clim-premium', fr:{name:'Climatisée Premium',desc:'Clim · Lit 3 places · Mini frigo · Placard · Chauffe-eau · WiFi'},en:{name:'Premium A/C Room',desc:'A/C · Triple bed · Mini fridge · Wardrobe · Water heater · WiFi'},priceNight:15000,repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'clim-confort',  fr:{name:'Climatisée Confort',desc:'Clim · Lit 3 places · Mini frigo ou Placard · WiFi'},en:{name:'Comfort A/C Room',desc:'A/C · Triple bed · Mini fridge or Wardrobe · WiFi'},priceNight:12000,repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'clim-standard', fr:{name:'Climatisée Standard',desc:'Clim · Lit 3 places · WiFi'},en:{name:'Standard A/C Room',desc:'A/C · Triple bed · WiFi'},priceNight:10000,repos:{type:'clim','1h':3000,'2h':5000,'3h-4h':8000}},
  {id:'vent-confort',  fr:{name:'Ventilée Confort',desc:'Ventilateur · Lit 3 places · Placard · Chauffe-eau · WiFi'},en:{name:'Comfort Fan Room',desc:'Fan · Triple bed · Wardrobe · Water heater · WiFi'},priceNight:10000,repos:{type:'vent','1h':2500,'2h-3h':5000,'4h':6000}},
  {id:'vent-standard', fr:{name:'Ventilée Standard',desc:'Ventilateur · Lit 3 places · Placard · WiFi'},en:{name:'Standard Fan Room',desc:'Fan · Triple bed · Wardrobe · WiFi'},priceNight:8000,repos:{type:'vent','1h':2500,'2h-3h':5000,'4h':6000}},
];

const IBOT=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 3v4m0 0a4 4 0 014 4H8a4 4 0 014-4z"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/></svg>`;
const IUSER=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`;
const IWA=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.843L0 24l6.345-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.52-5.19-1.427l-.37-.22-3.768.895.955-3.68-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

const TX={
  fr:{
    w1:`Bienvenue chez <strong>Hôtel Marguo City</strong> ! 🌟`,
    w2:`Je suis votre assistant de réservation, disponible <strong>24h/24</strong>. Commençons ensemble.`,
    n:`Quel est votre <strong>prénom</strong>, s'il vous plaît ?`,
    s:n=>`Enchanté(e) <strong>${n}</strong> 😊<br>Quel type de séjour souhaitez-vous ?`,
    r:`Quelle chambre vous convient ?`,
    d:`Quelle est votre <strong>date d'arrivée</strong> ?`,
    h:`À quelle <strong>heure</strong> arriverez-vous ?`,
    ni:`Combien de <strong>nuits</strong> souhaitez-vous ?`,
    du:r=>`Pour la chambre <strong>${r}</strong>, choisissez votre durée :`,
    pe:`Combien de <strong>personnes</strong> ?`,
    ph:`Votre <strong>numéro de téléphone</strong> (avec indicatif) ?`,
    pa:`Votre <strong>mode de paiement</strong> préféré ?`,
    su:`Voici votre <strong>récapitulatif</strong>. Appuyez sur le bouton pour confirmer votre réservation directement sur WhatsApp !`,
    oN:'Nuit complète',oR:'Repos (quelques heures)',
    oC:'Espèces à l\'arrivée',oT:'Transfert mobile (Flooz/T-Money)',
    ni_:n=>`${n} nuit${n>1?'s':''}`,pe_:n=>`${n} personne${n>1?'s':''}`,
    ph_:'Tapez ici…',sb:'Envoyer',cf:'✅ Confirmer sur WhatsApp',
    lN:'Prénom',lPh:'Téléphone',lSt:'Séjour',lR:'Chambre',
    lD:'Date d\'arrivée',lH:'Heure',lDu:'Durée',lPe:'Personnes',
    lPa:'Paiement',lTo:'Total estimé',lAc:'Acompte (50%)',
    stN:'Nuit complète',stR:'Repos',
  },
  en:{
    w1:`Welcome to <strong>Hôtel Marguo City</strong>! 🌟`,
    w2:`I'm your booking assistant, available <strong>24/7</strong>. Let's get started.`,
    n:`What is your <strong>first name</strong>, please?`,
    s:n=>`Nice to meet you, <strong>${n}</strong> 😊<br>What type of stay are you looking for?`,
    r:`Which room suits you?`,
    d:`What is your <strong>arrival date</strong>?`,
    h:`What <strong>time</strong> will you arrive?`,
    ni:`How many <strong>nights</strong> would you like?`,
    du:r=>`For the <strong>${r}</strong> room, choose your duration:`,
    pe:`How many <strong>people</strong>?`,
    ph:`Your <strong>phone number</strong> (with country code)?`,
    pa:`Your preferred <strong>payment method</strong>?`,
    su:`Here is your <strong>summary</strong>. Tap the button to confirm your booking directly on WhatsApp!`,
    oN:'Full night',oR:'Short stay (a few hours)',
    oC:'Cash on arrival',oT:'Mobile transfer (Flooz/T-Money)',
    ni_:n=>`${n} night${n>1?'s':''}`,pe_:n=>`${n} person${n>1?'s':''}`,
    ph_:'Type here…',sb:'Send',cf:'✅ Confirm on WhatsApp',
    lN:'Name',lPh:'Phone',lSt:'Stay type',lR:'Room',
    lD:'Arrival date',lH:'Time',lDu:'Duration',lPe:'People',
    lPa:'Payment',lTo:'Estimated total',lAc:'Deposit (50%)',
    stN:'Full night',stR:'Short stay',
  }
};

/* STATE */
const S={step:0,name:'',phone:'',stay:'',room:null,date:'',time:'',duration:'',durPrice:0,nights:1,persons:1,payment:''};
let win,bar,stepEls;
const gl=()=>localStorage.getItem('mc_lang')||'fr';
const tx=k=>{const v=TX[gl()][k];return v;};
const fmt=n=>Number(n).toLocaleString('fr-FR');

/* BOOT */
document.addEventListener('DOMContentLoaded',()=>{
  win=document.getElementById('chatMsgs');
  bar=document.getElementById('chatBar');
  stepEls=document.querySelectorAll('.bot-step');
  if(!win)return;
  setSteps();
  setTimeout(()=>{
    bot(tx('w1'));
    after(700,()=>{ bot(tx('w2')); after(700,()=>{ bot(tx('n')); showTxt(); }); });
  },350);
});

/* STEPS */
function setSteps(){
  const lb=gl()==='fr'
    ?['Prénom','Séjour','Chambre','Date','Heure','Durée','Personnes','Téléphone','Paiement','Résumé']
    :['Name','Stay','Room','Date','Time','Duration','People','Phone','Payment','Summary'];
  stepEls.forEach((el,i)=>{
    el.textContent=lb[i]||'';
    el.classList.remove('active','done');
    if(i<S.step) el.classList.add('done');
    if(i===S.step) el.classList.add('active');
  });
}
function adv(){S.step=Math.min(S.step+1,stepEls.length-1);setSteps();}

/* MESSAGES */
function bot(html,extra=''){
  const d=document.createElement('div');
  d.className='msg bot';
  d.innerHTML=`<div class="msg-av">${IBOT}</div><div><div class="msg-bub">${html}</div>${extra}</div>`;
  win.appendChild(d);sc();
}
function usr(txt){
  const d=document.createElement('div');
  d.className='msg user';
  d.innerHTML=`<div class="msg-bub">${txt}</div><div class="msg-av">${IUSER}</div>`;
  win.appendChild(d);sc();
}
function typ(){
  const d=document.createElement('div');
  d.className='msg bot _typ';
  d.innerHTML=`<div class="msg-av">${IBOT}</div><div class="msg-bub"><div class="typing-bubble"><span></span><span></span><span></span></div></div>`;
  win.appendChild(d);sc();return d;
}
function clrTyp(){document.querySelector('._typ')?.remove();}
function sc(){win.scrollTop=win.scrollHeight;}
function clrBar(){bar.innerHTML='';}
function after(ms,fn){setTimeout(fn,ms);}

/* INPUT MODES */
function showTxt(type='text',ph=null){
  clrBar();
  bar.innerHTML=`<div class="text-input-row">
    <input class="bot-input" id="bI" type="${type}" placeholder="${ph||tx('ph_')}" autocomplete="off"/>
    <button class="bot-send" id="bS">${tx('sb')}</button></div>`;
  const i=document.getElementById('bI'),b=document.getElementById('bS');
  i.focus();
  const go=()=>{const v=i.value.trim();if(v)onTxt(v);};
  b.onclick=go;i.onkeydown=e=>{if(e.key==='Enter')go();};
}

function showQR(opts){
  clrBar();
  const w=document.createElement('div');w.className='qr-wrap';
  opts.forEach(o=>{
    const b=document.createElement('button');
    b.className='qr'+(o.cls?' '+o.cls:'');
    b.innerHTML=o.html||o.label;
    b.onclick=()=>{w.querySelectorAll('.qr').forEach(x=>x.classList.add('disabled'));b.classList.add('picked');onQR(o.val,o.show||o.label);};
    w.appendChild(b);
  });
  bar.appendChild(w);
}

/* FLOW — text */
function onTxt(val){
  usr(val);clrBar();const t=typ();
  after(600,()=>{
    clrTyp();
    if(S.step===0){S.name=val;adv();bot(tx('s')(S.name));showQR([{val:'night',label:tx('oN')},{val:'rest',label:tx('oR')}]);}
    else if(S.step===3){S.date=val;adv();bot(tx('h'));showTxt('time');}
    else if(S.step===4){S.time=val;adv();if(S.stay==='night'){bot(tx('ni'));showQR([1,2,3,4,5,6,7].map(n=>({val:String(n),label:tx('ni_')(n)})));}else{askDur();}}
    else if(S.step===7){S.phone=val;adv();bot(tx('pa'));showQR([{val:'cash',label:tx('oC')},{val:'transfer',label:tx('oT')}]);}
  });
}

/* FLOW — quick reply */
function onQR(val,label){
  usr(label);clrBar();typ();
  after(600,()=>{
    clrTyp();
    if(S.step===1){S.stay=val;adv();bot(tx('r'));showRooms();}
    else if(S.step===2){S.room=ROOMS.find(r=>r.id===val);adv();bot(tx('d'));showTxt('date');}
    else if(S.step===5){
      if(S.stay==='night'){S.nights=parseInt(val);S.durPrice=S.room.priceNight*S.nights;}
      else{S.duration=label.split('—')[0].trim();S.durPrice=parseInt(val);}
      adv();bot(tx('pe'));showQR([1,2,3,4].map(n=>({val:String(n),label:tx('pe_')(n)})));
    }
    else if(S.step===6){S.persons=parseInt(val);adv();bot(tx('ph'));showTxt('tel','+228…');}
    else if(S.step===8){S.payment=label;adv();buildSum();}
  });
}

/* ROOMS — name + desc only, NO prices */
function showRooms(){
  clrBar();
  const w=document.createElement('div');w.className='qr-wrap';
  ROOMS.forEach(room=>{
    const b=document.createElement('button');b.className='qr room';
    const n=room[gl()].name,d=room[gl()].desc;
    b.innerHTML=`<span class="r-name">${n}</span><span class="r-desc">${d}</span>`;
    b.onclick=()=>{w.querySelectorAll('.qr').forEach(x=>x.classList.add('disabled'));b.classList.add('picked');onQR(room.id,n);};
    w.appendChild(b);
  });
  bar.appendChild(w);
}

/* DURATION — with prices (after room selected) */
function askDur(){
  const rn=S.room[gl()].name;
  bot(tx('du')(rn));
  const r=S.room.repos;
  const opts=r.type==='clim'
    ?[{val:'3000',label:`1h — ${fmt(3000)} FCFA`},{val:'5000',label:`2h — ${fmt(5000)} FCFA`},{val:'8000',label:`3h-4h — ${fmt(8000)} FCFA`}]
    :[{val:'2500',label:`1h — ${fmt(2500)} FCFA`},{val:'5000',label:`2h-3h — ${fmt(5000)} FCFA`},{val:'6000',label:`4h — ${fmt(6000)} FCFA`}];
  showQR(opts.map(o=>({...o,show:o.label})));
}

/* SUMMARY */
function buildSum(){
  const L=TX[gl()];
  const total=S.stay==='night'?S.room.priceNight*S.nights:S.durPrice;
  const rn=S.room[gl()].name;
  const dur=S.stay==='night'?L.ni_(S.nights):S.duration;
  const stL=S.stay==='night'?L.stN:L.stR;

  // WhatsApp message — chaque détail sur sa propre ligne
  const lines=[
    '🏨 *Réservation — Hôtel Marguo City*',
    '',
    `👤 ${L.lN} : ${S.name}`,
    `📞 ${L.lPh} : ${S.phone}`,
    `🛏️ ${L.lR} : ${rn}`,
    `📋 ${L.lSt} : ${stL}`,
    `📅 ${L.lD} : ${S.date}`,
    `🕐 ${L.lH} : ${S.time}`,
    `⏳ ${L.lDu} : ${dur}`,
    `👥 ${L.lPe} : ${L.pe_(S.persons)}`,
    `💳 ${L.lPa} : ${S.payment}`,
    '',
    `💰 ${L.lTo} : ${fmt(total)} FCFA`,
    '',
    '_Réservation via marguocity.github.io_'
  ];
  const waText=lines.join('%0A'); // %0A = saut de ligne WhatsApp
  const waLink=`https://wa.me/22899204638?text=${waText}`;

  bot(L.su,`
    <div class="sum-card">
      <div class="sum-card-title">📋 Récapitulatif</div>
      ${R(L.lN,S.name)}
      ${R(L.lPh,S.phone)}
      ${R(L.lR,rn)}
      ${R(L.lSt,stL)}
      ${R(L.lD,S.date)}
      ${R(L.lH,S.time)}
      ${R(L.lDu,dur)}
      ${R(L.lPe,L.pe_(S.persons))}
      ${R(L.lPa,S.payment)}
      <div class="sum-total">
        <span class="slabel">${L.lTo}</span>
        <span class="sval">${fmt(total)} FCFA</span>
      </div>
    </div>
    <a href="${waLink}" target="_blank" rel="noopener" class="wa-confirm">${IWA} ${L.cf}</a>
  `);
  clrBar();
  if(stepEls.length) stepEls[stepEls.length-1].classList.add('done');
}

function R(l,v){return `<div class="sum-row"><span class="slabel">${l}</span><span class="sval">${v}</span></div>`;}
