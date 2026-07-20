(() => {
  const host = document.querySelector("[data-logo-mark]");
  if (!host) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  fetch("assets/brand/logo-mark.svg")
    .then((r) => r.text())
    .then((svg) => {
      host.innerHTML = svg;
      const root = host.querySelector("svg");
      if (!root) return;
      root.setAttribute("class", "logo-mark-svg");
      if (reduce) {
        host.classList.add("is-static");
        return;
      }
      bindParallax(host);
    })
    .catch(() => {
      host.innerHTML =
        '<img src="assets/brand/logo-mark.png" alt="Quantum Narrative School emblem" width="760" height="760">';
    });

  function bindParallax(el) {
    const stage = el.querySelector(".mark-stage");
    if (!stage) return;

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const tick = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      stage.style.transform = `translate(210px, 200px) rotateX(${(-ty * 5).toFixed(2)}deg) rotateY(${(tx * 5).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener(
      "pointermove",
      (e) => {
        const r = el.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      },
      { passive: true }
    );
    el.addEventListener(
      "pointerleave",
      () => {
        mx = 0;
        my = 0;
      },
      { passive: true }
    );

    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    });
  }
})();
