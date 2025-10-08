document.getElementById("injectBtn").addEventListener("click", async () => {
  const input = document.getElementById("cookieInput").value;
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length === 0) {
    document.getElementById("status").textContent = "No cookie data provided.";
    return;
  }

  // Get the active tab's URL
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    document.getElementById("status").textContent = "Cannot determine active tab URL.";
    return;
  }
  const url = tab.url;

  // For each line, parse the cookie name and value and set the cookie
  let promises = lines.map(line => {
    const parts = line.split(":");
    if (parts.length < 2) return Promise.resolve(false);
    const name = parts.shift().trim();
    const value = parts.join(":").trim();

    // Set the cookie using the current tab's URL
    return new Promise((resolve) => {
      chrome.cookies.set({
        url: url,
        name: name,
        value: value
      }, (cookie) => {
        if (chrome.runtime.lastError) {
          console.error(`Error setting cookie ${name}:`, chrome.runtime.lastError.message);
          resolve(false);
        } else {
          console.log("Cookie set:", cookie);
          resolve(true);
        }
      });
    });
  });

  Promise.all(promises).then(results => {
    const successCount = results.filter(Boolean).length;
    document.getElementById("status").textContent = `Injected ${successCount} cookies.`;
  });
});
