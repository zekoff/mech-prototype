/* global game, mech */
module.exports = {
    create: function() {
        if (!mech.battlesRemaining) game.state.start('Win');
        var bg = game.add.image(0, 0, 'western_bg');
        bg.width = 800;
        bg.height = 1200;
        bg.inputEnabled = true;
        bg.events.onInputUp.add(function() {
            game.state.start('Main');
        });
        game.add.bitmapText(400, 400, 'western', 'Won the battle...', 90).anchor.set(0.5);
        game.add.bitmapText(400, 700, 'western', 'Battles remaining: ' + mech.battlesRemaining, 70).anchor.set(0.5);
    }
};
