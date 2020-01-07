'use strict';

chrome.runtime.onInstalled.addListener(function () {
    setUrlCollectorVal(new WindowRoot(), function () {
        console.log("init WindowRoot object!");
    });
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
        getUrlCollectorVal(function (data) {
            let windowRoot = data;
            if (!windowRoot) { windowRoot = new WindowRoot(); }
            let res = new Res(request.url, request);
            if (windowRoot.pushRes(tabId, res)) {
                setUrlCollectorVal(windowRoot, function () {
                    setBadgeText(windowRoot);
                    copyResourceUrlToClipboard(document, windowRoot);
                });
            }
        });
    }
}
function filtered(url) {
    var filterExtensionsStr = setting.filterExtensions;
    if (filterExtensionsStr) {
        var filterExtensions = filterExtensionsStr.split(setting.filterExtensionsSeparator);
        for (var i = 0; i < filterExtensions.length; i++) {
            if (setting.filterMatchingType == "regex") {
                let reg = getExtensionToRegex(filterExtensions[i]);
                if (reg.test(url)) {
                    return true;
                }
            } else {
                if (url.indexOf(filterExtensions[i]) > 0) {
                    return true;
                }
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
    getTabIdBySetting(function (currentTabId) {
        let resourceCount = windowRoot.getTabResCount(currentTabId);
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
        windowRoot.foreachTabRes(function () {
            summary = summary + this.getUrl() + "\r\n";
        }, currentTabId);
        copyTextToClipboard(document, summary);
    });
}
