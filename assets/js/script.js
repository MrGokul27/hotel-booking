/* ── Header init (called after component loads) ── */
function initHeader() {
  const header = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 60);
    if (backToTop) backToTop.classList.toggle("show", y > 400);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileClose = document.getElementById("mobile-nav-close");

  const openNav = () => {
    mobileNav?.classList.add("open");
    mobileOverlay?.classList.add("open");
    hamburger?.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    mobileNav?.classList.remove("open");
    mobileOverlay?.classList.remove("open");
    hamburger?.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger?.addEventListener("click", openNav);
  mobileClose?.addEventListener("click", closeNav);
  mobileOverlay?.addEventListener("click", closeNav);

  /* ── Active nav link based on current page ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  /* Active nav on scroll (single-page anchor links only) */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const activateNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      if (
        scrollY >= sec.offsetTop &&
        scrollY < sec.offsetTop + sec.offsetHeight
      ) {
        navLinks.forEach((l) => l.classList.remove("active"));
        document
          .querySelector(`.nav-link[href="#${sec.id}"]`)
          ?.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", activateNav, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  /* ── Preloader ── */
  const preloader = document.getElementById("preloader");
  const plRing = document.querySelector(".pl-ring-fill");
  const plPct = document.querySelector(".pl-pct");
  const circumference = 339.3;

  if (preloader) {
    const duration = 2200;
    const interval = 18;
    let pct = 0;
    const step = 100 / (duration / interval);

    const ticker = setInterval(() => {
      pct = Math.min(pct + step, 100);
      const offset = circumference - (pct / 100) * circumference;
      if (plRing) plRing.style.strokeDashoffset = offset;
      if (plPct) plPct.textContent = Math.floor(pct) + "%";
      if (pct >= 100) clearInterval(ticker);
    }, interval);

    setTimeout(() => preloader.classList.add("hide"), 1500);
  }

  /* ── Hero Slider ── */
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");
  let heroIdx = 0,
    heroTimer;

  const goToSlide = (idx) => {
    heroSlides[heroIdx]?.classList.remove("active");
    heroDots[heroIdx]?.classList.remove("active");
    heroIdx = (idx + heroSlides.length) % heroSlides.length;
    heroSlides[heroIdx]?.classList.add("active");
    heroDots[heroIdx]?.classList.add("active");
  };

  const startHeroTimer = () => {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goToSlide(heroIdx + 1), 5000);
  };

  if (heroSlides.length) {
    heroSlides[0].classList.add("active");
    heroDots[0]?.classList.add("active");
    startHeroTimer();

    document.getElementById("hero-prev")?.addEventListener("click", () => {
      goToSlide(heroIdx - 1);
      startHeroTimer();
    });
    document.getElementById("hero-next")?.addEventListener("click", () => {
      goToSlide(heroIdx + 1);
      startHeroTimer();
    });

    heroDots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        goToSlide(i);
        startHeroTimer();
      }),
    );
  }

  /* ── Testimonial Slider ── */
  const testiCards = document.querySelectorAll(".testimonial-card");
  const testiDots = document.querySelectorAll(".testi-dot");
  let testiIdx = 0,
    testiTimer;

  const goToTesti = (idx) => {
    testiCards[testiIdx]?.classList.remove("active");
    testiDots[testiIdx]?.classList.remove("active");
    testiIdx = (idx + testiCards.length) % testiCards.length;
    testiCards[testiIdx]?.classList.add("active");
    testiDots[testiIdx]?.classList.add("active");
  };

  if (testiCards.length) {
    // hide all, show first
    testiCards.forEach((c) => {
      c.style.display = "none";
    });
    testiCards[0].style.display = "block";
    testiDots[0]?.classList.add("active");

    const startTestiTimer = () => {
      clearInterval(testiTimer);
      testiTimer = setInterval(() => {
        testiCards[testiIdx].style.display = "none";
        testiDots[testiIdx]?.classList.remove("active");
        testiIdx = (testiIdx + 1) % testiCards.length;
        testiCards[testiIdx].style.display = "block";
        testiDots[testiIdx]?.classList.add("active");
      }, 4500);
    };

    startTestiTimer();

    testiDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        testiCards[testiIdx].style.display = "none";
        testiDots[testiIdx]?.classList.remove("active");
        testiIdx = i;
        testiCards[testiIdx].style.display = "block";
        testiDots[testiIdx]?.classList.add("active");
        startTestiTimer();
      });
    });
  }

  /* ── Counter animation ── */
  const counters = document.querySelectorAll(
    "[data-count], .about-stat-num[data-count]",
  );

  const animateCounter = (el) => {
    const target = +el.getAttribute("data-count");
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };

  /* ── Intersection Observer (fade-up + counters) ── */
  const fadeEls = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  fadeEls.forEach((el) => observer.observe(el));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => counterObserver.observe(el));

  /* ── Booking form – date defaults ── */
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = (d) => d.toISOString().split("T")[0];

  const checkIn = document.getElementById("check-in");
  const checkOut = document.getElementById("check-out");
  if (checkIn) {
    checkIn.min = fmt(today);
    checkIn.value = fmt(today);
  }
  if (checkOut) {
    checkOut.min = fmt(tomorrow);
    checkOut.value = fmt(tomorrow);
  }

  checkIn?.addEventListener("change", () => {
    const d = new Date(checkIn.value);
    d.setDate(d.getDate() + 1);
    checkOut.min = fmt(d);
    if (checkOut.value <= checkIn.value) checkOut.value = fmt(d);
  });

  /* ── Booking form submit ── */
  document.getElementById("booking-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "components/pages/404.html";
  });
});
