
export const formatMoney = (n) => {
    let s = parseFloat(n).toFixed(2);
    return `$${s}`;
}