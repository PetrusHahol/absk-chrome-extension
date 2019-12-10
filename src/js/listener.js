chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.title.startsWith('get_data_')) {

        let page_number = message.title.split("_")[2];

        const req = new XMLHttpRequest();
        req.open("GET", 'https://autocentrum-aaa-auto-a-s.autobazar.sk/autocentrum-aaa-auto-a-s/?p[page]='
            + page_number, true);
        req.setRequestHeader("Access-Control-Allow-Headers", "document,text/html,json");
        req.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;" +
            "q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
        req.setRequestHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        req.send();

        req.onload = function () {
            if (this.status === 200) {
                sendResponse(this.responseText);

            } else {
                sendResponse("NO MORE")
            }
        };
    }
    return true;
})
