/* global game, Phaser, mech */
var STACK_BAR_MAX_HEIGHT = 90;
var MAX_STACKS = 3; // just a game constant right now

var Hud = function() {
    Phaser.Group.call(this, game, game.world, 'hud');

    var enemyHealthBarBg = game.add.image(50, 500, 'pix');
    this.add(enemyHealthBarBg);
    enemyHealthBarBg.anchor.set(0.5, 1);
    enemyHealthBarBg.height = 400;
    enemyHealthBarBg.width = 50;
    this.enemyHealthBar = game.add.image(50, 500, 'pix');
    this.add(this.enemyHealthBar);
    this.enemyHealthBar.tint = 0xff0000;
    this.enemyHealthBar.anchor.set(0.5, 1);
    this.enemyHealthBar.height = 400;
    this.enemyHealthBar.width = 50;

    var playerHealthBarBg = game.add.image(50, 1100, 'pix');
    this.add(playerHealthBarBg);
    playerHealthBarBg.anchor.set(0.5, 1);
    playerHealthBarBg.height = 400;
    playerHealthBarBg.width = 50;
    this.playerHealthBar = game.add.image(50, 1100, 'pix');
    this.add(this.playerHealthBar);
    this.playerHealthBar.tint = 0x00ff00;
    this.playerHealthBar.anchor.set(0.5, 1);
    this.playerHealthBar.height = 400;
    this.playerHealthBar.width = 50;

    var buffBarBg = game.add.image(0, 550, 'pix');
    buffBarBg.height = 100;
    buffBarBg.width = 800;
    this.add(buffBarBg);

    var i, temp, stackBars = [{ name: 'red', tint: 0xff0000 }, { name: 'green', tint: 0x00ff00 }, { name: 'blue', tint: 0x0000ff }];
    for (i = 0; i < stackBars.length; i++) {
        temp = game.add.image(5 + i * 25, 645, 'pix');
        temp.name = stackBars[i].name + "StackBar";
        temp.tint = stackBars[i].tint;
        temp.anchor.set(0, 1);
        temp.width = 20;
        temp.height = 1;
        this.add(temp);
    }

    var highNoonBuff = game.add.bitmapText(190, 600, 'western', 'HIGH NOON', 40);
    highNoonBuff.tint = 0xff0000;
    highNoonBuff.anchor.set(0.5);
    highNoonBuff.name = 'highNoonBuff';
    this.add(highNoonBuff);
    highNoonBuff.visible = false;

    var dodgeBuff = game.add.bitmapText(350, 600, 'western', 'DODGE x1', 40);
    dodgeBuff.tint = 0x00ff00;
    dodgeBuff.anchor.set(0.5);
    dodgeBuff.name = "dodgeBuff";
    this.add(dodgeBuff);
    dodgeBuff.visible = false;

    var reloadBuff = game.add.bitmapText(510, 600, 'western', 'RELOAD x2', 40);
    reloadBuff.tint = 0x0000ff;
    reloadBuff.name = 'reloadBuff';
    reloadBuff.anchor.set(0.5);
    this.add(reloadBuff);
    reloadBuff.visible = false;

    var overloadBuff = game.add.bitmapText(700, 600, 'western', 'OVERCHARGE', 40);
    overloadBuff.tint = 0x0000ff;
    overloadBuff.anchor.set(0.5);
    overloadBuff.name = 'overloadBuff';
    this.add(overloadBuff);
    overloadBuff.visible = false;

    var actionsRemainingText = game.add.bitmapText(700, 555, 'western', 'Actions:', 30);
    actionsRemainingText.tint = 0x000000;
    this.add(actionsRemainingText);

    this.actionPips = [];
    for (i = 0; i < 3; i++) {
        temp = game.add.image(700 + i * 25, 610, 'pix');
        temp.tint = 0xa56729;
        temp.width = 20;
        temp.height = 20;
        this.actionPips.push(temp);
        this.add(temp);
    }
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.constructor = Hud;
Hud.prototype.setEnemyHealthBarSize = function(value) {
    this.enemyHealthBar.height = 400 * value;
};
Hud.prototype.setPlayerHealthBarSize = function(value) {
    this.playerHealthBar.height = 400 * value;
};
Hud.prototype.updateActionsRemaining = function() {
    var i;
    this.actionPips.forEach(function(pip) {
        pip.visible = false;
    }, this);
    for (i = 0; i < mech.player.actionsRemaining; i++) this.actionPips[i].visible = true;
};

module.exports = Hud;
