function WindowRoot() {
    this._col = new TabCol(); // collector for Tab
    this.__type = "WindowRoot";
}
WindowRoot.prototype.getTabCount = function () {
    return this._col.count;
}
WindowRoot.prototype.getTabResCount = function (tabId) {
    let cnt = 0;
    if (tabId) {
        let t = this._col.get(tabId);
        if (t) cnt = t.getResCount();
    } else {
        this.col.foreach(function (tab) {
            cnt = cnt + tab.getResCount();
        });
    }
    return cnt;
}
WindowRoot.prototype.push = function (tab) {
    return this._col.push(tab);
}
WindowRoot.prototype.pushRes = function (tabId, res) {
    return this._col.pushRes(tabId, res);
}
WindowRoot.prototype.foreachTab = function (callback) {
    this._col.foreach(callback);
}
WindowRoot.prototype.foreachTabRes = function (callback, tabId) {
    if (tabId) {
        let t = this._col.get(tabId);
        if (t) t.foreachRes(callback);
    } else {
        this._col.foreach(function (tab) {
            tab.foreachRes(callback)
        });
    }
}