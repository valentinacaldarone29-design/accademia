/* Accademia dei Talenti: modulo condiviso dal portale e dalle app di classe.
   Codici d'accesso, punti per materia, evoluzione automatica, costumi e poteri magici. */
(function(){
"use strict";
var C={};window.Cuccioli=C;

/* ---------- dati fissi ---------- */
C.CHARS=[{k:"c01",w:166,h:460,hx:0.58},{k:"c02",w:192,h:460,hx:0.518},{k:"c03",w:168,h:460,hx:0.517},{k:"c04",w:172,h:460,hx:0.563},{k:"c05",w:148,h:460,hx:0.498},{k:"c06",w:176,h:460,hx:0.5},{k:"c07",w:148,h:460,hx:0.46},{k:"c08",w:164,h:460,hx:0.491},{k:"c09",w:142,h:460,hx:0.535},{k:"c10",w:136,h:460,hx:0.415},{k:"c11",w:160,h:460,hx:0.437},{k:"c12",w:138,h:460,hx:0.482},{k:"c13",w:178,h:460,hx:0.542},{k:"c14",w:156,h:460,hx:0.569},{k:"c15",w:163,h:460,hx:0.494}];
C.CH={};C.CHARS.forEach(function(c){C.CH[c.k]=c});
C.COLORS=[{k:"teal",h:"#4B97AB"},{k:"pink",h:"#D2325F"},{k:"orange",h:"#DD9433"},{k:"green",h:"#6FB67F"},{k:"purple",h:"#8C6FC7"},{k:"yellow",h:"#E6B929"}];
C.STAGES=["Sagoma","Apprendista","Esploratore","Campione","Leggenda"];
C.BASE=[0,10,30,60,100];
C.UNLOCK=5;   /* medaglia e oggetto magico del costume */
C.TIER3=15;   /* mantello del costume */
C.SUBJ=[
  {k:"geo",n:"Geografia",a:"Bussola",c:"#4B97AB",el:"del Vento",cos:"Esploratore",item:"la bussola magica"},
  {k:"mat",n:"Matematica",a:"Spilla del più",c:"#DD9433",el:"dei Numeri",cos:"Mago dei numeri",item:"la bacchetta dei numeri"},
  {k:"sci",n:"Scienze",a:"Occhiali da scienziato",c:"#4E9A60",el:"dei Cristalli",cos:"Scienziato",item:"l'ampolla magica"},
  {k:"mot",n:"Scienze motorie",a:"Saetta sportiva",c:"#D2325F",el:"del Fulmine",cos:"Atleta",item:"la medaglia del campione"},
  {k:"art",n:"Arte",a:"Tavolozza",c:"#8C6FC7",el:"dell'Arcobaleno",cos:"Pittore",item:"la tavolozza incantata"},
  {k:"mus",n:"Musica",a:"Nota musicale",c:"#3F7FBF",el:"della Melodia",cos:"Musicista",item:"la nota magica"},
  {k:"tec",n:"Tecnologia",a:"Microchip",c:"#5B6B7A",el:"degli Ingranaggi",cos:"Inventore",item:"l'ingranaggio d'oro"},
  {k:"ita",n:"Italiano",a:"Penna d'oca",c:"#B5523B",el:"delle Parole",cos:"Poeta",item:"la penna d'oca magica"},
  {k:"sto",n:"Storia",a:"Clessidra",c:"#8A6A33",el:"del Tempo",cos:"Viaggiatore del tempo",item:"la clessidra del tempo"},
  {k:"civ",n:"Educazione civica",a:"Distintivo del cittadino",c:"#1F8A8A",el:"della Comunità",cos:"Custode delle regole",item:"il distintivo del buon cittadino"},
  {k:"imp",n:"Atteggiamenti",a:"",c:"#C9A21B",el:"dell'Amicizia",cos:"Amico del cuore",item:"il cuore luminoso"}
];
C.POW=[null,
  {n:"Scintilla",d:"Piccole scintille magiche ti girano intorno.",perk:"Indizio magico: durante una sfida puoi chiedere un aiuto."},
  {n:"Aura",d:"Una luce colorata ti avvolge tutto.",perk:"Seconda possibilità: puoi ritentare una risposta sbagliata."},
  {n:"Ali",d:"Ti spuntano due ali magiche.",perk:"Capitano: puoi guidare la tua squadra in un gioco."},
  {n:"Stella",d:"Simboli magici ti volano intorno e brilli come una stella.",perk:"Maestro di magia: aiuti un compagno e insieme guadagnate 1 punto."}
];
C.GAMES=[
  {k:"mille",by:"t1",t:"Missione Mille",s:"mat",href:"mille.html",d:"Costruisci il numero 1000 e conquista stelle."},
  {k:"mondo",by:"t1",t:"Io nel mondo",s:"geo",href:"mondo.html",d:"Dai cerchi di casa tua fino al pianeta Terra."},
  {k:"calcolo",by:"t1",t:"Officina dei Calcoli",s:"mat",href:"calcolo.html",d:"Strategie, operazioni in colonna, proprietà e caccia all'errore."},
  {k:"tabelline",by:"t1",t:"L'Arcipelago delle Tabelline",s:"mat",href:"tabelline.html",d:"Nove isole, nove tabelline: conquistale tutte e trova il tesoro."},
  {k:"materia",by:"t1",t:"I Detective della Materia",s:"sci",href:"materia.html",d:"Che cosa occupa spazio e ha un peso? Indagini, esperimenti e materiali."},
  {k:"metodo",by:"t1",t:"Scienziati in 6 mosse",s:"sci",href:"metodo.html",d:"Il metodo scientifico: fenomeno, domande, ipotesi, esperimento, analisi e conclusione."},
  {k:"labirinto",by:"t1",t:"Nel labirinto dei quadri",s:"art",href:"labirinto.html",d:"Il libro di Bordiglioni: entra nei 7 quadri, trova le porte magiche e dipingi il tuo quadro."},
  {k:"suoni",by:"t1",t:"Suoni e Silenzi",s:"mus",href:"ritmo.html",d:"Il libro di Maestro Libero: leggi PA, SH, PO-O, TITTI e TEKETEKE, suona a tempo con il corpo e componi i tuoi ritmi."},
  {k:"verifica",by:"t1",t:"Verifica: le migliaia",s:"mat",href:"verifica.html",d:"La verifica sui numeri fino a 9999: leggere, scrivere, comporre, scomporre, confrontare e ordinare. Correzione automatica."},
  {k:"cervello",by:"t1",t:"La Palestra del Cervello",s:"mat",href:"cervello.html",d:"Hai finito prima? Sei sfide di numeri e logica a tre livelli: sequenze, piramidi, bilance magiche, indovinelli, Sudoku e bersagli."},
  {k:"geometria",by:"t1",t:"Il Regno della Geometria",s:"mat",href:"geometria.html",d:"Linee, rette, angoli, poligoni, perimetro e area con i quadretti, simmetria e solidi. La maestra sceglie gli argomenti."},
  {k:"problemi",by:"t1",t:"Gli Investigatori dei Problemi",s:"mat",href:"problemi.html",d:"Leggi il caso, trova dati e domanda, scegli l'operazione e risolvi. Con la domanda nascosta e i problemi da inventare."},
  {k:"stati",by:"t1",t:"La Danza delle Particelle",s:"sci",href:"stati.html",d:"Solido, liquido, gassoso: scalda, raffredda e scopri le trasformazioni."}
];
C.BUILD="1127o";C.GAMES.forEach(function(g){if(!g.ext&&/\.html$/.test(g.href))g.href+="?v="+C.BUILD});
var WORDS=["LUPO","ORSO","GATTO","VOLPE","TIGRE","PANDA","KOALA","DRAGO","FALCO","LEONE","ZEBRA","RICCIO","CERVO","FOCA","GUFO","TASSO","PUMA","LINCE","MERLO","PONY","DELFINO","AQUILA","CIGNO","LONTRA"];

/* ---------- utilità ---------- */
C.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})};
C.clone=function(o){return JSON.parse(JSON.stringify(o))};
C.subjOf=function(k){for(var i=0;i<C.SUBJ.length;i++)if(C.SUBJ[i].k===k)return C.SUBJ[i];return null};
C.colorHex=function(k){for(var i=0;i<C.COLORS.length;i++)if(C.COLORS[i].k===k)return C.COLORS[i].h;return C.COLORS[0].h};
C.RITMI=[["veloce",10,"Veloce"],["normale",25,"Normale"],["lento",50,"Lento"],["moltolento",75,"Molto lento"],["anno",99.99,"Tutto l'anno"]];
C.ritmoKey=function(st){st=st||C.settings||{};if(C.RITMI.some(function(r){return r[0]===st.ritmo}))return st.ritmo;var v=+st.pace;return v===0.5?"veloce":v===1?"normale":v===2?"lento":v===4?"moltolento":"anno"};
C.paceOf=function(st){var k=C.ritmoKey(st);return C.RITMI.filter(function(r){return r[0]===k})[0][1]};C.pace=99.99;
C.thr=function(){return C.BASE.map(function(v){return Math.round(v*C.pace)})};
/* evoluzione maghetto: 7 livelli = grigio, bianco e nero, poi le 5 figure */
C.evoThr=function(){var L=C.thr()[4];return [0,.05,.12,.22,.38,.62,1].map(function(f){return Math.round(L*f)})};
C.evoLv=function(xp){var t=C.evoThr(),s=0;for(var i=0;i<t.length;i++){if(xp>=t[i])s=i}return s};
/* trasformazione magica quando un bambino passa a un livello nuovo */
C.evoSrc=function(sp,lv){var EV=C.EVO[sp];return (C.base||"")+"img/"+sp+"-e"+Math.max(1,lv-1)+".webp?v="+(EV?EV.v:"1")};
C.evoFilter=function(lv){return lv===0?"brightness(0) opacity(.3)":lv===1?"grayscale(1)":"none"};
C.evoPlay=function(el,from){
  if(!el||el.querySelector(".cq-magic"))return;
  var lv=+el.getAttribute("data-lv"),sp=el.getAttribute("data-evo"),fig=el.querySelector(".cq-fig");if(!fig)return;
  var old=fig.cloneNode();old.className="cq-fig cq-old";old.src=C.evoSrc(sp,from);old.style.filter=C.evoFilter(from);
  var m=document.createElement("div");m.className="cq-magic";
  var st="";for(var i=0;i<14;i++){var an=i*360/14,dl=(i%4)*.07;st+='<i style="--a:'+an+'deg;--d:'+dl+'s"></i>'}
  m.innerHTML='<b class="cq-flash"></b><b class="cq-ringm"></b><b class="cq-ringm r2"></b>'+st;
  fig.parentNode.insertBefore(old,fig);el.appendChild(m);el.classList.add("cq-evolving");
  setTimeout(function(){old.remove();m.remove();el.classList.remove("cq-evolving")},2600);
};
C.evoScan=function(root){
  var force=/[?&]evoprova/.test(location.search),me=C.who&&C.who();
  [].forEach.call((root||document).querySelectorAll(".cq-evo[data-live]"),function(el){
    if(el.getAttribute("data-seen"))return;el.setAttribute("data-seen","1");
    var lv=+el.getAttribute("data-lv"),pid=el.getAttribute("data-pid");
    if(force){if(lv>0)setTimeout(function(){C.evoPlay(el,lv-1)},400);return}
    if(!pid||pid!==me)return;
    var k="cq-evo-visto-"+pid,seen=null;try{seen=localStorage.getItem(k)}catch(e){}
    try{localStorage.setItem(k,String(lv))}catch(e){}
    if(seen!==null&&lv>+seen)setTimeout(function(){C.evoPlay(el,+seen)},500);
  });
};
if(typeof MutationObserver!=="undefined"&&typeof document!=="undefined"){
  var evoT=null;new MutationObserver(function(){clearTimeout(evoT);evoT=setTimeout(function(){C.evoScan()},60)}).observe(document.documentElement,{childList:true,subtree:true});
}
C.LVN=["Ombra","In bianco e nero","Bambino","Primi dettagli magici","Apprendista mago","Maghetto","Maghetto completo"];
C.lvInfo=function(p){var xp=(p&&p.xp)||0;
  if(p&&C.EVO[p.sp]){var t=C.evoThr(),l=C.evoLv(xp),mx=l>=t.length-1;return {lv:l,name:C.LVN[l],next:mx?null:C.LVN[l+1],at:mx?null:t[l+1],need:mx?0:t[l+1]-xp,pc:mx?100:Math.round(100*(xp-t[l])/(t[l+1]-t[l])),max:mx,names:C.LVN,thr:t,evo:true}}
  var t2=C.thr(),s=C.stageOf(xp),m2=s>=4;return {lv:s,name:C.STAGES[s],next:m2?null:C.STAGES[s+1],at:m2?null:t2[s+1],need:m2?0:t2[s+1]-xp,pc:m2?100:Math.round(100*(xp-t2[s])/(t2[s+1]-t2[s])),max:m2,names:C.STAGES,thr:t2,evo:false}};
C.stageOf=function(xp){var t=C.thr(),s=0;for(var i=0;i<t.length;i++){if(xp>=t[i])s=i}return s};
C.accOf=function(p){return C.SUBJ.filter(function(s){return s.a&&((p.sj||{})[s.k]||0)>=C.UNLOCK}).map(function(s){return s.k})};
C.dominant=function(p){var best=null,bv=0,sj=p.sj||{};C.SUBJ.forEach(function(s){if((sj[s.k]||0)>bv){bv=sj[s.k];best=s.k}});return best};
C.tierOf=function(p,subj){var v=(p.sj||{})[subj]||0;return v>=C.TIER3?3:(v>=C.UNLOCK?2:1)};
C.powerEl=function(p,stage){var e=p.pw&&p.pw[stage];return C.subjOf(e)?e:(C.dominant(p)||"imp")};
C.powers=function(p,stage){
  var st=stage==null?C.stageOf(p.xp||0):stage,out=[];
  for(var s=1;s<=st;s++){var e=C.subjOf(C.powerEl(p,s));out.push({stage:s,name:C.POW[s].n+" "+e.el,d:C.POW[s].d,perk:C.POW[s].perk,c:e.c,el:e.k})}
  return out;
};
C.normCode=function(s){return String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"")};
C.fmtCode=function(c){var m=String(c||"").match(/^([A-Z]+)(\d+)$/);return m?m[1]+"-"+m[2]:String(c||"")};
/* i codici sono fissi: una volta creati non cambiano più. Se un alunno viene tolto e rimesso
   sulla stessa caricatura, ritrova il suo vecchio codice. */
