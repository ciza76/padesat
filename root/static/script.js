// ============ MARQUEE BULBS ============
// Generates chasing marquee light bulbs around the title, sized to each edge.
function buildBulbs(container, count, delayStep){
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < count; i++){
    const bulb = document.createElement("span");
    bulb.className = "bulb";
    bulb.style.animationDelay = `${(i * delayStep) % 1.6}s`;
    container.appendChild(bulb);
  }
}

function sizeBulbs(){
  const frame = document.getElementById("marqueeFrame");
  if (!frame) return;
  const w = frame.offsetWidth;
  const h = frame.offsetHeight;

  const spacing = 26; // px between bulbs
  const topCount = Math.max(4, Math.round(w / spacing));
  const sideCount = Math.max(3, Math.round(h / spacing));

  buildBulbs(document.getElementById("bulbsTop"), topCount, 0.08);
  buildBulbs(document.getElementById("bulbsBottom"), topCount, 0.08);
  buildBulbs(document.getElementById("bulbsLeft"), sideCount, 0.11);
  buildBulbs(document.getElementById("bulbsRight"), sideCount, 0.11);
}

window.addEventListener("load", sizeBulbs);
window.addEventListener("resize", () => {
  clearTimeout(window.__bulbResizeTimer);
  window.__bulbResizeTimer = setTimeout(sizeBulbs, 150);
});

// ============ COUNTDOWN ============
const EVENT_DATE = new Date("2026-08-04T15:00:00+02:00");

function updateCountdown(){
  const now = new Date();
  const diff = EVENT_DATE - now;

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMinutes");
  if (!daysEl || !hoursEl || !minsEl) return;

  if (diff <= 0){
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    document.getElementById("countdown").nextElementSibling.textContent = "karneval začal!";
    return;
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 30000);

// ============ RSVP CONFETTI ============
const CONFETTI_COLORS = ["#A8283B", "#D8A227", "#F4C94B", "#E4607B", "#F4E9D3"];

function launchConfetti(){
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const pieceCount = 70;
  for (let i = 0; i < pieceCount; i++){
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    layer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

const rsvpBtn = document.getElementById("rsvpBtn");
const rsvpConfirm = document.getElementById("rsvpConfirm");
const RSVP_MESSAGES = [
  "Skvěle, těšíme se na vás! 🎭",
  "Zapsáno! Nezapomeňte masku. 🎉",
  "Super, přidáváme vás na seznam! ✨"
];

if (rsvpBtn){
  rsvpBtn.addEventListener("click", () => {
    launchConfetti();
    rsvpConfirm.textContent = RSVP_MESSAGES[Math.floor(Math.random() * RSVP_MESSAGES.length)];
    rsvpBtn.disabled = true;
    rsvpBtn.style.opacity = "0.7";
    rsvpBtn.style.cursor = "default";
  });
}
