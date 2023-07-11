// add a search option to the buttons
// so you can find what there are,
// like, in the sense of where tf
// did i put that one hider
// elem, or for blind people

document.addEventListener("DOMContentLoaded", function () {
  // Get all the option groups
  const optionGroups = document.querySelectorAll(".option-group");

  // Attach input event listener to the search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();

    // Loop through each option group
    optionGroups.forEach(function (group) {
      // Get all the options within the current group
      const options = group.querySelectorAll(".option");

      // Check if any option's label contains the search term
      let groupMatch = false;
      options.forEach(function (option) {
        const label = option.querySelector("label").textContent.toLowerCase();
        if (label.includes(searchTerm)) {
          option.style.display = "block";
          groupMatch = true;
        } else {
          option.style.display = "none";
        }
      });

      // Show/hide the current group based on the match
      if (groupMatch) {
        group.style.display = "block";
      } else {
        group.style.display = "none";
      }
    });
  });
});

// Highlight the current tab open -- navigate to them too
document.addEventListener("DOMContentLoaded", function () {
  // Get all the tab headings
  const tabHeadings = document.querySelectorAll(".tab-heading");

  // Attach click event listeners to the tab headings
  tabHeadings.forEach(function (heading) {
    heading.addEventListener("click", function () {
      // Remove 'selected' class from all tab headings
      tabHeadings.forEach(function (tab) {
        tab.classList.remove("selected");
      });

      // Add 'selected' class to the clicked tab heading
      this.classList.add("selected");

      // Get the data-for attribute value
      const targetId = this.getAttribute("data-for");

      // Hide all option groups
      const optionGroups = document.querySelectorAll(".option-group");
      optionGroups.forEach(function (group) {
        group.classList.add("hidden");
      });

      // Show the target option group
      const targetGroup = document.getElementById(targetId);
      targetGroup.classList.remove("hidden");
    });
  });
});

// Color theming depending on system coloring or button state
// Color settings
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve user's color preference from localStorage, or use the system preference
  let prefersDarkMode = localStorage.getItem("prefersDarkMode");
  if (prefersDarkMode === null) {
    prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("prefersDarkMode", prefersDarkMode);
  } else {
    prefersDarkMode = prefersDarkMode === "true";
  }

  const themeAttribute = prefersDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", themeAttribute);

  // Add event listener to detect changes in color scheme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      const newThemeAttribute = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newThemeAttribute);
      localStorage.setItem("prefersDarkMode", event.matches);
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
      localStorage.setItem("prefersDarkMode", "false");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      modeIcon.classList.remove("fa-toggle-off");
      modeIcon.classList.add("fa-toggle-on");
      localStorage.setItem("prefersDarkMode", "true");
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
      localStorage.setItem("prefersDarkMode", "true");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      sunAndMoon.classList.remove("sun");
      sunAndMoon.classList.add("moon");
      localStorage.setItem("prefersDarkMode", "false");
    }
  });
});

// Back to Spotify button
// Function to check if there is an open Spotify tab
function checkSpotifyTabExists() {
  chrome.tabs.query({ url: "https://*.spotify.com/*" }, function (tabs) {
    if (tabs.length > 0) {
      // Open the first Spotify tab
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      // Create a new Spotify tab
      chrome.tabs.create({ url: "https://www.spotify.com" });
    }
  });
}

// Add event listener to the backToSpotifyButton
const backToSpotifyButton = document.getElementById("backToSpotifyButton");
backToSpotifyButton.addEventListener("click", function (event) {
  event.preventDefault();
  checkSpotifyTabExists();
});

//

