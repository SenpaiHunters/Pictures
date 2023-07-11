(() => {
  "use strict";

  const Command = {
    Search: "SpotOn-extension-search",
    OpenSpotify: "SpotOn-extension-open-spotify",
    CreatePlaylist: "SpotOn-extension-create-playlist",
    NewReleases: "SpotOn-extension-new-releases",
    YourLibrary: "SpotOn-extension-your-library",
  };

  const actions = [
    {
      id: Command.Search,
      title: '🔍 Search Spotify for "%s"',
      contexts: ["selection"],
      handler: (info) => {
        if (info.menuItemId === Command.Search) {
          chrome.tabs.create(
            {
              url: `https://open.spotify.com/search/${info.selectionText}`,
            },
            (tab) => {
              if (chrome.runtime.lastError) {
                console.error("Error creating tab:", chrome.runtime.lastError);
              } else {
                console.log("Tab created:", tab);
              }
            }
          );
        }
      },
    },
    {
      id: Command.CreatePlaylist,
      title: "🔨 Open Playlists",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/collection/playlists");
      },
    },
    {
      id: Command.OpenSpotify,
      title: "🎧 Open Spotify In Tab",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/");
      },
    },
    {
      id: Command.NewReleases,
      title: "🆕 New Releases",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/browse/new-releases");
      },
    },
    {
      id: Command.YourLibrary,
      title: "📚 Your Library",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/collection/library");
      },
    },
  ];

  function openSpotifyTab(url) {
    chrome.tabs.query({ url: "https://open.spotify.com/*" }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true }, (updatedTab) => {
          if (chrome.runtime.lastError) {
            console.error("Error updating tab:", chrome.runtime.lastError);
          } else {
            console.log("Tab updated:", updatedTab);
          }
        });
      } else {
        chrome.tabs.create({ url }, (newTab) => {
          if (chrome.runtime.lastError) {
            console.error("Error creating tab:", chrome.runtime.lastError);
          } else {
            console.log("Tab created:", newTab);
          }
        });
      }
    });
  }

  function handleCommand(command) {
    if (command === "toggle_sidebar") {
      openSpotifyTab("https://open.spotify.com/");
    } else if (command === "search_spotify") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          console.error("Error querying tabs:", chrome.runtime.lastError);
        } else {
          const selectionText = tabs[0].title;
          chrome.tabs.create(
            {
              url: `https://open.spotify.com/search/${selectionText}`,
            },
            (tab) => {
              if (chrome.runtime.lastError) {
                console.error("Error creating tab:", chrome.runtime.lastError);
              } else {
                console.log("Tab created:", tab);
              }
            }
          );
        }
      });
    } else if (command === "open_spotify") {
      openSpotifyTab("https://open.spotify.com/");
    } else if (command === "create_playlist") {
      openSpotifyTab("https://open.spotify.com/collection/playlists");
    }
  }

  chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [new chrome.declarativeContent.PageStateMatcher({})],
          actions: [new chrome.declarativeContent.ShowPageAction()],
        },
      ]);
    });

    actions.forEach(({ id, title, contexts }) => {
      chrome.contextMenus.create({ id, title, contexts }, () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error creating context menu:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Context menu item created:", id);
        }
      });
    });
  });

  chrome.commands.onCommand.addListener(handleCommand);

  chrome.contextMenus.onClicked.addListener((info) => {
    actions.forEach(({ handler }) => {
      handler(info);
    });
  });
})();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    console.log("Tab updated:", tab.url);

    const startTime = performance.now(); // Start measuring loading time

    chrome.storage.sync.get(
      [
        "themeSelected",
        "addLyricsButton",
        "righter",
        "roundAlbumArt",
        "rainbowControls",
        "dynamicArt",
        "hiddenSDate",
        "hiddenSNumber",
        "scrollNPB",
        "hiddenSDura",
        "hiddenSAlbum",
        "hiddenSHeart",
        "hiddenSinfo",
        "hiddenSPL",
        "hiddenPIcon",
        "hiddenSTime",
        "removeprembutton",
        "removemusixmatch",
        "spinAlbum",
        "navToggle",
        "footernomore",
        "byeappthing",
        "fontLsize",
        "hideCB",
        "removeVolBar",
        "Scrollbar",
      ],
      function (obj) {
        console.log("Storage values:", obj);
        let themeSelected = obj ? obj.themeSelected : "default.css";
        let addLyricsButton =
          obj && typeof obj.addLyricsButton === "boolean"
            ? obj.addLyricsButton
            : true;
        let navToggle =
          obj && typeof obj.navToggle === "boolean" ? obj.navToggle : true;
        let righter =
          obj && typeof obj.righter === "boolean" ? obj.righter : true;
        let roundAlbumArt =
          obj && typeof obj.roundAlbumArt === "boolean"
            ? obj.roundAlbumArt
            : true;
        let rainbowControls =
          obj && typeof obj.rainbowControls === "boolean"
            ? obj.rainbowControls
            : true;
        let dynamicArt =
          obj && typeof obj.dynamicArt === "boolean" ? obj.dynamicArt : true;
        let hiddenSDate =
          obj && typeof obj.hiddenSDate === "boolean" ? obj.hiddenSDate : false;
        let hiddenSNumber =
          obj && typeof obj.hiddenSNumber === "boolean"
            ? obj.hiddenSNumber
            : false;
        let hiddenSDura =
          obj && typeof obj.hiddenSDura === "boolean" ? obj.hiddenSDura : false;
        let hiddenSAlbum =
          obj && typeof obj.hiddenSAlbum === "boolean"
            ? obj.hiddenSAlbum
            : false;
        let hiddenSHeart =
          obj && typeof obj.hiddenSHeart === "boolean"
            ? obj.hiddenSHeart
            : false;
        let hiddenSinfo =
          obj && typeof obj.hiddenSinfo === "boolean" ? obj.hiddenSinfo : false;
        let hiddenSPL =
          obj && typeof obj.hiddenSPL === "boolean" ? obj.hiddenSPL : false;
        let hiddenPIcon =
          obj && typeof obj.hiddenPIcon === "boolean" ? obj.hiddenPIcon : false;
        let hiddenSTime =
          obj && typeof obj.hiddenSTime === "boolean" ? obj.hiddenSTime : false;
        let scrollNPB =
          obj && typeof obj.scrollNPB === "boolean" ? obj.scrollNPB : false;
        let removeprembutton =
          obj && typeof obj.removeprembutton === "boolean"
            ? obj.removeprembutton
            : true;
        let removemusixmatch =
          obj && typeof obj.removemusixmatch === "boolean"
            ? obj.removemusixmatch
            : true;
        let spinAlbum =
          obj && typeof obj.spinAlbum === "boolean" ? obj.spinAlbum : true;
        let footernomore =
          obj && typeof obj.footernomore === "boolean"
            ? obj.footernomore
            : true;
        let byeappthing =
          obj && typeof obj.byeappthing === "boolean" ? obj.byeappthing : true;
        let fontLsize =
          obj && typeof obj.fontLsize === "boolean" ? obj.fontLsize : true;
        let hideCB =
          obj && typeof obj.hideCB === "boolean" ? obj.hideCB : false;
        let removeVolBar =
          obj && typeof obj.removeVolBar === "boolean"
            ? obj.removeVolBar
            : false;
        let scrollbar =
          obj && typeof obj.Scrollbar === "boolean" ? obj.Scrollbar : false;

        if (scrollNPB) {
          console.log("Inserting scrollNPB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/scrollNPB.css`],
          });
        }

        if (righter) {
          console.log("Inserting righter.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/righter.css`],
          });
        }

        if (fontLsize) {
          console.log("Inserting fontLsize.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/fontLsize.css`],
          });
        }

        if (hideCB) {
          console.log("Inserting hideCB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hideCB.css`],
          });
        }

        if (footernomore) {
          console.log("Inserting footernomore.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/footernomore.css`],
          });
        }

        if (byeappthing) {
          console.log("Inserting byeappthing.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/byeappthing.css`],
          });
        }

        if (spinAlbum) {
          console.log("Inserting spinAlbum.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/spinAlbum.css`],
          });
        }

        if (removeVolBar) {
          console.log("Inserting removeVolBar.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeVolBar.css`],
          });
        }

        if (roundAlbumArt) {
          console.log("Inserting roundAlbumArt.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/roundAlbumArt.css`],
          });
        }

        if (removeprembutton) {
          console.log("Inserting removeprembutton.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeprembutton.css`],
          });
        }

        if (dynamicArt) {
          console.log("Inserting dynamicArt.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/dynamicArt.css`],
          });
        }

        if (addLyricsButton) {
          console.log("Executing addLyrics.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/addLyrics.js"],
          });
        }

        if (navToggle) {
          console.log("Executing navToggle.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/navToggle.js"],
          });
        }

        if (hiddenSDate) {
          console.log("Inserting hiddenSDate.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSDate.css"],
          });
        }

        if (removemusixmatch) {
          console.log("Inserting removemusixmatch.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/removemusixmatch.css"],
          });
        }

        if (hiddenSTime) {
          console.log("Inserting hiddenSTime.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSTime.css"],
          });
        }

        if (hiddenSNumber) {
          console.log("Inserting hiddenSNumber.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSNumber.css"],
          });
        }

        if (hiddenSDura) {
          console.log("Inserting hiddenSDura.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSDura.css"],
          });
        }

        if (hiddenSAlbum) {
          console.log("Inserting hiddenSAlbum.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSAlbum.css"],
          });
        }

        if (hiddenSHeart) {
          console.log("Inserting hiddenSHeart.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSHeart.css"],
          });
        }

        if (hiddenSinfo) {
          console.log("Inserting hiddenSinfo.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSinfo.css"],
          });
        }

        if (hiddenSPL) {
          console.log("Inserting hiddenSPL.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSPL.css"],
          });
        }

        if (hiddenPIcon) {
          console.log("Inserting hiddenPIcon.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenPIcon.css"],
          });
        }

        if (rainbowControls) {
          console.log("Inserting rainbowControls.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/rainbowControls.css`],
          });
        }

        if (scrollbar) {
          console.log("Inserting Scrollbar.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/Scrollbar.css`],
          });
        }

        console.log("Inserting themeSelected:", themeSelected);
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: [`./themes/${themeSelected}`],
        });

        const endTime = performance.now(); // Stop measuring loading time
        const loadingTime = endTime - startTime;
        console.log("Script loading time:", loadingTime, "ms");
      }
    );
  }
});

