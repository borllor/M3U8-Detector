
Object.prototype.toString = function () {
    let obj = this;
    return JSON.stringify(obj);
}

Array.prototype.toString = function (separator) {
    let sep = !separator ? "," : separator;
    let arr = this;
    if (arr && arr.length > 0) {
        return arr.join(sep);
    }
    return null;
}

String.prototype.toObject = function () {
    let json = this;
    if (json &&
        json.length > 1 &&
        json.startsWith("{") &&
        json.endsWith("}")) {
        return JSON.parse(json);
    } else {
        return null;
    }
}