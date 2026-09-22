async function loadCSV(path) {
    const response = await fetch(path);
    const text = await response.text();

    const lines = text.trim().split("\n");
    const headers = lines.shift().split(",");

    return lines.map(line => {
        const values = line.split(",");
        const obj = {};

        headers.forEach((h, i) => {
            const value = values[i];
            obj[h.trim()] = value ? value.trim() : "";
        });

        return obj;
    });
}

function sortByKey(array, key, order = "asc") {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return order === "asc" ? -1 : 1;
        if (a[key] > b[key]) return order === "asc" ? 1 : -1;
        return 0;
    });
}

function innerJoin(leftArray, rightArray, leftKey, rightKey, selector) {
    const rightLookup = new Map();

    rightArray.forEach(item => {
        const key = item[rightKey];
        if (!rightLookup.has(key)) {
            rightLookup.set(key, []);
        }
        rightLookup.get(key).push(item);
    });

    const result = [];

    leftArray.forEach(leftItem => {
        const matchKey = leftItem[leftKey];
        const matches = rightLookup.get(matchKey);

        if (matches) {
            matches.forEach(rightItem => {
                result.push(
                    selector
                        ? selector(leftItem, rightItem)
                        : { ...leftItem, ...rightItem }
                );
            });
        }
    });

    return result;
}

function groupBy(data, key) {
    if (!Array.isArray(data)) return [];

    const sorted = sortByKey(data, key, "asc");

    const result = [];
    let currentGroup = null;
    let currentBucket = null;

    sorted.forEach(item => {
        if (item.gruppe !== currentGroup) {
            currentGroup = item.gruppe;
            currentBucket = [];
            result.push(currentBucket);
        }

        currentBucket.push(item);
    });

    return result;
}