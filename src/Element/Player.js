/* global mech, game */
var TextPopup = require('../Helper/TextPopup');

var Player = function() {
    this.health = 20;
};
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
        this.health += amount;
        mech.hud.setPlayerHealthBarSize(this.health / 20);
    }, this);
    mech.actionQueue.registerTween(t);
};
Player.prototype.receiveDamage = function(amount) {
    var dmg = game.add.image(400, 900, 'explosion');
    dmg.width = 200;
    dmg.height = 200;
    dmg.anchor.set(0.5);
    var t = game.tweens.create(dmg);
    t.to({ angle: 180 }, 900);
    t.onComplete.add(function() {
        TextPopup('Took ' + amount + " dmg", 0xff0000, 400, 900);
        dmg.destroy();
        // XXX damage player
        this.health -= amount;
        mech.hud.setPlayerHealthBarSize(this.health / 20);
    }, this);
    mech.actionQueue.registerTween(t);
};

module.exports = Player;
