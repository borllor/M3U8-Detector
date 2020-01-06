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
    for (let key in changes) {
        if (key === UrlCollectorStorageName) {
            // When capturing a new url, print it.
            let windowRoot = changes[key].newValue;
            showUrlCollectorValue(windowRoot);
        }
    }
});

function showUrlCollectorValue(windowRoot) {
    if (windowRoot) {
        let summary = "";
        getTabIdBySetting(function (currentTabId) {
            forEachResourceInWindowRoot(windowRoot, currentTabId, function (tabId) {
                summary = summary + this.url + "<br />";
            });
            let elm = document.getElementById("urlCollector");
            if (elm) elm.innerHTML = summary;
        });
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