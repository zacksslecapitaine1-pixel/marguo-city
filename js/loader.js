/* ================================================================
   LOADER.JS v3 — Ultra-fast (300ms max)
   ================================================================ */
(function(){
  'use strict';

  function mkLoader(){
    const l=document.createElement('div');
    l.id='pageLoader';l.className='page-loader';
    l.innerHTML=`
      <img class="pl-logo" src="images/logo.png" alt="Marguo City"
        onerror="this.style.display='none';document.getElementById('pltx')&&(document.getElementById('pltx').style.display='block')"/>
      <div class="pl-logo-text" id="pltx" style="display:none;">Marguo City</div>
      <div class="pl-bar-wrap"><div class="pl-bar"></div></div>
      <div class="pl-sub">Hôtel · Bar · Restaurant</div>`;
    return l;
  }

  /* Inject at page start */
  function inject(){
    if(!document.getElementById('pageLoader'))
      document.body.insertBefore(mkLoader(), document.body.firstChild);
  }
  if(document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);

  /* Hide fast — 280ms */
  function hide(){
    const l=document.getElementById('pageLoader');
    if(!l)return;
    setTimeout(()=>{
      l.style.transition='opacity .22s ease';
      l.style.opacity='0';
      setTimeout(()=>l.remove(), 240);
    }, 280);
  }

  if(document.readyState==='complete') hide();
  else {
    window.addEventListener('load', hide);
    setTimeout(hide, 900); /* fallback */
  }

  /* Link click — 300ms transition then navigate */
  document.addEventListener('click', function(e){
    const a=e.target.closest('a[href]');
    if(!a) return;
    const h=a.getAttribute('href');
    if(!h||h.startsWith('http')||h.startsWith('#')||
       h.startsWith('tel:')||h.startsWith('mailto:')||
       h.startsWith('whatsapp:')||a.target==='_blank') return;
    e.preventDefault();
    /* Show mini loader */
    const l=mkLoader();
    document.body.appendChild(l);
    setTimeout(()=>{ window.location.href=h; }, 300);
  },{capture:true});
})();