// Custom Options
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Ensure the changeInfo status is "complete" before applying customizations
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get(
      ["customOptions", "customColor", "customImage", "customLyrics"],
      function (obj) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error retrieving custom options:",
            chrome.runtime.lastError
          );
          return;
        }

        const customOptions = obj.customOptions;
        const customColor = obj.customColor;
        const customImage = obj.customImage;
        const customLyrics = obj.customLyrics;

        console.log("Custom Options:", customOptions);
        console.log("Custom Color:", customColor);
        console.log("Custom Image:", customImage);
        console.log("Custom Lyrics:", customLyrics);

        // Apply custom options to the desired element
        if (customOptions) {
          const optionsCSS = `
            .sqKERfoKl4KwrtHqcKOd {
              border-radius: ${customOptions.borderRadius} !important;
              padding: ${customOptions.padding} !important;
              height: ${customOptions.height} !important;
              width: ${customOptions.width} !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: optionsCSS,
          });
          console.log("Applied Custom Options:", optionsCSS);
        }

        // Settings for custom Lyrics

        if (customLyrics) {
          const optionsCSS = `
            .NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ {
              padding: ${customLyrics.padding} !important;
              height: ${customLyrics.height} !important;
              width: ${customLyrics.width} !important;
              color: ${customLyrics.color} !important;
            }
            .os-content
            .main-view-container__scroll-node-child
            [aria-label="Spotify"]
            .esRByMgBY3TiENAsbDHA {
            font: ${customLyrics.font} !important;
            text-align: justify !important;
            text-indent: 3px !important;
 
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: optionsCSS,
          });
          console.log("Applied Custom Lyrics:", lyricsCSS);
        }

        // Apply custom color to the desired element
        if (customColor) {
          const colorCSS = `
            .no-focus-outline #main .nav-ylx [aria-label="Main"],
            .BdcvqBAid96FaHAmPYw_,
            .sqKERfoKl4KwrtHqcKOd {
              background-color: ${customColor} !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: colorCSS,
          });
          console.log("Applied Custom Color:", colorCSS);
        }
        // Apply custom color to the desired element
        if (customVolBar) {
          const colorCSS = `
            /* add var */ {
              background-color: ${customVolColor} !important;
              background-image: ${customVolImg} !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: colorCSS,
          });
          console.log("Applied Custom CSS for the Volume bar:", colorCSS);
        }

        // Apply custom image as background
        if (customImage) {
          const imageCSS = `
            .sqKERfoKl4KwrtHqcKOd {
              background-image: url("${chrome.runtime.getURL(
                customImage
              )}") !important;
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
              background-blend-mode: soft-light !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: imageCSS,
          });
          console.log("Applied Custom Image:", imageCSS);
        }
      }
    );
  }
});

(function () {
  "use strict";

  function setupTab(tab) {
    if (
      !tab ||
      /^chrome:\/\//.test(tab.url) ||
      /^https?:\/\/chrome\.google\.com\/webstore/.test(tab.url)
    ) {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["setup.js"],
      world: "MAIN",
    });
  }

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => setupTab(tab));
  });
  chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.get(tabId, (tab) => setupTab(tab));
  });
})();
