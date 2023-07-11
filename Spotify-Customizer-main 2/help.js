// Color settings
// Grab the user's color preference
document.addEventListener("DOMContentLoaded", function () {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const themeAttribute = prefersDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", themeAttribute);

  // Add event listener to detect changes in color scheme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      const newThemeAttribute = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newThemeAttribute);
    });

  // Toggle switch functionality
  const modeToggle = document.getElementById("modeToggle");
  const modeIcon = document.getElementById("modeIcon");

  modeToggle.addEventListener("click", function () {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "light");
      modeIcon.classList.remove("fa-toggle-on");
      modeIcon.classList.add("fa-toggle-off");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      modeIcon.classList.remove("fa-toggle-off");
      modeIcon.classList.add("fa-toggle-on");
    }
  });

  // Theme toggle button functionality
  const themeToggle = document.getElementById("theme-toggle");
  const sunAndMoon = themeToggle.querySelector(".sun-and-moon");
  let isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";

  themeToggle.addEventListener("click", function () {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      sunAndMoon.classList.remove("moon");
      sunAndMoon.classList.add("sun");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      sunAndMoon.classList.remove("sun");
      sunAndMoon.classList.add("moon");
    }
  });
});
