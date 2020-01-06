// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// When you click the extension app icon to loading the popup.html, 
// then display urlCollector value.
getUrlCollectorVal(function (data) {
    showUrlCollectorValue(data);
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        if (key === "urlCollector") {
            // When capturing a new url, print it.
            var urlArr = changes[key].newValue;
            showUrlCollectorValue(urlArr);
        }
    }
}
);

function showUrlCollectorValue(urlArr) {
    if (urlArr &&
        typeof (urlArr) === typeof ([]) &&
        urlArr.length > 0) {
        let summary = "";
        for (var i = 0; i < urlArr.length; i++) {
            summary = summary + urlArr[i] + "<br />";
        }
        let t = document.getElementById("urlCollector");
        if (t) t.innerHTML = summary;
    }
}

// changeColor.onclick = function (element) {
//     let color = element.target.value;
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             { code: 'document.body.style.backgroundColor = "' + color + '";' });
//     });
// };