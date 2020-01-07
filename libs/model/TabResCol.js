function TabResCol() {
    this._col = [];
    this._count = 0;
    this.__type = "TabResCol";
}
TabResCol.prototype.get = function (res) {
    for (let i = 0; i < this._col.length; i++) {
        if (this._col[i].getHash() === res.getHash()) {
            return this._col[i];
        }
    }
    return null;
}
TabResCol.prototype.getCount = function () {
    return this._count;
}
TabResCol.prototype.push = function (res) {
    if (!this.get(res)) {
        this._count++;
        this._col.push(res);
        return true;
    }
    return false;
}
TabResCol.prototype.foreach = function (callback) {
    for (let i = 0; i < this._col.length; i++) {
        if (callback) callback.call(this._col[i]);
    }
}