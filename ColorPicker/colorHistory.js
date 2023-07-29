// colorHistory.js
document.addEventListener("DOMContentLoaded", function () {
  // Get the saved colors from localStorage
  const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];

  // Get the colorHistoryList element
  const colorHistoryList = document.getElementById("colorHistoryList");

  // Function to create and append a list item for each saved color
  function createColorListItem(color) {
    const listItem = document.createElement("li");

    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.classList.add("color-item");

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", function () {
      copyToClipboard(color);
      alert("Color copied to clipboard: " + color);
    });

    listItem.appendChild(colorDiv);
    listItem.appendChild(copyButton);

    return listItem;
  }

  // Loop through the saved colors and add them to the colorHistoryList
  savedColors.forEach((color) => {
    colorHistoryList.appendChild(createColorListItem(color));
  });

  // Handle the click event of the "Go Back" button
  const goBackButton = document.getElementById("goBackButton");
  goBackButton.addEventListener("click", function () {
    // Navigate back to color.html
    window.location.href = "color.html";
  });
});
