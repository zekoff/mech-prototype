/* global Phaser, game */
var CardTextureBuilder = require('../Helper/CardTextureBuilder');

var BACK = false;
var FRONT = true;
var WIDTH = 150;
var HEIGHT = 250;

var Card = function(color, title, text, image) {
    this.cardFront = CardTextureBuilder(color,title,text);
    Phaser.Sprite.call(this, game, 0, 0, this.cardFront);
    game.add.existing(this);
    this.width = WIDTH;
    this.height = HEIGHT;
    this.anchor.set(0.5, 0.5);
    this.inputEnabled = true;
    this.input.draggable = true;
    this.face = FRONT;
    this.events.onInputDown.add(this.flip, this);
    print('card created');
};
Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.constructor = Card;
Card.prototype.flip = function() {
    print('card flipping');
    // when card flips, replace texture with card back (but preserve gunshots?)
    var targetFace = !this.face;
    var tween = game.tweens.create(this).to({width:0},75,null,true,0,0,true).onComplete.add(function(target,tween,tex){
        this.loadTexture(tex);
        this.face = targetFace;
    },this,0,targetFace ? this.cardFront : 'back');
};

module.exports = Card;