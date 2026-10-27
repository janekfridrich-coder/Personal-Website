/* =========================================================================
   MAIN.JS
   Shared behaviour across every page: injected header/footer, custom cursor,
   mobile nav, scroll reveal, header show/hide. Page-specific bits (home
   world map, timeline accordions, growth chart, journey map) are guarded so
   this single file can be included everywhere.
   ========================================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover:none), (pointer:coarse)").matches;

  /* --------------------------------------------------------------------
     Path helpers — pages live at root and inside /projects/, so injected
     markup needs relative paths adjusted automatically.
  ----------------------------------------------------------------------*/
  const inSubdir = location.pathname.includes("/projects/");
  const root = inSubdir ? "../" : "";
  const currentFile = location.pathname.split("/").pop() || "index.html";

  /* --------------------------------------------------------------------
     Inject header
  ----------------------------------------------------------------------*/
  function buildHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const navLinks = SITE.nav
      .map((item) => {
        const href = root + item.href;
        const isActive = currentFile === item.href || (inSubdir && item.href === "projects.html");
        return `<a href="${href}" class="${isActive ? "is-active" : ""}">${item.label}</a>`;
      })
      .join("");

    const mobileLinks = SITE.nav
      .map((item) => `<li><span class="n">${item.n}</span><a href="${root + item.href}">${item.label}</a></li>`)
      .join("");

    const langToggle = `
      <div class="lang-toggle" id="langToggle" role="group" aria-label="Language">
        <button type="button" data-lang="en" class="${LANG === "en" ? "is-active" : ""}">EN</button>
        <button type="button" data-lang="cs" class="${LANG === "cs" ? "is-active" : ""}">CZ</button>
      </div>
    `;

    mount.innerHTML = `
      <header class="site-header" id="siteHeader">
        <a href="${root}index.html" class="logo">JF<span class="dot">.</span></a>
        <nav class="nav-desktop hidden-mobile" aria-label="Primary">${navLinks}</nav>
        <div style="display:flex; align-items:center; gap:18px;">
          ${langToggle}
          <button class="menu-toggle" id="menuToggle" aria-label="${(typeof STATIC_I18N !== "undefined" ? (STATIC_I18N[LANG]||STATIC_I18N.en).menu_open : "Open menu")}" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <nav class="nav-mobile" id="navMobile" aria-label="Mobile">
        <ul>${mobileLinks}</ul>
        <div class="lang-toggle lang-toggle-mobile" id="langToggleMobile" role="group" aria-label="Language">
          <button type="button" data-lang="en" class="${LANG === "en" ? "is-active" : ""}">EN</button>
          <button type="button" data-lang="cs" class="${LANG === "cs" ? "is-active" : ""}">CZ</button>
        </div>
      </nav>
    `;

    mount.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.getAttribute("data-lang");
        if (chosen === LANG) return;
        try { localStorage.setItem("lang", chosen); } catch (e) {}
        location.reload();
      });
    });
  }

  /* --------------------------------------------------------------------
     Inject footer
  ----------------------------------------------------------------------*/
  function buildFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    const t = (typeof STATIC_I18N !== "undefined" ? (STATIC_I18N[LANG] || STATIC_I18N.en) : {});
    mount.innerHTML = `
      <footer class="site-footer">
        <div>
          <div class="foot-name">${SITE.name}</div>
          <div class="foot-copy">© ${SITE.year}</div>
        </div>
        <div class="footer-links">
          <a href="${root}about.html">${t.footer_about || "About"}</a>
          <a href="${root}projects.html">${t.footer_projects || "Projects"}</a>
          <a href="${root}contact.html">${t.footer_contact || "Contact"}</a>
          <a href="${SITE.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${SITE.links.instagram}" target="_blank" rel="noopener">Instagram</a>
        </div>
        <div class="footer-line">${t.footer_tagline || "Designed somewhere between Excel, the mountains and a festival backstage."}</div>
      </footer>
    `;
  }

  /* --------------------------------------------------------------------
     Inject loader
  ----------------------------------------------------------------------*/
  function buildLoader() {
    if (document.querySelector(".loader")) return;
    const el = document.createElement("div");
    el.className = "loader";
    el.innerHTML = `<div class="loader-mark">JF<span class="text-red">.</span></div><div class="loader-line"></div>`;
    document.body.prepend(el);
    const remove = () => el.classList.add("is-hidden");
    if (prefersReducedMotion) {
      remove();
    } else {
      window.addEventListener("load", () => setTimeout(remove, 500));
      setTimeout(remove, 1500); // safety net
    }
  }

  /* --------------------------------------------------------------------
     Custom cursor
  ----------------------------------------------------------------------*/
  function buildCursor() {
    if (isTouch) return;
    document.body.classList.add("has-custom-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor";
    const label = document.createElement("div");
    label.className = "cursor-label";
    document.body.append(dot, label);

    let mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      label.style.left = mx + "px"; label.style.top = my + "px";
    });

    function setState(text) {
      if (text) {
        dot.style.width = "64px"; dot.style.height = "64px"; dot.style.background = "transparent";
        dot.style.border = "1.5px solid var(--red)";
        label.textContent = text; label.style.opacity = "1";
      } else {
        dot.style.width = "14px"; dot.style.height = "14px"; dot.style.background = "var(--red)";
        dot.style.border = "none";
        label.style.opacity = "0";
      }
    }

    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("a,button,[data-cursor]");
      if (!t) { setState(null); return; }
      const dict = (typeof STATIC_I18N !== "undefined") ? (STATIC_I18N[LANG] || STATIC_I18N.en) : { say_hi: "SAY HI →", visit_link: "VISIT ↗" };
      const viewLabel = (typeof LANG !== "undefined" && LANG === "cs") ? "ZOBRAZIT →" : "VIEW →";
      if (t.dataset.cursor) return setState(t.dataset.cursor);
      if (t.matches('a[href^="mailto:"]')) return setState(dict.say_hi);
      if (t.matches('a[target="_blank"]')) return setState(dict.visit_link);
      if (t.closest(".proj-row, .project-block, [data-project-link]")) return setState(viewLabel);
      setState(null);
    });
  }

  /* --------------------------------------------------------------------
     Header hide on scroll-down / show on scroll-up
  ----------------------------------------------------------------------*/
  function headerScrollBehaviour() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (y > lastY && y > 160) header.classList.add("is-hidden");
      else header.classList.remove("is-hidden");
      lastY = y;
    }, { passive: true });
  }

  /* --------------------------------------------------------------------
     Mobile menu toggle
  ----------------------------------------------------------------------*/
  function mobileMenu() {
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("navMobile");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open"); btn.classList.remove("is-open");
      document.body.style.overflow = "";
    }));
  }

  /* --------------------------------------------------------------------
     Scroll reveal
  ----------------------------------------------------------------------*/
  function scrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------
     Number counters
  ----------------------------------------------------------------------*/
  function counters() {
    const els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      if (isNaN(target) || prefersReducedMotion) { el.textContent = el.dataset.display || target; return; }
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------
     Hero parallax (subtle, desktop only, mouse-based)
  ----------------------------------------------------------------------*/
  function heroParallax() {
    const hero = document.querySelector("[data-parallax]");
    if (!hero || isTouch || prefersReducedMotion) return;
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      hero.querySelectorAll("[data-depth]").forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "10");
        el.style.transform = `translate(${px * depth}px, ${py * depth}px)`;
      });
    });
  }

  /* ======================================================================
     PAGE-SPECIFIC: HOME — "MY WORLD" network
  ====================================================================== */
  function worldDiagram() {
    const wrap = document.getElementById("worldViz");
    if (!wrap) return;

    const desc = document.getElementById("worldDesc");
    const nodes = wrap.querySelectorAll(".project-node");
    const lines = wrap.querySelectorAll(".project-map-lines line");

    function activate(id) {
      nodes.forEach((n) => n.classList.toggle("is-selected", n.dataset.id === id));
      lines.forEach((l) => l.classList.toggle("is-hot", l.dataset.id === id));
      if (desc) {
        const item = SITE.world.find((w) => w.id === id);
        desc.textContent = item ? item.desc : "";
      }
    }

    // default: first node highlighted, matching reference design
    if (SITE.world.length) activate(SITE.world[0].id);

    nodes.forEach((n) => {
      n.addEventListener("mouseenter", () => activate(n.dataset.id));
      n.addEventListener("focus", () => activate(n.dataset.id));
    });
  }

  /* ======================================================================
     PAGE-SPECIFIC: WORK — timeline accordion
  ====================================================================== */
  function timelineAccordion() {
    const items = document.querySelectorAll(".timeline-item");
    if (!items.length) return;
    items.forEach((item) => {
      item.querySelector(".timeline-head").addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");
        items.forEach((i) => i.classList.remove("is-open"));
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  }

  /* ======================================================================
     PAGE-SPECIFIC: PROJECT DETAIL — growth chart
  ====================================================================== */
  function growthChart() {
    const svg = document.getElementById("growthChart");
    if (!svg || !window.SITE || !SITE.festivalGrowth) return;
    const data = SITE.festivalGrowth;
    const w = 900, h = 320, pad = 50;
    const maxV = Math.max(...data.map((d) => d.visitors));
    const stepX = (w - pad * 2) / (data.length - 1);
    const pts = data.map((d, i) => {
      const x = pad + i * stepX;
      const y = h - pad - (d.visitors / maxV) * (h - pad * 2);
      return { x, y, ...d };
    });
    const pathD = pts.map((p, i) => (i === 0 ? "M" : "L") + p.x + "," + p.y).join(" ");
    let dots = "";
    pts.forEach((p) => {
      dots += `<circle class="growth-dot" cx="${p.x}" cy="${p.y}" r="5"></circle>`;
      dots += `<text class="growth-value" x="${p.x}" y="${p.y - 16}" text-anchor="middle">${p.visitors.toLocaleString(typeof LANG !== "undefined" && LANG === "cs" ? "cs-CZ" : "en-US")}</text>`;
      dots += `<text class="growth-label" x="${p.x}" y="${h - pad + 24}" text-anchor="middle">${p.year}</text>`;
    });
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.innerHTML = `<line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="var(--border)" stroke-width="1"></line>
      <path class="growth-line" d="${pathD}"></path>${dots}`;
  }

  /* ======================================================================
     INIT
  ====================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.remove("no-js");
    buildLoader();
    buildHeader();
    buildFooter();
    if (typeof applyStaticI18n === "function") applyStaticI18n(LANG);
    buildCursor();
    headerScrollBehaviour();
    mobileMenu();
    scrollReveal();
    counters();
    heroParallax();
    worldDiagram();
    timelineAccordion();
    growthChart();
  });
})();
