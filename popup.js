function reload(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}
(async function () {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, '');
  const selectorsKey = "adblock_selectors";
  const disableDefaultsKey = "adblock_disable_defaults";

  document.getElementById("domain").textContent = `Site: ${domain}`;

  const textarea = document.getElementById("selectors");
  const useDefaultsCheckbox = document.getElementById("use-defaults");
  const saveBtn = document.getElementById("save");
  const clearBtn = document.getElementById("clear");

  chrome.storage.local.get([selectorsKey, disableDefaultsKey], (result) => {
    const selectorData = result[selectorsKey] || {};
    const disableDefaultsData = result[disableDefaultsKey] || {};

    textarea.value = (selectorData[domain] || []).join("\n");
    useDefaultsCheckbox.checked = !disableDefaultsData[domain];

    saveBtn.onclick = () => {
      const selectors = textarea.value
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

      selectorData[domain] = selectors;

      disableDefaultsData[domain] = !useDefaultsCheckbox.checked;

      chrome.storage.local.set({
        [selectorsKey]: selectorData,
        [disableDefaultsKey]: disableDefaultsData
      }, () => {
        reload()
      });
    };

    clearBtn.onclick = () => {
      delete selectorData[domain];
      delete disableDefaultsData[domain];
      textarea.value = "";
      useDefaultsCheckbox.checked = true;

      chrome.storage.local.set({
        [selectorsKey]: selectorData,
        [disableDefaultsKey]: disableDefaultsData
      }, () => {
        reload()
      });
    };
  });
})();

