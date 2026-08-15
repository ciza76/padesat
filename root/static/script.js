(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var acts = document.querySelectorAll(".act");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    acts.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  acts.forEach(function (el, i) {
    el.style.transitionDelay = (i % 5) * 0.05 + "s";
    observer.observe(el);
  });
})();