(async function () {
  const hostname = window.location.hostname.replace(/^www\./, '');
  const selectorsByDomain = await window.getAdBlockSelectors();
  const selectors = selectorsByDomain[hostname];
  console.log(`[MyAdBlocker] ${hostname}:`, selectors);
  if (!selectors || selectors.length === 0) return;

  const style = document.createElement('style');
  style.textContent = selectors.join(", ") + " { display: none !important; }";
  document.documentElement.prepend(style);

  console.log(`[MyAdBlocker] Applied selectors for ${hostname}:`, selectors);
})();

