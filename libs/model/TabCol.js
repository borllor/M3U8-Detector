'use strict';

function TabCol() {
    this._col = [];
    this._count = 0;
    this.__type = "TabCol";
}
TabCol.prototype.get = function (tabId) {
    for (let i = 0; i < this._col.length; i++) {
        if (this._col[i].getTabId() === tabId) {
            return this._col[i];
        }
    }
    return null;
}
Tab.prototype.getCol = function () {
    return this._col;
}
TabCol.prototype.getCount = function () {
    return this._count;
}
TabCol.prototype.push = function (tab) {
    if (!this.get(tab.getTabId())) {
        this._count++;
        this._col.push(tab);
        return true;
    }
    return false;
}
TabCol.prototype.pushRes = function (tabId, res) {
    let t = this.get(tabId);
    if (!t) {
        t = new Tab(tabId);
        this.push(t);
    }
    return t.pushRes(res);
}
TabCol.prototype.foreach = function (callback) {
    for (let i = 0; i < this._col.length; i++) {
        if (callback) callback.call(this._col[i]);
    }
}