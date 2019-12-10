chrome.extension.sendMessage({title: 'get_data'},
    function (response) {
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = response;

        let items = htmlObject.getElementsByClassName('item   ');

        chrome.storage.sync.get({"ids": []}, function (obj) {
            console.log("Retrieved");
            let ids = obj.ids;
            for (let i = 0, l = items.length; i < l; i++) {
                ids.push({ids: items[i].dataset.id, HasBeenUploadedYet: false});
            }
            chrome.storage.sync.set({"ids": ids})
        })

    }
);

chrome.storage.sync.get({"ids": []}, function (obj) {
    new_items = [];

    let storage_value = obj.ids;
    let items = document.getElementsByClassName('item   ');

    if (storage_value) {
        for (var i = 0, f = 0, l = items.length; i < l; i++) {
            for (var j = 0, st_l = storage_value.length; j < st_l; j++) {
                if (storage_value[j].ids === items[i].dataset.id) {
                    f += 1;
                }
            }
            if (f > 0) {
                items[i].remove();
                i--;
                f = 0;
            }
        }
    }
});

