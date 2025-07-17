export function reflectString(input) {
    return [...input, ...[...input].reverse()].map(Number);
}

export function reduceArrayNeighbors(input) {
    const result = [];
    for (let i = 0; i < input.length - 1; i++) {
        result.push(s([input[i], input[i + 1]]));
    }
    return result;
}

export function calculateNeighborsMatrix(input) {
    let neighborsSum = reduceArrayNeighbors(input);
    const result = [input, neighborsSum];
    while (neighborsSum.length > 1) {
        neighborsSum = reduceArrayNeighbors(neighborsSum);
        result.push(neighborsSum);
    }
    return result;
}

function s(inputs) {
    const sum = inputs.reduce((acc, curr) => acc + Number(curr), 0);
    let result = sum;
    if (sum > 9) {
        const sumString = sum.toString();
        result = s([...sumString]);
    }
    return result;
}

export function calculateFinanceSequence([day, month, year]) {
    const sum1 = [s([...day]), s([...month]), s([...year])]
    return [...sum1, s(sum1)];
}
