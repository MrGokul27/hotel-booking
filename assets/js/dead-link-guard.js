(function () {
  const VALID_PAGES = new Set([
    "index.html",
    "about.html",
    "facilities.html",
    "offers.html",
    "gallery.html",
    "contact.html",
    "rooms.html",
    "room-standard.html",
    "room-deluxe.html",
    "room-suite.html",
    "room-presidential.html",
    "login.html",
    "register.html",
    "404.html",
    "dashboard.html",
    "reservations.html",
    "room-management.html",
    "guests.html",
    "revenue-reports.html",
    "invoices.html",
    "promotions.html",
    "staff.html",
    "housekeeping.html",
    "spa-dining.html",
    "settings.html",
    "my-bookings.html",
    "booking-history.html",
    "room-service.html",
    "spa-wellness.html",
    "dining.html",
    "local-experiences.html",
    "my-rewards.html",
    "redeem-points.html",
    "exclusive-offers.html",
    "events.html",
    "profile.html",
    "support.html",
  ]);

  const scriptSrc = (document.currentScript || {}).src || "";
  const base404 = scriptSrc
    ? new URL("../../components/pages/404.html", scriptSrc).href
    : new URL("components/pages/404.html", window.location.origin + "/").href;

  function isSafe(href) {
    if (!href) return false;

    const trimmed = href.trim();

    if (trimmed === "#" || trimmed === "") return false;

    if (trimmed.startsWith("#") && trimmed.length > 1) return true;

    const lower = trimmed.toLowerCase();
    if (
      lower.startsWith("mailto:") ||
      lower.startsWith("tel:") ||
      lower.startsWith("javascript:")
    )
      return true;

    let url;
    try {
      url = new URL(trimmed, window.location.href);
    } catch (_) {
      return false;
    }

    if (url.origin !== window.location.origin) return true;

    const filename = url.pathname.split("/").pop() || "index.html";

    if (VALID_PAGES.has(filename)) return true;

    if (url.pathname === window.location.pathname && url.hash.length > 1) {
      return true;
    }

    return false;
  }

  function go404() {
    window.location.href = base404;
  }

  document.addEventListener("click", function (e) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");

    if (!href || href.trim() === "#" || href.trim() === "") {
      e.preventDefault();
      go404();
      return;
    }

    if (!isSafe(href)) {
      e.preventDefault();
      go404();
    }
  });
})();
