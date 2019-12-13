chrome.extension.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.title.startsWith('get_data')) {

        while (true) {
            // WA to make it work for MVP
            let min = 1, max = 300;
            let page_number = Math.floor(Math.random() * (max - min + 1)) + min;

            const res = await fetch(`https://autocentrum-aaa-auto-a-s.autobazar.sk/autocentrum-aaa-auto-a-s/?p[page]=${page_number}`, {
                headers: {
                    "Access-Control-Allow-Headers": "document,text/html,json",
                    "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                    "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
                }
            });
            const response = await res.text();
            if (res.status < 200 || res.status >= 300) {
                console.log("Response has not received.")
            }
            const htmlObject = document.createElement('div');
            htmlObject.innerHTML = response;
            const items = htmlObject.getElementsByClassName('item   ');
            const localStorage = chrome.storage.local;
            console.log(1);
            localStorage.get({ "ids":[] }, (obj) => {
                console.log(2);
                console.log("Retrieved");
                let ids = new Set(obj.ids);
                for (let i = 0, l = items.length; i < l; i++) {
                    ids.add(items[i].dataset.id);
                }
                localStorage.set({ "ids": Array.from(ids.values()) })
            });
            console.log(3);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    }
    return true;
});