C.keepCode=function(sp,code){var k=C.clone(C.settings.keep||{});k[sp]=code;C.saveSettings({keep:k})};
C.newCode=function(sp){
  var used={};Object.keys(C.pupils).forEach(function(i){if(C.pupils[i].code)used[C.pupils[i].code]=1});
  var old=sp&&(C.settings.keep||{})[sp];if(old&&!used[old])return old;
  var kp=C.settings.keep||{};Object.keys(kp).forEach(function(k){if(k!==sp)used[kp[k]]=1});
  for(var t=0;t<500;t++){var c=WORDS[Math.floor(Math.random()*WORDS.length)]+(10+Math.floor(Math.random()*90));if(!used[c])return c}
  return "CUCCIOLO"+Date.now().toString().slice(-4);
};
C.findByCode=function(raw){
  var c=C.normCode(raw);if(!c)return null;
  var ids=Object.keys(C.pupils);
  for(var i=0;i<ids.length;i++)if(C.pupils[ids[i]].code===c)return ids[i];
  return null;
};
C.sortedIds=function(){return Object.keys(C.pupils).sort(function(a,b){return String(C.pupils[a].n).localeCompare(String(C.pupils[b].n),"it")})};

/* ---------- disegni: icone, cappelli, oggetti, mantello, ali ---------- */
var IC={
  geo:'<circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 6l3 6-3 6-3-6z" fill="#fff"/>',
  mat:'<path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>',
  sci:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M7.5 15h9" stroke="#fff" stroke-width="2"/>',
  mot:'<path d="M13 3L6 13h5l-1 8 8-11h-5z" fill="#fff"/>',
  art:'<path d="M12 4a8 8 0 100 16c1.5 0 2-1 1.4-2-.6-1 0-2.2 1.3-2.2H17a3 3 0 003-3 8 8 0 00-8-8.8z" fill="#fff"/>',
  mus:'<path d="M9 18V6l10-2v12" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="7" cy="18" r="2.6" fill="#fff"/><circle cx="17" cy="16" r="2.6" fill="#fff"/>',
  tec:'<rect x="7" y="7" width="10" height="10" rx="2" fill="#fff"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" stroke="#fff" stroke-width="2"/>',
  imp:'<path d="M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z" fill="#fff"/>',
  ita:'<path d="M19 3C11 5 7 11 6 19l2 1c1-3 3-5 6-6-2 0-3-.5-4-1 3 0 5-1 6-3-1 0-2 0-3-.5C16 8 18 6 19 3z" fill="#fff"/>',
  civ:'<circle cx="8" cy="8" r="3" fill="#fff"/><circle cx="16" cy="8" r="3" fill="#fff"/><path d="M2.5 19c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6zM10.5 19c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6z" fill="#fff"/>',
  sto:'<path d="M7 3h10M7 21h10M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
};
C.icon=function(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(IC[k]||IC.imp)+'</svg>'};
var K='stroke="#1F3A56" stroke-width="2" stroke-linejoin="round"';
/* w: larghezza rispetto alla testa; dy: dove poggia il bordo inferiore (frazione dell'altezza del corpo) */
var HATS={
  geo:{w:1.45,dy:.075,svg:'<g '+K+'><ellipse cx="24" cy="34" rx="22" ry="5" fill="#C9A66B"/><path d="M11 34Q11 12 24 12Q37 12 37 34Z" fill="#E0C48A"/><path d="M11.4 28h25.2v5H11.4z" fill="#4B97AB"/></g>'},
  mat:{w:1.3,dy:.07,svg:'<g '+K+'><path d="M8 36L25 3L40 36Z" fill="#DD9433"/><ellipse cx="24" cy="36" rx="21" ry="3.5" fill="#B87420"/><circle cx="25" cy="4" r="3.2" fill="#F2C230"/></g><text x="24" y="28" font-family="sans-serif" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">+×</text>'},
  sci:{w:1.25,dy:.125,svg:'<g '+K+'><rect x="2" y="21" width="44" height="7" rx="3.5" fill="#4E9A60"/><circle cx="15" cy="25" r="8.5" fill="#BFE8F5"/><circle cx="33" cy="25" r="8.5" fill="#BFE8F5"/></g><path d="M11 22l4-2.5M29 22l4-2.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'},
  mot:{w:1.15,dy:.105,svg:'<g '+K+'><path d="M3 30Q24 20 45 30V37Q24 27 3 37Z" fill="#D2325F"/><path d="M27 20l-6 9h4.5l-2 7 7-10h-4.5l2-6z" fill="#F2C230"/></g>'},
  art:{w:1.4,dy:.08,svg:'<g '+K+'><path d="M3 31Q5 15 25 14Q45 15 45 28Q31 37 3 31Z" fill="#8C6FC7"/><path d="M25 14q1-6 5-8" fill="none" stroke-width="3" stroke-linecap="round"/></g><circle cx="15" cy="25" r="2.4" fill="#F2C230"/><circle cx="23" cy="22" r="2.4" fill="#D2325F"/><circle cx="31" cy="24" r="2.4" fill="#4B97AB"/>'},
  mus:{w:1.35,dy:.16,svg:'<g '+K+'><path d="M8 32V23Q8 6 24 6Q40 6 40 23V32" fill="none" stroke-width="4"/><rect x="2" y="23" width="11" height="15" rx="4.5" fill="#3F7FBF"/><rect x="35" y="23" width="11" height="15" rx="4.5" fill="#3F7FBF"/></g>'},
  tec:{w:1.3,dy:.075,svg:'<g '+K+'><path d="M24 17V6" stroke-width="3"/><circle cx="24" cy="5" r="3.8" fill="#D2325F"/><path d="M9 37Q9 17 24 17Q39 17 39 37Z" fill="#B7C3CC"/><rect x="14" y="27" width="20" height="6" rx="2.5" fill="#5B6B7A"/></g><circle cx="19" cy="30" r="1.6" fill="#7CF0C8"/><circle cx="29" cy="30" r="1.6" fill="#7CF0C8"/>'},
  ita:{w:1.35,dy:.085,svg:'<g '+K+'><path d="M5 31Q4 18 24 16Q44 18 43 31Q24 36 5 31Z" fill="#B5523B"/><circle cx="24" cy="15" r="2.6" fill="#B5523B"/><path d="M33 26Q40 8 46 2Q43 14 36 27Z" fill="#FFF6DD"/></g><path d="M36 25L44 6" stroke="#8A6A33" stroke-width="1.2"/>'},
  civ:{w:1.3,dy:.075,svg:'<g '+K+'><path d="M6 33Q6 15 24 14Q42 15 42 33Z" fill="#1F8A8A"/><path d="M2 33h44v4H2z" fill="#166B6B"/></g><path d="M24 18l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="#F5DE8C" stroke="#8A6A33" stroke-width="1.2"/>'},
  sto:{w:1.35,dy:.06,svg:'<path d="M5 33Q24 22 43 33" fill="none" stroke="#3E7A3E" stroke-width="3" stroke-linecap="round"/><g fill="#6BA34B" stroke="#1F3A56" stroke-width="1.4"><ellipse cx="8" cy="30" rx="4" ry="2.2" transform="rotate(-40 8 30)"/><ellipse cx="14" cy="26.5" rx="4" ry="2.2" transform="rotate(-30 14 26.5)"/><ellipse cx="20" cy="24.5" rx="4" ry="2.2" transform="rotate(-15 20 24.5)"/><ellipse cx="28" cy="24.5" rx="4" ry="2.2" transform="rotate(15 28 24.5)"/><ellipse cx="34" cy="26.5" rx="4" ry="2.2" transform="rotate(30 34 26.5)"/><ellipse cx="40" cy="30" rx="4" ry="2.2" transform="rotate(40 40 30)"/></g><circle cx="24" cy="25" r="3" fill="#E9C24E" stroke="#1F3A56" stroke-width="1.4"/>'},
  imp:{w:1.3,dy:.07,svg:'<path d="M4 33Q24 25 44 33" fill="none" stroke="#4E9A60" stroke-width="3.5" stroke-linecap="round"/><g '+K+'><circle cx="8" cy="31" r="5" fill="#F48FB1"/><circle cx="17" cy="28" r="5" fill="#F2C230"/><circle cx="24" cy="27" r="5.5" fill="#D2325F"/><circle cx="31" cy="28" r="5" fill="#F2C230"/><circle cx="40" cy="31" r="5" fill="#F48FB1"/></g>'}
};
function star4(c){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="'+c+'" stroke="#fff" stroke-width="1.2"/></svg>'}
function capeSvg(c){return '<svg viewBox="0 0 60 80" preserveAspectRatio="none" aria-hidden="true"><path d="M17 2Q30 7 43 2L58 76Q30 82 2 76Z" fill="'+c+'" stroke="#1F3A56" stroke-width="2" stroke-linejoin="round"/><g fill="#fff" opacity=".45"><circle cx="20" cy="40" r="2.5"/><circle cx="38" cy="52" r="2.5"/><circle cx="28" cy="66" r="2.5"/><circle cx="44" cy="30" r="2"/><circle cx="14" cy="62" r="2"/></g></svg>'}
function wingsSvg(c){var w='<path d="M58 30C40 4 12 0 2 8C14 14 10 26 22 30C10 36 18 50 34 46C42 44 52 38 58 30Z" fill="'+c+'" stroke="#fff" stroke-width="2" opacity=".85"/><path d="M50 30C38 18 24 14 14 16M48 32C38 34 30 38 24 42" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"/>';return '<svg viewBox="0 0 120 60" aria-hidden="true">'+w+'<g transform="translate(120 0) scale(-1 1)">'+w+'</g></svg>'}
function pct(v){return (Math.round(v*10)/10)+"%"}
function box(l,t,w,h){return "left:"+pct(l)+";top:"+pct(t)+";width:"+pct(w)+(h!=null?";height:"+pct(h):"")}
C.img=function(sp){return (C.base||"")+"img/"+sp+".webp"+(/^c\d\d$/.test(sp)?"?v=3d3":"")};

/* opts: stage, subj (costume; null = nessun costume; se assente usa l'ultima materia), powers (false per spegnerli) */
/* ritratti in costume per materia, per singolo alunno (caricatura: {materia:[file, larghezza, centro testa, scena]}) */
C.KIDOF={};
/* evoluzione maghetto: img/cXX-e1..e5.webp per le 5 tappe */
C.EVO={c09:{w:249,hx:.549,v:"1"},c13:{w:243,hx:.531,v:"1"},c04:{w:202,hx:.554,v:"1"},c14:{w:235,hx:.568,v:"1"},c10:{w:256,hx:.506,v:"1"},c12:{w:265,hx:.5,v:"1"},c02:{w:238,hx:.543,v:"1"},c01:{w:234,hx:.523,v:"1"},c15:{w:256,hx:.502,v:"1"},c03:{w:259,hx:.47,v:"1"},c07:{w:284,hx:.485,v:"1"},c11:{w:243,hx:.5,v:"1"},c05:{w:228,hx:.508,v:"1"},c08:{w:265,hx:.508,v:"1"},c06:{w:255,hx:.544,v:"1"}};
C.avatar=function(p,o){
  o=o||{};
  var rc=C.colorHex(p.co),c=C.CH[p.sp];
  var subj0=o.subj===undefined?(p.ls||null):o.subj,of=c&&subj0&&C.KIDOF[p.sp]&&C.KIDOF[p.sp][subj0];
  if(of)c={w:of[1],h:460,hx:of[2]};
  var EV=!of&&C.EVO[p.sp];if(EV)c={w:EV.w,h:460,hx:EV.hx};
  if(!c)return '<div class="cq-av cq-none" style="--rc:'+rc+'"><div class="cq-bub"></div><span class="cq-qm">?</span></div>';
  var st=o.stage==null?C.stageOf(p.xp||0):o.stage;
  var lv=EV?(o.stage==null?C.evoLv(p.xp||0):(o.evo!=null?o.evo:Math.min(6,st+2))):0;
  var SC=EV?.96:[.7,.74,.82,.91,1][st];
  var FL=EV?(lv===0?"brightness(0) opacity(.3)":lv===1?"grayscale(1)":"none"):st===0?"brightness(0) opacity(.3)":st===1?"grayscale(.85) opacity(.93)":"none";
  var dH=Math.min(90,92*c.h/c.w)*SC,dW=dH*c.w/c.h,top=95-dH,cx=50+(c.hx-.5)*dW,headW=.2*dH;
  var subj=o.subj===undefined?(p.ls||null):o.subj;
  if(subj&&!HATS[subj])subj=null;
  var tier=subj?C.tierOf(p,subj):0,pw=!EV&&o.powers!==false&&st>=1;
  var h='<div class="cq-av cq-s'+st+(EV?' cq-evo cq-l'+lv:'')+'" style="--rc:'+rc+'"'+(EV?' data-evo="'+p.sp+'" data-lv="'+lv+'"'+(function(){var w=C.who&&C.who();return w&&C.pupils&&C.pupils[w]===p?' data-pid="'+w+'"':''})()+(o.stage==null?' data-live="1"':''):'')+'>';
  if(pw&&st===4)h+='<div class="cq-rays" style="--ec:'+C.subjOf(C.powerEl(p,4)).c+'"></div>';
  h+='<div class="cq-bub"></div>';
  if(pw&&st>=2)h+='<div class="cq-aura" style="'+box(cx-dW*.95,top-dH*.04,dW*1.9,dH*1.02)+';--ec:'+C.subjOf(C.powerEl(p,2)).c+'"></div>';
  if(pw&&st>=3)h+='<div class="cq-wings" style="'+box(cx-dW*1.25,top+dH*.12,dW*2.5,dH*.42)+'">'+wingsSvg(C.subjOf(C.powerEl(p,3)).c)+'</div>';
  if(false){var cw=Math.max(dW*1.05,dH*.34);h+='<div class="cq-cape" style="'+box(cx-cw/2,top+dH*.2,cw,dH*.66)+'">'+capeSvg(C.subjOf(subj).c)+'</div>'}
  h+='<img class="cq-fig'+(of&&of[3]?' scene':'')+'" src="'+(of?(C.base||"")+of[0]:EV?(C.base||"")+"img/"+p.sp+"-e"+Math.max(1,lv-1)+".webp?v="+EV.v:C.img(p.sp))+'" alt="" draggable="false" style="transform:scale('+SC+');filter:'+FL+'">';
  if(EV?lv===0:st===0)h+='<span class="cq-qm">?</span>';
  if(EV&&lv>=3)h+='<span class="cq-es e1"></span><span class="cq-es e2"></span><span class="cq-es e3"></span>'+(lv>=5?'<span class="cq-es e4"></span>':'');
  if(false){
    var H=HATS[subj],hw=headW*H.w,hh=hw*40/48;
    h+='<div class="cq-hat'+(st===4?' gold':'')+'" style="'+box(cx-hw/2,top+H.dy*dH-hh,hw,hh)+'"><svg viewBox="0 0 48 40" aria-hidden="true">'+H.svg+'</svg></div>';
    if(tier>=2){var iw=17;h+='<div class="cq-item" style="'+box(Math.min(80,cx+dW*.42),top+dH*.42,iw,iw)+';background:'+C.subjOf(subj).c+'">'+C.icon(subj)+'</div>'}
  }else if(st===4&&!EV){
    var dHc=dH,cxc=cx;
    h+='<svg class="cq-crown" viewBox="0 0 40 28" style="left:'+pct(cxc)+';top:'+pct(top-13)+'" aria-hidden="true"><path d="M4 25L7 6l9 9 4-12 4 12 9-9 3 19z" fill="#F2C230" stroke="#1F3A56" stroke-width="2.2" stroke-linejoin="round"/><circle cx="7" cy="5" r="2" fill="#D2325F"/><circle cx="20" cy="2.5" r="2" fill="#D2325F"/><circle cx="33" cy="5" r="2" fill="#D2325F"/></svg>';
  }
  if(pw){
    var sc=C.subjOf(C.powerEl(p,1)).c;
    h+='<span class="cq-spk k1" style="'+box(Math.min(84,cx+dW*.55),Math.max(2,top+dH*.02),11,11)+'">'+star4(sc)+'</span>';
    h+='<span class="cq-spk k2" style="'+box(Math.max(2,cx-dW*.7-6),top+dH*.3,9,9)+'">'+star4(sc)+'</span>';
    h+='<span class="cq-spk k3" style="'+box(Math.max(2,cx-dW*.55-4),top+dH*.62,7,7)+'">'+star4(sc)+'</span>';
  }
  if(pw&&st===4){
    var e4=C.powerEl(p,4),c4=C.subjOf(e4).c;
    h+='<div class="cq-orbit">'+[0,1,2].map(function(i){return '<span class="cq-orb o'+i+'" style="background:'+c4+'">'+C.icon(e4)+'</span>'}).join("")+'</div>';
  }
  var accs=C.accOf(p);
  if(accs.length&&o.medals!==false)h+='<div class="cq-bdg">'+accs.map(function(k){return '<span class="cq-b" style="background:'+C.subjOf(k).c+'">'+C.icon(k)+'</span>'}).join("")+'</div>';
  return h+'</div>';
};

/* ---------- avvio e dati ---------- */
C.pupils={};C.settings={};C.db=null;C.user=null;C.isOwner=false;C.canWrite=true;C.loaded=false;C.loadFail=false;C.mode="local";
var LS="cuccioli-in-crescita-portale-v1",subs=[];
C.on=function(fn){subs.push(fn)};
function notify(){subs.forEach(function(f){try{f()}catch(e){}})}
function saveLocal(){if(C.db)return;try{localStorage.setItem(LS,JSON.stringify({pupils:C.pupils,settings:C.settings}))}catch(e){}}
window.addEventListener("storage",function(e){if(e.key!==LS||C.db)return;try{var raw=JSON.parse(e.newValue);if(raw&&raw.settings){C.settings=raw.settings;C.pace=C.paceOf(C.settings);notify()}}catch(x){}});
C.ready=null;
C.boot=function(){
  if(C.ready)return C.ready;
  C.ready=(async function(){
    var db=null,user=null;
    try{if(window.claude&&window.claude.use){db=await window.claude.use("db");user=await window.claude.use("user")}}catch(e){}
    C.db=db;C.user=user;
    try{C.isOwner=user?!!(await user.isOwner()):false}catch(e){}
    try{C.canWrite=user?!!(await user.canEdit()):true}catch(e){C.canWrite=true}
    if(!db){
      C.mode="local";C.isOwner=true;
      try{var raw=JSON.parse(localStorage.getItem(LS));if(raw){C.pupils=raw.pupils||{};C.settings=raw.settings||{}}}catch(e){}
      C.pace=C.paceOf(C.settings);C.loaded=true;notify();setTimeout(C.bkAuto,3000);return C;
    }
    C.mode="db";
    db.doc("meta/settings").onSnapshot(function(s){var d=s.exists?s.data():null;C.settings=d||{};C.pace=C.paceOf(C.settings);notify()},function(){});
    await new Promise(function(res){
      var done=false,t=setTimeout(function(){if(!done){done=true;res()}},10000);
      db.collection("pupils").onSnapshot(function(snap){
        var m={};snap.docs.forEach(function(d){m[d.id]=C.clone(d.data())});
        C.pupils=m;C.loaded=true;notify();
        if(!done){done=true;clearTimeout(t);res();setTimeout(C.bkAuto,5000)}
      },function(){C.loadFail=true;notify();if(!done){done=true;clearTimeout(t);res()}});
    });
    return C;
  })();
  return C.ready;
};
var chains={};
function enqueue(id,fn){chains[id]=(chains[id]||Promise.resolve()).then(fn).catch(function(){C.toast("Non sono riuscito a salvare. Controlla la connessione.")});return chains[id]}
C.put=function(id,doc){
  C.pupils[id]=doc;saveLocal();notify();
  if(!C.db)return Promise.resolve();
  var d=C.clone(doc);return enqueue(id,function(){return C.db.doc("pupils/"+id).set(d)});
};
C.remove=function(id){
  delete C.pupils[id];saveLocal();notify();
  if(!C.db)return Promise.resolve();
  return enqueue(id,function(){return C.db.doc("pupils/"+id).delete()});
};
C.saveSettings=function(patch){
  C.settings=Object.assign({},C.settings,patch);C.pace=C.paceOf(C.settings);saveLocal();notify();
  if(!C.db)return Promise.resolve();
  var d=C.clone(C.settings);return enqueue("meta",function(){return C.db.doc("meta/settings").set(d)});
};
C.newId=function(){return "p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};

/* ===== backup: copia di tutti i dati della classe e di tutte le app ===== */
var BKCOLS=["pupils","meta","alunni","mondo","calcolo","tabelline","materia","stati","metodo","labirinto","suoni","cervello","verifica","geometria","problemi"],BKLS="accademia-backup-v1",BKCHUNK=200000,BKKEEP=25,BKEVERY=20*60*1000;
C.BK_EVERY_MIN=BKEVERY/60000;C.BK_KEEP=BKKEEP;
function colDocs(col){
  return new Promise(function(res,rej){
    var c=C.db.collection(col),done=false;
    function pack(s){var m={};(s.docs||[]).forEach(function(d){m[d.id]=d.data()});return m}
    if(typeof c.get==="function"){c.get().then(function(s){res(pack(s))},rej);return}
    var un=c.onSnapshot(function(s){if(done)return;done=true;res(pack(s));setTimeout(function(){try{un&&un()}catch(e){}},0)},function(e){if(!done){done=true;rej(e)}});
  });
}
function lsBackups(){try{return JSON.parse(localStorage.getItem(BKLS)||"[]")}catch(e){return []}}
C.bkCollect=async function(){
  if(C.mode!=="db"){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(BKLS)!==0)o[k]=localStorage.getItem(k)}return {local:o}}
  var data={};for(var j=0;j<BKCOLS.length;j++)data[BKCOLS[j]]=await colDocs(BKCOLS[j]);
  return {db:data};
};
C.bkPayload=async function(kind){
  var snap=await C.bkCollect(),t=Date.now();
  var n=snap.db?Object.keys(snap.db.pupils||{}).length:Object.keys(C.pupils).length;
  return Object.assign({v:1,app:"Accademia dei Talenti",t:t,kind:kind||"manuale",n:n},snap);
};
C.bkList=async function(){
  if(C.mode!=="db")return lsBackups().map(function(b){return {id:b.id,t:b.t,kind:b.kind,n:b.n,size:b.size}}).sort(function(a,b){return b.t-a.t});
  var m=await colDocs("backup");return Object.keys(m).map(function(id){return Object.assign({id:id},m[id])}).sort(function(a,b){return b.t-a.t});
};
C.bkSave=async function(kind){
  var p=await C.bkPayload(kind),s=JSON.stringify(p),id="b"+p.t,meta={t:p.t,kind:p.kind,n:p.n,size:s.length};
  if(C.mode!=="db"){
    var arr=lsBackups().concat([Object.assign({id:id,s:s},meta)]).sort(function(a,b){return b.t-a.t});
    for(var keep=6;keep>0;keep--){try{localStorage.setItem(BKLS,JSON.stringify(arr.slice(0,keep)));break}catch(e){}}
    return Object.assign({id:id},meta);
  }
  var parts=Math.max(1,Math.ceil(s.length/BKCHUNK));
  for(var i=0;i<parts;i++)await C.db.doc("backupparti/"+id+"_"+i).set({s:s.slice(i*BKCHUNK,(i+1)*BKCHUNK)});
  meta.parts=parts;await C.db.doc("backup/"+id).set(meta);
  try{var list=await C.bkList();for(var k=BKKEEP;k<list.length;k++)await C.bkDelete(list[k])}catch(e){}
  return Object.assign({id:id},meta);
};
C.bkDelete=async function(b){
  if(C.mode!=="db"){localStorage.setItem(BKLS,JSON.stringify(lsBackups().filter(function(x){return x.id!==b.id})));return}
  for(var i=0;i<(b.parts||1);i++){try{await C.db.doc("backupparti/"+b.id+"_"+i).delete()}catch(e){}}
  await C.db.doc("backup/"+b.id).delete();
};
C.bkLoad=async function(b){
  if(C.mode!=="db"){var x=lsBackups().filter(function(y){return y.id===b.id})[0];if(!x)throw new Error("missing");return JSON.parse(x.s)}
  var s="";for(var i=0;i<(b.parts||1);i++){var d=await C.db.doc("backupparti/"+b.id+"_"+i).get();if(!d.exists)throw new Error("missing part");s+=d.data().s}
  return JSON.parse(s);
};
C.bkCheck=function(p){
  if(!p||p.app!=="Accademia dei Talenti"||!(p.db||p.local))return "Questo file non è un backup dell'Accademia dei Talenti.";
  if(p.db&&C.mode!=="db")return "Questo backup viene dall'Accademia online: si può ripristinare solo lì.";
  if(p.local&&C.mode==="db")return "Questo backup viene dall'anteprima di prova: non si può ripristinare nell'Accademia online.";
  return "";
};
C.bkRestore=async function(p){
  var err=C.bkCheck(p);if(err)throw new Error(err);
  await C.bkSave("prima del ripristino");
  if(p.local){
    var keep=localStorage.getItem(BKLS),ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(BKLS)!==0)ks.push(k)}
    ks.forEach(function(k){localStorage.removeItem(k)});Object.keys(p.local).forEach(function(k){localStorage.setItem(k,p.local[k])});
    if(keep)localStorage.setItem(BKLS,keep);return;
  }
  for(var j=0;j<BKCOLS.length;j++){
    var col=BKCOLS[j],want=p.db[col]||{},cur=await colDocs(col);
    var ids=Object.keys(cur);for(var a=0;a<ids.length;a++)if(!want.hasOwnProperty(ids[a]))await C.db.doc(col+"/"+ids[a]).delete();
    var ws=Object.keys(want);for(var b=0;b<ws.length;b++)await C.db.doc(col+"/"+ws[b]).set(want[ws[b]]);
  }
};
/* backup automatico: ogni volta che l'Accademia o un'app viene usata sul dispositivo della maestra, al massimo uno ogni 20 minuti */
C.bkAuto=function(){
  if(window.Registro)return; /* sul Foglio Google niente copie automatiche: si fanno a mano dalla pagina Backup */
  if(C.bkAutoRunning||!C.canTeach()||!C.loaded||C.loadFail)return;
  var last=+C.settings.bkLast||0;if(Date.now()-last<BKEVERY)return;
  C.bkAutoRunning=true;var now=Date.now();
  C.saveSettings({bkLast:now});
  C.bkSave("automatico").then(function(){C.bkAutoRunning=false;C.lastBackup=now;notify()},function(){C.bkAutoRunning=false;C.saveSettings({bkLast:last})});
};

