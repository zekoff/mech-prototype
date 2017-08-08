/* global Phaser, game, mech */
var HEIGHT = 600;
var WIDTH = 500;
var TextPopup = require("../Helper/TextPopup");

var Enemy = function() {
    Phaser.Group.call(this, game);
    this.inputEnableChildren = true;
    this.onChildInputDown.add(function(target) {
        print(target.componentName);
    });
    // screen width = 800
    // height of enemy half of screen = 600
    // rough center of enemy: (400, 300)
    this.componentBody = game.make.sprite(400, 300, 'body');
    this.componentBody.componentName = 'body';
    this.add(this.componentBody);
    this.componentHead = game.make.sprite(400, 300, 'head');
    this.componentHead.componentName = 'head';
    this.add(this.componentHead);
    this.componentLeftArm = game.make.sprite(400, 300, 'left_arm');
    this.componentLeftArm.componentName = 'left arm';
    this.add(this.componentLeftArm);
    this.componentRightArm = game.make.sprite(400, 300, 'right_arm');
    this.componentRightArm.componentName = 'right arm';
    this.add(this.componentRightArm);
    this.componentLeg = game.make.sprite(400, 300, 'legs');
    this.componentLeg.componentName = 'legs';
    this.add(this.componentLeg);
    this.forEach(function(component) {
        component.anchor.set(0.5, 0.5);
        component.width = WIDTH;
        component.height = HEIGHT;
        component.input.pixelPerfectClick = true;
    });

    this.health = 20;
};
Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.constructor = Enemy;
Enemy.prototype.takeTurn = function() {
    mech.player.receiveDamage(1);
};
Enemy.prototype.receiveDamage = function(amount) {
    print('took', amount, 'damage');
    var explosion = game.add.image(400, 400, 'explosion');
    explosion.width = 100;
    explosion.height = 100;
    explosion.anchor.set(0.5);
    var t = game.tweens.create(explosion);
    t.to({ angle: 90 }, 900);
    t.onComplete.add(function() {
        TextPopup(amount + " dmg", 0xff0000, 400, 400);
        explosion.destroy();
        // XXX reduce enemy health
        this.health -= amount;
        mech.hud.setEnemyHealthBarSize(this.health / 20);
        if (this.health <= 0) game.state.start('Win');
    }, this);
    mech.actionQueue.registerTween(t);
};

module.exports = Enemy;
