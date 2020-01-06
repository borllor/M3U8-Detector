//var storage = chrome.storage.sync;

function getUrlCollectorVal(callback) {
    let _this = this;
    chrome.storage.sync.get("urlCollector", function (data) {
        if (callback && data) callback.call(_this, data["urlCollector"]);
    });
}

function setUrlCollectorVal(value, callback) {
    let _this = this;
    chrome.storage.sync.set({ "urlCollector": value }, function () {
        if (callback) callback.call(_this)
    });
}