/* atteggiamenti valutati dalla maestra: i punti vanno nel registro e, se attivo, fanno crescere l'avatar in "Atteggiamenti" */
C.ATT=[
  {k:"par",n:"Partecipazione",i:"✋",d:"Interviene, alza la mano, porta idee"},
  {k:"int",n:"Interesse",i:"💡",d:"È curioso, fa domande, approfondisce"},
  {k:"aut",n:"Autonomia",i:"🧭",d:"Lavora da solo, si organizza, trova soluzioni"},
  {k:"imp",n:"Impegno",i:"💪",d:"Ci prova anche quando è difficile, porta a termine"},
  {k:"att",n:"Attenzione",i:"👀",d:"Ascolta, segue le consegne, resta concentrato"},
  {k:"coo",n:"Cooperazione",i:"🤝",d:"Aiuta i compagni, rispetta i turni, lavora in squadra"}
];
C.attOf=function(k){for(var i=0;i<C.ATT.length;i++)if(C.ATT[i].k===k)return C.ATT[i];return null};
C.attXp=function(){return C.settings.attXp!==false};
/* autovalutazione degli atteggiamenti: compare nella scheda «Come è andata?» di ogni app e si salva nella scheda dell'alunno */
C.ATT_SELF={par:"Partecipo: alzo la mano e dico le mie idee",int:"Questo argomento mi incuriosisce",aut:"Lavoro da solo, senza chiedere sempre aiuto",imp:"Mi impegno anche quando è difficile",att:"Ascolto e seguo le consegne",coo:"Aiuto i compagni e lavoro bene in squadra"};
C.ASLV=[[1,"🌱","Ci provo ancora"],[2,"🌿","Ci sono quasi"],[3,"🌳","Ci sono!"]];
C.asAvg=function(p,from,to){
  var r={},n=0,as=(p&&p.as)||{};from=from||0;to=to||Infinity;
  C.ATT.forEach(function(x){r[x.k]=[0,0]});
  Object.keys(as).forEach(function(app){var a=as[app]||{};if(!(a.t>=from&&a.t<to))return;var any=false;C.ATT.forEach(function(x){if(a[x.k]){r[x.k][0]+=a[x.k];r[x.k][1]++;any=true}});if(any)n++});
  var o={n:n};C.ATT.forEach(function(x){o[x.k]=r[x.k][1]?r[x.k][0]/r[x.k][1]:null});return o;
};
C.attSelfMount=function(app){
  var anchor=document.getElementById("vform")||document.getElementById("se-list");if(!anchor||document.getElementById("cq-as"))return;
  var box=document.createElement("div");box.id="cq-as";box.className="cq-as";anchor.parentNode.insertBefore(box,anchor.nextSibling);
  function draw(){
    var id=C.who(),p=id&&C.pupils[id],cur=(p&&p.as&&p.as[app])||{};
    var h='<p class="cq-eye">I miei atteggiamenti</p><h3>Come mi sono comportato?</h3>';
    if(!p){box.innerHTML=h+'<p class="cq-as-note">Quando un alunno entra con il suo codice, qui valuta da solo partecipazione, interesse, autonomia, impegno, attenzione e cooperazione.</p>';return}
    h+='<p class="cq-as-note">Pensa a oggi e scegli il gradino che ti somiglia. La maestra vede le tue risposte.</p>'+C.ATT.map(function(x){
      return '<fieldset class="cq-as-it"><legend><span aria-hidden="true">'+x.i+'</span> '+C.esc(C.ATT_SELF[x.k])+'</legend><div class="cq-as-lv">'+C.ASLV.map(function(l){
        return '<button type="button" data-as="'+x.k+'" data-v="'+l[0]+'" aria-pressed="'+(cur[x.k]===l[0])+'"><b aria-hidden="true">'+l[1]+'</b>'+l[2]+'</button>'}).join("")+'</div></fieldset>'}).join("");
    var done=C.ATT.every(function(x){return cur[x.k]});
    h+=done?'<p class="cq-as-ok">Fatto! Hai valutato tutti i tuoi atteggiamenti.</p>':'';
    box.innerHTML=h;
  }
  box.addEventListener("click",function(e){
    var b=e.target.closest&&e.target.closest("[data-as]");if(!b)return;
    var id=C.who(),p=id&&C.pupils[id];if(!p)return;
    var q=C.clone(p);q.as=q.as||{};var a=Object.assign({},q.as[app]);a[b.dataset.as]=+b.dataset.v;a.t=Date.now();
    var first=!a.done&&C.ATT.every(function(x){return a[x.k]});if(first)a.done=1;
    q.as[app]=a;C.put(id,q);
    if(first){C.award([id],"imp",1,app);C.toast("Atteggiamenti valutati: una stella!")}
  });
  C.on(draw);draw();
};
(function(){
  var page=(location.pathname.split("/").pop()||"").replace(/\.html$/,"");
  function go(){if(C.GAMES.some(function(g){return g.k===page}))C.attSelfMount(page)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else setTimeout(go,0);
})();
C.giveAtt=function(ids,k,pts){return C.award(ids,"imp",pts,"maestra",{att:k,noXp:!C.attXp()})};

/* assegna punti: fa evolvere l'avatar, sblocca medaglie e poteri, mostra la festa */
C.award=function(ids,subj,pts,src,opts){
  opts=opts||{};
  if(!Array.isArray(ids))ids=[ids];
  if(!pts||pts<=0)return Promise.resolve();
  var evo=[],acc=[];
  ids.forEach(function(id){
    var old=C.pupils[id];if(!old)return;
    var q=C.clone(old);q.sj=q.sj||{};q.log=q.log||[];q.pw=q.pw||{};
    var gain=opts.noXp?0:pts,now=Date.now(),le={s:subj,p:gain,t:now,g:src||""};
    var tm=src==="maestra"&&C.teacherId();if(tm)le.m=tm;
    if(opts.att){q.at=q.at||{};q.at[opts.att]=(q.at[opts.att]||0)+pts;var ae={k:opts.att,p:pts,t:now};if(tm)ae.m=tm;q.atl=(q.atl||[]).concat([ae]).slice(-800);le.a=opts.att;le.ap=pts}
    if(gain){q.xp=(q.xp||0)+gain;q.sj[subj]=(q.sj[subj]||0)+gain;q.ls=subj}
    q.log=q.log.concat([le]).slice(-40);
    var s0=C.stageOf(old.xp||0),s1=C.stageOf(q.xp);
    for(var s=s0+1;s<=s1;s++){if(s>=1&&!q.pw[s])q.pw[s]=C.dominant(q)||subj}
    var i0=C.lvInfo(old),i1=C.lvInfo(q);
    if(i1.evo?i1.lv>i0.lv:s1>s0)evo.push({n:q.n,from:C.avatar(old,{stage:s0,evo:i0.lv,subj:subj}),to:C.avatar(q,{stage:s1,evo:i1.lv,subj:subj}),stage:i1.name,pows:C.powers(q,s1).slice(s0)});
    var sd=C.subjOf(subj);
    if(sd&&sd.a&&((old.sj||{})[subj]||0)<C.UNLOCK&&q.sj[subj]>=C.UNLOCK)acc.push(q.n+": medaglia "+sd.a+" e "+sd.item);
    else if(sd&&((old.sj||{})[subj]||0)<C.TIER3&&q.sj[subj]>=C.TIER3)acc.push(q.n+": mantello da "+sd.cos);
    C.put(id,q);
  });
  if(acc.length)C.toast("Novità! "+acc.slice(0,2).join(" · "));
  evo.forEach(function(e){C.evoQueue.push(e)});
  showEvo();
  return Promise.resolve();
};
C.undoLast=function(id){
  var old=C.pupils[id];if(!old||!old.log||!old.log.length)return;
  var q=C.clone(old),l=q.log.pop();q.sj=q.sj||{};
  q.xp=Math.max(0,(q.xp||0)-l.p);if(l.p)q.sj[l.s]=Math.max(0,(q.sj[l.s]||0)-l.p);
  if(l.a){q.at=q.at||{};q.at[l.a]=Math.max(0,(q.at[l.a]||0)-(l.ap||0));var al=q.atl||[];for(var i=al.length-1;i>=0;i--){if(al[i].k===l.a&&al[i].t===l.t){al.splice(i,1);break}}q.atl=al}
  C.put(id,q);C.toast("Ultimo punteggio annullato");
};

/* ---------- chi sta giocando ---------- */
var WHO="cuccioli-chi",memWho=null;
C.who=function(){
  var v=memWho;
  if(!v){try{v=sessionStorage.getItem(WHO)}catch(e){}}
  if(!v){try{v=localStorage.getItem(WHO)}catch(e){}}
  return v&&C.pupils[v]?v:null;
};
/* modalità maestra condivisa da tutte le app: si apre solo con il PIN e si chiude quando entra un alunno */
var TK="cuccioli-maestra",RK="cuccioli-maestra-ricordata";
/* ===== più maestre: ognuna con il suo PIN personale, le sue materie e le sue app ===== */
C.PAGE=(location.pathname.split("/").pop()||"").replace(/\.html$/,"");
C.T1={id:"t1",n:"Valentina",img:"img/maestra-valentina.webp?v=3d5",subj:["mat","geo","sci","mot","art","mus","tec","civ"]};
C.teachers=function(){
  var t=C.settings.teachers;
  if(t&&t.length)return t;
  return [Object.assign({},C.T1,{pin:C.settings.pin||"",hp:C.settings.hp})];
};
C.tById=function(id){var l=C.teachers();for(var i=0;i<l.length;i++)if(l[i].id===id)return l[i];return null};
C.saveTeachers=function(list){var o={teachers:list};if(C.settings.pin)o.pin="";return C.saveSettings(o)};
C.tName=function(t){return t?"maestra "+t.n:""};
/* avatar della maestra: magico e animato (alone che ruota, scintille in orbita, leggero volo). cls "full" = figura intera */
C.tAvatar=function(t,cls){
  if(!t)return '';
  cls=cls||'';
  var sp='<i class="cq-sp s1">✦</i><i class="cq-sp s2">✧</i><i class="cq-sp s3">✦</i><i class="cq-sp s4">·</i>';
  if(cls.indexOf("full")>=0&&t.img)return '<span class="cq-tw full"><span class="cq-glow"></span><span class="cq-trail"></span><img class="cq-tfull" src="'+(C.base||"")+t.img+'" alt="'+C.esc(C.tName(t))+'">'+sp+'<i class="cq-sp s5">✦</i><i class="cq-sp s6">✧</i></span>';
  var inner=t.img?'<span class="cq-tav"><img src="'+(C.base||"")+t.img+'" alt=""></span>':'<span class="cq-tav init">'+C.esc(String(t.n||"?").charAt(0).toUpperCase())+'</span>';
  return '<span class="cq-tw '+cls+'"><span class="cq-ring"></span>'+inner+sp+'</span>';
};

/* ===== la maestra in costume: da maga nella pagina iniziale, con il costume della materia nelle sue app ===== */
var MAGA_HAT='<svg viewBox="0 0 60 70" aria-hidden="true"><g stroke="#1F1640" stroke-width="2" stroke-linejoin="round"><path d="M4 62Q30 54 56 62Q30 70 4 62Z" fill="#3B2775"/><path d="M12 60Q22 34 30 14Q36 2 50 4Q40 8 38 20Q36 40 46 60Q30 56 12 60Z" fill="#5B3A9E"/><path d="M14.5 54Q30 50 44.5 54L46 60Q30 56 12 60Z" fill="#E9C24E"/></g><path d="M24 38l1.5 3.5 3.5.5-2.6 2.4.7 3.6-3.1-1.8-3.1 1.8.7-3.6-2.6-2.4 3.5-.5z" fill="#F5DE8C"/><circle cx="34" cy="26" r="1.6" fill="#F5DE8C"/><circle cx="38" cy="44" r="1.2" fill="#fff"/><circle cx="50" cy="4" r="2.6" fill="#F5DE8C" stroke="#1F1640" stroke-width="1.2"/></svg>';
var WAND='<svg viewBox="0 0 40 60" aria-hidden="true"><path d="M6 56L30 14" stroke="#3B2A1A" stroke-width="4" stroke-linecap="round"/><path d="M6 56L11 47" stroke="#F5DE8C" stroke-width="4" stroke-linecap="round"/><path d="M31 2l2.8 7.2 7.2.8-5.6 4.8 1.8 7.2-6.2-4-6.2 4 1.8-7.2-5.6-4.8 7.2-.8z" fill="#F5DE8C" stroke="#B8862B" stroke-width="1.2"/></svg>';
function capeT(c){return '<svg viewBox="0 0 60 80" preserveAspectRatio="none" aria-hidden="true"><path d="M14 2Q30 8 46 2L60 78Q30 84 0 78Z" fill="'+c+'" stroke="#1F1640" stroke-width="1.6" stroke-linejoin="round"/><g fill="#FFF6DD" opacity=".55"><path d="M16 30l1 2.4 2.5.3-1.9 1.6.6 2.5-2.2-1.3-2.2 1.3.6-2.5-1.9-1.6 2.5-.3z"/><path d="M44 50l1 2.4 2.5.3-1.9 1.6.6 2.5-2.2-1.3-2.2 1.3.6-2.5-1.9-1.6 2.5-.3z"/><circle cx="30" cy="64" r="1.6"/><circle cx="48" cy="24" r="1.3"/><circle cx="10" cy="56" r="1.3"/></g></svg>'}
C.tFigure=function(t,mode,opts){
  opts=opts||{};
  if(!t||!t.img)return C.tAvatar(t,"big");
  /* ritratti già in costume: maga e materie (t.outfits = {maga:[img,rapporto], sci:[img,rapporto]…}) */
  var OF=t.outfits||(t.id==="t1"?{maga:["img/maestra-valentina-maga.webp?v=3d2",2.457],sci:["img/maestra-valentina-sci3f.webp",3.03],geo:["img/maestra-valentina-geo.webp?v=3d2",2.747],mus:["img/maestra-valentina-mus.webp?v=3d2",3.03],mat:["img/maestra-valentina-mat.webp?v=3d3",2.611],mot:["img/maestra-valentina-mot.webp?v=3d2",2.959],art:["img/maestra-valentina-art.webp?v=3d2",2.415],tec:["img/maestra-valentina-tec.webp?v=3d2",2.439]}:{});
  if(mode&&OF[mode]){
    var fx0=opts.fx!==false?'<span class="cq-glow"></span><i class="cq-sp s1">✦</i><i class="cq-sp s2">✧</i><i class="cq-sp s3">✦</i><i class="cq-sp s4">·</i><i class="cq-sp s5">✦</i>':'';
    var sd0=mode==="maga"?null:C.subjOf(mode);
    return '<span class="cq-tfig '+(mode==="maga"?'maga':'of')+(opts.cls?' '+opts.cls:'')+'"><span class="cq-tfb" style="aspect-ratio:1/'+OF[mode][1]+'">'+fx0+'<img class="cq-tfimg" src="'+(C.base||"")+OF[mode][0]+'" alt="'+C.esc(C.tName(t))+(sd0?' vestita da '+C.esc(sd0.cos):' vestita da maga')+'">'+(mode==="maga"?'<span class="cq-wtip"></span>':'')+'</span></span>';
  }
  var HR=t.ar||900/308,hx=t.hx||0.44,hwF=t.hw||0.5,H,hw,hh,top,hat="",item="",cape="",mt=0;
  var sd=mode&&mode!=="maga"?C.subjOf(mode):null;
  if(mode==="maga"){
    hw=hwF*1.75;hh=hw*70/60;top=.085-hh/HR;
    hat='<span class="cq-thh maga" style="left:'+((hx-hw/2+.04)*100)+'%;top:'+(top*100)+'%;width:'+(hw*100)+'%">'+MAGA_HAT+'</span>';
    item='<span class="cq-twand" style="left:68%;top:41%;width:44%">'+WAND+'</span>';
    cape='<span class="cq-tcape" style="left:-8%;top:14%;width:104%;height:70%">'+capeT("#4B2E8F")+'</span>';
  }else if(sd&&HATS[mode]){
    H=HATS[mode];hw=hwF*H.w;hh=hw*40/48;top=H.dy-hh/HR;
    hat='<span class="cq-thh" style="left:'+((hx-hw/2)*100)+'%;top:'+(top*100)+'%;width:'+(hw*100)+'%"><svg viewBox="0 0 48 40" aria-hidden="true">'+H.svg+'</svg></span>';
    item='<span class="cq-titem" style="left:70%;top:52%;width:34%;background:'+sd.c+'">'+C.icon(mode)+'</span>';
    cape='<span class="cq-tcape" style="left:-8%;top:14%;width:104%;height:70%">'+capeT(sd.c)+'</span>';
  }
  if(top<0)mt=-top*HR*100;
  var fx=opts.fx!==false?'<span class="cq-glow"></span><i class="cq-sp s1">✦</i><i class="cq-sp s2">✧</i><i class="cq-sp s3">✦</i><i class="cq-sp s4">·</i><i class="cq-sp s5">✦</i>':'';
  return '<span class="cq-tfig'+(opts.cls?' '+opts.cls:'')+'" style="padding-top:'+mt.toFixed(1)+'%"><span class="cq-tfb" style="aspect-ratio:1/'+HR.toFixed(3)+'">'+fx+cape+'<img class="cq-tfimg" src="'+(C.base||"")+t.img+'" alt="'+C.esc(C.tName(t))+(sd?' vestita da '+C.esc(sd.cos):mode==="maga"?' vestita da maga':'')+'">'+hat+item+'</span></span>';
};

/* ===== lettura ad alta voce delle istruzioni ===== */
C.canSpeak=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance);
var voiceIt=null;
function pickVoice(){try{var v=speechSynthesis.getVoices()||[];voiceIt=v.filter(function(x){return /^it/i.test(x.lang)&&/female|donna|alice|elsa|federica|paola|google/i.test(x.name)})[0]||v.filter(function(x){return /^it/i.test(x.lang)})[0]||null}catch(e){}}
if(C.canSpeak){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice}catch(e){}}
C.speaking=null;
C.speak=function(text,btn){
  if(!C.canSpeak){C.toast("Questo dispositivo non sa leggere ad alta voce.");return}
  var was=C.speaking===btn&&speechSynthesis.speaking;
  C.stopSpeak();if(was)return;
  text=String(text||"").replace(/\s+/g," ").replace(/[★✦✧▶←→]/g,"").trim();if(!text)return;
  var u=new SpeechSynthesisUtterance(text);u.lang="it-IT";u.rate=.9;u.pitch=1.05;if(voiceIt)u.voice=voiceIt;
  C.speaking=btn||true;if(btn)btn.classList.add("on");document.documentElement.classList.add("cq-talking");
  u.onend=u.onerror=function(){if(btn)btn.classList.remove("on");if(C.speaking===(btn||true)){C.speaking=null;document.documentElement.classList.remove("cq-talking")}};
  try{speechSynthesis.speak(u)}catch(e){}
};
C.stopSpeak=function(){try{speechSynthesis.cancel()}catch(e){}Array.prototype.forEach.call(document.querySelectorAll(".cq-say.on,.cq-glisten.on"),function(b){b.classList.remove("on")});C.speaking=null;document.documentElement.classList.remove("cq-talking")};
function sayText(el){var c=el.cloneNode(true);Array.prototype.forEach.call(c.querySelectorAll(".cq-say,script,style,svg"),function(x){x.remove()});return c.textContent}
var SAY_SEL=".lead,.hint,.qhead,.qtext,.cq-as-it legend,fieldset.item legend,.cq-gc h2,.cq-gc>p:not(.cq-eye):not(.cq-err):not(.cq-note),.login .hero p,.move span,.cq-guide-hello";
function visible(el){return !!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)}
function inLesson(el){return !!el.closest('#sec-lezione,#panel-maestra,[data-teacher],.cq-gt')}
C.addSayButtons=function(root){
  if(!C.canSpeak)return;
  Array.prototype.forEach.call((root||document).querySelectorAll(SAY_SEL),function(el){
    if(el.dataset.cqs||inLesson(el)||!visible(el))return;
    if(!sayText(el).trim())return;
    el.dataset.cqs="1";
    var b=document.createElement("button");b.type="button";b.className="cq-say";b.setAttribute("aria-label","Ascolta");b.title="Ascolta";b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();C.speak(sayText(el),b)});
    el.insertBefore(b,el.firstChild);
  });
};
/* la maestra guida nelle app: legge le istruzioni della sezione aperta */
function curSection(){
  var c=document.querySelectorAll("section.view,[role=tabpanel]");
  for(var i=0;i<c.length;i++){var s=c[i];if(s.hidden||!visible(s))continue;if(/lezione|maestra/.test(s.id))continue;return s}
  return null;
}
function sectionText(s){
  if(!s)return "";
  var parts=[],h=s.querySelector("h2");if(h&&visible(h))parts.push(sayText(h).trim()+".");
  Array.prototype.forEach.call(s.querySelectorAll(".lead,.hint,.qhead,.qtext"),function(el){if(visible(el)&&!inLesson(el)){var t=sayText(el).trim();if(t&&parts.indexOf(t)<0)parts.push(t)}});
  return parts.join(" ").replace(/\s+/g," ").slice(0,700);
}
/* pulsanti Indietro e Home, in alto a destra in tutte le pagine */
C.navButtons=function(){
  if(document.getElementById("cq-home"))return;
  var portal=C.PAGE===""||C.PAGE==="index";
  var TZ=["maestra","codici","risultati","backup","maestre","alunni"];
  function h(){return (location.hash||"").replace(/^#/,"")}
  function teachArea(){var x=h();return TZ.indexOf(x)>=0||/^(a|am|cm)-/.test(x)}
  function homeHref(){if(portal)return teachArea()?"#maestra":"#";return "index.html"+(C.teacher&&C.teacher()?"#maestra":"")}
  function atHome(){if(!portal)return false;var x=h();return x===""||x==="maestra"}
  var back=document.createElement("button");back.type="button";back.id="cq-back";back.className="cq-vbtn cq-navb";back.setAttribute("aria-label","Torna indietro");back.title="Torna indietro";back.innerHTML='<span aria-hidden="true">←</span>';
  var home=document.createElement("a");home.id="cq-home";home.className="cq-vbtn cq-navb";home.setAttribute("aria-label","Home: torna alla pagina iniziale");home.title="Home";home.innerHTML='<span aria-hidden="true">🏠</span>';
  back.addEventListener("click",function(){var before=location.href;if(history.length>1){history.back();setTimeout(function(){if(location.href===before)location.href=homeHref()},400)}else location.href=homeHref()});
  function upd(){home.href=homeHref();var hide=atHome();back.hidden=hide;home.hidden=hide}
  var d=C.dock();d.insertBefore(home,d.firstChild);d.insertBefore(back,d.firstChild);
  window.addEventListener("hashchange",upd);upd();
};
C.dock=function(){var d=document.getElementById("cq-dock");if(!d){d=document.createElement("div");d.id="cq-dock";d.className="cq-dock";document.body.appendChild(d)}return d};
C.guide=function(){
  var g=C.GAMES.filter(function(x){return x.k===C.PAGE})[0];if(!g||document.getElementById("cq-gbtn"))return;
  var t=C.tById(g.by||"t1");if(!t)return;
  var OF=t.outfits||(t.id==="t1"?{sci:["img/maestra-valentina-sci3f.webp"],geo:["img/maestra-valentina-geo.webp?v=3d2"],mat:["img/maestra-valentina-mat.webp?v=3d3"],mus:["img/maestra-valentina-mus.webp?v=3d2"],mot:["img/maestra-valentina-mot.webp?v=3d2"],art:["img/maestra-valentina-art.webp?v=3d2"],tec:["img/maestra-valentina-tec.webp?v=3d2"]}:{});
  var face=OF[g.s]?Object.assign({},t,{img:OF[g.s][0]}):t;
  var btn=document.createElement("button");btn.type="button";btn.id="cq-gbtn";btn.className="cq-gbtn";btn.setAttribute("aria-label","La "+C.tName(t)+" ti legge le istruzioni");btn.setAttribute("aria-expanded","false");
  btn.innerHTML=C.tAvatar(face)+'<span class="cq-gbadge" aria-hidden="true">🔊</span>';
  C.dock().insertBefore(btn,C.dock().firstChild);
  var bub=document.createElement("div");bub.className="cq-gb";bub.setAttribute("role","dialog");bub.setAttribute("aria-label","Istruzioni");bub.hidden=true;
  bub.innerHTML='<div class="cq-gbin"><div class="cq-gbfig">'+C.tFigure(t,g.s,{fx:false,cls:"sm"})+'</div><div class="cq-gbtx"><p class="cq-gname">'+C.esc(C.tName(t).replace(/^m/,"M"))+'</p><p class="cq-gt" aria-live="polite"></p><div class="cq-grow">'+(C.canSpeak?'<button type="button" class="cq-glisten"><span aria-hidden="true">🔊</span> Ascolta</button>':'')+'<button type="button" class="cq-gclose" aria-label="Chiudi">✕</button></div></div></div>';
  document.body.appendChild(bub);
  var txt=bub.querySelector(".cq-gt"),lis=bub.querySelector(".cq-glisten"),last="";
  function text(){var s=curSection(),body=sectionText(s);var who=C.who(),p=who&&C.pupils[who];
    return (p?"Ciao "+p.n+"! ":"Ciao! ")+(body||("Benvenuto in "+g.t+". "+g.d));}
  function open(v){bub.hidden=!v;btn.setAttribute("aria-expanded",String(v));if(v){C.vocabClose&&C.vocabClose();last=text();txt.textContent=last}else C.stopSpeak()}
  C.guideClose=function(){if(!bub.hidden)open(false)};
  btn.addEventListener("click",function(){open(bub.hidden)});
  bub.querySelector(".cq-gclose").addEventListener("click",function(){open(false)});
  if(lis)lis.addEventListener("click",function(){txt.textContent=last=text();C.speak(last,lis)});
  function check(){var s=curSection(),key=(s&&s.id)||"",gate=!!document.querySelector(".cq-gate");btn.hidden=!s||gate;if(gate&&!bub.hidden)open(false);
    if(key!==btn.dataset.sec){btn.dataset.sec=key;btn.classList.remove("nudge");void btn.offsetWidth;btn.classList.add("nudge");if(!bub.hidden){C.stopSpeak();txt.textContent=last=text()}}}
  check();setInterval(check,900);
};
(function(){
  var tmr=null;
  function scan(){tmr=null;C.addSayButtons(document)}
  function go(){
    scan();
    try{new MutationObserver(function(){if(!tmr)tmr=setTimeout(scan,250)}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden","class"]})}catch(e){}
    window.addEventListener("hashchange",function(){C.stopSpeak()});
    C.boot().then(function(){C.guide();C.vocabButton();C.navButtons();C.simplePath()});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else setTimeout(go,0);
})();

/* ===== il vocabolario: cerca il significato delle parole in ogni app ===== */
var VN=function(w){return String(w||"").toLowerCase().replace(/^(l|un|dell|nell|all|dall|sull|quest|quell)['’]/,"").replace(/[àá]/g,"a").replace(/[èé]/g,"e").replace(/[ìí]/g,"i").replace(/[òó]/g,"o").replace(/[ùú]/g,"u").replace(/[^a-z' ]/g," ").replace(/\s+/g," ").trim()};
var VIDX=null,VLIST=null;
function vBuild(){
  var base=(window.CQ_VOCAB||[]).map(function(r){return {w:r[0],s:r[1],d:r[2],e:r[3],al:(r[4]||"").split("|").filter(Boolean)}});
  var tv=C.settings.vocab||{};
  Object.keys(tv).forEach(function(k){var v=tv[k];if(v&&v.d)base.push({w:v.w||k,s:v.s||"gen",d:v.d,e:v.e||"",al:(v.al||"").split("|").filter(Boolean),mine:1})});
  VLIST=base;VIDX={};
  base.forEach(function(v){[v.w].concat(v.al).forEach(function(f){var k=VN(f);if(!k)return;(VIDX[k]=VIDX[k]||[]).push(v)})});
}
function vCands(w){
  var c=[w],n=w.length,add=function(x){if(x&&c.indexOf(x)<0)c.push(x)};
  if(/zioni$/.test(w))add(w.replace(/zioni$/,"zione"));
  if(/ità$|ita$/.test(w))add(w);
  if(/che$/.test(w))add(w.replace(/che$/,"ca"));if(/chi$/.test(w))add(w.replace(/chi$/,"co"));if(/ghi$/.test(w))add(w.replace(/ghi$/,"go"));if(/ghe$/.test(w))add(w.replace(/ghe$/,"ga"));if(/ce$/.test(w))add(w.replace(/ce$/,"cia"));if(/ge$/.test(w))add(w.replace(/ge$/,"gia"));
  if(/[aeio]$/.test(w)){var r=w.slice(0,-1);["o","a","e","i","are","ere","ire","arsi","ersi"].forEach(function(e){add(r+e)})}
  add(w+"re");
  [["ano","are"],["ato","are"],["ata","are"],["ati","are"],["ate","are"],["ando","are"],["iamo","are"],["ono","ere"],["uto","ere"],["endo","ere"],["ito","ire"],["isce","ire"],["iscono","ire"]].forEach(function(p){if(w.length>p[0].length+2&&w.slice(-p[0].length)===p[0])add(w.slice(0,-p[0].length)+p[1])});
  return c;
}
C.vLookup=function(q){
  if(!VIDX)vBuild();
  var w=VN(q);if(!w)return [];
  var c=vCands(w);for(var i=0;i<c.length;i++)if(VIDX[c[i]])return VIDX[c[i]];
  return [];
};
C.vSuggest=function(q){
  if(!VIDX)vBuild();var w=VN(q);if(w.length<2)return [];
  var seen={},out=[];
  VLIST.forEach(function(v){var hit=[v.w].concat(v.al).some(function(f){return VN(f).indexOf(w)===0});if(hit&&!seen[v.w]){seen[v.w]=1;out.push(v)}});
  if(out.length<4)VLIST.forEach(function(v){if(!seen[v.w]&&VN(v.w).indexOf(w)>0){seen[v.w]=1;out.push(v)}});
  return out.slice(0,8);
};
function vScript(cb){if(window.CQ_VOCAB)return cb();var sc=document.createElement("script");sc.src=(C.base||"")+"vocab.js";sc.onload=function(){VIDX=null;cb()};sc.onerror=function(){window.CQ_VOCAB=[];cb()};document.head.appendChild(sc)}
var vBox=null,vTap=true,vHist=[];
function vCanManage(){return C.teacher()&&C.canWrite}
function vEntry(list,q){
  var head=C.esc(list[0].w);
  return '<div class="cq-ve"><div class="cq-vh"><h3>'+head+'</h3><button type="button" class="cq-glisten cq-vsay" aria-label="Ascolta la spiegazione"><span aria-hidden="true">🔊</span> Ascolta</button></div>'+list.map(function(v,i){var sd=C.subjOf(v.s);
    return '<div class="cq-vs">'+(list.length>1?'<b class="cq-vn">'+(i+1)+'.</b> ':'')+(sd&&v.s!=="gen"?'<span class="cq-vt" style="--c:'+sd.c+'">'+C.esc(sd.n)+'</span>':'')+(v.mine?'<span class="cq-vt" style="--c:#8B2F5A">dalla maestra</span>':'')+'<p class="cq-vd">'+C.esc(v.d)+'</p>'+(v.e?'<p class="cq-vx"><i>Esempio:</i> '+C.esc(v.e)+'</p>':'')+'</div>'}).join("")+'</div>';
}
function vText(list){return list[0].w+". "+list.map(function(v,i){return (list.length>1?"Significato "+(i+1)+": ":"")+v.d+(v.e?" Per esempio: "+v.e:"")}).join(" ")}
function vShow(q,fromTap){
  if(!vBox)return;q=String(q||"").trim();
  var inp=vBox.querySelector(".cq-vq");if(fromTap)inp.value=q;
  var res=vBox.querySelector(".cq-vres");
  if(!q){res.innerHTML=vHome();vWire();return}
  var list=C.vLookup(q),sug=C.vSuggest(q).filter(function(v){return !list.length||v.w!==list[0].w});
  var h="";
  if(list.length){h+=vEntry(list,q);if(vHist[0]!==list[0].w){vHist=[list[0].w].concat(vHist.filter(function(x){return x!==list[0].w})).slice(0,8)}}
  else{
    var asked=(C.settings.vocabAsk||[]).some(function(a){return VN(a.w)===VN(q)});
    h+='<div class="cq-ve none"><h3>«'+C.esc(q)+'»</h3><p class="cq-vd">Questa parola non c\'è ancora nel vocabolario.'+(sug.length?' Forse cercavi una di queste?':'')+'</p>'+
      (vCanManage()?'':(asked?'<p class="cq-vok">L\'hai già chiesta alla maestra: presto la aggiunge!</p>':'<button type="button" class="cq-btn pri cq-vask" data-w="'+C.esc(q)+'">Chiedi alla maestra di spiegarla</button>'))+
      (vCanManage()?vAddForm(q):'')+'</div>';
  }
  if(sug.length)h+='<p class="cq-vlab">Parole che iniziano così</p><div class="cq-vchips">'+sug.map(function(v){return '<button type="button" data-vw="'+C.esc(v.w)+'">'+C.esc(v.w)+'</button>'}).join("")+'</div>';
  res.innerHTML=h;vWire(list);
}
function vAddForm(w,e){
  return '<div class="cq-vadd"><p class="cq-vlab">Aggiungi la spiegazione (la vedranno tutti i bambini)</p><input type="text" class="cq-vaw" value="'+C.esc(w||"")+'" placeholder="Parola" maxlength="40"><textarea class="cq-vad" rows="2" maxlength="240" placeholder="Spiegazione semplice"></textarea><input type="text" class="cq-vae" maxlength="160" placeholder="Esempio (facoltativo)"><select class="cq-vas">'+C.SUBJ.filter(function(s){return s.k!=="imp"}).map(function(s){return '<option value="'+s.k+'">'+C.esc(s.n)+'</option>'}).join("")+'<option value="gen" selected>Tutte le materie</option></select><button type="button" class="cq-btn pri cq-vsave">Aggiungi al vocabolario</button></div>';
}
function vHome(){
  var h='<p class="cq-vlab">Come si usa</p><p class="cq-vd">Scrivi la parola qui sopra, oppure tocca una parola nella pagina'+(vTap?'':' (attiva «Tocca le parole»)')+'.</p>';
  if(vHist.length)h+='<p class="cq-vlab">Parole che hai cercato</p><div class="cq-vchips">'+vHist.map(function(w){return '<button type="button" data-vw="'+C.esc(w)+'">'+C.esc(w)+'</button>'}).join("")+'</div>';
  if(vCanManage()){
    var asks=C.settings.vocabAsk||[];
    h+='<div class="cq-vmae"><p class="cq-vlab">Per la maestra · parole chieste dai bambini ('+asks.length+')</p>'+(asks.length?asks.map(function(a,i){return '<div class="cq-vaskrow"><b>'+C.esc(a.w)+'</b><small>'+C.esc(a.n||"")+(a.app?' · '+C.esc(a.app):'')+'</small><button type="button" class="cq-btn" data-vfill="'+C.esc(a.w)+'">Spiega</button><button type="button" class="cq-btn ghost" data-vdel="'+i+'" aria-label="Togli">✕</button></div>'}).join(""):'<p class="cq-vd">Nessuna richiesta per ora.</p>')+
      vAddForm("")+'</div>';
  }
  return h;
}
function vWire(list){
  var res=vBox.querySelector(".cq-vres");
  Array.prototype.forEach.call(res.querySelectorAll("[data-vw]"),function(b){b.addEventListener("click",function(){vShow(b.dataset.vw,true)})});
  var say=res.querySelector(".cq-vsay");if(say&&list&&list.length)say.addEventListener("click",function(){C.speak(vText(list),say)});
  var ask=res.querySelector(".cq-vask");if(ask)ask.addEventListener("click",function(){
    var id=C.who(),p=id&&C.pupils[id],g=C.GAMES.filter(function(x){return x.k===C.PAGE})[0];
    var l=(C.settings.vocabAsk||[]).concat([{w:ask.dataset.w.slice(0,40),n:p?p.n:"",app:g?g.t:"",t:Date.now()}]).slice(-60);
    C.saveSettings({vocabAsk:l});C.toast("Fatto! La maestra aggiungerà la spiegazione.");vShow(ask.dataset.w,true);
  });
  var sv=res.querySelector(".cq-vsave");if(sv)sv.addEventListener("click",function(){
    var f=sv.parentNode,w=f.querySelector(".cq-vaw").value.trim(),d=f.querySelector(".cq-vad").value.trim(),e=f.querySelector(".cq-vae").value.trim(),sj=f.querySelector(".cq-vas").value;
    if(!w||!d){C.toast("Scrivi la parola e la spiegazione.");return}
    var tv=C.clone(C.settings.vocab||{});tv[VN(w)]={w:w,d:d,e:e,s:sj};
    var asks=(C.settings.vocabAsk||[]).filter(function(a){return VN(a.w)!==VN(w)});
    C.saveSettings({vocab:tv,vocabAsk:asks});VIDX=null;C.toast("Parola aggiunta al vocabolario.");vShow(w,true);
  });
  Array.prototype.forEach.call(res.querySelectorAll("[data-vfill]"),function(b){b.addEventListener("click",function(){var f=res.querySelector(".cq-vadd");f.querySelector(".cq-vaw").value=b.dataset.vfill;f.querySelector(".cq-vad").focus()})});
  Array.prototype.forEach.call(res.querySelectorAll("[data-vdel]"),function(b){b.addEventListener("click",function(){var l=(C.settings.vocabAsk||[]).slice();l.splice(+b.dataset.vdel,1);C.saveSettings({vocabAsk:l});vShow("")})});
}
function wordAt(x,y){
  var r=null,node,off;
  if(document.caretRangeFromPoint){r=document.caretRangeFromPoint(x,y);if(!r)return "";node=r.startContainer;off=r.startOffset}
  else if(document.caretPositionFromPoint){var p=document.caretPositionFromPoint(x,y);if(!p)return "";node=p.offsetNode;off=p.offset}
  if(!node||node.nodeType!==3)return "";
  var t=node.textContent,a=off,b=off,re=/[A-Za-zÀ-ÿ']/;
  while(a>0&&re.test(t[a-1]))a--;while(b<t.length&&re.test(t[b]))b++;
  return t.slice(a,b).replace(/^[a-z]+'/i,"");
}
C.vocabOpen=function(q){
  vScript(function(){
    if(!vBox){
      vBox=document.createElement("div");vBox.className="cq-vbox";vBox.setAttribute("role","dialog");vBox.setAttribute("aria-label","Vocabolario");
      vBox.innerHTML='<div class="cq-vtop"><b>📖 Il mio vocabolario</b><button type="button" class="cq-gclose cq-vx0" aria-label="Chiudi">✕</button></div><div class="cq-vrow"><input class="cq-vq" type="search" placeholder="Scrivi una parola…" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Parola da cercare"><button type="button" class="cq-btn pri cq-vgo">Cerca</button></div><label class="cq-vtap"><input type="checkbox" class="cq-vtapc" checked> Tocca le parole nella pagina per cercarle</label><div class="cq-vres" aria-live="polite"></div>';
      document.body.appendChild(vBox);
      var inp=vBox.querySelector(".cq-vq"),tmr=null;
      inp.addEventListener("input",function(){clearTimeout(tmr);tmr=setTimeout(function(){vShow(inp.value)},250)});
      inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();vShow(inp.value)}});
      vBox.querySelector(".cq-vgo").addEventListener("click",function(){vShow(inp.value)});
      vBox.querySelector(".cq-vx0").addEventListener("click",C.vocabClose);
      vBox.querySelector(".cq-vtapc").addEventListener("change",function(e){vTap=e.target.checked;document.documentElement.classList.toggle("cq-vtapping",vTap&&!vBox.hidden)});
      document.addEventListener("click",function(e){
        if(!vBox||vBox.hidden||!vTap)return;
        var t=e.target;if(vBox.contains(t)||t.closest("button,a,input,textarea,select,label,[contenteditable],.cq-dock,.cq-gb,[data-act],[data-bin],[data-o],[data-set]"))return;
        var w=wordAt(e.clientX,e.clientY);if(w&&w.length>1){vShow(w,true);var res=vBox.querySelector(".cq-vres");res.scrollTop=0}
      },true);
      C.on(function(){VIDX=null;if(vBox&&!vBox.hidden&&!vBox.querySelector(".cq-vq").value)vShow("")});
    }
    vBox.hidden=false;document.documentElement.classList.toggle("cq-vtapping",vTap);
    var b=document.getElementById("cq-vbtn");if(b)b.setAttribute("aria-expanded","true");
    vShow(q||vBox.querySelector(".cq-vq").value||"",!!q);
    if(!q)setTimeout(function(){try{vBox.querySelector(".cq-vq").focus({preventScroll:true})}catch(e){}},50);
  });
};
C.vocabClose=function(){if(vBox)vBox.hidden=true;document.documentElement.classList.remove("cq-vtapping");var b=document.getElementById("cq-vbtn");if(b)b.setAttribute("aria-expanded","false")};
C.vocabButton=function(){
  if(document.getElementById("cq-vbtn"))return;
  var b=document.createElement("button");b.type="button";b.id="cq-vbtn";b.className="cq-vbtn";b.setAttribute("aria-expanded","false");b.setAttribute("aria-label","Vocabolario");b.title="Vocabolario";
  b.innerHTML='<span aria-hidden="true">📖</span>';
  b.addEventListener("click",function(){if(vBox&&!vBox.hidden)C.vocabClose();else{C.guideClose&&C.guideClose();C.vocabOpen()}});
  C.dock().appendChild(b);
  setInterval(function(){b.hidden=!!document.querySelector(".cq-gate")},900);
};

/* ===== percorso semplice per i bambini: la maestra sceglie le sezioni, i bambini le vedono numerate con «Avanti» ===== */
function tabKey(el){return el.getAttribute("href")||("#"+(el.id||""))}
function tabItems(){
  var box=document.querySelector(".tabs");if(!box)return [];
  return Array.prototype.filter.call(box.querySelectorAll('a[href^="#"],[role=tab]'),function(el){
    var k=tabKey(el);return !el.hasAttribute("data-teacher")&&!/lezione|maestra/.test(k);
  });
}
function tabName(el){var c=el.cloneNode(true);Array.prototype.forEach.call(c.querySelectorAll(".cq-n"),function(x){x.remove()});return c.textContent.replace(/\s+/g," ").trim()}
function tabOn(el){return el.classList.contains("on")||el.getAttribute("aria-selected")==="true"||el.getAttribute("aria-current")==="page"}
C.hiddenSecs=function(){return ((C.settings.hideSec||{})[C.PAGE])||[]};
C.simplePath=function(){
  if(!C.GAMES.some(function(g){return g.k===C.PAGE}))return;
  var bar=null,nextBtn=null,last="";
  function apply(){
    var items=tabItems();if(!items.length)return;
    var box=items[0].parentNode,teach=C.teacher(),H=C.hiddenSecs(),n=0;
    document.documentElement.classList.toggle("cq-teach",teach);
    box.classList.toggle("cq-steps",!teach);
    items.forEach(function(el){
      var hid=!teach&&H.indexOf(tabKey(el))>=0;
      el.classList.toggle("cq-hid",hid);
      var num=el.querySelector(".cq-n");
      if(!teach&&!hid){n++;if(!num){num=document.createElement("span");num.className="cq-n";num.setAttribute("aria-hidden","true");el.insertBefore(num,el.firstChild)}num.textContent=n}
      else if(num)num.remove();
    });
    var vis=items.filter(function(el){return !el.classList.contains("cq-hid")});
    var cur=items.filter(tabOn)[0];
    if(!teach&&cur&&cur.classList.contains("cq-hid")&&vis[0])vis[0].click();
    /* maestra: scelta delle sezioni */
    if(teach&&C.canTeach()){
      if(!bar){bar=document.createElement("div");bar.className="cq-secbar";var nav=box.closest("nav")||box;nav.parentNode.insertBefore(bar,nav.nextSibling)}
      var sig=JSON.stringify(H)+items.length;
      if(bar.dataset.sig!==sig){bar.dataset.sig=sig;
        bar.innerHTML='<div class="cq-secin"><b>Sezioni per i bambini:</b>'+items.map(function(el){var k=tabKey(el),on=H.indexOf(k)<0;return '<button type="button" data-sec="'+C.esc(k)+'" aria-pressed="'+on+'">'+(on?'👁 ':'🚫 ')+C.esc(tabName(el))+'</button>'}).join("")+'<small>Le sezioni spente non si vedono; le altre diventano un percorso numerato con «Avanti».</small></div>';
        Array.prototype.forEach.call(bar.querySelectorAll("[data-sec]"),function(b){b.addEventListener("click",function(){
          var all=C.clone(C.settings.hideSec||{}),h=(all[C.PAGE]||[]).slice(),k=b.dataset.sec,i=h.indexOf(k);
          if(i>=0)h.splice(i,1);else{if(items.length-h.length<=1){C.toast("Lascia almeno una sezione accesa.");return}h.push(k)}
          all[C.PAGE]=h;C.saveSettings({hideSec:all});bar.dataset.sig="";apply();
        })});
      }
      bar.hidden=false;
    }else if(bar)bar.hidden=true;
    /* bambini: pulsante Avanti in fondo alla sezione (non copre i giochi) */
    if(!nextBtn){nextBtn=document.createElement("div");nextBtn.className="cq-nextwrap";nextBtn.innerHTML='<button type="button" class="cq-next"></button>';
      nextBtn.firstChild.addEventListener("click",function(){var t=nextBtn._t;if(t){t.click();window.scrollTo({top:Math.max(0,(document.querySelector("nav")||document.body).offsetTop-4),behavior:"smooth"})}})}
    var i=cur?vis.indexOf(cur):-1,nx=i>=0?vis[i+1]:null;
    var show=!teach&&nx&&!document.querySelector(".cq-gate")&&visibleEl(box);
    var sec=null;if(cur){var hk=(cur.getAttribute("href")||"").slice(1);sec=(hk&&(document.getElementById("sec-"+hk)||document.getElementById(hk)))||document.getElementById(cur.getAttribute("aria-controls")||"")}
    if(show&&sec){nextBtn._t=nx;var lbl='Avanti: '+(i+2)+'. '+tabName(nx)+' ▶';var bt=nextBtn.firstChild;if(bt.dataset.l!==lbl){bt.dataset.l=lbl;bt.textContent=lbl}
      if(nextBtn.parentNode!==sec||sec.lastElementChild!==nextBtn)sec.appendChild(nextBtn);nextBtn.hidden=false}
    else nextBtn.hidden=true;
  }
  function visibleEl(el){return !!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)}
  document.documentElement.classList.add("cq-app");
  apply();setInterval(apply,700);C.on(apply);
};
C.allGames=function(){
  var links=(C.settings.links||[]).map(function(l){return {k:l.id,by:l.by,t:l.t,s:l.s,href:l.href,d:l.d||"",ext:true}});
  return C.GAMES.concat(links);
};
/* app disattivate dalla maestra: spariscono dalla pagina dei bambini e non si aprono senza PIN */
C.isOff=function(k){return !!(C.settings.off||{})[k]};
C.setOff=function(k,v){var o=C.clone(C.settings.off||{});if(v)o[k]=1;else delete o[k];return C.saveSettings({off:o})};
C.appOwner=function(k){var g=C.allGames().filter(function(x){return x.k===k})[0];return g?(g.by||"t1"):null};
C.canTeach=function(){return C.mode==="local"||C.isOwner||C.canWrite};
C.teacherId=function(){
  var v=null;try{v=sessionStorage.getItem(TK)}catch(e){}
  if(v==="off")return null;
  if(!v){var r=C.remembered();if(r){var who=null;try{who=localStorage.getItem(WHO)}catch(e){}if(!who){v=r;try{sessionStorage.setItem(TK,v)}catch(e){}}}}
  if(v==="1")v="t1";
  return v&&C.tById(v)?v:null;
};
C.me=function(){return C.tById(C.teacherId())};
/* in un'app, la modalità maestra vale solo per la maestra che l'ha portata nell'Accademia */
C.teacher=function(){
  var id=C.teacherId();if(!id)return false;
  if(C.GAMES.some(function(g){return g.k===C.PAGE}))return C.appOwner(C.PAGE)===id;
  return true;
};
C.otherTeacherHere=function(){var id=C.teacherId();return !!id&&!C.teacher()};
/* "resta collegata": la maestra può salvare il PIN su questo dispositivo */
C.remembered=function(){var r=null;try{r=JSON.parse(localStorage.getItem(RK)||"null")}catch(e){}if(!r||!r.id)return null;var t=C.tById(r.id);return t&&t.pin&&t.pin===r.pin?r.id:null};
C.remember=function(id){var t=C.tById(id);if(!t||!t.pin)return;try{localStorage.setItem(RK,JSON.stringify({id:id,pin:t.pin}))}catch(e){}};
C.forget=function(){try{localStorage.removeItem(RK)}catch(e){}};
C.rememberBox=function(){return '<label class="cq-keep"><input type="checkbox" name="keep" checked> <span><b>Resta collegata su questo dispositivo</b><small>Il PIN viene salvato: la prossima volta entri senza scriverlo. Non usarlo sulla LIM o su computer condivisi.</small></span></label>'};
C.setTeacher=function(v,silent){if(v===true)v=C.pinTeacher||"t1";if(!v&&window.Registro&&window.Registro.kind()==="t")window.Registro.logout();try{if(v)sessionStorage.setItem(TK,v);else sessionStorage.setItem(TK,"off")}catch(e){}if(v)setTimeout(C.bkAuto,500);if(!silent)notify()};
/* il PIN dice chi è la maestra. newFor: id della maestra che sceglie il suo primo PIN */
C.checkPin=function(pin,newFor){
  pin=String(pin||"").trim();C.pinTeacher=null;
  var list=C.teachers();
  if(newFor||!list.some(function(t){return t.pin})){
    var tid=newFor||list[0].id;
    if(!/^\d{4,8}$/.test(pin))return "Usa da 4 a 8 cifre.";
    if(list.some(function(t){return t.pin===pin&&t.id!==tid}))return "Questo PIN è già usato da un'altra maestra: scegline un altro.";
    C.saveTeachers(list.map(function(t){return t.id===tid?Object.assign({},t,{pin:pin}):t}));C.pinTeacher=tid;return "";
  }
  for(var i=0;i<list.length;i++)if(list[i].pin&&list[i].pin===pin){C.pinTeacher=list[i].id;return ""}
  return "PIN sbagliato.";
};
C.newTeachers=function(){return C.teachers().filter(function(t){return !t.pin&&!t.hp})};
/* keep: resta collegato su questo dispositivo (localStorage); altrimenti solo finché la scheda è aperta */
C.setWho=function(id,keep){memWho=id;C.setTeacher(false,true);try{sessionStorage.setItem(WHO,id)}catch(e){}try{if(keep===false)localStorage.removeItem(WHO);else localStorage.setItem(WHO,id)}catch(e){}notify()};
C.keepKidBox=function(){return '<label class="cq-keep"><input type="checkbox" name="keepkid" checked> <span><b>Resta collegato su questo dispositivo</b><small>La prossima volta entri senza scrivere il codice. Togli la spunta se il tablet o il computer lo usano anche i compagni.</small></span></label>'};
C.logout=function(){if(window.Registro&&window.Registro.kind()==="p")window.Registro.logout();memWho=null;try{sessionStorage.removeItem(WHO)}catch(e){}try{localStorage.removeItem(WHO)}catch(e){}notify()};

/* ---------- interfaccia condivisa ---------- */
function el(html){var d=document.createElement("div");d.innerHTML=html;return d.firstElementChild}
var toastEl=null,toastT=null;
C.toast=function(msg){
  if(!toastEl){toastEl=el('<div class="cq-toast" role="status" hidden></div>');document.body.appendChild(toastEl)}
  toastEl.textContent=msg;toastEl.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){toastEl.hidden=true},3600);
};
var ac=null;
C.tone=function(seq){
  try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();var t=ac.currentTime;
    seq.forEach(function(x){var o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.value=x[0];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+x[1]);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+x[1]+.03);t+=x[1]})}catch(e){}
};
C.evoQueue=[];
var ovEl=null;
function showEvo(){
  if(!ovEl){ovEl=el('<div class="cq-ov" hidden><div class="cq-ovc" role="dialog" aria-modal="true" aria-labelledby="cq-ovt"></div></div>');document.body.appendChild(ovEl);
    ovEl.addEventListener("click",function(e){if(e.target.closest("[data-cq=close]")){ovEl.hidden=true;showEvo()}});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!ovEl.hidden){ovEl.hidden=true;showEvo()}});
  }
  if(!ovEl.hidden||!C.evoQueue.length)return;
  var e=C.evoQueue.shift();
  var pw=e.pows.map(function(p){return '<div class="cq-pw" style="--ec:'+p.c+'"><span class="cq-pwi" style="background:'+p.c+'">'+C.icon(p.el)+'</span><div><b>Nuovo potere magico: '+C.esc(p.name)+'</b><span>'+C.esc(p.d)+'</span><small>In classe: '+C.esc(p.perk)+'</small></div></div>'}).join("");
  ovEl.firstElementChild.innerHTML='<h2 id="cq-ovt">Evoluzione!</h2><p><b>'+C.esc(e.n)+'</b> diventa <b>'+C.esc(e.stage)+'</b></p>'+
    '<div class="cq-evo"><div class="a">'+e.from+'</div><span class="arr">→</span><div class="b">'+e.to+'</div></div>'+pw+
    '<div class="cq-rito"><b>Rito in movimento.</b> Tutta la classe si accovaccia, conta fino a tre e si alza con le braccia aperte. Poi un applauso a ritmo.</div>'+
    '<button class="cq-btn pri" type="button" data-cq="close">Evviva!</button>';
  ovEl.hidden=false;
  C.tone([[523,.12],[659,.12],[784,.12],[1047,.35]]);
  var b=ovEl.querySelector("[data-cq=close]");if(b)b.focus();
}
C.showEvo=showEvo;

