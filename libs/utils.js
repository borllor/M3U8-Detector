
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