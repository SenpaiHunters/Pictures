
function checkForUpdate() {
  const repoOwner = "SenpaiHunters"; // Replace with your GitHub username or organization name
  const repoName = "Pictures"; // Replace with your repository name

  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`)
    .then((response) => response.json())
    .then((data) => {
      const latestVersion = data.tag_name;
      const currentVersion = chrome.runtime.getManifest().version;

      if (compareVersions(latestVersion, currentVersion) > 0) {
        // New update available, show a notification to the user
        chrome.notifications.create(
          "updateNotification",
          {
            type: "basic",
            iconUrl: "assets/logo.png",
            title: "New Update Available",
            message: `A new update (${latestVersion}) for your extension is available. Click here to update.`,
            buttons: [{ title: "Update Now" }],
            priority: 2,
          },
          (notificationId) => {
            // Handle button click events
            chrome.notifications.onButtonClicked.addListener(
              (clickedNotificationId, buttonIndex) => {
                if (
                  clickedNotificationId === notificationId &&
                  buttonIndex === 0
                ) {
                  // User clicked the "Update Now" button
                  chrome.tabs.create({
                    url: `https://github.com/${repoOwner}/${repoName}/releases/latest`,
                  });
                }
              }
            );
          }
        );
      }
    })
    .catch((error) => {
      console.error("Error checking for updates:", error);
    });
}

// Compare two versions
function compareVersions(version1, version2) {
  if (!version1 || !version2) {
    // Handle invalid versions
    console.error("Invalid version provided");
    return 0;
  }

  const v1 = version1.split(".").map(Number);
  const v2 = version2.split(".").map(Number);

  for (let i = 0; i < v1.length; i++) {
    if (v1[i] > v2[i]) {
      return 1;
    } else if (v1[i] < v2[i]) {
      return -1;
    }
  }

  return 0;
}
