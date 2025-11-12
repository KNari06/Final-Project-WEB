// Применяем сохранённую тему при загрузке
const savedTheme = localStorage.getItem("theme") || "dark-theme";
document.body.classList.add(savedTheme);

// Находим переключатель
const themeCheckbox = document.getElementById("themeSwitch");

// Ставим положение слайдера в зависимости от темы
if (savedTheme === "light-theme") {
  themeCheckbox.checked = true;
}

// Слушатель переключения
themeCheckbox.addEventListener("change", () => {
  document.body.classList.add("theme-transition");

  if (themeCheckbox.checked) {
    document.body.classList.replace("dark-theme", "light-theme");
    localStorage.setItem("theme", "light-theme");
  } else {
    document.body.classList.replace("light-theme", "dark-theme");
    localStorage.setItem("theme", "dark-theme");
  }

  setTimeout(() => document.body.classList.remove("theme-transition"), 300);
});
