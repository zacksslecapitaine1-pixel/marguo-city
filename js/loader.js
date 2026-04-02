/* ================================================================
   LOADER.JS v2 — Fast Page Transitions
   ================================================================ */
(function(){
  'use strict';

  function inject(){
    const l=document.createElement('div');
    l.id='pageLoader'; l.className='page-loader';
    l.innerHTML=`
      <img class="pl-logo" src="images/logo.png" alt="Marguo City"
           onerror="this.style.display='none';document.getElementById('pltx').style.display='block'"/>
      <div class="pl-logo-text" id="pltx" style="display:none;">Marguo City</div>
      <div class="pl-bar-wrap"><div class="pl-bar" id="plBar"></div></div>
      <div class="pl-sub">Hôtel · Bar · Restaurant</div>`;
    document.body.insertBefore(l, document.body.firstChild);
  }

  function hide(){
    const l=document.getElementById('pageLoader');
    if(!l)return;
    setTimeout(()=>{
      l.classList.add('hidden');
      setTimeout(()=>l.remove(), 500);
    }, 450); /* Réduit de 680ms à 450ms */
  }

  /* Inject */
  if(document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);

  /* Hide on load */
  if(document.readyState==='complete') hide();
  else { window.addEventListener('load', hide); setTimeout(hide, 1500); }

  /* Transition on internal links — 500ms max */
  document.addEventListener('click', function(e){
    const a=e.target.closest('a[href]');
    if(!a) return;
    const href=a.getAttribute('href');
    if(!href||href.startsWith('http')||href.startsWith('#')||
       href.startsWith('tel:')||href.startsWith('mailto:')||
       href.startsWith('whatsapp:')||a.target==='_blank') return;

    e.preventDefault();
    const nl=document.createElement('div');
    nl.className='page-loader'; nl.id='pageLoader';
    nl.innerHTML=`
      <img class="pl-logo" src="images/logo.png" alt="Marguo City"
           onerror="this.style.display='none'"/>
      <div class="pl-logo-text">Marguo City</div>
      <div class="pl-bar-wrap"><div class="pl-bar"></div></div>
      <div class="pl-sub">Hôtel · Bar · Restaurant</div>`;
    document.body.appendChild(nl);
    setTimeout(()=>{ window.location.href=href; }, 500);
  }, {capture:true});
})();
