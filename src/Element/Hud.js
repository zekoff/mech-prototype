/* global game, Phaser */

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
