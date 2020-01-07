'use strict';

function Res(url, ext) {
    this._url = url;
    this._ext = ext;
    this._hash = CryptoJS.MD5(url);
    this.__type = "Res";
}
Res.prototype.getUrl = function () {
    return this._url;
}
Res.prototype.setUrl = function (url) {
    this._url = url;
    return this;
}
Res.prototype.getExt = function () {
    return this._ext;
}
Res.prototype.setExt = function (ext) {
    this._ext = ext;
    return this;
}
Res.prototype.getHash = function () {
    return this._hash;
}