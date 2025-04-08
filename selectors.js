window.DEFAULT_AD_SELECTORS = [
  ".ad",
  ".ads",
  ".ad-banner",
  ".ad-slot",
  ".ad-slot-header",
  ".ad-slot-header__wrapper",
  ".ad-container",
  ".ad-box",
  ".ad-unit",
  ".ad-space",
  ".advert",
  ".advertisement",
  ".banner-ad",
  ".sponsored",
  ".sponsor",
  ".adsbygoogle",
  "#ad",
  "#ads",
  "#ad-banner",
  "#ad-container",
  "#sponsored",
  '[id*=aswift_]',
  'iframe[src*="ads"]',
  'iframe[src*="doubleclick"]',
  'iframe[src*="googlesyndication"]',
  'iframe[src*="adservice"]',
  '[type="application/x-shockwave-flash"]',
];

window.getAdBlockSelectors = async function () {
  return new Promise((resolve) => {
    chrome.storage.local.get(["adblock_selectors", "adblock_disable_defaults"], (data) => {
      const hostname = window.location.hostname.replace(/^www\./, '');
      const userRules = data.adblock_selectors?.[hostname] || [];
      const disableDefaults = data.adblock_disable_defaults?.[hostname];

      const selectors = disableDefaults
        ? userRules
        : [...(window.DEFAULT_AD_SELECTORS || []), ...userRules];

      resolve(selectors);
    });
  });
};

