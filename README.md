# Requirements

1. Popup only displays currentTab or all urls. [05 Jan 2020]
2. Changing tab needs to restore clipboard data and Popup data. [05 Jan 2020]
3. The text can be selected. [05 Jan 2020]
4. When there are resources of current tab, the icon will be flashing and show resources' number. [05 Jan 2020]
5. Common functions can be used in background.js and other js files. [05 Jan 2020]
6. Support multiply resource to be filtered. [06 Jan 2020]
7. **Data structure**:

```
    windowRoot{tabCount: 2, col: {tab1, tab2}}}:
        tab1{tabId: 239, resCount: 2, col:[res1, res2]}:
            res: {hash: "", url: resource_url11, mediaType: "video/mp4", length: 12321234, request: {}, ext: {}}
            res: {}
        tab2{}:
            res: {}
            res: {}
```

8. Recasting via using OOP.
