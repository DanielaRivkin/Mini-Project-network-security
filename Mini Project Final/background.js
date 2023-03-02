let loadedUrls = {}; // save urls we already checked


function isValidUrl(urlString) {
  let url;
  try {
    url = new URL(urlString);
  }
  catch (e) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "wentBack") {
    loadedUrls[request.url] = undefined;
    sendResponse();
  }
});

/* */
async function scanURL(url) {
  const apiKey = "2bed137d0b7cb76249655140dae55e0d231d607e0546ff8c523a52423a8d7148";
  const requestUrl = `https://www.virustotal.com/api/v3/urls`;
  const requestBody = JSON.stringify({ url });

  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      body: new URLSearchParams({ url: url }),
      headers: {
        accept: 'application/json',
        'x-apikey': apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function getScanResults(id) {
  const apiKey = "b30c3ac0bd8767ac96ee56ad6086f423d4a4f3f1fb45fef9d48b2f8c9e152824";
  const requestUrl = `https://www.virustotal.com/api/v3/analyses/${id}`;

  try {
    const response = await fetch(requestUrl, { method: 'GET', headers: { accept: 'application/json', 'x-apikey': apiKey } });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
/**
 * uses the virustotal api to check if url is malicious or not
 * @param {*} url 
 * @returns true if malicious, false otherwise
 */
async function check_url_method_1(url) {
  try {
    const scanResult = await scanURL(url);
    const scanId = scanResult.data.id;
    const results = await getScanResults(scanId);
    let stats = results.data.attributes.stats;
    if (stats["malicious"] > 0) {
      return true;
    }
    return false;
  } catch (er) {
    console.log("Error with method 1");
  }
  return false;
}
/**
 * uses the chrome safe browsing lookup api to check if url is malicious or not
 * @param {*} url 
 * @returns true if malicious, false otherwise
 */
async function check_url_method_2(URL) {
  let requestBody = {
    "client": {
      "clientId": "447277819576-mol9k6d9pe7l1l90s1hpisomju9ffau2.apps.googleusercontent.com",
      "clientVersion": "1.0"
    },
    "threatInfo": {
      "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
      "platformTypes": ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        { "url": URL }
      ]
    }
  };
  try {
    const response = await fetch("https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyD7T8yrdTgRgS76AM5hMMO4ljzKi2k3Zb4", {
      method: 'POST',

      body: JSON.stringify(requestBody)

    });

    const res_json = await response.json();
    if ("matches" in res_json) {
      return true;
    }
    return false;
  } catch (er) {
    console.log("Error with method 2");
  }
  return false;
}
/**
 * checks both methods. If one of them returns true than the method returns true;
 * @param {*} url 
 * @returns true if malicious, false otherwise
 */
async function check_bad_url(url) {
  const url_ob = new URL(url);
  if (url_ob.host == "www.google.com") {
    return false;
  }
  const baseURL = url_ob.protocol + "//" + url_ob.host;
  const method1 = await check_url_method_1(baseURL);

  const method2 = await check_url_method_2(url);
  const result = method1 || method2;
  if (result) {
    const [activeTab] = await new Promise(resolve =>
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs))
    );
    const blockedUrl = url;
    localStorage.setItem("old_url", blockedUrl);
    return true;
  }
  return false;
}


async function navigateToBlockedPage(tabId) {
  const blockedUrl = localStorage.getItem("old_url");
  if (blockedUrl) {
    try {
      await chrome.tabs.update(tabId, { url: "index.html" });
    } catch (error) {
      console.error(error);
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  async function (details) {
    if (!loadedUrls[details.url] && details.method === 'GET' && details.type === 'main_frame' && details.url) {
      if (isValidUrl(details.url)) {
        loadedUrls[details.url] = 1;
        const isMalicious = await check_bad_url(details.url);
        if (isMalicious) {
          navigateToBlockedPage(details.tabId);
        }
      }
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);