// ===== BURGER & SIDEBAR =====
const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebar = document.getElementById("closeSidebar");

// открыть
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  sidebar.classList.toggle("visible");
  overlay.classList.toggle("visible");
});

// закрыть
overlay.addEventListener("click", () => {
  burger.classList.remove("open");
  sidebar.classList.remove("visible");
  overlay.classList.remove("visible");
});

closeSidebar.addEventListener("click", () => {
  burger.classList.remove("open");
  sidebar.classList.remove("visible");
  overlay.classList.remove("visible");
});

// ===== THEME SWITCH (Light / Dark) =====
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

// проверяем сохранённую тему
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeSwitch.checked = true;
}

// при переключении темы
themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// ===== SCROLL PROGRESS BAR =====
const scrollBar = document.getElementById("scrollProgressBar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  scrollBar.style.width = scrollPercent + "%";
});
