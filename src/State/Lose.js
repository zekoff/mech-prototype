/* global game */
module.exports = {
    create: function() {
        var text = game.add.bitmapText(400, 600, 'western', 'You lose...', 200);
        text.anchor.set(0.5);
    }
};
