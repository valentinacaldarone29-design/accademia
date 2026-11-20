/* Sfondo della home che cambia con stagioni e feste.
   Anteprima di un tema: index.html?tema=natale (autunno, inverno, primavera, estate, halloween, natale, capodanno, befana, carnevale, pasqua, valentino, papa, mamma) */
(function(){
"use strict";
function easter(y){var a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return new Date(y,mo-1,da)}
function day(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function add(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x}
function between(t,a,b){return t>=a&&t<=b}

var T={
  autunno:  {n:"Autunno all'Accademia",e:"🍂",fx:["🍂","🍁","🍂","🌰","🍄","🍁"],dir:"down",bg:["#6B3A1E","#3A2418","#1E140F"],sky:"#F2A65A"},
  inverno:  {n:"Inverno all'Accademia",e:"❄️",fx:["❄️","❄️","❅","❆","⛄"],dir:"down",bg:["#2F5C8F","#1A2F52","#0E1A33"],sky:"#BFE3FF"},
  primavera:{n:"Primavera all'Accademia",e:"🌸",fx:["🌸","🌼","🦋","🌷","🍃","🐝"],dir:"down",bg:["#3E7F5A","#2A4A5E","#1B2440"],sky:"#FFC7DD"},
  estate:   {n:"Estate all'Accademia",e:"☀️",fx:["🫧","🐚","⭐","🫧","🍉","🌊"],dir:"up",bg:["#2D8FB0","#1D5476","#122C4A"],sky:"#FFE07A"},
  halloween:{n:"Happy Halloween!",e:"🎃",fx:["🎃","🦇","👻","🦇","🕸️","🍬"],dir:"down",bg:["#5A2A7A","#2A1238","#120818"],sky:"#FF8A1F"},
  natale:   {n:"Buon Natale!",e:"🎄",fx:["❄️","❅","⭐","🎁","❄️","🔔"],dir:"down",bg:["#7A1F2B","#163B2A","#0B1A14"],sky:"#FFD76A",lights:1},
  capodanno:{n:"Buon anno nuovo!",e:"🎆",fx:["✨","🎉","❄️","🎊","✨"],dir:"down",bg:["#3A2C7A","#1A1846","#0B0B24"],sky:"#FFD76A",lights:1},
  befana:   {n:"Arriva la Befana!",e:"🧹",fx:["🍬","⭐","❄️","🍭","🧦"],dir:"down",bg:["#3A2C6A","#1E1B40","#0E0D22"],sky:"#F5DE8C"},
  carnevale:{n:"Buon Carnevale!",e:"🎭",fx:["🎊","🎉","🎭","🎈","🟡","🔴","🔵"],dir:"down",bg:["#7A2C8F","#2E2A7A","#151436"],sky:"#FF7AC8",confetti:1},
  pasqua:   {n:"Buona Pasqua!",e:"🐣",fx:["🥚","🐣","🌷","🐰","🌼","🥚"],dir:"down",bg:["#4F8A6A","#3B4F7A","#1F2648"],sky:"#FFE9A8"},
  valentino:{n:"San Valentino: l'amicizia!",e:"💌",fx:["💗","💌","💕","❤️","💖"],dir:"up",bg:["#8A2F5A","#3A1E4A","#1A0F28"],sky:"#FFB3CF"},
  papa:     {n:"Auguri a tutti i papà!",e:"👔",fx:["💙","⭐","👔","🎁","💙"],dir:"up",bg:["#2F5C8F","#22305A","#121A36"],sky:"#BFE3FF"},
  mamma:    {n:"Auguri a tutte le mamme!",e:"💐",fx:["🌹","💐","💗","🌷","💖"],dir:"up",bg:["#8A3F6A","#3E2A5A","#1C1430"],sky:"#FFC7DD"}
};

function pick(now){
  var t=day(now),y=t.getFullYear(),m=t.getMonth()+1,d=t.getDate(),E=easter(y);
  var D=function(mm,dd){return new Date(y,mm-1,dd)};
  // feste
  if(between(t,D(10,24),D(11,2)))return "halloween";
  if(between(t,D(12,8),D(12,30)))return "natale";
  if(m===12&&d===31||m===1&&d<=4)return "capodanno";
  if(m===1&&d<=6)return "befana";
  if(between(t,add(E,-52),add(E,-47)))return "carnevale";
  if(between(t,add(E,-7),add(E,1)))return "pasqua";
  if(m===2&&d>=12&&d<=14)return "valentino";
  if(m===3&&d>=17&&d<=19)return "papa";
  var ms=new Date(y,4,1);ms.setDate(1+((7-ms.getDay())%7)+7);// seconda domenica di maggio
  if(between(t,add(ms,-3),ms))return "mamma";
  // stagioni
  if(between(t,D(3,21),D(6,20)))return "primavera";
  if(between(t,D(6,21),D(9,20)))return "estate";
  if(between(t,D(9,21),D(12,20)))return "autunno";
  return "inverno";
}

var q=(location.search.match(/[?&]tema=([a-z]+)/)||[])[1];
var k=(q&&T[q])?q:pick(new Date()),th=T[k];
document.documentElement.classList.add("th-"+k);

var css=
"html.th-"+k+" body{background:radial-gradient(ellipse 85% 55% at 50% -10%,"+th.bg[0]+" 0%,rgba(0,0,0,0) 72%),radial-gradient(ellipse 60% 40% at 100% 100%,"+th.bg[1]+" 0%,rgba(0,0,0,0) 70%),linear-gradient("+th.bg[1]+","+th.bg[2]+") fixed!important}"+
"html.th-"+k+"{background:"+th.bg[2]+"!important}"+
".wrap{position:relative;z-index:1}"+
"#sfx{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}"+
"#sfx i{position:absolute;top:-8vh;font-style:normal;line-height:1;opacity:.85;will-change:transform;animation:sfx-fall linear infinite;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}"+
"#sfx.up i{top:auto;bottom:-8vh;animation-name:sfx-rise}"+
"#sfx i.cf{width:9px;height:14px;border-radius:2px;opacity:.9}"+
"@keyframes sfx-fall{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(28px,30vh) rotate(90deg)}50%{transform:translate(-18px,58vh) rotate(180deg)}75%{transform:translate(22px,86vh) rotate(270deg)}100%{transform:translate(0,116vh) rotate(360deg)}}"+
"@keyframes sfx-rise{0%{transform:translate(0,0) scale(.9)}50%{transform:translate(-24px,-58vh) scale(1.05)}100%{transform:translate(12px,-116vh) scale(.9)}}"+
".sgreet{display:inline-flex;align-items:center;gap:6px;margin:6px 0 0;padding:4px 12px;border-radius:99px;font:700 14px/1.2 var(--font-body,sans-serif);letter-spacing:.02em;color:#1B1430;background:"+th.sky+";box-shadow:0 0 14px "+th.sky+"88}"+
".slights{position:fixed;left:0;right:0;top:0;height:26px;pointer-events:none;z-index:0;display:flex;justify-content:space-around}"+
".slights b{width:12px;height:16px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;margin-top:8px;animation:sl-blink 1.6s ease-in-out infinite alternate}"+
".slights:before{content:'';position:absolute;left:0;right:0;top:6px;height:2px;background:#2B3A2B}"+
"@keyframes sl-blink{from{opacity:.35;filter:none}to{opacity:1;filter:drop-shadow(0 0 6px currentColor)}}"+
"@media (prefers-reduced-motion:reduce){#sfx i{animation:none!important;top:auto}#sfx i{bottom:auto}.slights b{animation:none}}";
var st=document.createElement("style");st.id="stagioni";st.textContent=css;document.head.appendChild(st);

function build(){
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fx=document.createElement("div");fx.id="sfx";fx.setAttribute("aria-hidden","true");if(th.dir==="up")fx.className="up";
  var n=Math.max(12,Math.min(26,Math.round(innerWidth/55))),h="",cols=["#FF5A5A","#FFD23F","#3BCEAC","#5A8BFF","#FF7AC8","#9B5DE5"];
  for(var i=0;i<n;i++){
    var left=(i*97+13)%100+(Math.random()*4-2),sz=18+Math.round(Math.random()*18),dur=14+Math.random()*14,del=-Math.random()*dur;
    var pos=reduce?"top:"+Math.round(Math.random()*90)+"vh;":"";
    if(th.confetti&&i%2){h+='<i class="cf" style="left:'+left+'%;background:'+cols[i%cols.length]+';animation-duration:'+(dur*.7).toFixed(1)+'s;animation-delay:'+del.toFixed(1)+'s;'+pos+'"></i>';continue}
    h+='<i style="left:'+left+'%;font-size:'+sz+'px;animation-duration:'+dur.toFixed(1)+'s;animation-delay:'+del.toFixed(1)+'s;'+pos+'">'+th.fx[i%th.fx.length]+'</i>';
  }
  fx.innerHTML=h;document.body.insertBefore(fx,document.body.firstChild);
  if(th.lights){var L=document.createElement("div");L.className="slights";L.setAttribute("aria-hidden","true");var lc=["#FF4D4D","#FFD23F","#3BCE6C","#4DA3FF"],lh="";for(var j=0;j<Math.round(innerWidth/48);j++)lh+='<b style="color:'+lc[j%4]+';background:'+lc[j%4]+';animation-delay:'+(j%4*.4)+'s"></b>';L.innerHTML=lh;document.body.insertBefore(L,fx)}
  var eb=document.querySelector(".top .brand .eyebrow");
  if(eb){var g=document.createElement("div");g.className="sgreet";g.innerHTML='<span aria-hidden="true">'+th.e+'</span>'+th.n;eb.parentNode.appendChild(g)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build);else build();
window.Stagioni={tema:k,temi:Object.keys(T),scegli:pick};
})();
