chrome.storage.local.get({ "ids": [] }, (obj) => {
    const storage_values = new Set(obj.ids);

    // convert HTMLCollection (which is weird) to normal array
    const items = Array.from(document.getElementsByClassName('item   '));
    items.forEach((item) => {
        const item_id = item.dataset.id;
        if (storage_values.has(item_id)) {
            item.parentElement.removeChild(item);
        }
    });
});

