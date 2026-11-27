/* Pulsante «Schermo intero»: il tablet si può usare sia in orizzontale sia in verticale. */
(function(){
  var H=document.documentElement;H.classList.add("land");
  var app=(window.matchMedia&&(matchMedia("(display-mode: fullscreen)").matches||matchMedia("(display-mode: standalone)").matches))||navigator.standalone;
  if(app)H.classList.add("is-app");
  var canFull=!!(H.requestFullscreen||H.webkitRequestFullscreen);
  function isFull(){return !!(document.fullscreenElement||document.webkitFullscreenElement)}
  function goFull(){
    try{var p=(H.requestFullscreen||H.webkitRequestFullscreen).call(H);
      if(p&&p.catch)p.catch(function(){});
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
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
