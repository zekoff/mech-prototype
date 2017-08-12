/* global game, Phaser */
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
        temp.height = 90;
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

module.exports = Hud;
