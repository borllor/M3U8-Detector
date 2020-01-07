function Tab(tabId) {
    this._col = new TabResCol(); // collector for Res
    this._url = "";
    this._tabId = tabId;
    this.__type = "Tab";
}
Tab.prototype.getCol = function () {
    return this._col;
}
Tab.prototype.getUrl = function () {
    return this._url;
}
Tab.prototype.setUrl = function (url) {
    this._url = url;
    return this;
}
Tab.prototype.getTabId = function () {
    return this._tabId;
}
Tab.prototype.getResCount = function () {
    return this._col.getCount();
}
Tab.prototype.pushRes = function (res) {
    return this._col.push(res);
}
Tab.prototype.foreachRes = function (callback) {
    this._col.foreach(callback);
}