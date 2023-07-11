(function () {
  "use strict";

  if (!window.__ENABLE_RIGHT_CLICK_SETUP) {
    window.document.addEventListener(
      "contextmenu",
      (event) => {
        const target = event.target;
        const isImage = target.tagName.toLowerCase() === "img";
        const isButton =
          target.classList.contains("_gLjHpwOxHFwo5nLM8hb") &&
          target.classList.contains("GoU8CT9Vm_TP_LyYJTsf");
        const isAdditionalButton =
          target.classList.contains("h4HgbO_Uu1JYg5UGANeQ") &&
          target.classList.contains("wTUruPetkKdWAR1dd6w4");
        const isActualMenu = target.classList.contains(
          ".cover-art.shadow.actionable.cover-art--with-auto-height, .cover-art-image, .mMx2LUixlnN_Fu45JpFB"
        );

        if (!(isImage || isButton || isAdditionalButton) && !isActualMenu) {
          // Block right-click on elements other than images, specified buttons, and actual menu
          // add as a toggle option
          //
          // revert to original
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true
    );
  }
  window.__ENABLE_RIGHT_CLICK_SETUP = true;
})();
