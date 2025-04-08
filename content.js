function remove(el){
  el.remove();
}
(async function () {
  const hostname = window.location.hostname.replace(/^www\./, '');

  if (typeof window.getAdBlockSelectors !== "function") {
    console.warn("[MyAdBlocker] getAdBlockSelectors is not defined!");
    return;
  }

  const selectors = await window.getAdBlockSelectors();

  console.log(`[MyAdBlocker] ${hostname}:`, selectors);

  if (!selectors || selectors.length === 0) return;

  console.log(`[MyAdBlocker] loaded`);
  try {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(remove)
    });
  } catch (e) {
    console.error("[MyAdBlocker] Error while removing elements:", e);
  }

  const observer = new MutationObserver(() => {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(remove)
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

})();

