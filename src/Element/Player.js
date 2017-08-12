/* global mech, game */
var TextPopup = require('../Helper/TextPopup');

var Player = function() {
    this.health = 20;
    this.actionsRemaining = 3;
    this.dodgeStacks = 0;
    this.reloadStacks = 0;
    this.redStacks = 0;
    this.blueStacks = 0;
    this.greenStacks = 0;
    this.highNoonActive = false;
};
Player.prototype = Object.create({});
Player.constructor = Player;
Player.prototype.receiveHealing = function(amount) {
    var heal = game.add.image(400, 900, 'pix');
    heal.width = 50;
    heal.height = 50;
    heal.tint = 0x00ff00;
    heal.anchor.set(0.5);
    var t = game.tweens.create(heal);
    t.to({ width: 300, height: 300 }, 900);
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
        dmg.destroy();
        if (this.dodgeStacks > 0) {
            TextPopup('Dodged ' + amount + ' dmg!', 0x00ff00, 400, 900);
            this.dodgeStacks--;
        }
        else {
            TextPopup('Took ' + amount + " dmg", 0xff0000, 400, 900);
            this.health -= amount;
            mech.hud.setPlayerHealthBarSize(this.health / 20);
        }
        if (this.health <= 0) game.state.start('Lose');
    }, this);
    mech.actionQueue.registerTween(t);
};
Player.prototype.activateDodge = function(amount) {
    var dodgeGraphic = game.add.image(400, 900, 'pix');
    dodgeGraphic.width = 20;
    dodgeGraphic.height = 200;
    dodgeGraphic.tint = 0x00ff00;
    dodgeGraphic.anchor.set(0.5);
    var t = game.tweens.create(dodgeGraphic);
    t.to({ angle: 180 }, 900);
    t.onComplete.add(function() {
        TextPopup('Dodge Stance', 0x00ff00, 400, 900);
        dodgeGraphic.destroy();
        this.dodgeStacks += amount;
    }, this);
    mech.actionQueue.registerTween(t);
};
Player.prototype.activateReload = function(amount) {
    var reloadGraphic = game.add.image(400, 900, 'pix');
    reloadGraphic.width = 50;
    reloadGraphic.height = 50;
    reloadGraphic.tint = 0x0000ff;
    reloadGraphic.anchor.set(0.5);
    var t = game.tweens.create(reloadGraphic);
    t.to({ angle: 180 }, 900);
    t.onComplete.add(function() {
        reloadGraphic.destroy();
        this.reloadStacks += 2 * amount;
        print('reload stacks added', 2 * amount);
    }, this);
    mech.actionQueue.registerTween(t);
};
Player.prototype.activateOvercharge = function(amount) {
    this.redStacks = 3;
    this.greenStacks = 3;
    this.blueStacks = 3;
};
Player.prototype.adjustColorStacks = function(color) {
    var colorArray = ['red', 'green', 'blue'];
    this[color + 'Stacks'] = Math.min(3, ++this[color + 'Stacks']);
    colorArray.filter(function(element) { return element !== color }).forEach(function(element) { this[element + 'Stacks'] = 0 }, this);
    colorArray.forEach(function(color) {
        mech.hud.getByName(color + 'StackBar').height = 30 * this[color + 'Stacks'] + 1;
    }, this);
};
Player.prototype.setHighNoon = function(active) {
    this.highNoonActive = active;
};

module.exports = Player;