/* striscia con l'avatar in alto nelle app: si aggiorna da sola a ogni punto */
C.chip=function(host,id,subj,opts){
  opts=opts||{};
  var lastXp=null;
  function draw(){
    var p=id&&C.pupils[id];if(!p){host.innerHTML="";return}
    var st=C.stageOf(p.xp||0),t=C.thr(),xp=p.xp||0;
    var LI=C.lvInfo(p),pc=LI.pc;
    var v=(p.sj||{})[subj]||0,sd=C.subjOf(subj);
    host.innerHTML='<div class="cq-chip'+(lastXp!=null&&xp>lastXp?' up':'')+'"><div class="cq-chav">'+C.avatar(p,{subj:subj,medals:false})+'</div>'+
      '<div class="cq-chtx"><b>'+C.esc(p.n)+'</b><span>'+LI.name+' · '+xp+' ★</span><span class="cq-chbar"><i style="width:'+pc+'%"></i></span><small>'+C.esc(sd?sd.cos:"")+': '+v+' ★ in '+C.esc(sd?sd.n:"")+(!LI.max?' · prossima evoluzione a '+LI.at+' ★':' · '+LI.name+'!')+'</small></div>'+
      '<div class="cq-chbt"><a class="cq-btn sm" href="index.html">Il mio avatar</a><button class="cq-btn sm" type="button" data-cq="out">Esci</button><button class="cq-btn sm cq-fs" type="button" hidden>Schermo intero</button></div></div>';
    lastXp=xp;
    C.fsButton(host.querySelector(".cq-fs"));
  }
  host.addEventListener("click",function(e){if(e.target.closest("[data-cq=out]")){C.logout();if(opts.onLogout)opts.onLogout()}});
  C.on(draw);draw();
  return {redraw:draw,setId:function(i){id=i;lastXp=null;draw()}};
};

