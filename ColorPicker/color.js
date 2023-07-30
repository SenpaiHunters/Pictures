// Handle the click event of the "View Color History" button
const viewHistoryButton = document.getElementById("viewHistoryButton");
viewHistoryButton.addEventListener("click", function () {
  // Open "colorHistory.html" in a new tab or window
  window.open("colorHistory.html", "_blank");
});

// color.js

document.addEventListener("DOMContentLoaded", function () {
  const colorBox = document.getElementById("colorBox");
  const colorValue = document.getElementById("colorValue");
  const colorFormatSelect = document.getElementById("colorFormat");
  let selectedColor = "#FFFFFF";

  // Update the color box and value when the color input changes
  const colorInput = document.getElementById("colorInput");
  colorInput.addEventListener("input", function () {
    selectedColor = colorInput.value;
    colorBox.style.backgroundColor = selectedColor;
    updateColorValue(selectedColor);
    saveColorToStorage(selectedColor); // Save the selected color to localStorage
  });

  // Function to save the selected color to localStorage
  function saveColorToStorage(color) {
    let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    savedColors.push(color);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }

  // Save Color button functionality
  const saveColorButton = document.getElementById("saveColorButton");
  saveColorButton.addEventListener("click", function () {
    saveColorToStorage(selectedColor);
    displaySavedColors(); // Refresh the saved colors list

    // Redirect to colorHistory.html and pass the selected color as a query parameter
    const colorHistoryURL = `colorHistory.html?color=${encodeURIComponent(
      selectedColor
    )}`;
    window.location.href = colorHistoryURL;
  });

  // Update the color value and text color when the color format changes
  colorFormatSelect.addEventListener("change", function () {
    updateColorValue(selectedColor);
  });

  // Copy the color to the clipboard when the copy button is clicked
  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", function () {
    const colorFormat = colorFormatSelect.value;

    // Copy the color value based on the selected format
    switch (colorFormat) {
      case "hex":
        copyToClipboard(selectedColor);
        break;
      case "rgb":
        const rgbColor = hexToRGB(selectedColor);
        copyToClipboard(rgbColor);
        break;
      case "rgba":
        const rgbaColor = hexToRGBA(selectedColor);
        copyToClipboard(rgbaColor);
        break;
      case "hsl":
        const hslColor = hexToHSL(selectedColor);
        copyToClipboard(hslColor);
        break;
      default:
        copyToClipboard(selectedColor);
        break;
    }

    alert(
      "Color copied to clipboard: " + getColorValue(selectedColor, colorFormat)
    );

    // Save the selected color to localStorage
    saveColorToStorage(selectedColor);

    // Display the saved colors
    displaySavedColors();
  });

  // Back button functionality
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    // Navigate back to the previous page (options.html)
    window.history.back();
  });

  // Function to copy the color value to the clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Function to convert hex to RGB format
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to convert hex to RGBA format with opacity set to 1
  function hexToRGBA(hex) {
    return `rgba(${parseInt(
      hex.slice(1, 3),
      16
    )}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 1)`;
  }

  // Function to convert hex to HSL format
  function hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    // Convert to percentage and round to 2 decimal places
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  // Function to get the color value in the specified format
  function getColorValue(color, format) {
    switch (format) {
      case "hex":
        return color;
      case "rgb":
        return hexToRGB(color);
      case "rgba":
        return hexToRGBA(color);
      case "hsl":
        return hexToHSL(color);
      default:
        return color;
    }
  }

  // Function to update the color value display based on the selected format
  function updateColorValue(color) {
    const colorFormat = colorFormatSelect.value;
    const formattedColor = getColorValue(color, colorFormat);
    colorValue.textContent = formattedColor;
    // colorValue.style.color = formattedColor; // Set the color of the text to match the selected color
  }

  // Function to save the selected color to localStorage
  function saveColorToStorage(color) {
    let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    savedColors.push(color);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }

  function displaySavedColors() {
    const savedColors = localStorage.getItem("savedColors");
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      const savedColorsList = document.getElementById("savedColorsList");
      savedColorsList.innerHTML = ""; // Clear the list before adding saved colors

      parsedColors.forEach((color) => {
        const colorItem = document.createElement("li");
        colorItem.textContent = color;
        savedColorsList.appendChild(colorItem);
      });
    }
  }

  // Update the initial color value display on page load
  updateColorValue(selectedColor);

  // Display the saved colors on page load
  displaySavedColors();
});
