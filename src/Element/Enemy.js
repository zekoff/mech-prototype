/* global Phaser, game, mech */
var HEIGHT = 600;
var WIDTH = 500;
var TextPopup = require("../Helper/TextPopup");

var Enemy = function() {
    Phaser.Group.call(this, game);
    this.inputEnableChildren = true;
    this.onChildInputDown.add(function(target, pointer) {
        print(target.componentName);
        var crosshair = game.add.image(pointer.x, pointer.y, 'crosshair');
        crosshair.width = 200;
        crosshair.height = 200;
        crosshair.angle = -180;
        crosshair.anchor.set(0.5);
        var t = game.tweens.create(crosshair);
        t.to({ angle: 0, width: 100, height: 100 }, 500);
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
    this.componentBody.componentName = 'body';
    this.componentBody.visualCenterX = 400;
    this.componentBody.visualCenterY = 350;
    this.add(this.componentBody);
    this.componentHead = game.make.sprite(400, 350, 'head');
    this.componentHead.componentName = 'head';
    this.componentHead.visualCenterX = 410;
    this.componentHead.visualCenterY = 230;
    this.add(this.componentHead);
    this.componentLeftArm = game.make.sprite(400, 350, 'left_arm');
    this.componentLeftArm.componentName = 'left arm';
    this.componentLeftArm.visualCenterX = 280;
    this.componentLeftArm.visualCenterY = 360;
    this.add(this.componentLeftArm);
    this.componentRightArm = game.make.sprite(400, 350, 'right_arm');
    this.componentRightArm.componentName = 'right arm';
    this.componentRightArm.visualCenterX = 530;
    this.componentRightArm.visualCenterY = 350;
    this.add(this.componentRightArm);
    this.componentLeg = game.make.sprite(400, 350, 'legs');
    this.componentLeg.componentName = 'legs';
    this.componentLeg.visualCenterX = 400;
    this.componentLeg.visualCenterY = 450;
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
    mech.player.receiveDamage(7);
};
Enemy.prototype.receiveDamage = function(amount) {
    if (mech.player.highNoonActive) amount *= 2;
    print('took', amount, 'damage');
    var explosion = game.add.image(400, 350, 'explosion');
    explosion.width = 100;
    explosion.height = 100;
    explosion.anchor.set(0.5);
    var t = game.tweens.create(explosion);
    t.to({ angle: 90 }, 900);
    t.onComplete.add(function() {
        TextPopup(amount + " dmg", 0xff0000, 400, 350);
        explosion.destroy();
        // XXX reduce enemy health
        this.health -= amount;
        mech.hud.setEnemyHealthBarSize(this.health / 50);
        if (this.health <= 0) game.state.start('Win');
    }, this);
    mech.actionQueue.registerTween(t);
};

module.exports = Enemy;
