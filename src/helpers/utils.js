export function takeRandom(items, max) {
    
    const selectedItems = [];

    // If there are less items than the maximum, just use all the items.
    if (items.length <= max) {
        selectedItems = items;
    } else {

        while (selectedItems.length < max) {

            // Pick a random item from the array.
            const selectedItem = items[Math.floor(Math.random() * items.length)];

            // If we haven't already selected it, select it.
            // Otherwise, repeat the selection process.
            if (!selectedItems.includes(selectedItem)) {
                selectedItems.push(selectedItem);
            }

        }

    }

    return selectedItems;

}