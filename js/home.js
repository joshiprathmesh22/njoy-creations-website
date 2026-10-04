// ============================================================
// NJOY CREATION — home.js
// Stat counters, packages slider, testimonial slider
// ============================================================

(function () {
  "use strict";

  /* ---------- Stat counters (run once, on view) ---------- */
  const statNums = document.querySelectorAll(".stat-num");

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (statNums.length) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach((el) => counterObserver.observe(el));
  }

  /* ---------- Packages slider (scroll-snap track + dots) ---------- */
  const pkgTrack = document.getElementById("pkgTrack");
  const pkgDotsWrap = document.getElementById("pkgDots");

  if (pkgTrack && pkgDotsWrap) {
    const cards = Array.from(pkgTrack.children);
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
      pkgDotsWrap.appendChild(dot);
    });
    const pkgDots = Array.from(pkgDotsWrap.children);

    const pkgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target);
            pkgDots.forEach((d, i) => d.classList.toggle("active", i === idx));
          }
        });
      },
      { root: pkgTrack, threshold: 0.6 }
    );
    cards.forEach((c) => pkgObserver.observe(c));
  }

  /* ---------- Testimonial slider (autoplay + dots) ---------- */
  const testiSlider = document.getElementById("testiSlider");
  const testiDotsWrap = document.getElementById("testiDots");

  if (testiSlider && testiDotsWrap) {
    const slides = Array.from(testiSlider.querySelectorAll(".testimonial"));
    let current = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      testiDotsWrap.appendChild(dot);
    });
    const dots = Array.from(testiDotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = index;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
      restart();
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    restart();
  }
})();
