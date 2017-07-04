/* global Phaser, game */

var Enemy = function() {
    Phaser.Group.call(this, game);
    this.inputEnableChildren = true;
    this.onChildInputDown.add(function(target) {
        print(target.componentName);
    });
    // screen width = 800
    // height of enemy half of screen = 600
    // rough center of enemy: (400, 300)
    this.componentBody = game.make.sprite(400, 300, 'pix');
    this.componentBody.anchor.set(0.5, 0.5);
    this.componentBody.tint = 0x0000ff;
    this.componentBody.width = 200;
    this.componentBody.height = 200;
    this.componentBody.componentName = 'body';
    this.add(this.componentBody);
    this.componentHead = game.make.sprite(400, 175, 'pix');
    this.componentHead.anchor.set(0.5, 0.5);
    this.componentHead.tint = 0xffffff;
    this.componentHead.width = 75;
    this.componentHead.height = 100;
    this.componentHead.componentName = 'head';
    this.add(this.componentHead);
    this.componentLeftArm = game.make.sprite(250, 300, 'pix');
    this.componentLeftArm.anchor.set(0.5, 0.5);
    this.componentLeftArm.tint = 0xff0088;
    this.componentLeftArm.width = 150;
    this.componentLeftArm.height = 50;
    this.componentLeftArm.angle = -15;
    this.componentLeftArm.componentName = 'left arm';
    this.add(this.componentLeftArm);
    this.componentRightArm = game.make.sprite(550, 300, 'pix');
    this.componentRightArm.anchor.set(0.5, 0.5);
    this.componentRightArm.tint = 0xff8800;
    this.componentRightArm.width = 150;
    this.componentRightArm.height = 50;
    this.componentRightArm.angle = 15;
    this.componentRightArm.componentName = 'right arm';
    this.add(this.componentRightArm);
    this.componentLeg = game.make.sprite(400, 450, 'pix');
    this.componentLeg.anchor.set(0.5, 0.5);
    this.componentLeg.tint = 0x00ff00;
    this.componentLeg.width = 100;
    this.componentLeg.height = 150;
    this.componentLeg.componentName = 'legs';
    this.add(this.componentLeg);
};
Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.constructor = Enemy;

module.exports = Enemy;
