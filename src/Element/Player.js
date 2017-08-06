/* global mech, game */
var TextPopup = require('../Helper/TextPopup');

var Player = function() {};
Player.prototype = Object.create({});
Player.constructor = Player;
Player.prototype.receiveHealing = function(amount) {
    var heal = game.add.image(400, 900, 'pix');
    heal.width = 100;
    heal.height = 100;
    heal.tint = 0x00ff00;
    heal.anchor.set(0.5);
    var t = game.tweens.create(heal);
    t.to({ angle: 180 }, 900);
    t.onComplete.add(function() {
        TextPopup('Healed! ' + amount + " dmg", 0x00ff00, 400, 900);
        heal.destroy();
        // XXX heal player
    });
    mech.actionQueue.registerTween(t);
};

module.exports = Player;
