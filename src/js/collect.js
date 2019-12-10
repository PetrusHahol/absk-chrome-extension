
let items = document.getElementsByClassName('item  top  ');

let storage = ["19037057"]; // todo implement storage

new_items = [];

for (var i = 0, f = 0, l = items.length; i < l; i++) {
    for (var j = 0, st_l = storage.length; j < st_l; j++) {
        if (storage[j] === items[i].dataset.id) {
            f += 1;
        }
    }
    if (f > 0) {
        items[i].remove()
    }

}


