function change_url() {
  const oldUrl = localStorage.getItem("old_url");
  const url = new URL(oldUrl);
  const domain = url.hostname;
  chrome.runtime.sendMessage({ type: "addApprovedUrl", url: domain }, () => {
    chrome.tabs.update({ url: oldUrl });
  });
}

function goBack(){
  history.go(-2);
  chrome.runtime.sendMessage({ type: "wentBack" ,url:localStorage.getItem("old_url")}, (response) => {

  });
}

document.getElementById("button").onclick = change_url;
document.getElementById("back button").onclick = goBack;