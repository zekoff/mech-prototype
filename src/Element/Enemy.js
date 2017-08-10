/* global Phaser, game, mech */
var HEIGHT = 600;
var WIDTH = 500;
var TextPopup = require("../Helper/TextPopup");

var Enemy = function() {
    Phaser.Group.call(this, game);
    this.inputEnableChildren = true;
    this.onChildInputDown.add(function(target, pointer) {
        print(target.name);
        var crosshair = game.add.image(pointer.x, pointer.y, 'crosshair');
        crosshair.width = 200;
        crosshair.height = 200;
        crosshair.angle = -30;
        crosshair.anchor.set(0.5);
        var t = game.tweens.create(crosshair);
        t.to({ angle: 0, width: 100, height: 100 }, 500, Phaser.Easing.Cubic.Out);
        t.onComplete.add(function() {
            crosshair.destroy();
        });
        t.start();
        game.tweens.create(target).to({ tint: 0x808080 }, 125, null, true, 0, 1, true);
    });
    // screen width = 800
    // height of enemy half of screen = 600
    // rough center of enemy: (400, 300)
    this.componentBody = game.make.sprite(400, 350, 'body');
    this.componentBody.name = 'body';
    game.tweens.create(this.componentBody).to({ y: 355 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    this.add(this.componentBody);
    this.componentHead = game.make.sprite(400, 350, 'head');
    this.componentHead.name = 'head';
    game.tweens.create(this.componentHead).to({ y: 355 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    this.add(this.componentHead);
    this.componentLeftArm = game.make.sprite(400, 350, 'left_arm');
    this.componentLeftArm.name = 'left arm';
    this.componentLeftArm.action = function() {
        var flashTween = game.tweens.create(this.componentLeftArm);
        flashTween.to({ tint: 0x808080 }, 250, null, false, 0, 0, true);
        mech.actionQueue.registerTween(flashTween);
        var dmg = 3 + (this.getByName('head').health > 0 ? 1 : 0);
        mech.player.receiveDamage(dmg);
    }.bind(this);
    game.tweens.create(this.componentLeftArm).to({ y: 360 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    this.add(this.componentLeftArm);
    this.componentRightArm = game.make.sprite(400, 350, 'right_arm');
    this.componentRightArm.name = 'right arm';
    this.componentRightArm.action = function() {
        var flashTween = game.tweens.create(this.componentRightArm);
        flashTween.to({ tint: 0x808080 }, 250, null, false, 0, 0, true);
        mech.actionQueue.registerTween(flashTween);
        var dmg = 3 + (this.getByName('head').health > 0 ? 1 : 0);
        mech.player.receiveDamage(dmg);
    }.bind(this);
    game.tweens.create(this.componentRightArm).to({ y: 360 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    this.add(this.componentRightArm);
    this.componentLeg = game.make.sprite(400, 350, 'legs');
    this.componentLeg.name = 'legs';
    this.add(this.componentLeg);
    this.forEach(function(component) {
        component.anchor.set(0.5, 0.5);
        component.width = WIDTH;
        component.height = HEIGHT;
        component.input.pixelPerfectClick = true;
    });

    this.health = 50;
};
Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.constructor = Enemy;
Enemy.prototype.takeTurn = function() {
    this.forEach(function(component) {
        print('component health: ', component.health);
        if (component.health > 0 && component.action) component.action();
    }, this);
};
Enemy.prototype.receiveDamage = function(amount) {
    if (mech.player.highNoonActive) amount *= 2;
    var explosion = game.add.image(400, 350, 'explosion');
    explosion.width = 100;
    explosion.height = 100;
    explosion.anchor.set(0.5);
    var t = game.tweens.create(explosion);
    t.to({ angle: 90 }, 900);
    t.onComplete.add(function() {
        explosion.destroy();
        var dodgeChance = 0;
        // if enemy legs are still active, increase dodge chance by 25%
        var legs = this.getByName('legs');
        if (legs.health > 0) dodgeChance += .25;
        print('dodge chance: ', dodgeChance);
        // roll rand, if greater than dodge chance, deal damage, else dodge
        if (game.rnd.frac() > dodgeChance) {
            TextPopup(amount + " dmg", 0xff0000, 400, 350);
            this.health -= amount;
            mech.hud.setEnemyHealthBarSize(this.health / 50);
            if (this.health <= 0) game.state.start('Win');
        }
        else {
            TextPopup('Dodged ' + amount + " dmg!", 0x00ff00, 400, 350);
        }
    }, this);
    mech.actionQueue.registerTween(t);
};

module.exports = Enemy;
