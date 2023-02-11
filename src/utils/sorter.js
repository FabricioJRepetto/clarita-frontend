export const textSort = (a, b) => {
    const A = a.name.toLowerCase(),
        B = b.name.toLowerCase()
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
    return 0;
}