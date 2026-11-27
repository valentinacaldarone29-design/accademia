/* Schermo intero, un'attività per volta e «prossima attività» a fine lavoro.
   Usato da tutte le app dei bambini (non dal labirinto, che ha già il suo schermo intero). */
(function(){
  var H=document.documentElement;H.classList.add("land");
  var app=(window.matchMedia&&(matchMedia("(display-mode: fullscreen)").matches||matchMedia("(display-mode: standalone)").matches))||navigator.standalone;
  if(app)H.classList.add("is-app");
  var canFull=!!(H.requestFullscreen||H.webkitRequestFullscreen);
  function isFull(){return !!(document.fullscreenElement||document.webkitFullscreenElement)}
  function goFull(){try{var p=(H.requestFullscreen||H.webkitRequestFullscreen).call(H);if(p&&p.catch)p.catch(function(){})}catch(e){}}
  function sync(){H.classList.toggle("is-full",isFull())}
  document.addEventListener("fullscreenchange",sync);document.addEventListener("webkitfullscreenchange",sync);
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  function vis(el){return !!(el&&(el.offsetWidth||el.offsetHeight||el.getClientRects().length))}
  function txt(el){return el?el.textContent.replace(/\s+/g," ").trim():""}
  function teacherSec(s){return /lezione|maestra/.test(s.id||"")}

  /* sezioni e schede */
  function tabs(){var box=$(".tabs");if(!box)return [];return $$('a[href^="#"],[role=tab]',box).filter(function(el){return !el.hasAttribute("data-teacher")&&!/lezione|maestra/.test((el.getAttribute("href")||el.id||""))&&!el.classList.contains("cq-hid")&&!el.hidden})}
  function curSec(){return $$("section.view,section[role=tabpanel]").filter(function(s){return !s.hidden&&vis(s)})[0]||null}
  function tabOf(sec){return tabs().filter(function(t){var h=(t.getAttribute("href")||"").slice(1);return (h&&("sec-"+h===sec.id||h===sec.id))||t.getAttribute("aria-controls")===sec.id})[0]||null}
  function nextTab(sec){var ts=tabs(),t=tabOf(sec),i=ts.indexOf(t);return i>=0?ts[i+1]||null:null}
  function tabName(t){var c=t.cloneNode(true);$$(".cq-n",c).forEach(function(x){x.remove()});return txt(c)}
  function title(p){var h=$(".eyebrow,h2,h3,.q",p);var t=txt(h);if(/^attivit/i.test(t)){var h2=$("h2,h3",p);if(h2)t=txt(h2)}return t.replace(/^[^A-Za-zÀ-ú0-9]+/,"").slice(0,44)||"Attività"}

  /* un'attività per volta: sezioni con tanti riquadri */
  var NOPAGE=document.body&&document.body.dataset.lp==="off";
  function pages(sec){
    if(NOPAGE||sec.dataset.lp==="off"||teacherSec(sec))return [];
    var ps=$$(":scope>.panel",sec).filter(function(p){return !p.hidden&&!p.classList.contains("sfboard")&&!p.classList.contains("lp-bar")});
    if(ps.length<4)return [];
    /* il primo riquadro senza esercizio (impostazioni, titolo) resta sempre visibile */
    if(!$(".fb,[role=status],[aria-live]",ps[0]))ps=ps.slice(1);
    return ps.length>=3?ps:[];
  }
  function go(sec,i){sec.dataset.lpi=i;render(sec,true);var m=$("main")||sec;(sec.closest("main")||sec).scrollTop=0;sec.scrollIntoView({block:"start"});hideWin()}
  function render(sec,force){
    var ps=pages(sec);
    if(!ps.length){sec.classList.remove("lp-on");$$(".lp-off",sec).forEach(function(p){p.classList.remove("lp-off")});return}
    var i=Math.min(+sec.dataset.lpi||0,ps.length-1),sig=i+"/"+ps.length;
    sec.classList.add("lp-on");
    ps.forEach(function(p,k){p.classList.toggle("lp-off",k!==i)});
    var bar=$(":scope>.lp-bar",sec),nav=$(":scope>.lp-nav",sec);
    if(!bar){bar=document.createElement("div");bar.className="lp-bar";bar.setAttribute("aria-live","polite");sec.insertBefore(bar,ps[0])}
    if(!nav){nav=document.createElement("div");nav.className="lp-nav"}
    if(nav.previousElementSibling!==ps[ps.length-1])ps[ps.length-1].after(nav);
    var done=JSON.parse(sec.dataset.lpdone||"{}");
    if(bar.dataset.sig!==sig+JSON.stringify(done)||force){
      bar.dataset.sig=sig+JSON.stringify(done);
      bar.innerHTML='<span>📍 Attività '+(i+1)+' di '+ps.length+': '+title(ps[i])+'</span><span class="lp-dots">'+ps.map(function(p,k){return '<button type="button" class="'+(k===i?"on ":"")+(done[k]?"ok":"")+'" data-lpk="'+k+'" aria-label="Attività '+(k+1)+': '+title(p)+'">'+(done[k]&&k!==i?"✓":k+1)+'</button>'}).join("")+'</span>';
      var nt=nextTab(sec),last=i===ps.length-1;
      nav.innerHTML='<button type="button" class="lp-back"'+(i===0?" disabled":"")+'>◀ Indietro</button>'+
        (last?(nt?'<button type="button" class="lp-go">Prossima sezione: '+tabName(nt)+' ▶</button>':''):'<button type="button" class="lp-go">Prossima attività: '+title(ps[i+1])+' ▶</button>');
    }
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-lpk],.lp-back,.lp-go");if(!b)return;var sec=b.closest("section");if(!sec)return;
    var ps=pages(sec),i=+sec.dataset.lpi||0;
    if(b.dataset.lpk!=null)go(sec,+b.dataset.lpk);
    else if(b.classList.contains("lp-back"))go(sec,Math.max(0,i-1));
    else if(i<ps.length-1)go(sec,i+1);
    else{var nt=nextTab(sec);if(nt)nt.click();topNow()}
  });
  function topNow(){var m=$("main");if(m)m.scrollTop=0;var a=$(".app>section[role=tabpanel]:not([hidden])");if(a)a.scrollTop=0;window.scrollTo(0,0)}

  /* attività finita: suggerisci la prossima */
  var win=null,winKey="";
  function hideWin(){if(win){win.remove();win=null}}
  function onWin(){
    var sec=curSec();if(!sec||teacherSec(sec))return;
    var ps=pages(sec),i=+sec.dataset.lpi||0,label,act;
    if(ps.length){var d=JSON.parse(sec.dataset.lpdone||"{}");d[i]=1;sec.dataset.lpdone=JSON.stringify(d);render(sec,true)}
    if(ps.length&&i<ps.length-1){label="Prossima attività: "+title(ps[i+1]);act=function(){go(sec,i+1)}}
    else{var nt=nextTab(sec);if(!nt)return;label="Prossima sezione: "+tabName(nt);act=function(){nt.click();topNow()}}
    var key=sec.id+"|"+i;if(win&&winKey===key)return;hideWin();winKey=key;
    win=document.createElement("div");win.className="lp-win";win.setAttribute("role","status");
    win.innerHTML='<span>🎉 Ben fatto!</span><button type="button" class="lp-wgo">'+label+' ▶</button><button type="button" class="lp-wx">Resto qui</button>';
    win.querySelector(".lp-wgo").addEventListener("click",function(){hideWin();act()});
    win.querySelector(".lp-wx").addEventListener("click",hideWin);
    document.body.appendChild(win);
  }
  /* segnali di «fatto»: stelle assegnate o un messaggio verde di risposta giusta */
  function hookAward(){var C=window.Cuccioli;if(!C||C._lpHook||!C.award)return;C._lpHook=1;var o=C.award;C.award=function(){try{setTimeout(onWin,900)}catch(e){}return o.apply(this,arguments)}}
  var lastGood=0;
  function goodCount(){var sec=curSec();if(!sec)return 0;return $$(".fb.good,.fb.ok,.fb-good,.okbox,[role=status].good,[aria-live].good",sec).filter(vis).length}
  var mo=new MutationObserver(function(){var n=goodCount();if(n>lastGood)setTimeout(onWin,900);lastGood=n});

  var lastSec=null;
  function tick(){
    hookAward();
    var sec=curSec();
    if(sec!==lastSec){lastSec=sec;hideWin();lastGood=goodCount()}
    $$("section.view,section[role=tabpanel]").forEach(function(s){if(!s.hidden)render(s)});
  }
  function init(){
    if($("body>nav")&&$("body>main"))H.classList.add("land-nav");else if($(".app>.tabs"))H.classList.add("land-app");
    var nav=$("body>nav .wrap")||($(".app>.tabs")&&$(".app>.tabs").parentNode);
    if(canFull&&!app&&!$(".land-full")){
      var b=document.createElement("button");b.type="button";b.className="land-full";b.innerHTML="⛶ Schermo intero";b.addEventListener("click",goFull);
      var tb=$("body>nav .wrap");if(tb)tb.appendChild(b);else{var t=$(".app>.tabs");if(t)t.after(b)}
    }
    mo.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
    tick();setInterval(tick,700);window.addEventListener("hashchange",function(){setTimeout(tick,50)});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
