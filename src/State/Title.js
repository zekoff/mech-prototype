/* global game */
module.exports = {
    create: function() {
        var bg = game.add.image(0, 0, 'western_bg');
        bg.height = 1200;
        bg.width = 800;
        var text = game.add.bitmapText(400, 300, 'western', 'Mech Game\nPrototype', 128);
        text.anchor.set(0.5);
        text.inputEnabled = true;
        text.events.onInputUp.add(function() {
            game.state.start('Main');
        });
    }
};
