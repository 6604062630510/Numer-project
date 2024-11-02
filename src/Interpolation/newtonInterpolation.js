

export function dividedDifference(x, y, i, j) {
    if (i === j) {
        return y[i];
    }
    return (dividedDifference(x, y, i + 1, j) - dividedDifference(x, y, i, j - 1)) / (x[j] - x[i]);
}

export function computeCoefficients(x, y, n) {
    const c = new Array(n);
    for (let j = 0; j < n; j++) {
        c[j] = dividedDifference(x, y, 0, j);
    }
    return c;
}

export function newtonPolynomial(x, c, n, value) {
    let result = c[0];
    for (let i = 1; i < n; i++) {
        let term = c[i];
        for (let j = 0; j < i; j++) {
            term *= (value - x[j]);
        }
        result += term;
    }
    return result;
}
