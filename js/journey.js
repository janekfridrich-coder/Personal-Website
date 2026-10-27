/* =========================================================================
   JOURNEY.JS
   -------------------------------------------------------------------------
   Animated route map on journey.html.

   Data:  window.EUROPE_MAP (js/europe-map.js, generated) — land paths, city
          positions and three camera frames, all in one projected coordinate
          system.
          SITE.journey (js/content.js) — the route, internships and UI texts.

   Story: Europe → Czechia turns red → zoom in → school #1 → line to school
          #2 → internship dots → zoom out while the line travels to Lyon.
   ========================================================================= */
(function () {
  "use strict";

  const M = window.EUROPE_MAP;
  const mount = document.getElementById("jmap");
  const svg = document.getElementById("jmapSvg");
  if (!M || !mount || !svg || typeof SITE === "undefined" || !SITE.journey) return;

  const J = SITE.journey;
  const UI = J.ui;
  const NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = M.cities;
  const F = M.frames;

  /* ---------- small helpers ------------------------------------------- */
  function el(name, attrs, parent) {
    const n = document.createElementNS(NS, name);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  const $ = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

  /* ---------- static texts -------------------------------------------- */
  $("jEyebrow").textContent = UI.eyebrow;
  $("jHeading").innerHTML = UI.heading;
  $("jBtnEurope").textContent = UI.viewEurope;
  $("jBtnCzechia").textContent = UI.viewCzechia;
  $("jBtnRoute").textContent = UI.viewRoute;
  $("jmapReplay").lastElementChild.textContent = UI.replay;
  $("jmapTitle").textContent = UI.mapTitle;
  $("jmapDesc").textContent = UI.mapDesc;
  $("jLegendSchool").textContent = UI.legendSchool;
  $("jLegendIntern").textContent = UI.legendInternships + ": " + J.internships.map((i) => i.place).join(" · ");

  /* ---------- SVG scene ------------------------------------------------ */
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const gLand = el("g", { class: "jm-land" }, svg);
  el("path", { d: M.land }, gLand);
  const czPath = el("path", { d: M.cz, class: "jm-cz" }, svg);

  // Route: Valašské Meziříčí → Ostrava (short hop) and Ostrava → Lyon (long arc).
  function arc(a, b, bend) {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const cx = mx + (-dy / len) * len * bend;
    const cy = my + (dx / len) * len * bend;
    return `M${a[0]},${a[1]} Q${cx.toFixed(2)},${cy.toFixed(2)} ${b[0]},${b[1]}`;
  }
  const route = J.route;
  const segs = [];
  for (let i = 0; i < route.length - 1; i++) {
    const a = C[route[i].id], b = C[route[i + 1].id];
    const d = arc(a, b, i === 0 ? -0.2 : 0.2);
    const path = el("path", { d, class: "jm-seg", pathLength: "1" }, svg);
    segs.push({ path, len: path.getTotalLength() });
  }

  // Czechia caption (visible only when zoomed out).
  const czLab = el("g", { class: "jm-czlabel" }, svg);
  const czLabText = el("text", { y: -9, "text-anchor": "middle" }, czLab);
  czLabText.textContent = UI.czechia;
  const czLabX = F.cz.x;
  const czLabY = F.cz.y - F.cz.w * 0.19;

  // Markers.
  const labelAt = {
    // dx/dy/a = full label offset (px) · nx/ny = offset of the small step number on narrow screens
    valmez:     { dx: -14, dy: 21,  a: "end",   nx: -12, ny: 24 },
    ostrava:    { dx: 14,  dy: -14, a: "start", nx: 12,  ny: -10 },
    lyon:       { dx: 16,  dy: -12, a: "start", nx: 0,   ny: -14 },
    praha:      { dx: 0,   dy: -17, a: "middle" },
    sternberk:  { dx: -10, dy: -15, a: "end" },
    koprivnice: { dx: 16,  dy: 5,   a: "start" }
  };
  const stops = {};
  function ensureStop(id) {
    if (stops[id]) return stops[id];
    const xy = C[id];
    const g = el("g", { class: "jm-marker", "data-id": id }, svg);
    const dots = el("g", { class: "jm-dots" }, g);   // scaled down a little when zoomed far out
    el("circle", { class: "jm-ring-i", r: 10 }, dots);
    el("circle", { class: "jm-pulse-i", r: 10 }, dots);
    el("circle", { class: "jm-dot-i", r: 4.5 }, dots);
    el("circle", { class: "jm-pulse-s", r: 6 }, dots);
    el("circle", { class: "jm-dot-s", r: 5.5 }, dots);
    const lab = el("g", { class: "jm-label" }, g);
    const o = labelAt[id] || { dx: 12, dy: -12, a: "start" };
    stops[id] = { id, x: xy[0], y: xy[1], g, dots, lab, o, school: false, intern: false, isRoute: false, order: 0 };
    return stops[id];
  }
  route.forEach((r, i) => {
    const s = ensureStop(r.id);
    s.isRoute = true; s.order = i + 1; s.name = r.name;
    s.g.classList.add("has-school");
  });
  J.internships.forEach((n) => {
    const s = ensureStop(n.id);
    s.place = s.place || n.place;
    s.internPlace = n.place;
  });
  Object.values(stops).forEach((s) => {
    const o = s.o;
    const cls = s.isRoute ? "" : " is-intern-label";
    if (s.isRoute) {
      const leader = el("line", { class: "jm-leader", x1: 0, y1: 0, x2: o.dx * 0.8, y2: o.dy * 0.8 }, s.lab);
      const t = el("text", { class: "jm-t-full", x: o.dx, y: o.dy, "text-anchor": o.a }, s.lab);
      t.textContent = s.name;
      const n = el("text", { class: "jm-t-num", x: o.nx || 0, y: o.ny || -13, "text-anchor": "middle" }, s.lab);
      n.textContent = String(s.order);
      s.leader = leader;
    } else {
      const t = el("text", { class: "jm-t-full" + cls, x: o.dx, y: o.dy, "text-anchor": o.a }, s.lab);
      t.textContent = s.internPlace;
    }
  });

  // Travelling dot that leads the line.
  const trav = el("g", { class: "jm-trav" }, svg);
  el("circle", { r: 11, class: "jm-trav-glow" }, trav);
  el("circle", { r: 3.6, class: "jm-trav-dot" }, trav);
  let travXY = null;

  /* ---------- camera ---------------------------------------------------- */
  let cam = { x: F.europe.x, y: F.europe.y, w: F.europe.w };
  let camToken = 0;

  function apply() {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const vh = cam.w * (r.height / r.width);
    svg.setAttribute("viewBox", `${(cam.x - cam.w / 2).toFixed(3)} ${(cam.y - vh / 2).toFixed(3)} ${cam.w.toFixed(3)} ${vh.toFixed(3)}`);
    const s = cam.w / r.width;               // map units per screen pixel
    mount.style.setProperty("--s", s.toFixed(5));
    const m = Math.max(0.5, Math.min(1, 1.15 - cam.w / 1500));   // smaller dots when the cluster is tiny
    Object.values(stops).forEach((st) => {
      st.g.setAttribute("transform", `translate(${st.x} ${st.y}) scale(${s.toFixed(5)})`);
      st.dots.setAttribute("transform", `scale(${m.toFixed(3)})`);
    });
    czLab.setAttribute("transform", `translate(${czLabX} ${czLabY}) scale(${s.toFixed(5)})`);
    if (travXY) trav.setAttribute("transform", `translate(${travXY[0]} ${travXY[1]}) scale(${s.toFixed(5)})`);
    updateLabels(r.width);
  }

  function updateLabels(width) {
    const narrow = width < 600;
    mount.classList.toggle("is-narrow", narrow);
    const zoomed = cam.w < 300;
    Object.values(stops).forEach((st) => {
      let show = false;
      if (st.school || st.intern) {
        if (zoomed) show = narrow ? st.isRoute : true;
        else show = st.id === "lyon";
      }
      st.lab.classList.toggle("is-show", show);
    });
    czLab.classList.toggle("is-show", cam.w > 500 && mount.classList.contains("is-cz"));
  }

  // Camera frames; on a narrow (phone) map the Czechia frame is tighter.
  function fr(name) {
    const f = F[name];
    const narrow = svg.getBoundingClientRect().width < 600;
    return name === "cz" && narrow ? { x: f.x, y: f.y, w: f.w * 0.8 } : f;
  }

  function fly(target, dur) {
    const token = ++camToken;
    const from = { x: cam.x, y: cam.y, w: cam.w };
    if (!dur || reduceMotion) {
      cam = { x: target.x, y: target.y, w: target.w };
      apply();
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      const t0 = performance.now();
      (function step(now) {
        if (token !== camToken) return resolve(false);
        const p = Math.min(1, (now - t0) / dur);
        const e = ease(p);
        cam.x = from.x + (target.x - from.x) * e;
        cam.y = from.y + (target.y - from.y) * e;
        cam.w = Math.exp(Math.log(from.w) + (Math.log(target.w) - Math.log(from.w)) * e);
        apply();
        if (p < 1) requestAnimationFrame(step); else resolve(true);
      })(t0);
    });
  }

  /* ---------- route drawing -------------------------------------------- */
  function setSeg(i, p) {
    segs[i].path.style.strokeDashoffset = String(1 - p);
  }
  function drawSeg(i, dur, token) {
    return new Promise((resolve) => {
      const seg = segs[i];
      if (!dur || reduceMotion) { setSeg(i, 1); return resolve(true); }
      const t0 = performance.now();
      (function step(now) {
        if (token !== run) return resolve(false);
        const p = Math.min(1, (now - t0) / dur);
        const e = ease(p);
        setSeg(i, e);
        const pt = seg.path.getPointAtLength(seg.len * e);
        travXY = [pt.x, pt.y];
        mount.classList.add("is-travelling");
        apply();
        if (p < 1) requestAnimationFrame(step);
        else { mount.classList.remove("is-travelling"); travXY = null; trav.removeAttribute("transform"); resolve(true); }
      })(t0);
    });
  }

  /* ---------- steps list ------------------------------------------------ */
  const stepsEl = $("jsteps");
  stepsEl.innerHTML = route.map((r, i) => `
    <li class="jstep-li">
      <button type="button" class="jstep" data-step="${i}">
        <span class="jstep-n">${i + 1}</span>
        <span class="jstep-txt"><strong>${r.name}</strong><small>${r.kind} · ${r.place}</small></span>
      </button>
    </li>`).join("");
  const stepBtns = Array.from(stepsEl.querySelectorAll(".jstep"));
  function setStep(reached, current) {
    stepBtns.forEach((b, i) => {
      b.classList.toggle("is-reached", i <= reached);
      b.classList.toggle("is-current", i === current);
    });
  }

  /* ---------- state ----------------------------------------------------- */
  let run = 0;           // cancels a running intro when the user takes over
  let started = false;

  function resetState() {
    mount.classList.remove("is-cz", "is-travelling");
    Object.values(stops).forEach((s) => { s.school = s.intern = false; s.g.classList.remove("is-school", "is-intern"); });
    segs.forEach((_, i) => setSeg(i, 0));
    travXY = null; trav.removeAttribute("transform");
    setStep(-1, -1);
  }
  function showSchool(id) { const s = stops[id]; s.school = true; s.g.classList.add("is-school"); apply(); }
  function showIntern(id) { const s = stops[id]; s.intern = true; s.g.classList.add("is-intern"); apply(); }
  function finalize() {
    mount.classList.add("is-cz");
    route.forEach((r) => showSchool(r.id));
    J.internships.forEach((n) => showIntern(n.id));
    segs.forEach((_, i) => setSeg(i, 1));
    travXY = null; trav.removeAttribute("transform");
    mount.classList.remove("is-travelling");
    setStep(route.length - 1, -1);
  }

  async function play() {
    const token = ++run;
    started = true;
    resetState();
    await fly(F.europe, 0);
    const ok = () => token === run;
    await wait(500); if (!ok()) return;
    mount.classList.add("is-cz"); apply();
    await wait(1200); if (!ok()) return;
    await fly(fr("cz"), 1900); if (!ok()) return;

    showSchool(route[0].id); setStep(0, 0);
    await wait(1000); if (!ok()) return;

    await drawSeg(0, 1200, token); if (!ok()) return;
    showSchool(route[1].id); setStep(1, 1);
    await wait(1100); if (!ok()) return;

    for (const n of J.internships) {
      showIntern(n.id);
      await wait(360); if (!ok()) return;
    }
    await wait(1500); if (!ok()) return;

    const zoomOut = fly(F.route, 2400);
    await wait(500); if (!ok()) return;
    await drawSeg(1, 2800, token); if (!ok()) return;
    await zoomOut; if (!ok()) return;
    showSchool(route[2].id); setStep(2, 2);
  }

  function takeOver() {          // any manual control stops the intro and shows everything
    run++;
    camToken++;
    started = true;
    finalize();
  }

  /* ---------- controls --------------------------------------------------- */
  const focusFrame = (id) => (id === "lyon" ? { x: C.lyon[0], y: C.lyon[1], w: 130 } : { x: C[id][0], y: C[id][1], w: 64 });
  const views = { europe: () => fr("europe"), czechia: () => fr("cz"), route: () => fr("route") };
  const viewBtns = { europe: $("jBtnEurope"), czechia: $("jBtnCzechia"), route: $("jBtnRoute") };
  Object.keys(viewBtns).forEach((k) => {
    viewBtns[k].addEventListener("click", () => {
      takeOver();
      setStep(route.length - 1, -1);
      fly(views[k](), 1400);
    });
  });
  stepBtns.forEach((b) => {
    b.addEventListener("click", () => {
      const i = Number(b.dataset.step);
      takeOver();
      setStep(route.length - 1, i);
      fly(focusFrame(route[i].id), 1400);
      mount.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
  $("jmapReplay").addEventListener("click", () => play());

  /* ---------- boot -------------------------------------------------------- */
  apply();
  if ("ResizeObserver" in window) new ResizeObserver(() => apply()).observe(mount);
  else window.addEventListener("resize", apply);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    $("jmapReplay").hidden = true;
    finalize();
    fly(F.route, 0);
  } else {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !started) { io.disconnect(); play(); }
    }, { threshold: 0.45 });
    io.observe(mount);
  }
})();
