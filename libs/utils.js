
function existsInArray(arr, newValue) {
    if (arr && typeof (arr) === typeof ([])) {
        for (let i = 0; i < arr.length; i++) {
            if (newValue === arr[i]) {
                return true;
            }
        }
    }
    return false;
}

function assignType(object) {
    if (object && typeof (object) === 'object' && window[object.__type]) {
        object = assignTypeRecursion(object.__type, object);
    }
    return object;
}

function assignTypeRecursion(type, object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var obj = object[key];
            if (Array.isArray(obj)) {
                for (var i = 0; i < obj.length; ++i) {
                    var arrItem = obj[i];
                    if (arrItem && typeof (arrItem) === 'object' && window[arrItem.__type]) {
                        obj[i] = assignTypeRecursion(arrItem.__type, arrItem);
                    }
                }
            } else if (obj && typeof (obj) === 'object' && window[obj.__type]) {
                object[key] = assignTypeRecursion(obj.__type, obj);
            }
        }
    }
    return Object.assign(new window[type](), object);
}

function copyTextToClipboard(doc, text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = doc.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    doc.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    doc.execCommand('copy');

    //(Optional) De-select the text using blur(). 
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    doc.body.removeChild(copyFrom);
}