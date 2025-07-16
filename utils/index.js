function reflectString(input) {
    return [...input, ...[...input].reverse()].map(Number);
}

function reduceArrayNeighbors(input) {
    const result = [];
    for (let i = 0; i < input.length - 1; i++) {
        const sum = input[i] + input[i + 1];
        if (sum > 9) {
            const sumString = sum.toString();
            result.push(Number(sumString[0]) + Number(sumString[1]));
        } else {
            result.push(sum);
        }
    }
    return result;
}

function calculateNeighborsMatrix(input) {
    let neighborsSum = reduceArrayNeighbors(input);
    const result = [input, neighborsSum];
    while (neighborsSum.length > 1) {
        neighborsSum = reduceArrayNeighbors(neighborsSum);
        result.push(neighborsSum);
    }
    return result;
}

module.exports = {
    reflectString,
    calculateNeighborsMatrix,
};