/* schermata d'accesso con il codice per le app */
C.gate=function(opts){
  opts=opts||{};
  return C.boot().then(function(){return new Promise(function(res){
    var g=el('<div class="cq-gate"><div class="cq-gc"></div></div>');document.body.appendChild(g);
    var box=g.firstElementChild;
    function finish(v){g.remove();res(v)}
    var home=opts.noHome?'':'<a class="cq-home" href="index.html">← Accademia dei Talenti</a>';
    function askCode(err){
      box.innerHTML='<p class="cq-eye">'+C.esc(opts.title||"Accademia dei Talenti")+'</p><h2>Chi gioca?</h2><p>Scrivi il codice del tuo cartellino. I punti fanno crescere il tuo avatar.</p>'+
        '<form class="cq-form" autocomplete="off"><label for="cq-code">Il mio codice</label><input id="cq-code" type="text" maxlength="14" autocapitalize="characters" spellcheck="false" placeholder="Per esempio LUPO-42"><p class="cq-err" role="alert">'+C.esc(err||"")+'</p>'+C.keepKidBox()+'<button class="cq-btn pri" type="submit">Entra</button></form>'+
        (C.loaded&&!Object.keys(C.pupils).length?'<p class="cq-note">'+(C.mode==="local"&&!C.db?'Questo dispositivo non è collegato al registro della classe: per entrare con il codice bisogna aprire l\'Accademia dopo aver fatto l\'accesso a Claude con un account a cui la maestra l\'ha condivisa.':'La maestra non ha ancora creato i codici nel portale Accademia dei Talenti.')+'</p>':'')+
        (C.loadFail?'<p class="cq-note">Non riesco a leggere i codici. Controlla la connessione e ricarica la pagina.</p>':'')+
        (C.canTeach()?'<button class="cq-btn ghost" type="button" data-cq="teach">Area maestra</button>':'')+home;
      var f=box.querySelector("form"),inp=box.querySelector("input");
      f.addEventListener("submit",function(e){e.preventDefault();
        var kk0=f.querySelector("[name=keepkid]");
        if(window.Registro){var bt=f.querySelector("button[type=submit]"),cv=inp.value,kp0=!!(kk0&&kk0.checked);bt.disabled=true;bt.textContent="Controllo…";
          window.Registro.login("p",cv,kp0).then(function(r){if(!r.ok||!r.id||!C.pupils[r.id]){askCode(r.ok?"Codice non trovato. Controlla il cartellino e riprova.":r.err);return}C.setWho(r.id,kp0);finish({id:r.id})});return}
        var id=C.findByCode(inp.value);
        if(!id){askCode(inp.value.trim()?"Codice non trovato. Controlla il cartellino e riprova.":"Scrivi il tuo codice.");return}
        var kk=f.querySelector("[name=keepkid]");C.setWho(id,!kk||kk.checked);finish({id:id});
      });
      var t=box.querySelector("[data-cq=teach]");if(t)t.addEventListener("click",function(){if(C.teacher())finish({teacher:true});else if(C.otherTeacherHere())notMine();else askPin()});
      setTimeout(function(){try{inp.focus()}catch(e){}},50);
    }
    function notMine(){
      var o=C.tById(C.appOwner(C.PAGE)),me=C.me();
      box.innerHTML='<p class="cq-eye">'+C.esc(opts.title||"Accademia dei Talenti")+'</p>'+C.tAvatar(o,"big")+'<h2>Questa app è della '+C.esc(C.tName(o))+'</h2><p>La lezione e le parti riservate le vede solo lei. '+(me?'Tu, '+C.esc(C.tName(me))+', puoi far giocare un alunno con il suo codice.':'')+'</p><div class="cq-row"><button class="cq-btn pri" type="button" data-cq="tkid">Fai entrare un alunno</button></div>'+home;
      box.querySelector("[data-cq=tkid]").addEventListener("click",function(){C.setTeacher(false,true);askCode()});
    }
    function askPin(err){
      var has=C.teachers().some(function(t){return t.pin||t.hp});
      box.innerHTML='<p class="cq-eye">Area maestra</p><h2>'+(has?'Scrivi il PIN':'Scegli un PIN')+'</h2><p>'+(has?'È lo stesso PIN dell\'Accademia dei Talenti e di tutte le app. Le parti per la maestra restano nascoste ai bambini.':'Scegli un PIN da 4 a 8 cifre: vale in tutte le app della classe.')+'</p>'+
        '<form class="cq-form" autocomplete="off"><label for="cq-pin">PIN</label><input id="cq-pin" type="password" inputmode="numeric" maxlength="8" placeholder="••••"><p class="cq-err" role="alert">'+C.esc(err||"")+'</p>'+C.rememberBox()+'<button class="cq-btn pri" type="submit">'+(has?'Entra':'Salva il PIN ed entra')+'</button></form>'+
        '<button class="cq-btn ghost" type="button" data-cq="back">← Torna al codice</button>'+home;
      var f=box.querySelector("form"),inp=box.querySelector("input");
      f.addEventListener("submit",function(e){e.preventDefault();
        var keep=f.querySelector("[name=keep]");keep=keep&&keep.checked;
        var pv=inp.value;
        if(window.Registro){var bt=f.querySelector("button[type=submit]");bt.disabled=true;bt.textContent="Controllo…";
          window.Registro.login("t",pv,keep).then(function(r){if(!r.ok){askPin(r.err);return}pinOk(pv,keep)});return}
        pinOk(pv,keep);
      });
      function pinOk(pv,keep){
        var er=C.checkPin(pv);if(er){askPin(er);return}
        memWho=null;try{sessionStorage.removeItem(WHO)}catch(e){}try{localStorage.removeItem(WHO)}catch(e){}C.setTeacher(C.pinTeacher);if(keep)C.remember(C.pinTeacher);else C.forget();
        if(!C.teacher()){notMine();return}
        finish({teacher:true});
      }
      box.querySelector("[data-cq=back]").addEventListener("click",function(){askCode()});
      setTimeout(function(){try{inp.focus()}catch(e){}},50);
    }
    function teacherOn(){
      box.innerHTML='<p class="cq-eye">'+C.esc(opts.title||"Accademia dei Talenti")+'</p><h2>Modalità maestra attiva</h2><p>Hai già scritto il PIN: vale in tutte le app della classe finché non fai entrare un alunno.</p><div class="cq-row"><button class="cq-btn pri" type="button" data-cq="tgo">Continua come maestra</button><button class="cq-btn ghost" type="button" data-cq="tkid">Fai entrare un alunno</button></div>'+home;
      box.querySelector("[data-cq=tgo]").addEventListener("click",function(){finish({teacher:true})});
      box.querySelector("[data-cq=tkid]").addEventListener("click",function(){C.setTeacher(false,true);askCode()});
    }
    function closed(){
      var g=C.allGames().filter(function(x){return x.k===C.PAGE})[0],o=C.tById(C.appOwner(C.PAGE));
      box.innerHTML='<p class="cq-eye">'+C.esc(opts.title||"Accademia dei Talenti")+'</p><div class="cq-closed" aria-hidden="true">🔒</div><h2>Questa app per ora è chiusa</h2><p>'+(o?'La '+C.esc(C.tName(o)):'La maestra')+' la aprirà quando sarà il momento. Intanto puoi giocare con le altre app dell\'Accademia.</p><div class="cq-row"><a class="cq-btn pri" href="index.html">Vai alle altre app</a>'+(C.canTeach()?'<button class="cq-btn ghost" type="button" data-cq="teach">Area maestra</button>':'')+'</div>';
      var t=box.querySelector("[data-cq=teach]");if(t)t.addEventListener("click",function(){if(C.teacher())finish({teacher:true});else askPin()});
    }
    var cur=C.who();
    if(C.isOff(C.PAGE)&&!C.teacher())closed();
    else if(!cur&&C.teacher()&&C.canTeach())teacherOn();
    else if(!cur&&C.otherTeacherHere()&&C.canTeach())notMine();
    else if(cur&&!opts.ask){C.setTeacher(false,true);finish({id:cur})}
    else if(cur){
      var p=C.pupils[cur];
      box.innerHTML='<p class="cq-eye">'+C.esc(opts.title||"")+'</p><div class="cq-gav">'+C.avatar(p,{subj:opts.subj})+'</div><h2>Ciao '+C.esc(p.n)+'!</h2><p>Sei proprio tu?</p><div class="cq-row"><button class="cq-btn pri" type="button" data-cq="yes">Sì, gioco io</button><button class="cq-btn ghost" type="button" data-cq="no">No, cambia</button></div>'+home;
      box.querySelector("[data-cq=yes]").addEventListener("click",function(){C.setTeacher(false,true);finish({id:cur})});
      box.querySelector("[data-cq=no]").addEventListener("click",function(){C.logout();askCode()});
    }else askCode();
  })});
};

