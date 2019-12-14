class LocalStorage {
    static get(keysObj) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(keysObj, (valuesObj) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(valuesObj);
                }
            })
        });
    }
    static set(valuesObj) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(valuesObj, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve();
                }
            })
        });
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

chrome.extension.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.title.startsWith('get_data')) {

        let { last_check } = await LocalStorage.get({ last_check: "1970-01-01T00:00:00Z" });
        if (new Date() - new Date(last_check) <= 1000 * 60 * 60 * 24) {
            return
        }
        await wait(Math.floor(Math.random() * 100));
        let pg = 1;
        while (true) {
            let { page_num, ids } = await LocalStorage.get({ page_num: 1, ids: [] });
            if (pg !== page_num) {
                // other thread changed this
                return;
            }
            ids = new Set(ids);

            const res = await fetch(`https://autocentrum-aaa-auto-a-s.autobazar.sk/autocentrum-aaa-auto-a-s/?p[page]=${page_num}`, {
                headers: {
                    "Access-Control-Allow-Headers": "document,text/html,json",
                    "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                    "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
                }
            });
            const response = await res.text();
            if (res.status < 200 || res.status >= 300) {
                console.log("Response has not received.")
                pg = 1;
            } else {
                pg++;
                const htmlObject = document.createElement('div');
                htmlObject.innerHTML = response;
                const items = htmlObject.getElementsByClassName('item   ');
                for (let i = 0; i < items.length; i++) {
                    ids.add(items[i].dataset.id);
                }
                await wait(1000);
            }
            await LocalStorage.set({ last_check: new Date(), page_num: pg, ids: Array.from(ids.values()) });
        }
    }
    return true;
});
