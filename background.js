'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: ':' } })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // When refreshing the tab page, clear urlCollector's data.
    if (changeInfo["status"] === "loading") {
        initize();
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        let url = details.url;
        if (url.indexOf(".m3u8") != -1) {
            let urlArr = null;
            getUrlCollectorVal(function (data) {
                urlArr = data;
                if (!urlArr) urlArr = [];
                if (!existsInArray(urlArr, url)) {
                    urlArr.push(url);
                    setUrlCollectorVal(urlArr, function () {
                        setBadgeText(urlArr);
                        copyTextToClipboard(document, urlArr.toString("\r\n"));
                    });
                }
            });
        }
        return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function initize(){
    chrome.browserAction.setBadgeText({ text: "" });
    setUrlCollectorVal([], function () {
        console.log('set urlCollector to null.' + changeInfo.toString());
    });
}

function setBadgeText(urlArr) {
    if (urlArr && urlArr.length < 12) {
        let badgeText = urlArr.length > 10 ? "10+" : (urlArr.length + "")
        chrome.browserAction.setBadgeText({ text: badgeText });
    }
}