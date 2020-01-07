
'use strict';

/* begin: Object extension */
Object.prototype.toString = function () {
    let obj = this;
    return JSON.stringify(obj);
}
/* end: Object extension */

/* begin: Array extension */
Array.prototype.toString = function (separator) {
    let sep = !separator ? "," : separator;
    let arr = this;
    if (arr && arr.length > 0) {
        return arr.join(sep);
    }
    return null;
}
/* end: Array extension */

/* begin: String extension */
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

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
String.format = function () {
    if (arguments && arguments.length > 0) {
        arguments[0].format(arguments.shift());
    }
}
/* end: String extension */