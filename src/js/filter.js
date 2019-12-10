chrome.storage.sync.get({"ids": []}, function (obj) {
    let storage_value = obj.ids;
    let items = document.getElementsByClassName('item   ');

    if (storage_value) {
        for (var i = 0, f = 0, l = items.length; i < l; i++) {
            for (var j = 0, st_l = storage_value.length; j < st_l; j++) {
                if (storage_value[j] === items[i].dataset.id) {
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

