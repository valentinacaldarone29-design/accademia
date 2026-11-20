/* Motore comune delle app di Scienze dell'Accademia dei Talenti.
   Gestisce accesso con il codice, stelle, badge, indagini a classificazione, autovalutazione,
   timer e imprevisti della lezione, navigazione a schede. Ogni app passa la sua configurazione a Lab.init. */
(function(){
"use strict";
const CQ=window.Cuccioli;
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=CQ.esc;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const L={$,$$,esc,shuffle};window.Lab=L;
L.ding=()=>CQ.tone([[659,.1],[880,.2]]);
L.buzz=()=>CQ.tone([[220,.18]]);
L.fanfare=()=>CQ.tone([[523,.12],[659,.12],[784,.12],[1047,.3]]);
L.toast=m=>CQ.toast(m);
L.fb=(kind,title,lines)=>`<div class="fb ${kind} pop"><b class="t">${title}</b>${lines&&lines.length?"<ul>"+lines.map(l=>"<li>"+l+"</li>").join("")+"</ul>":""}</div>`;

let cfg,S,PID=null,KEY,chipCtl=null,dbT=null;
const fresh=()=>({stars:0,badges:{},best:{},rounds:{},err:{},exp:{},vis:{},extra:{},valuta:{a:{},like:"",done:false}});
function load(o){
  const s=fresh();
  if(o&&typeof o==="object"){
    Object.keys(s).forEach(k=>{if(o[k]==null)return;s[k]=(typeof s[k]==="object")?Object.assign(s[k],o[k]):o[k]});
    if(o.ts)s.ts=o.ts;
  }
  return s;
}
function readLocal(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}}
L.state=()=>S;
L.save=function(){
  if(PID)S.ts=Date.now();
  try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
  if(PID&&CQ.db){clearTimeout(dbT);const pid=PID,d=JSON.parse(JSON.stringify(S));dbT=setTimeout(()=>{CQ.db.doc(cfg.col+"/"+pid).set(d).catch(()=>{})},1200)}
};
L.add=function(n){
  if(n<=0)return;
  S.stars+=n;L.save();renderBoard();
  if(PID&&CQ.pupils[PID])CQ.award(PID,cfg.subj,n,cfg.src);
  checkBadges();
};
function checkBadges(){
  cfg.badges.forEach(b=>{
    if(S.badges[b.id]||!b.ok(S))return;
    S.badges[b.id]=true;S.stars+=2;L.save();
    if(PID&&CQ.pupils[PID])CQ.award(PID,cfg.subj,2,cfg.src);
    L.toast("Nuovo badge: "+b.n+". Due stelle in più!");CQ.tone([[523,.12],[659,.12],[784,.22]]);
  });
  renderBoard();
}
L.checkBadges=checkBadges;
function renderBoard(){
  $("#stars").textContent=S.stars;
  $("#badges").innerHTML=cfg.badges.map(b=>`<li class="badge${S.badges[b.id]?" got":""}"><b>${esc(b.n)}</b><small>${S.badges[b.id]?"Conquistato!":esc(b.d)}</small></li>`).join("");
}

/* ---------- indagini: classificare carte in gruppi ---------- */
const sf=(sc,n)=>sc>=n?3:sc>=n-2?2:sc>=Math.ceil(n/2)?1:0;
let R=null;
L.sortChooser=function(host,keys){
  R=null;
  host.innerHTML=`<div class="sets">${keys.map(k=>{const st=cfg.sets[k],n=Math.min(st.n||8,st.items.length),b=S.best[k];
    return `<button class="set" type="button" data-set="${k}" style="--sc:${st.c}"><span class="emo">${st.emo}</span><b>${esc(st.t)}</b><span>${esc(st.d)}</span><small>${b!=null?"Record: "+b+" su "+n+" · "+"★".repeat(sf(b,n))+"☆".repeat(3-sf(b,n)):"Non ancora giocata"}</small></button>`}).join("")}</div>`;
  $$("[data-set]",host).forEach(b=>b.addEventListener("click",()=>startRound(host,keys,b.dataset.set)));
};
function startRound(host,keys,k){
  const st=cfg.sets[k],n=Math.min(st.n||8,st.items.length);
  R={host,keys,k,items:shuffle(st.items).slice(0,n),i:0,res:[],ans:false};
  drawRound();
  host.scrollIntoView({behavior:"smooth",block:"start"});
}
function drawRound(){
  const st=cfg.sets[R.k],it=R.items[R.i],host=R.host;
  const dots=R.items.map((x,j)=>`<i class="${R.res[j]===true?"ok":R.res[j]===false?"ko":j===R.i?"now":""}"></i>`).join("");
  const breakMove=st.move&&R.i===Math.floor(R.items.length/2)&&!R.ans?`<div class="move"><b>Pausa in movimento</b><span>${esc(st.move)}</span></div>`:"";
  host.innerHTML=`<div class="qhead"><h3>${esc(st.t)}</h3><button class="link" type="button" data-q="exit">← Tutte le indagini</button></div>
    <p class="lead">${esc(st.ask)}</p>
    <div class="dots" aria-label="Carta ${R.i+1} di ${R.items.length}">${dots}</div>${breakMove}
    <div class="scard pop"><span class="emo" aria-hidden="true">${it.i}</span><b>${esc(it.t)}</b></div>
    <div class="bins">${st.bins.map(b=>`<button class="bin" type="button" data-bin="${b.k}" style="--bc:${b.c||"var(--accent)"}"${R.ans?" disabled":""}>${b.i?`<span class="bi" aria-hidden="true">${b.i}</span>`:""}<b>${esc(b.t)}</b>${b.d?`<small>${esc(b.d)}</small>`:""}</button>`).join("")}</div>
    <div id="sfb"></div>`;
  $("[data-q=exit]",host).addEventListener("click",()=>L.sortChooser(host,R.keys));
  $$("[data-bin]",host).forEach(b=>b.addEventListener("click",()=>answer(b.dataset.bin)));
}
function answer(k){
  if(R.ans)return;R.ans=true;
  const st=cfg.sets[R.k],it=R.items[R.i],ok=k===it.a,right=st.bins.find(b=>b.k===it.a);
  R.res[R.i]=ok;
  $$("[data-bin]",R.host).forEach(b=>{b.disabled=true;if(b.dataset.bin===it.a)b.classList.add("right");else if(b.dataset.bin===k)b.classList.add("wrong")});
  $(".dots",R.host).innerHTML=R.items.map((x,j)=>`<i class="${R.res[j]===true?"ok":R.res[j]===false?"ko":""}"></i>`).join("");
  if(ok)L.ding();else{L.buzz();S.err[it.t]=(S.err[it.t]||0)+1;L.save()}
  const last=R.i===R.items.length-1;
  $("#sfb",R.host).innerHTML=L.fb(ok?"good":"bad",ok?"Esatto!":"Non proprio: "+esc(right.t),[esc(it.w)])+
    `<div class="row" style="margin-top:10px"><button class="btn" type="button" data-q="next">${last?"Vedi il risultato":"Avanti →"}</button></div>`;
  const nb=$("[data-q=next]",R.host);nb.addEventListener("click",()=>{if(last)endRound();else{R.i++;R.ans=false;drawRound()}});
  nb.focus({preventScroll:true});
  $("#sfb",R.host).scrollIntoView({behavior:"smooth",block:"nearest"});
}
function endRound(){
  const st=cfg.sets[R.k],n=R.items.length,sc=R.res.filter(Boolean).length,prev=S.best[R.k];
  const gain=Math.max(0,sf(sc,n)-(prev!=null?sf(prev,n):0));
  S.rounds[R.k]=(S.rounds[R.k]||0)+1;if(prev==null||sc>prev)S.best[R.k]=sc;L.save();
  const wrong=R.items.filter((x,j)=>!R.res[j]);
  R.host.innerHTML=`<div class="qhead"><h3>${esc(st.t)}</h3></div>
    ${L.fb(sc>=n-1?"good":"info",`${sc} risposte giuste su ${n}  ${"★".repeat(sf(sc,n))}${"☆".repeat(3-sf(sc,n))}`,[
      gain?`Hai guadagnato ${gain} ${gain===1?"stella":"stelle"}!`:(prev!=null&&sc<=prev?`Il tuo record è ${S.best[R.k]} su ${n}: prova a superarlo per altre stelle.`:"Riprova per conquistare le stelle."),
      wrong.length?"Da ripassare: "+wrong.map(x=>esc(x.t)).join(", ")+".":"Nessun errore: sei un vero scienziato!"])}
    ${st.move?`<div class="move"><b>Sfida in movimento</b><span>${esc(st.move)}</span></div>`:""}
    <div class="row"><button class="btn" type="button" data-q="again">Gioca ancora</button><button class="btn ghost" type="button" data-q="exit">Scegli un'altra indagine</button></div>`;
  $("[data-q=again]",R.host).addEventListener("click",()=>startRound(R.host,R.keys,R.k));
  $("[data-q=exit]",R.host).addEventListener("click",()=>L.sortChooser(R.host,R.keys));
  if(sc>=n-1)L.fanfare();
  if(gain)L.add(gain);else checkBadges();
}

/* ---------- domanda a scelta multipla (esperimenti) ---------- */
L.mcq=function(host,q,onDone){
  let tries=0;
  const opts=shuffle(q.o.map((t,i)=>({t,i})));
  host.innerHTML=`<p><b>${esc(q.q)}</b></p><div class="opts">${opts.map(o=>`<button class="opt" type="button" data-o="${o.i}">${esc(o.t)}</button>`).join("")}</div><div class="mfb"></div>`;
  $$("[data-o]",host).forEach(b=>b.addEventListener("click",()=>{
    const i=+b.dataset.o;
    if(i===0){
      $$("[data-o]",host).forEach(x=>x.disabled=true);b.classList.add("right");L.ding();
      $(".mfb",host).innerHTML=L.fb("good","Giusto!",[esc(q.w)]);onDone(tries===0);
    }else{
      tries++;b.classList.add("wrong");b.disabled=true;L.buzz();
      $(".mfb",host).innerHTML=L.fb("bad","Non è così. Guarda di nuovo l'esperimento e riprova.",[]);
    }
  }));
};

/* ---------- autovalutazione ---------- */
const LVV=[[1,"Ci provo ancora"],[2,"Ci sono quasi"],[3,"Ci sono!"]];
const stairs=v=>{let h='<svg viewBox="0 0 34 26" aria-hidden="true">';for(let i=1;i<=3;i++){const ht=6+i*6;h+=`<rect x="${(i-1)*12}" y="${26-ht}" width="10" height="${ht}" rx="2" fill="currentColor" opacity="${i<=v?1:.22}"/>`}return h+"</svg>"};
function buildV(){
  $("#vitems").innerHTML=cfg.vq.map((t,n)=>{const q="q"+(n+1);return `<fieldset class="item"><legend>${esc(t)}</legend><div class="lv">${LVV.map(l=>{const id=q+"-"+l[0];return `<input type="radio" name="${q}" id="${id}" value="${l[0]}"${S.valuta.a[q]===l[0]?" checked":""}><label for="${id}">${stairs(l[0])}<span>${l[1]}</span></label>`}).join("")}</div></fieldset>`}).join("");
  $("#vlikes").innerHTML=cfg.likes.map((t,i)=>`<input type="radio" name="like" id="like${i}" value="${esc(t)}"${S.valuta.like===t?" checked":""}><label for="like${i}">${esc(t)}</label>`).join("");
  $("#v-done").disabled=!allV();
  if(S.valuta.done)vSum();else $("#v-sum").hidden=true;
}
const allV=()=>cfg.vq.every((t,n)=>S.valuta.a["q"+(n+1)]);
function vSum(){
  const a=S.valuta.a,top=cfg.vq.filter((t,n)=>a["q"+(n+1)]===3).length,low=cfg.vq.filter((t,n)=>a["q"+(n+1)]===1).map(t=>t.replace(/\.$/,""));
  const box=$("#v-sum");
  box.innerHTML=`<b>${top} frasi su ${cfg.vq.length} con «Ci sono!»</b>${low.length?`<span>Da riprendere: ${esc(low.join("; "))}.</span>`:"<span>Nessuna frase da riprendere. Bravissimo!</span>"}${S.valuta.like?`<span>Mi è piaciuto di più: ${esc(S.valuta.like.toLowerCase())}.</span>`:""}`;
  box.hidden=false;
}

/* ---------- lezione: timer e imprevisti ---------- */
let timer=null;
const fmt=s=>("0"+Math.floor(s/60)).slice(-2)+":"+("0"+s%60).slice(-2);
function stopTimer(){if(!timer)return;clearInterval(timer.id);timer.btn.querySelector("span").textContent=timer.btn.dataset.timer+" min";timer=null}

/* ---------- navigazione ---------- */
function route(){
  let h=location.hash.slice(1);const home=CQ.teacher()?"lezione":cfg.home;
  if(cfg.tabs.indexOf(h)<0||(h==="lezione"&&!CQ.teacher()))h=home;
  cfg.tabs.forEach(t=>{$("#sec-"+t).hidden=t!==h});
  $$(".tabs a").forEach(a=>{const on=a.getAttribute("href")==="#"+h;a.classList.toggle("on",on);if(on){a.setAttribute("aria-current","page");try{a.scrollIntoView({block:"nearest",inline:"center"})}catch(e){}}else a.removeAttribute("aria-current")});
  if(cfg.onRoute)cfg.onRoute(h);
}
function applyTeacher(){$$("[data-teacher]").forEach(el=>{el.hidden=!CQ.teacher()});route()}

/* ---------- accesso con il codice ---------- */
async function enter(r){
  if(r&&r.id){
    PID=r.id;KEY=cfg.key+":"+PID;
    const local=readLocal();S=load(local);
    if(!local&&CQ.db){try{const snap=await CQ.db.doc(cfg.col+"/"+PID).get();if(snap.exists)S=load(snap.data())}catch(e){}}
    if(!chipCtl)chipCtl=CQ.chip($("#cq-chip"),PID,cfg.subj,{onLogout:leave});else chipCtl.setId(PID);
    $("#cq-chip").hidden=false;$("#who-name").textContent=CQ.pupils[PID].n;
  }else{PID=null;KEY=cfg.key;S=fresh();$("#cq-chip").hidden=true;$("#who-name").textContent="modalità maestra (senza stelle)"}
  $("nav").hidden=false;$("main").hidden=false;$("#who").hidden=false;
  renderBoard();buildV();if(cfg.onEnter)cfg.onEnter();applyTeacher();
  if(!location.hash)location.hash=CQ.teacher()?"#lezione":"#"+cfg.home;
  window.scrollTo(0,0);
}
function openGate(){PID=null;CQ.gate({title:cfg.title,subj:cfg.subj}).then(enter)}
function leave(){stopTimer();if(cfg.onLeave)cfg.onLeave();$("nav").hidden=true;$("main").hidden=true;$("#who").hidden=true;$("#cq-chip").hidden=true;window.scrollTo(0,0);openGate()}

L.init=function(c){
  cfg=c;KEY=cfg.key;S=fresh();
  $("#vform").addEventListener("change",ev=>{const t=ev.target;if(t.type!=="radio")return;if(t.name==="like")S.valuta.like=t.value;else S.valuta.a[t.name]=+t.value;S.valuta.done=false;$("#v-sum").hidden=true;L.save();$("#v-done").disabled=!allV()});
  $("#v-done").addEventListener("click",()=>{const first=!S.valuta.done;S.valuta.done=true;L.save();vSum();if(first){L.add(2);L.toast("Scheda completata. Due stelle!")}else checkBadges()});
  $$("[data-timer]").forEach(b=>b.addEventListener("click",()=>{if(timer&&timer.btn===b){stopTimer();return}stopTimer();let left=+b.dataset.timer*60;const sp=b.querySelector("span");sp.textContent=fmt(left);timer={btn:b,id:setInterval(()=>{left--;if(left<=0){stopTimer();L.toast("Tempo scaduto. Si passa al prossimo micro-step.");CQ.tone([[660,.15],[660,.15],[880,.3]]);return}sp.textContent=fmt(left)},1000)}}));
  let lastImp=-1;
  const dr=$("#draw");if(dr)dr.addEventListener("click",()=>{let i;do{i=Math.floor(Math.random()*cfg.imprevisti.length)}while(i===lastImp&&cfg.imprevisti.length>1);lastImp=i;$("#imp").innerHTML=`<b>${esc(cfg.imprevisti[i][0])}</b><span>${esc(cfg.imprevisti[i][1])}</span>`});
  window.addEventListener("hashchange",()=>{route();const hh=$("header").offsetHeight;if(window.scrollY>hh)window.scrollTo(0,hh)});
  $("#switch").addEventListener("click",()=>{CQ.logout();CQ.setTeacher(false,true);leave()});
  renderBoard();
  openGate();
};
})();
