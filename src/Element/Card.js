/* global Phaser, game */

var BACK = 0;
var FRONT = 1;

var Card = function() {
    Phaser.Group.call(this, game);
    game.add.existing(this);
    this.base = game.make.sprite(0,0,'blue');
    this.base.width = 140;
    this.base.height = 210;
    this.add(this.base);
    this.back = game.make.sprite(0,0,'back');
    // this.back.alpha = 0.0001;
    this.back.width = 140;
    this.back.height = 210;
    this.back.inputEnabled = true;
    this.back.input.draggable = true;
    this.add(this.back);
    console.log('card created');
};
Card.prototype = Object.create(Phaser.Group.prototype);
Card.constructor = Card;

module.exports = Card;