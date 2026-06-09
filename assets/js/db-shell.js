/* db-shell.js — shared sidebar + topbar for every dashboard page */
(function () {
  /* ── user from session ── */
  const raw = sessionStorage.getItem("stackly_user") || "{}";
  const user = JSON.parse(raw);
  const email = user.email || "guest@stackly.com";
  const role = (user.role || "guest").toLowerCase();
  const nameFull = email
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const initials = nameFull
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  /* ── nav config ── */
  const navConfig = {
    admin: [
      {
        section: "Main",
        items: [
          { icon: "fa-gauge", label: "Dashboard", file: "dashboard.html" },
          {
            icon: "fa-calendar-days",
            label: "Reservations",
            file: "reservations.html",
          },
          {
            icon: "fa-door-open",
            label: "Room Management",
            file: "room-management.html",
          },
          { icon: "fa-users", label: "Guests", file: "guests.html" },
        ],
      },
      {
        section: "Finance",
        items: [
          {
            icon: "fa-chart-line",
            label: "Revenue Reports",
            file: "revenue-reports.html",
          },
          {
            icon: "fa-file-invoice-dollar",
            label: "Invoices & Billing",
            file: "invoices.html",
          },
          {
            icon: "fa-tags",
            label: "Promotions & Offers",
            file: "promotions.html",
          },
        ],
      },
      {
        section: "Operations",
        items: [
          {
            icon: "fa-user-tie",
            label: "Staff Management",
            file: "staff.html",
          },
          {
            icon: "fa-concierge-bell",
            label: "Housekeeping",
            file: "housekeeping.html",
          },
          { icon: "fa-spa", label: "Spa & Dining", file: "spa-dining.html" },
          { icon: "fa-gear", label: "Settings", file: "settings.html" },
        ],
      },
    ],
    guest: [
      {
        section: "My Stay",
        items: [
          { icon: "fa-gauge", label: "Overview", file: "dashboard.html" },
          { icon: "fa-bed", label: "My Bookings", file: "my-bookings.html" },
          {
            icon: "fa-clock-rotate-left",
            label: "Booking History",
            file: "booking-history.html",
          },
          {
            icon: "fa-concierge-bell",
            label: "Room Service",
            file: "room-service.html",
          },
        ],
      },
      {
        section: "Extras",
        items: [
          {
            icon: "fa-spa",
            label: "Spa & Wellness",
            file: "spa-wellness.html",
          },
          {
            icon: "fa-utensils",
            label: "Dining Reservations",
            file: "dining.html",
          },
          {
            icon: "fa-map-location-dot",
            label: "Local Experiences",
            file: "local-experiences.html",
          },
        ],
      },
      {
        section: "Account",
        items: [
          { icon: "fa-user", label: "My Profile", file: "profile.html" },
          { icon: "fa-headset", label: "Support", file: "support.html" },
        ],
      },
    ],
    member: [
      {
        section: "Membership",
        items: [
          { icon: "fa-gauge", label: "Overview", file: "dashboard.html" },
          { icon: "fa-star", label: "My Rewards", file: "my-rewards.html" },
          {
            icon: "fa-gift",
            label: "Redeem Points",
            file: "redeem-points.html",
          },
          { icon: "fa-bed", label: "My Bookings", file: "my-bookings.html" },
        ],
      },
      {
        section: "Benefits",
        items: [
          {
            icon: "fa-crown",
            label: "Exclusive Offers",
            file: "exclusive-offers.html",
          },
          {
            icon: "fa-spa",
            label: "Member Spa Access",
            file: "spa-wellness.html",
          },
          {
            icon: "fa-champagne-glasses",
            label: "Events & Experiences",
            file: "events.html",
          },
        ],
      },
      {
        section: "Account",
        items: [
          { icon: "fa-user", label: "Profile", file: "profile.html" },
          { icon: "fa-headset", label: "VIP Concierge", file: "support.html" },
        ],
      },
    ],
    corporate: [
      {
        section: "Corporate",
        items: [
          { icon: "fa-gauge", label: "Overview", file: "dashboard.html" },
          {
            icon: "fa-building",
            label: "Company Bookings",
            file: "my-bookings.html",
          },
          {
            icon: "fa-users-between-lines",
            label: "Travelling Staff",
            file: "guests.html",
          },
          { icon: "fa-file-invoice", label: "Invoices", file: "invoices.html" },
        ],
      },
      {
        section: "Services",
        items: [
          {
            icon: "fa-handshake",
            label: "Corporate Rates",
            file: "promotions.html",
          },
          {
            icon: "fa-chalkboard-user",
            label: "Conference Rooms",
            file: "room-management.html",
          },
          {
            icon: "fa-utensils",
            label: "Catering Services",
            file: "dining.html",
          },
        ],
      },
      {
        section: "Account",
        items: [
          { icon: "fa-user-tie", label: "Account Manager", file: "staff.html" },
          { icon: "fa-gear", label: "Company Settings", file: "settings.html" },
        ],
      },
    ],
  };

  /* ── current page filename ── */
  const currentFile = location.pathname.split("/").pop() || "dashboard.html";

  /* ── build sidebar HTML ── */
  const sections = navConfig[role] || navConfig.guest;
  let navHTML = "";
  sections.forEach((sec) => {
    navHTML += `<div class="db-nav-section"><div class="db-nav-section-label">${sec.section}</div>`;
    sec.items.forEach((item) => {
      const active = item.file === currentFile ? " active" : "";
      navHTML += `<a href="${item.file}" class="db-nav-item${active}"><i class="fa-solid ${item.icon}"></i><span>${item.label}</span></a>`;
    });
    navHTML += `</div>`;
  });

  /* ── inject sidebar ── */
  const sidebar = document.getElementById("db-sidebar");
  if (sidebar) {
    sidebar.innerHTML = `
      <a href="../../index.html" class="db-sidebar-logo">
        <img src="../../assets/images/logoStackly.webp" alt="Stackly"/>
      </a>
      <div class="db-user-pill">
        <div class="db-user-avatar">${initials}</div>
        <div class="db-user-info">
          <div class="db-user-name">${nameFull}</div>
          <div class="db-user-role">${role.charAt(0).toUpperCase() + role.slice(1)}</div>
        </div>
      </div>
      <nav>${navHTML}</nav>
      <div class="db-sidebar-footer">
        <a href="login.html" class="db-logout-btn">
          <i class="fa-solid fa-right-from-bracket"></i><span>Sign Out</span>
        </a>
      </div>`;
  }

  /* ── topbar user ── */
  const tAvatar = document.getElementById("topbar-avatar");
  const tName = document.getElementById("topbar-name");
  if (tAvatar) tAvatar.textContent = initials;
  if (tName) tName.textContent = nameFull;

  /* ── date ── */
  const dateEl = document.getElementById("db-date");
  if (dateEl)
    dateEl.textContent = new Date().toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  /* ── sidebar toggle ── */
  const overlay = document.getElementById("db-overlay");
  const toggle = document.getElementById("db-menu-toggle");
  const openSidebar = () => {
    sidebar.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeSidebar = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };
  toggle?.addEventListener("click", openSidebar);
  overlay?.addEventListener("click", closeSidebar);

  /* expose helpers */
  window.DB = { role, nameFull, initials, email, closeSidebar };

  /* load dead-link guard */
  const guard = document.createElement("script");
  guard.src = new URL("dead-link-guard.js", document.currentScript.src).href;
  document.body.appendChild(guard);
})();
