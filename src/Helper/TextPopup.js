/* global game */
var TextPopup = function(text, tint, x, y, size) {
    if (size === undefined) size = 128;
    if (tint === undefined) tint = 0xffffff;
    if (x === undefined) x = 400;
    if (y === undefined) y = 600;
    if (text === undefined) text = "TEXT";
    var bmt = game.add.bitmapText(x, y, 'western', text, size);
    bmt.tint = tint;
    bmt.anchor.set(0.5, 0.5);
    var bmtTween = game.tweens.create(bmt).to({
        y: bmt.y - 200,
        alpha: 0.5
    }, 1500);
    bmtTween.onComplete.add(function() {
        bmt.destroy();
    });
    bmtTween.start();
};

module.exports = TextPopup;
