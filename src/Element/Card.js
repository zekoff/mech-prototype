/* global Phaser, game */
var CardTextureBuilder = require('../Helper/CardTextureBuilder');

var BACK = 0;
var FRONT = 1;
var WIDTH = 150;
var HEIGHT = 250;

var Card = function(color, title, text, image) {
    Phaser.Sprite.call(this, game, game.rnd.between(200, 600), game.rnd.between(200, 1000),CardTextureBuilder(color,title,text));
    game.add.existing(this);
    this.width = WIDTH;
    this.height = HEIGHT;
    this.anchor.set(0.5, 0.5);
    this.inputEnabled = true;
    this.input.draggable = true;
    console.log('card created');
};
Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.constructor = Card;
Card.prototype.flip = function() {
    // when card flips, replace texture with card back (but preserve gunshots?)
};

module.exports = Card;