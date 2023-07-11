chrome.runtime.onInstalled.addListener(() => {
  checkForUpdate();
});

function checkForUpdate() {
  const repoOwner = "senpaihunters"; // Replace with your GitHub username or organization name
  const repoName = "spoton"; // Replace with your repository name

  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch latest release (${response.status} ${response.statusText})`
        );
      }
      return response.json();
    })
    .then((data) => {
      const latestVersion = data.tag_name;
      const currentVersion = chrome.runtime.getManifest().version;
      console.log("Latest version:", latestVersion);
      console.log("Current version:", currentVersion);

      if (compareVersions(latestVersion, currentVersion) > 0) {
        // New update available, send message to content script to show update popup
        chrome.tabs.query({ url: "https://open.spotify.com/*" }, (tabs) => {
          tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, {
              type: "show_update_popup",
              version: latestVersion,
            });
          });
        });
      }
    })
    .catch((error) => {
      console.error("Failed to check for update:", error);
    });
}

function compareVersions(a, b) {
  const segmentsA = a.split(".");
  const segmentsB = b.split(".");

  for (let i = 0; i < Math.max(segmentsA.length, segmentsB.length); i++) {
    const segmentA = parseInt(segmentsA[i]) || 0;
    const segmentB = parseInt(segmentsB[i]) || 0;

    if (segmentA < segmentB) {
      return -1;
    } else if (segmentA > segmentB) {
      return 1;
    }
  }

  return 0;
}

// goes into popup js

// random popup
// Send message to background.js to show update popup on Spotify page
chrome.runtime.sendMessage({ type: "showUpdatePopup" });

document
  .getElementById("settingsButton")
  .addEventListener("click", function () {
    chrome.tabs.create({ url: "settings.html" });
  });

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "showUpdatePopup") {
    const popupDiv = document.createElement("div");
    popupDiv.style.position = "fixed";
    popupDiv.style.top = "20px";
    popupDiv.style.left = "20px";
    popupDiv.style.padding = "10px";
    popupDiv.style.backgroundColor = "white";
    popupDiv.style.border = "1px solid black";
    popupDiv.style.zIndex = "9999";
    popupDiv.innerHTML = `
        <p>A new update (${message.version}) for SpotOn is available.</p>
        <p>Click <a href="${message.extensionURL}" target="_blank">here</a> to update.</p>
      `;

    document.body.appendChild(popupDiv);
  }
});
