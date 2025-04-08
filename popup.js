function reload(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}
(async function () {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, '');
  const key = "adblock_selectors";

  document.getElementById("domain").textContent = `Site: ${domain}`;

  const textarea = document.getElementById("selectors");
  const saveBtn = document.getElementById("save");
  const clearBtn = document.getElementById("clear");

  // Load selectors from chrome.storage.local
  chrome.storage.local.get([key], (result) => {
    const data = result[key] || {};
    textarea.value = (data[domain] || []).join("\n");

    saveBtn.onclick = () => {
      const selectors = textarea.value
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

      data[domain] = selectors;
      chrome.storage.local.set({ [key]: data }, () => {
        reload()
      });
    };

    clearBtn.onclick = () => {
      delete data[domain];
      chrome.storage.local.set({ [key]: data }, () => {
        textarea.value = "";
        reload()
      });
    };
  });
})();

