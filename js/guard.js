(() => {
  const OFFICIAL_URL = "https://www.q-n-s.com/";
  const REPORT_EMAIL = "phoenix-mx@hotmail.com";
  /* FormSubmit ajax — no self-hosted backend required */
  const REPORT_FORM =
    "https://formsubmit.co/ajax/" + encodeURIComponent(REPORT_EMAIL);
  /* Optional second channel if you later add a server route */
  const REPORT_BEACON = OFFICIAL_URL.replace(/\/?$/, "/") + "theft-beacon";

  const ALLOWED_HOSTS = new Set([
    "www.q-n-s.com",
    "q-n-s.com",
    "localhost",
    "127.0.0.1",
    "[::1]",
  ]);

  const NOTICE_ZH =
    "版权所有 © 2018–2026 量子叙事学派 / Nanjie Ma。禁止任何形式的商业使用、未经授权转载、镜像或盗用本站内容、标识与视觉素材。";
  const NOTICE_EN =
    "Copyright © 2018–2026 Quantum Narrative School / Nanjie Ma. All rights reserved. Commercial use, unauthorized republication, mirroring, or misappropriation of site content, marks, or visuals is strictly prohibited.";

  const host = (location.hostname || "").toLowerCase();
  const isFile = location.protocol === "file:";
  const isPrivateLan =
    /^(192\.168\.|10\.|127\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host) ||
    host.endsWith(".local");
  /* GitHub Pages preview hosts (*.github.io). Prefer custom domain in production. */
  const isGithubPages = host.endsWith(".github.io");
  const isAllowedHost =
    isFile || ALLOWED_HOSTS.has(host) || isPrivateLan || isGithubPages;

  function buildEvidence(eventType, detail) {
    const nav = navigator || {};
    return {
      event: eventType,
      detail: detail || "",
      capturedAt: new Date().toISOString(),
      pageUrl: String(location.href || ""),
      pageHost: host || "(empty)",
      protocol: location.protocol || "",
      referrer: document.referrer || "",
      title: document.title || "",
      userAgent: nav.userAgent || "",
      language: nav.language || "",
      platform: nav.platform || "",
      timezone: (Intl.DateTimeFormat().resolvedOptions() || {}).timeZone || "",
      screen: typeof screen !== "undefined" ? `${screen.width}x${screen.height}` : "",
      viewport:
        typeof window !== "undefined"
          ? `${window.innerWidth || 0}x${window.innerHeight || 0}`
          : "",
      framed: window.top !== window.self,
      owner: "Nanjie Ma / Quantum Narrative School",
      official: OFFICIAL_URL,
      notice: NOTICE_ZH,
    };
  }

  function evidenceKey(ev) {
    return `qns-theft-report:${ev.event}:${ev.pageHost}:${ev.pageUrl.slice(0, 120)}`;
  }

  function alreadyReported(key) {
    try {
      return sessionStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  }

  function markReported(key) {
    try {
      sessionStorage.setItem(key, "1");
      const log = JSON.parse(localStorage.getItem("qns-theft-log") || "[]");
      log.push({ key, at: new Date().toISOString() });
      while (log.length > 40) log.shift();
      localStorage.setItem("qns-theft-log", JSON.stringify(log));
    } catch {
      /* ignore quota / private mode */
    }
  }

  /** Auto-fire theft evidence to owner channels (email + beacon). */
  function reportTheftEvidence(eventType, detail) {
    const evidence = buildEvidence(eventType, detail);
    const key = evidenceKey(evidence);
    if (alreadyReported(key)) return Promise.resolve({ skipped: true });

    markReported(key);

    const bodyJson = JSON.stringify({
      _subject: `[QNS盗用证据] ${evidence.event} @ ${evidence.pageHost}`,
      _template: "table",
      _captcha: "false",
      ...evidence,
      evidenceJson: JSON.stringify(evidence, null, 2),
    });

    const tasks = [];

    // 1) Email evidence (FormSubmit)
    tasks.push(
      fetch(REPORT_FORM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: bodyJson,
        keepalive: true,
        mode: "cors",
      }).catch(() => null)
    );

    // 2) Beacon / keepalive POST to official site (if endpoint exists)
    try {
      const blob = new Blob([JSON.stringify(evidence)], {
        type: "application/json",
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(REPORT_BEACON, blob);
      }
    } catch {
      /* ignore */
    }
    tasks.push(
      fetch(REPORT_BEACON, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evidence),
        keepalive: true,
        mode: "no-cors",
      }).catch(() => null)
    );

    // 3) Image ping fallback (query-string evidence digest)
    try {
      const q = new URLSearchParams({
        e: evidence.event,
        h: evidence.pageHost,
        u: evidence.pageUrl.slice(0, 300),
        t: evidence.capturedAt,
      });
      const img = new Image();
      img.referrerPolicy = "no-referrer-when-downgrade";
      img.src =
        OFFICIAL_URL.replace(/\/?$/, "/") + "theft.gif?" + q.toString();
    } catch {
      /* ignore */
    }

    console.warn("[QNS] Theft evidence dispatched", evidence);
    return Promise.all(tasks).then(() => ({ ok: true, evidence }));
  }

  function injectStyles() {
    if (document.getElementById("qns-guard-style")) return;
    const style = document.createElement("style");
    style.id = "qns-guard-style";
    style.textContent = `
      .qns-theft-overlay {
        position: fixed; inset: 0; z-index: 2147483646;
        display: grid; place-items: center;
        padding: 28px 20px;
        background: rgba(6, 8, 14, 0.96);
        color: #f5f4f1;
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        text-align: center;
      }
      .qns-theft-overlay .box {
        max-width: 34rem;
        border: 1px solid rgba(255, 90, 90, 0.45);
        background: #12151e;
        padding: 28px 24px;
      }
      .qns-theft-overlay h1 {
        margin: 0 0 12px;
        font-size: 1.35rem;
        color: #ff6b6b;
        letter-spacing: 0.04em;
      }
      .qns-theft-overlay p {
        margin: 0 0 10px;
        line-height: 1.55;
        color: rgba(245, 244, 241, 0.78);
        font-size: 0.95rem;
      }
      .qns-theft-overlay a { color: #7fd4c8; }
      .qns-copy-toast {
        position: fixed; left: 50%; bottom: 28px; z-index: 2147483645;
        transform: translateX(-50%);
        max-width: min(92vw, 420px);
        padding: 12px 16px;
        background: #1a1420;
        border: 1px solid rgba(255, 196, 90, 0.55);
        color: #f5f4f1;
        font-size: 0.82rem;
        line-height: 1.45;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        pointer-events: none;
        opacity: 0;
        transition: opacity .2s ease;
      }
      .qns-copy-toast.is-on { opacity: 1; }
    `;
    document.head.appendChild(style);
  }

  function showTheftOverlay(reason) {
    injectStyles();
    document.documentElement.innerHTML = "";
    const overlay = document.createElement("div");
    overlay.className = "qns-theft-overlay";
    overlay.innerHTML = `
      <div class="box" role="alertdialog" aria-labelledby="qns-theft-title">
        <h1 id="qns-theft-title">版权警告 · Unauthorized Host</h1>
        <p>${NOTICE_ZH}</p>
        <p>${NOTICE_EN}</p>
        <p>${reason}</p>
        <p>盗用证据已自动回传权利人 · Evidence auto-reported.</p>
        <p>正在返回官方站点 · Redirecting to <a href="${OFFICIAL_URL}">${OFFICIAL_URL}</a></p>
      </div>
    `;
    document.documentElement.appendChild(overlay);
    setTimeout(() => {
      location.replace(OFFICIAL_URL);
    }, 3200);
  }

  function breakUnauthorizedFrame() {
    if (window.top === window.self) return;
    let topHost = "";
    try {
      topHost = (window.top.location.hostname || "").toLowerCase();
      if (!ALLOWED_HOSTS.has(topHost) && window.top.location.protocol !== "file:") {
        reportTheftEvidence(
          "unauthorized_frame",
          `Embedded under host: ${topHost}`
        );
        window.top.location.replace(OFFICIAL_URL);
      }
    } catch {
      reportTheftEvidence(
        "cross_origin_frame",
        "Page framed by cross-origin parent; breakout attempted."
      );
      try {
        window.top.location.href = OFFICIAL_URL;
      } catch {
        injectStyles();
        if (document.body) {
          const overlay = document.createElement("div");
          overlay.className = "qns-theft-overlay";
          overlay.innerHTML = `
            <div class="box">
              <h1>禁止嵌套盗用 · Framing Blocked</h1>
              <p>${NOTICE_ZH}</p>
              <p>盗用证据已自动回传 · Evidence auto-reported.</p>
              <p>请访问官方站点：<a href="${OFFICIAL_URL}">${OFFICIAL_URL}</a></p>
            </div>
          `;
          document.body.appendChild(overlay);
        }
      }
    }
  }

  function toast(msg) {
    injectStyles();
    let el = document.querySelector(".qns-copy-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "qns-copy-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-on"), 3200);
  }

  function bindSoftGuards() {
    document.addEventListener("contextmenu", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (
        t.closest(
          "img, video, canvas, [data-logo-mark], .hero-logo, .motif-strip, .nav-mark, .app-tabbar-chroma"
        )
      ) {
        e.preventDefault();
        toast("版权保护：标识与视觉素材禁止盗用 / Assets protected — no unauthorized use.");
      }
    });

    document.addEventListener("copy", (e) => {
      const sel = window.getSelection && window.getSelection().toString();
      if (!sel || sel.length < 40) return;
      const clip = e.clipboardData;
      if (!clip) return;
      e.preventDefault();
      const stamped =
        sel +
        "\n\n—\n" +
        NOTICE_ZH +
        "\n" +
        NOTICE_EN +
        "\nSource: " +
        OFFICIAL_URL;
      clip.setData("text/plain", stamped);
      toast("已附加版权声明 · Copyright notice appended to copied text.");
    });

    Object.defineProperty(window, "__QNS_RIGHTS__", {
      value: Object.freeze({
        owner: "Nanjie Ma / Quantum Narrative School",
        commercialUse: false,
        official: OFFICIAL_URL,
        noticeZh: NOTICE_ZH,
        noticeEn: NOTICE_EN,
        reportEmail: REPORT_EMAIL,
      }),
      writable: false,
      configurable: false,
    });

    console.info(
      "%cQuantum Narrative School — Copyright Notice",
      "color:#ff6b6b;font-weight:700;font-size:13px;"
    );
    console.info(NOTICE_ZH);
    console.info(NOTICE_EN);
    console.info("Official site:", OFFICIAL_URL);
  }

  // Unauthorized host → evidence first, then warn + redirect
  if (!isAllowedHost) {
    reportTheftEvidence(
      "unauthorized_host",
      `Non-authorized deployment on host: ${host || "unknown"}`
    ).finally(() => {
      showTheftOverlay(
        `检测到非授权域名托管（${host || "unknown"}）。本页面代码与素材不得擅自部署。盗用证据已自动回传。`
      );
    });
    return;
  }

  breakUnauthorizedFrame();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSoftGuards);
  } else {
    bindSoftGuards();
  }
})();
