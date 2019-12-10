chrome.storage.sync.get({"ids": []}, function (obj) {
    let storage_values = obj.ids;
    let items = document.getElementsByClassName('item   ');

    if (storage_values) {
        for (var i = 0, f = 0, l = items.length; i < l; i++) {
            for (var j = 0, st_l = storage_values.length; j < st_l; j++) {
                if (storage_values[j] === items[i].dataset.id) {
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

