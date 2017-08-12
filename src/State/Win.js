/* global game */
module.exports = {
    create: function() {
        var bg = game.add.image(0, 0, 'western_bg');
        bg.height = 1200;
        bg.width = 800;
        var text = game.add.bitmapText(400, 600, 'western', 'YOU WIN!', 200);
        text.anchor.set(0.5);
        // text.inputEnabled = true;
        // text.events.onInputUp.addOnce(function() {
        //     game.state.start('Main');
        // });
    }
};