//
// Toggle Options
//
async function save_options() {
  let status = document.getElementById("status");
  status.textContent = "Saving options...";
  status.classList.remove("success", "error");

  let addLyricsButton = document.getElementById("addLyricsButton").checked;
  let righter = document.getElementById("righter").checked;
  let roundAlbumArt = document.getElementById("roundAlbumArt").checked;
  let rainbowControls = document.getElementById("rainbowControls").checked;
  let hiddenPIcon = document.getElementById("hiddenPIcon").checked;
  let hiddenPAlbum = document.getElementById("hiddenPAlbum").checked;
  let hiddenPDate = document.getElementById("hiddenPDate").checked;
  let hiddenPDura = document.getElementById("hiddenPDura").checked;
  let hiddenPHeart = document.getElementById("hiddenPHeart").checked;
  let hiddenPInfo = document.getElementById("hiddenPInfo").checked;
  let hiddenSPL = document.getElementById("hiddenSPL").checked;
  let hiddenSTime = document.getElementById("hiddenSTime").checked;
  let dynamicArt = document.getElementById("dynamicArt").checked;
  let scrollNPB = document.getElementById("scrollNPB").checked;
  let removeprembutton = document.getElementById("removeprembutton").checked;
  let spinAlbum = document.getElementById("spinAlbum").checked;
  let navToggle = document.getElementById("navToggle").checked;
  let footernomore = document.getElementById("footernomore").checked;
  let byeappthing = document.getElementById("byeappthing").checked;
  let fontLsize = document.getElementById("fontLsize").checked;
  let hideCB = document.getElementById("hideCB").checked;
  let removeVolBar = document.getElementById("removeVolBar").checked;
  let scrollbar = document.getElementById("scrollbar").checked;

  chrome.storage.sync.set(
    {
      addLyricsButton: addLyricsButton,
      righter: righter,
      roundAlbumArt: roundAlbumArt,
      rainbowControls: rainbowControls,
      hiddenPIcon: hiddenPIcon,
      hiddenPAlbum: hiddenPAlbum,
      hiddenPDate: hiddenPDate,
      hiddenPDura: hiddenPDura,
      hiddenPHeart: hiddenPHeart,
      hiddenPInfo: hiddenPInfo,
      hiddenSPL: hiddenSPL,
      hiddenSTime: hiddenSTime,
      dynamicArt: dynamicArt,
      scrollNPB: scrollNPB,
      removeprembutton: removeprembutton,
      spinAlbum: spinAlbum,
      navToggle: navToggle,
      footernomore: footernomore,
      byeappthing: byeappthing,
      fontLsize: fontLsize,
      hideCB: hideCB,
      removeVolBar: removeVolBar,
      scrollbar: scrollbar,
    },
    function () {
      status.textContent = "Options saved.";
      status.classList.add("success");

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
      });

      setTimeout(function () {
        status.textContent = "";
      }, 750);

      console.log("Options saved:", {
        addLyricsButton,
        righter,
        roundAlbumArt,
        rainbowControls,
        hiddenPIcon,
        hiddenPAlbum,
        hiddenPDate,
        hiddenPDura,
        hiddenPHeart,
        hiddenPInfo,
        hiddenSPL,
        hiddenSTime,
        dynamicArt,
        scrollNPB,
        removeprembutton,
        spinAlbum,
        navToggle,
        footernomore,
        byeappthing,
        fontLsize,
        hideCB,
        removeVolBar,
        scrollbar,
      });
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  let status = document.getElementById("status");
  status.textContent = "Loading options...";
  status.classList.remove("success", "error");

  chrome.storage.sync.get(
    {
      addLyricsButton: true,
      righter: true,
      roundAlbumArt: true,
      rainbowControls: true,
      dynamicArt: true,
      hiddenPIcon: false,
      hiddenPAlbum: false,
      hiddenPDate: false,
      hiddenPDura: false,
      hiddenPHeart: false,
      hiddenPInfo: false,
      hiddenSPL: false,
      hiddenSTime: false,
      scrollNPB: false,
      removeprembutton: true,
      removemusixmatch: true,
      spinAlbum: true,
      navToggle: true,
      footernomore: true,
      byeappthing: true,
      fontLsize: true,
      hideCB: false,
      removeVolBar: true,
      scrollbar: true,
    },
    function (items) {
      setTimeout(function () {
        status.textContent = "";
      }, 750);

      console.log("Restoring options:", items);
      document.getElementById("addLyricsButton").checked =
        items.addLyricsButton;
      document.getElementById("dynamicArt").checked = items.dynamicArt;
      document.getElementById("righter").checked = items.righter;
      document.getElementById("roundAlbumArt").checked = items.roundAlbumArt;
      document.getElementById("rainbowControls").checked =
        items.rainbowControls;
      document.getElementById("hiddenPIcon").checked = items.hiddenPIcon;
      document.getElementById("hiddenPAlbum").checked = items.hiddenPAlbum;
      document.getElementById("hiddenPDate").checked = items.hiddenPDate;
      document.getElementById("hiddenPDura").checked = items.hiddenPDura;
      document.getElementById("hiddenPHeart").checked = items.hiddenPHeart;
      document.getElementById("hiddenPInfo").checked = items.hiddenPInfo;
      document.getElementById("hiddenSPL").checked = items.hiddenSPL;
      document.getElementById("hiddenSTime").checked = items.hiddenSTime;
      document.getElementById("scrollNPB").checked = items.scrollNPB;
      document.getElementById("removeprembutton").checked =
        items.removeprembutton;
      document.getElementById("removemusixmatch").checked = items.spinAlbum;
      document.getElementById("spinAlbum").checked = items.spinAlbum;
      document.getElementById("navToggle").checked = items.navToggle;
      document.getElementById("footernomore").checked = items.footernomore;
      document.getElementById("byeappthing").checked = items.byeappthing;
      document.getElementById("fontLsize").checked = items.fontLsize;
      document.getElementById("hideCB").checked = items.hideCB;
      document.getElementById("removeVolBar").checked = items.removeVolBar;
      document.getElementById("scrollbar").checked = items.scrollbar;

      status.textContent = "Options loaded.";
      status.classList.add("success");
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", function () {
  save_options();
  openSpotifyTab();
});

function openSpotifyTab() {
  chrome.tabs.query({ url: "https://open.spotify.com/*" }, function (tabs) {
    if (tabs.length > 0) {
      const spotifyTab = tabs[0];
      chrome.tabs.update(spotifyTab.id, { active: true }, function () {
        chrome.tabs.reload(spotifyTab.id);
      });
    } else {
      // If no open Spotify tab is found, you can open a new tab here
      chrome.tabs.create({ url: "https://open.spotify.com/" });
    }
  });
}

//
//
// Custom Options
// Custom Options
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve saved options from Chrome storage
  chrome.storage.sync.get(
    ["customOptions", "customColor", "customImage", "customLyrics"],
    function (obj) {
      const customOptions = obj.customOptions;
      const customColor = obj.customColor;
      const customImage = obj.customImage;
      const customLyrics = obj.customLyrics;

      // Set the option input values if they exist
      const borderRadiusInput = document.getElementById("borderRadiusInput");
      const paddingInput = document.getElementById("paddingInput");
      const heightInput = document.getElementById("heightInput");
      const widthInput = document.getElementById("widthInput");
      if (customOptions) {
        borderRadiusInput.value = customOptions.borderRadius;
        paddingInput.value = customOptions.padding;
        heightInput.value = customOptions.height;
        widthInput.value = customOptions.width;
      }

      // Set the color input value if it exists
      const colorInput = document.getElementById("colorInput");
      if (customColor) {
        colorInput.value = customColor;
      }

      // Set the image input value if it exists
      const imageInput = document.getElementById("imageInput");
      if (customImage) {
        imageInput.value = customImage;
        displayImagePreview(customImage);
      }

      // Save options when changed
      [borderRadiusInput, paddingInput, heightInput, widthInput].forEach(
        (input) => {
          input.addEventListener("input", function () {
            const options = {
              borderRadius: borderRadiusInput.value,
              padding: paddingInput.value,
              height: heightInput.value,
              width: widthInput.value,
            };
            chrome.storage.sync.set({ customOptions: options });
          });
        }
      );

      // Save color selection when changed
      colorInput.addEventListener("input", function () {
        const color = colorInput.value;
        chrome.storage.sync.set({ customColor: color });
      });

      // Apply image when button is clicked
      const applyImageButton = document.getElementById("applyImageButton");
      applyImageButton.addEventListener("click", function () {
        const imageUrl = imageInput.value;
        chrome.storage.sync.set({ customImage: imageUrl });
        displayImagePreview(imageUrl);
      });

      // Clear image when button is clicked
      const clearImageButton = document.getElementById("clearImageButton");
      clearImageButton.addEventListener("click", function () {
        chrome.storage.sync.set({ customImage: "" });
        imageInput.value = ""; // Reset image input
        displayImagePreview(null);
      });
    }
  );
});

// Function to display the image preview
function displayImagePreview(imageUrl) {
  const imagePreview = document.getElementById("imagePreview");
  imagePreview.innerHTML = ""; // Clear existing preview

  if (imageUrl) {
    const image = new Image();
    image.src = imageUrl;
    image.style.maxWidth = "200px";
    image.style.maxHeight = "200px";
    imagePreview.appendChild(image);
  }
}