/* schermo intero sul tablet */
C.fsButton=function(btn){
  if(!btn)return;
  var d=document,el=d.documentElement;
  var can=!!(d.fullscreenEnabled||d.webkitFullscreenEnabled);
  if(!can){btn.hidden=true;return}
  btn.hidden=false;
  btn.classList.add("cq-fsb");
  function label(){Array.prototype.forEach.call(d.querySelectorAll(".cq-fsb"),function(b){b.textContent=(d.fullscreenElement||d.webkitFullscreenElement)?"Esci da schermo intero":"Schermo intero"})}
  btn.addEventListener("click",function(){
    try{
      if(d.fullscreenElement||d.webkitFullscreenElement){(d.exitFullscreen||d.webkitExitFullscreen).call(d)}
      else{var r=(el.requestFullscreen||el.webkitRequestFullscreen).call(el);if(r&&r.catch)r.catch(function(){btn.hidden=true})}
    }catch(e){btn.hidden=true}
  });
  if(!C._fsl){C._fsl=1;d.addEventListener("fullscreenchange",label);d.addEventListener("webkitfullscreenchange",label)}
  label();
};

/* cartellini da stampare */
C.cardsHTML=function(){
  var cards=C.sortedIds().map(function(id){var p=C.pupils[id];var col=C.colorHex(p.co);
    return '<div class="c" style="border-color:'+col+'"><div class="t" style="background:'+col+'">Accademia dei Talenti</div><div class="n">'+C.esc(p.n)+'</div><div class="k">'+C.esc(C.fmtCode(p.code||""))+'</div><div class="h">Il mio codice segreto: lo scrivo per entrare nelle app della classe.</div></div>'}).join("");
  return '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>Codici della classe</title><style>body{font-family:Arial,sans-serif;margin:16px;color:#1F3A56}h1{font-size:20px}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.c{border:3px solid;border-radius:14px;overflow:hidden;text-align:center;break-inside:avoid;padding-bottom:10px}.t{color:#fff;font-weight:700;padding:6px;font-size:13px}.n{font-size:22px;font-weight:700;margin-top:8px}.k{font-size:30px;font-weight:800;letter-spacing:2px;margin:6px 0;font-family:"Courier New",monospace}.h{font-size:11px;padding:0 10px;color:#546B82}@media print{body{margin:0}}</style></head><body><h1>Codici d\'accesso della classe</h1><div class="g">'+cards+'</div></body></html>';
};
/* ===== limite di tempo per ogni bambino in tutta l'Accademia =====
   impostazioni (minuti, 0 = nessun limite): tDay al giorno, tTurn per volta, tRest pausa prima di rientrare.
   Il tempo conta solo nelle app, solo per gli alunni, solo se la pagina è aperta e il bambino la sta usando. */
