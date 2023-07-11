// Download the content
document
  .getElementById("SaveTheArts")
  .addEventListener("click", downloadAlbumArt);

function downloadAlbumArt() {
  var coverartimage = document.querySelector("[data-testid=cover-art-image]");
  if (coverartimage) {
    var imageUrl = coverartimage.src;
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "album-art.jpg";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading album art:", error));
  }
}

// Remove any existing event listeners on the button
document
  .getElementById("SaveTheArts")
  .removeEventListener("click", handleIconClick);

// Saving arts
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("SaveTheArts")
    .addEventListener("click", handleIconClick);
});

// Function to handle the button click
function handleIconClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { txt: "download" }, (response) => {
      console.log(response.status);
    });
  });
}
// Need to set up the saving toggle etc
// test. without commit
//
