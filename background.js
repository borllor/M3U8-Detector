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
        init();
    }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    if (setting.switchType === "current") {
        init();
        initData();
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function (request) {
        let url = request.url;
        filterUrl(request, url);
        return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function filterUrl(request, url) {
    if (!url) return;
    if (filtered(url)) {
        let tabId = request.tabId;
        let urlArr = null;
        getUrlCollectorVal(function (data) {
            /*
            Data structure:
            windowRoot{}:
                tabId1[]:
                    res: {url: resource_url11, mediaType: "video/mp4", length: 12321234, ext: {}}
                    res: {url: resource_url12, ext: {}}
                tabId2[]:
                    res: {url: resource_url21, ext: {}}
                    res: {url: resource_url22, ext: {}}  
            */
            let windowRoot = data;
            if (!windowRoot) windowRoot = {};
            if (!windowRoot[tabId]) windowRoot[tabId] = [];
            let tabCol = windowRoot[tabId];
            if (!existResource(tabCol, request)) {
                let res = { "url": request.url, "tabId": tabId, "request": request };
                tabCol.push(res);
                setUrlCollectorVal(windowRoot, function () {
                    setBadgeText(windowRoot);
                    copyResourceUrlToClipboard(document, windowRoot);
                });
            }
        });
    }
}
function existResource(tabCol, request) {
    if (tabCol && request && tabCol.length > 0) {
        for (let i = 0; i < tabCol.length; i++) {
            if (tabCol[i]["url"] === request.url) {
                return true;
            }
        }
    }

    return false;
}
function filtered(url) {
    var filterExtensionsStr = setting.filterExtensions;
    if (filterExtensionsStr) {
        var filterExtensions = filterExtensionsStr.split(setting.filterExtensionsSeparator);
        for (var i = 0; i < filterExtensions.length; i++) {
            let reg = getExtensionToRegex(filterExtensions[i]);
            if (reg.test(url)) {
                return true;
            }
        }
    }
    return false;
}

var filterExtensionsRegex;
function getExtensionToRegex(extension) {
    if (!filterExtensionsRegex) filterExtensionsRegex = new Object();
    if (!filterExtensionsRegex[extension]) filterExtensionsRegex[extension] = new RegExp(extension);
    return filterExtensionsRegex[extension];
}

function init() {
    chrome.browserAction.setBadgeText({ text: "" });
    copyTextToClipboard(document, "");
}

function initData() {
    getUrlCollectorVal(function (data) {
        let windowRoot = data;
        setBadgeText(windowRoot);
        copyResourceUrlToClipboard(document, windowRoot);
    });
}

function setBadgeText(windowRoot) {
    let resourceCount = 0;
    getTabIdBySetting(function (currentTabId) {
        forEachResourceInWindowRoot(windowRoot, currentTabId, function (tabId) {
            resourceCount++;
        });
        if (resourceCount <= 0) {
            chrome.browserAction.setBadgeText({ text: "" });
            return;
        }
        var badgeText = resourceCount > 10 ? "10+" : (resourceCount + "")
        chrome.browserAction.setBadgeText({ text: badgeText });
    });
}

function copyResourceUrlToClipboard(document, windowRoot) {
    let summary = "";
    getTabIdBySetting(function (currentTabId) {
        forEachResourceInWindowRoot(windowRoot, currentTabId, function (tabId) {
            summary = summary + this.url + "\r\n";
        });
        copyTextToClipboard(document, summary);
    });
}
