
export const formatMoney = (n) => {
    let s = parseFloat(n).toFixed(2);
    return `$${s}`;
}

export const drawRoundedRect = (ctx, w, h, r) => {
    ctx.beginPath();
        
    ctx.moveTo(r, 0);
    ctx.lineTo(w-r, 0);
    ctx.arcTo(w, 0, w, r, r);
    ctx.lineTo(w, h-r);
    ctx.arcTo(w, h, w-r, h, r);
    ctx.lineTo(r,h);
    ctx.arcTo(0, h, 0, h-r, r);
    ctx.lineTo(0,r);
    ctx.arcTo(0, 0, r, 0, r);

    ctx.closePath();
}