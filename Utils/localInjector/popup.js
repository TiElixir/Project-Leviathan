document.getElementById("injectBtn").addEventListener("click", async () => {
  const input = document.getElementById("storageInput").value;
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length === 0) {
    document.getElementById("status").textContent = "No localStorage data provided.";
    return;
  }

  // Parse each line into a key and value pair.
  const items = lines.map(line => {
    const parts = line.split(":");
    if (parts.length < 2) return null;
    const key = parts.shift().trim();
    const value = parts.join(":").trim();
    return { key, value };
  }).filter(item => item !== null);

  // Get the active tab.
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    document.getElementById("status").textContent = "Cannot determine active tab URL.";
    return;
  }

  // Inject a script into the active tab to set localStorage items.
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (items) => {
      items.forEach(item => {
        localStorage.setItem(item.key, item.value);
      });
      return "Done";
    },
    args: [items]
  }, (results) => {
    if (chrome.runtime.lastError) {
      document.getElementById("status").textContent = "Error: " + chrome.runtime.lastError.message;
    } else {
      document.getElementById("status").textContent = "Injected localStorage data.";
    }
  });
});
