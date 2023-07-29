// Download page
chrome.runtime.onInstalled.addListener(function (object) {
  let downloadPage = chrome.runtime.getURL("download.html");
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: downloadPage });
  }
});
