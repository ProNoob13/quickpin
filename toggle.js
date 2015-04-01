(chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.update(tab.id, {pinned: !tab.pinned});
}));