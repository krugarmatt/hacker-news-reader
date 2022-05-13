export function takeRandom(items: any[], max: number) {

    let internalMax: number = max;
    let selectedItems: any[] = [];

    // If there are fewer items than the max, the max should be the total number of items provided.
    if (items.length < max) {
        internalMax = items.length;
    }

    while (selectedItems.length < internalMax) {

        // Pick a random item from the array.
        const selectedItem = items[Math.floor(Math.random() * items.length)];

        // If we haven't already selected it, select it.
        // Otherwise, repeat the selection process.
        if (!selectedItems.includes(selectedItem)) {
            selectedItems.push(selectedItem);
        }

    }

    return selectedItems;

}