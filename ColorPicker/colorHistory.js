// colorHistory.js
document.addEventListener("DOMContentLoaded", function () {
  const colorViewerContainer = document.getElementById("colorViewerContainer");
  const removeAllButton = document.getElementById("removeAllButton");
  const backButton = document.getElementById("backButton");

  function displaySavedColors() {
    const savedColors = localStorage.getItem("savedColors");
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      const savedColorsList = document.getElementById("savedColorsList");
      savedColorsList.innerHTML = ""; // Clear the table before adding saved colors

      parsedColors.forEach((color) => {
        const colorItem = document.createElement("tr");
        colorItem.innerHTML = `
		  <td style="background-color: ${color}"></td>
		  <td>
			<button class="remove-button" data-color="${color}">Remove</button>
		  </td>
		`;
        savedColorsList.appendChild(colorItem);
      });
    }
  }

  // Function to get the color value from the URL query parameters
  function getColorFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("color");
  }

  // Function to convert hex to RGB format
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to create a color viewer element
  function createColorViewer(color) {
    const colorViewer = document.createElement("div");
    colorViewer.className = "color-viewer";
    colorViewer.style.backgroundColor = color;

    const colorValue = document.createElement("span");
    colorValue.textContent = color;
    colorViewer.appendChild(colorValue);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", function () {
      copyToClipboard(color);
    });
    colorViewer.appendChild(copyButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeColorFromStorage(color);
      displaySavedColors();
    });
    colorViewer.appendChild(removeButton);

    colorViewerContainer.appendChild(colorViewer);
  }

  // Function to copy the color value to the clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Function to save the selected color to localStorage
  function saveColorToStorage(color) {
    let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    savedColors.push(color);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }

  // Function to remove a color from localStorage
  function removeColorFromStorage(color) {
    let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    savedColors = savedColors.filter((c) => c !== color);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }

  // Function to display the saved colors
  function displaySavedColors() {
    const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    colorViewerContainer.innerHTML = ""; // Clear the container before adding color viewers

    savedColors.forEach((color) => {
      createColorViewer(color);
    });
  }

  // Function to remove all colors from localStorage
  function removeAllColorsFromStorage() {
    localStorage.removeItem("savedColors");
    colorViewerContainer.innerHTML = ""; // Clear the container after removing colors
  }

  // Back button functionality
  backButton.addEventListener("click", function () {
    // Navigate back to the previous page (color.html)
    window.history.back();
  });

  // Remove all button functionality
  removeAllButton.addEventListener("click", function () {
    removeAllColorsFromStorage();
  });

  // Update the initial color value display on page load
  const selectedColor = getColorFromURL();
  if (selectedColor) {
    saveColorToStorage(selectedColor);
  }
  displaySavedColors();
});