C.timeLim=function(){var s=C.settings||{};function v(k,d){return s[k]!=null&&s[k]!==""?+s[k]:d}return{day:v("tDay",40),turn:v("tTurn",20),rest:v("tRest",15)}};
(function(){
  var TICK=5,lastAct=Date.now(),dirty=0,box=null,chip=null,warned=false;
  function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
  function isApp(){return C.PAGE!=="verifica"&&C.GAMES&&C.GAMES.some(function(g){return g.k===C.PAGE})}
  function kid(){if(!isApp()||(C.teacher&&C.teacher()))return null;var id=C.who&&C.who();return id&&C.pupils[id]?id:null}
  function st(id){var p=C.pupils[id],t=Object.assign({d:"",s:0,ss:0,last:0,lock:0},p.tm||{});if(t.d!==today()){t.d=today();t.s=0;t.ss=0;t.lock=0;t.ok=0}return t}
  function save(id,t,force){var p=C.pupils[id];if(!p)return;var q=C.clone(p);q.tm=t;if(force||++dirty>=6){dirty=0;C.put(id,q)}else{C.pupils[id]=q}}
  function mm(sec){sec=Math.max(0,Math.ceil(sec));var m=Math.floor(sec/60),s=sec%60;return m+":"+("0"+s).slice(-2)}
  ["pointerdown","keydown","wheel","touchstart"].forEach(function(e){window.addEventListener(e,function(){lastAct=Date.now()},{passive:true,capture:true})});
  function ensure(){
    if(!chip){chip=document.createElement("div");chip.className="cq-tchip";chip.setAttribute("role","timer");chip.hidden=true;try{C.dock().appendChild(chip)}catch(e){document.body.appendChild(chip)}}
    if(!box){box=document.createElement("div");box.className="cq-tlock";box.hidden=true;box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");document.body.appendChild(box)}
  }
  function showLock(id,t,L,kind){
    ensure();var p=C.pupils[id],left=kind==="day"?0:(t.lock-Date.now())/1000;
    var moves=["Fai 10 saltelli sul posto","Allunga le braccia verso il cielo e poi tocca le punte dei piedi","Cammina come un robot fino alla finestra e torna","Fai 5 respiri lenti, come un palloncino che si gonfia","Disegna nell'aria il tuo nome con il gomito"];
    box.innerHTML='<div class="cq-tcard"><div class="cq-tpav">'+C.avatar(p,{medals:false})+'</div>'+
      (kind==="day"?'<h2>Per oggi basta schermo! 🌙</h2><p>Hai usato tutti i tuoi '+L.day+' minuti di oggi, '+C.esc(p.n)+'. Le app ti aspettano domani!</p>'
        :'<h2>Pausa! ⏸️</h2><p>Hai giocato '+L.turn+' minuti di fila, '+C.esc(p.n)+'. Riposa gli occhi e muoviti un po\'.</p><p class="cq-tbig" data-cd>'+mm(left)+'</p><p class="cq-tmove">🤸 '+moves[Math.floor(Math.random()*moves.length)]+'</p>')+
      '<div class="cq-row"><button type="button" class="cq-btn ghost" data-t="out">Cambia alunno</button><button type="button" class="cq-btn ghost" data-t="pin">Sblocca (maestra)</button></div><div data-t="pinbox" hidden><input type="password" inputmode="numeric" maxlength="8" placeholder="PIN della maestra" aria-label="PIN della maestra"><button type="button" class="cq-btn pri" data-t="ok">Sblocca</button><small data-t="err"></small></div></div>';
    box.hidden=false;document.documentElement.classList.add("cq-tlocked");
    box.querySelector('[data-t="out"]').onclick=function(){box.hidden=true;document.documentElement.classList.remove("cq-tlocked");C.logout();location.reload()};
    box.querySelector('[data-t="pin"]').onclick=function(){var pb=box.querySelector('[data-t="pinbox"]');pb.hidden=false;pb.querySelector("input").focus()};
    box.querySelector('[data-t="ok"]').onclick=function(){var v=box.querySelector('[data-t="pinbox"] input').value,list=C.teachers();
      if(!list.some(function(x){return x.pin})||C.checkPin(v)!==""){box.querySelector('[data-t="err"]').textContent="PIN sbagliato.";return}
      var t2=st(id);t2.lock=0;t2.ss=0;t2.ok=(t2.ok||0)+1;if(kind==="day")t2.s=Math.max(0,L.day*60-L.turn*60);save(id,t2,true);hideLock();C.toast("Sbloccato dalla maestra: buon lavoro!")};
  }
  function hideLock(){if(box){box.hidden=true;document.documentElement.classList.remove("cq-tlocked")}}
  function tick(){
    var id=kid();ensure();
    if(!id){chip.hidden=true;hideLock();return}
    var L=C.timeLim(),t=st(id),now=Date.now();
    if(!L.day&&!L.turn){chip.hidden=true;hideLock();return}
    if(t.last&&now-t.last>L.rest*60000){t.ss=0}
    if(t.lock&&now>=t.lock){t.lock=0;t.ss=0;warned=false;save(id,t,true);hideLock()}
    if(L.day&&t.s>=L.day*60){showLock(id,t,L,"day");chip.hidden=true;return}
    if(t.lock){if(!box||box.hidden)showLock(id,t,L,"turn");var cd=box.querySelector("[data-cd]");if(cd)cd.textContent=mm((t.lock-now)/1000);chip.hidden=true;return}
    hideLock();
    var active=!document.hidden&&now-lastAct<90000;
    if(active){t.s+=TICK;t.ss+=TICK;t.last=now}
    var leftTurn=L.turn?L.turn*60-t.ss:1e9,leftDay=L.day?L.day*60-t.s:1e9,left=Math.min(leftTurn,leftDay);
    chip.hidden=false;chip.textContent="⏱️ "+mm(left);chip.title="Tempo che ti resta "+(leftTurn<leftDay?"prima della pausa":"per oggi");chip.classList.toggle("low",left<=120);
    if(left<=120&&!warned){warned=true;C.toast(leftTurn<leftDay?"Tra 2 minuti c'è la pausa: finisci quello che stai facendo!":"Tra 2 minuti finisce il tempo di oggi.")}
    if(L.turn&&t.ss>=L.turn*60){t.lock=now+L.rest*60000;t.ss=0;save(id,t,true);showLock(id,t,L,"turn");return}
    if(L.day&&t.s>=L.day*60){save(id,t,true);showLock(id,t,L,"day");return}
    if(active)save(id,t,false);
  }
  document.addEventListener("visibilitychange",function(){var id=kid();if(document.hidden&&id&&C.pupils[id]&&C.pupils[id].tm)save(id,st(id),true)});
  setInterval(function(){if(C.loaded!==false)try{tick()}catch(e){}},TICK*1000);
  C.on&&C.on(function(){try{var id=kid();if(!id)hideLock()}catch(e){}});
})();

/* ===== scrittura in stampatello maiuscolo ad alta leggibilità per gli alunni che ne hanno bisogno ===== */
(function(){
  function apply(){try{var id=C.who&&C.who(),p=id&&C.pupils&&C.pupils[id],on=!!(p&&p.caps&&!(C.teacher&&C.teacher()));document.documentElement.classList.toggle("cq-caps",on)}catch(e){}}
  C.on(apply);setInterval(apply,3000);if(document.readyState!=="loading")apply();else document.addEventListener("DOMContentLoaded",apply);
})();
})();
