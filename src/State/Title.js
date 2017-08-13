/* global game, mech*/
module.exports = {
    create: function() {
        var bg = game.add.image(0, 0, 'western_bg');
        bg.height = 1200;
        bg.width = 800;
        var text = game.add.bitmapText(400, 300, 'western', 'Mech Game\nPrototype', 128);
        text.anchor.set(0.5);
        bg.inputEnabled = true;
        bg.events.onInputUp.add(function() {
            game.state.start('Main');
        });
        mech.numberOfJunkCards = 0;
    }
};
