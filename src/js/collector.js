let page_count = 30; //todo move to background

for (let it = 1; it < page_count; it++){

    chrome.extension.sendMessage({title: 'get_data_' + it},
        function (response) {
            if (response !== "NO MORE") {
                let htmlObject = document.createElement('div');
                htmlObject.innerHTML = response;

                let items = htmlObject.getElementsByClassName('item   ');

                chrome.storage.sync.get({"ids": []}, function (obj) {
                    console.log("Retrieved");
                    let ids = obj.ids;
                    for (let i = 0, l = items.length; i < l; i++) {
                        if (!ids.includes(items[i].dataset.id)) {
                            ids.push(items[i].dataset.id);
                        }
                    }
                    chrome.storage.sync.set({"ids": ids})
                })
            }
        }
    );

}

