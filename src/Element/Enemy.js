/* global Phaser, game */
var HEIGHT = 600;
var WIDTH = 500;

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
};
Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.constructor = Enemy;

module.exports = Enemy;
