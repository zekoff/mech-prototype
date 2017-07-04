/* global Phaser, game */
var CardTextureBuilder = require('../Helper/CardTextureBuilder');
var GunshotDeformer = require('../Helper/GunshotDeformer');

var BACK = false;
var FRONT = true;
var WIDTH = 150;
var HEIGHT = 250;

var Card = function(color, title, text, image) {
    this.cardFront = CardTextureBuilder(color, title, text);
    this.cardBack = game.make.bitmapData(300, 500).copy('back');
    Phaser.Sprite.call(this, game, 0, 0, this.cardFront);
    game.add.existing(this);
    this.width = WIDTH;
    this.height = HEIGHT;
    this.anchor.set(0.5, 0.5);
    this.inputEnabled = true;
    this.input.draggable = true;
    this.face = FRONT;
    this.events.onInputDown.add(this.flip, this);
    var i, j = game.rnd.between(0, 4),
        x, y, size;
    for (i = 0; i < j; i++) {
        x = game.rnd.frac();
        y = game.rnd.frac();
        size = game.rnd.between(5, 15);
        GunshotDeformer(this.cardFront, x, y, size);
        GunshotDeformer(this.cardBack, 1 - x, y, size);
    }
    print('card created');
};
Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.constructor = Card;
Card.prototype.flip = function() {
    // when card flips, replace texture with card back (but preserve gunshots?)
    var targetFace = !this.face;
    var tween = game.tweens.create(this).to({
        width: 0
    }, 75);
    tween.onChildComplete.add(function(target, tween, tex) {
        this.loadTexture(tex);
        this.face = targetFace;
    }, this, 0, targetFace ? this.cardFront : this.cardBack);
    tween.to({
        width: WIDTH
    }, 75);
    tween.start();
};

module.exports = Card;
