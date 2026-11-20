/* ===== Registro della classe su Foglio Google (per la versione su GitHub Pages) =====
   Quando la pagina NON è dentro Claude, prende il posto del registro di Claude:
   stessi comandi (doc, collection, get, set, delete, onSnapshot), ma i dati vanno
   allo script del Foglio Google indicato in config.js (window.REGISTRO_URL). */
(function () {
  "use strict";
  var URL_ = window.REGISTRO_URL;
  if (!URL_ || (window.claude && window.claude.use)) return;

  var AK = "registro-auth", POLL = 25000;
  var cache = {}, watch = {}, listeners = [], rev = 0, pending = {}, flushT = null, pollT = null, waiters = [];

  function readAuth() {
    var s = null; try { s = sessionStorage.getItem(AK) || localStorage.getItem(AK); } catch (e) {}
    try { return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  var auth = readAuth();
  function saveAuth(a, keep) {
    auth = a;
    try {
      if (!a) { sessionStorage.removeItem(AK); localStorage.removeItem(AK); return; }
      sessionStorage.setItem(AK, JSON.stringify(a));
      if (keep) localStorage.setItem(AK, JSON.stringify(a)); else localStorage.removeItem(AK);
    } catch (e) {}
  }

  function post(body) {
    return fetch(URL_, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), redirect: "follow" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
  }
  var colOf = function (p) { return String(p).split("/")[0]; };
  function apply(out) {
    if (!out || !out.docs) return;
    var w = Object.keys(watch);
    // sostituisce in blocco quello che è osservato
    Object.keys(cache).forEach(function (p) {
      if (w.some(function (x) { return x === p || (x.indexOf("/") < 0 && colOf(p) === x); }) && !(p in out.docs) && !pending[p]) delete cache[p];
    });
    Object.keys(out.docs).forEach(function (p) { if (!pending[p]) cache[p] = out.docs[p]; });
    if (out.rev) rev = out.rev;
    fire();
  }
  function snapDoc(p) { var d = cache[p]; return { id: p.split("/")[1], exists: d !== undefined && d !== null, data: function () { return d == null ? undefined : JSON.parse(JSON.stringify(d)); } }; }
  function snapCol(c) {
    var docs = Object.keys(cache).filter(function (p) { return colOf(p) === c && p.split("/").length === 2 && cache[p] != null; }).sort()
      .map(function (p) { return snapDoc(p); });
    return { docs: docs, size: docs.length, empty: !docs.length };
  }
  function fire() {
    listeners.forEach(function (l) {
      var s = l.col ? snapCol(l.w) : snapDoc(l.w), k = JSON.stringify(l.col ? s.docs.map(function (d) { return [d.id, d.data()]; }) : [s.exists, s.data()]);
      if (k !== l.last || !l.got) { l.last = k; l.got = true; try { l.cb(s); } catch (e) { console.error(e); } }
    });
  }
  function sync(ops, force) {
    var body = { auth: auth, ops: ops || [], watch: Object.keys(watch), rev: force ? 0 : rev };
    return post(body).then(function (out) {
      if (!out.ok && /PIN sbagliato|Codice non trovato/.test(out.err || "") && auth) { saveAuth(null); return sync(ops, true); }
      if (!out.ok) throw new Error(out.err || "errore");
      R.role = out.role; R.id = out.id;
      apply(out); R.online = true; return out;
    }, function (e) { R.online = false; listeners.forEach(function (l) { if (!l.got && l.err) { l.got = true; l.err(e); } }); throw e; });
  }
  function schedulePoll() { clearTimeout(pollT); pollT = setTimeout(function () { if (document.visibilityState !== "hidden" && Object.keys(watch).length) sync([]).catch(function () {}).then(schedulePoll); else schedulePoll(); }, POLL); }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && Object.keys(watch).length) sync([]).catch(function () {}); });

  var firstT = null;
  function addWatch(w) { if (!watch[w]) { watch[w] = 1; clearTimeout(firstT); firstT = setTimeout(function () { sync([], true).catch(function () {}); schedulePoll(); }, 30); } }

  function flush() {
    flushT = null;
    var ps = Object.keys(pending); if (!ps.length) return;
    var ops = ps.map(function (p) { var v = pending[p]; return v.del ? { op: "del", path: p } : { op: "set", path: p, data: v.data }; }), ws = ps.map(function (p) { return pending[p]; });
    pending = {};
    sync(ops, true).then(function (out) {
      (out.res || []).forEach(function (r, i) { if (r.ok) ws[i].ok(); else ws[i].ko(new Error(r.err)); });
    }, function (e) { ws.forEach(function (w) { w.ko(e); }); });
  }
  function write(p, data, del) {
    return new Promise(function (ok, ko) {
      if (del) delete cache[p]; else cache[p] = JSON.parse(JSON.stringify(data));
      var prev = pending[p]; if (prev) prev.ok();
      pending[p] = { data: data, del: del, ok: ok, ko: ko };
      fire(); clearTimeout(flushT); flushT = setTimeout(flush, 250);
    });
  }
  function docRef(p) {
    return {
      id: p.split("/")[1], path: p,
      get: function () {
        if (watch[p] || watch[colOf(p)]) return Promise.resolve(snapDoc(p));
        return post({ auth: auth, ops: [{ op: "get", path: p }] }).then(function (out) {
          var r = (out.res || [])[0]; if (!out.ok || !r || !r.ok) throw new Error((r && r.err) || out.err || "errore");
          if (r.data != null) cache[p] = r.data; else delete cache[p]; return snapDoc(p);
        });
      },
      set: function (d) { return write(p, d, false); },
      update: function (d) { return write(p, Object.assign({}, cache[p] || {}, d), false); },
      delete: function () { return write(p, null, true); },
      onSnapshot: function (cb, err) { var l = { w: p, col: false, cb: cb, err: err }; listeners.push(l); addWatch(p); if (cache[p] !== undefined) setTimeout(fire, 0); return function () { listeners = listeners.filter(function (x) { return x !== l; }); }; }
    };
  }
  var db = {
    doc: docRef,
    collection: function (c) {
      return {
        doc: function (id) { return docRef(c + "/" + id); },
        get: function () { return post({ auth: auth, ops: [], watch: [c], rev: 0 }).then(function (out) { if (!out.ok) throw new Error(out.err); Object.keys(out.docs || {}).forEach(function (p) { cache[p] = out.docs[p]; }); return snapCol(c); }); },
        onSnapshot: function (cb, err) { var l = { w: c, col: true, cb: cb, err: err }; listeners.push(l); addWatch(c); return function () { listeners = listeners.filter(function (x) { return x !== l; }); }; }
      };
    }
  };
  var user = { isOwner: function () { return Promise.resolve(false); }, canEdit: function () { return Promise.resolve(true); }, id: function () { return Promise.resolve("registro"); } };
  var downloads = { save: function (o) {
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([o.data], { type: o.type || "application/octet-stream" })); a.download = o.filename || "file";
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); return Promise.resolve(); } };

  var R = window.Registro = {
    remote: true, role: "anon", id: null, online: true,
    /* kind "p" = codice alunno, "t" = PIN maestra */
    login: function (kind, secret, keep) {
      var a = { k: kind, s: String(secret || "").trim() };
      return post({ auth: a, ops: [], watch: Object.keys(watch), rev: 0 }).then(function (out) {
        if (!out.ok) return { ok: false, err: out.err || "Non riesco a entrare." };
        saveAuth(a, keep); R.role = out.role; R.id = out.id; apply(out); return { ok: true, role: out.role, id: out.id };
      }, function () { return { ok: false, err: "Non riesco a raggiungere il registro. Controlla la connessione." }; });
    },
    logout: function () { saveAuth(null); sync([], true).catch(function () {}); },
    kind: function () { return auth && auth.k; },
    refresh: function () { return sync([], true); },
    importa: function (data) { return post({ import: data }); }
  };
  window.claude = { use: function (n) { return Promise.resolve(n === "db" ? db : n === "user" ? user : n === "downloads" ? downloads : null); } };
})();
