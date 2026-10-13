(() => {
  const root = document.documentElement;

  // ---------- Scale the 1980px design to the real screen width ----------
  const setUnit = () => {
    const u = Math.min(root.clientWidth / 1980, 1.3);
    root.style.setProperty("--u", u + "px");
  };
  setUnit();
  window.addEventListener("resize", setUnit);

  // ---------- Typing effect on the role line ----------
  const roles = ["Full Stack Engineer", "Cyber Security Engineer", "Game Developer", "Presenter", "Team Leader"];
  const el = document.getElementById("typed");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (el && !reduce) {
    let r = 0, i = roles[0].length, deleting = false;
    const tick = () => {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      i += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2400);
  }

  // ---------- Highlight the current section in the nav ----------
  const links = [...document.querySelectorAll("[data-link]")];
  const marks = ["home", "about", "lab"].map(id => document.getElementById(id));
  const update = () => {
    const line = window.innerHeight * 0.35;
    let current = "home";
    marks.forEach(m => { if (m && m.getBoundingClientRect().top <= line) current = m.id; });
    links.forEach(a => a.classList.toggle("on", a.dataset.link === current));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
