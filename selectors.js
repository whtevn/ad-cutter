window.getAdBlockSelectors = async function () {
  return new Promise((resolve) => {
    chrome.storage.local.get("adblock_selectors", (data) => {
      resolve(data.adblock_selectors || {});
    });
  });
};

