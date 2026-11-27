/* Formato orizzontale: pulsante «Schermo intero» e invito a girare il tablet. */
(function(){
  var H=document.documentElement;H.classList.add("land");
  var app=(window.matchMedia&&(matchMedia("(display-mode: fullscreen)").matches||matchMedia("(display-mode: standalone)").matches))||navigator.standalone;
  if(app)H.classList.add("is-app");
  var canFull=!!(H.requestFullscreen||H.webkitRequestFullscreen);
  function isFull(){return !!(document.fullscreenElement||document.webkitFullscreenElement)}
  function goFull(){
    try{var p=(H.requestFullscreen||H.webkitRequestFullscreen).call(H);
      if(p&&p.then)p.then(function(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(function(){})}catch(e){}}).catch(function(){});
    }catch(e){}
  }
  function sync(){H.classList.toggle("is-full",isFull())}
  document.addEventListener("fullscreenchange",sync);document.addEventListener("webkitfullscreenchange",sync);
  function init(){
    var nav=document.querySelector("body>nav .wrap");
    if(nav&&canFull&&!app&&!document.querySelector(".land-full")){
      var b=document.createElement("button");b.type="button";b.className="land-full";b.innerHTML="⛶ Schermo intero";
      b.addEventListener("click",goFull);nav.appendChild(b);
    }
    if(!document.querySelector(".land-turn")){
      var t=document.createElement("div");t.className="land-turn";t.setAttribute("role","dialog");t.setAttribute("aria-label","Gira il tablet");
      t.innerHTML='<div class="tbox"><span class="tico" aria-hidden="true">📱</span><b>Gira il tablet in orizzontale</b><span>Così vedi tutto lo schermo e lavori meglio.</span><button type="button">Continua in verticale</button></div>';
      t.querySelector("button").addEventListener("click",function(){H.classList.add("turn-ok")});
      document.body.appendChild(t);
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
