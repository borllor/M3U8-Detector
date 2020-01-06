# Requirements

1. Popup only displays currentTab or all urls.
2. Changing tab needs to restore clipboard data and Popup data.
3. The text can be selected.
4. When there are resources of current tab, the icon will be flashing and show resources' number.
5. Common functions can be used in background.js and other js files.
6. Support multiply resource to be filtered.


Data structure:
Root[]:
    tabId1[]:
        res: {url: resource_url11, mediaType: "video/mp4", length: 12321234, ext: {}}
        res: {url: resource_url12, ext: {}}
    tabId2[]:
        res: {url: resource_url21, ext: {}}
        res: {url: resource_url22, ext: {}}        