(function () {
  "use strict";

  var btn = document.getElementById("hamburgerBtn");
  var menu = document.getElementById("mobileMenu");

  if (!btn || !menu) return;

  function openMenu() {
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", function () {
    var isOpen = btn.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  /* Close the menu once a section link is tapped so the
     anchor scroll is actually visible to the user. */
  menu.querySelectorAll("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  /* Esc closes the menu too */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      closeMenu();
      btn.focus();
    }
  });
})();

/* ---------------------------------------------
   Countdown to the start of the event
--------------------------------------------- */
(function () {
  "use strict";

  /* Oslava začíná v pátek 4. 9. 2026, čas dle středoevropského
     letního času (CEST, UTC+2) — platí i pro návštěvníky
     v jiných časových pásmech. */
  var EVENT_START = new Date("2026-09-04T00:00:00+02:00").getTime();
  var EVENT_END = new Date("2026-09-07T00:00:00+02:00").getTime();

  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMinutes = document.getElementById("cd-minutes");
  var elSeconds = document.getElementById("cd-seconds");
  var label = document.querySelector(".countdown-label");

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function clearUnits() {
    document.querySelectorAll(".countdown-unit").forEach(function (u) {
      u.textContent = "";
    });
  }

  function render() {
    var now = Date.now();
    var diff = EVENT_START - now;

    if (diff <= 0 && now < EVENT_END) {
      if (label) label.textContent = "Oslava právě probíhá";
      elDays.textContent = "🎉";
      elHours.textContent = "";
      elMinutes.textContent = "";
      elSeconds.textContent = "";
      clearUnits();
      return;
    }

    if (now >= EVENT_END) {
      if (label) label.textContent = "Bylo to nádherné";
      elDays.textContent = "✓";
      elHours.textContent = "";
      elMinutes.textContent = "";
      elSeconds.textContent = "";
      clearUnits();
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    elDays.textContent = days;
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  render();
  setInterval(render, 1000);
})();
