(async function () {

  const hostname = window.location.hostname.replace(/^www\./, '');
  if (typeof window.getAdBlockSelectors !== "function") {
    console.warn("[MyAdBlocker] getAdBlockSelectors is not defined!");
    return;
  }
  const selectors = await window.getAdBlockSelectors();
  if (!selectors || selectors.length === 0) return;

  const style = document.createElement('style');
  style.textContent = selectors.join(", ") + " { display: none !important; }";
  document.documentElement.prepend(style);
})();

