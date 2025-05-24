document.getElementById("applyUA").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.runtime.sendMessage({ action: "manualUA", tabId: tabs[0].id });
  });
});
