/* global Phaser, game, mech */
var TableManager = require('../Helper/TableManager');
var Hand = function() {
    Phaser.Group.call(this, game, game.world, 'hand');
    this.fanTweens = [];
};
Hand.prototype = Object.create(Phaser.Group.prototype);
Hand.constructor = Hand;
Hand.prototype.addToHand = function(card) {
    this.add(card);
    this.fanTweens.forEach(function(element) {
        game.tweens.remove(element);
    });
    this.fanTweens = [];
    var i, t, c;
    for (i = 0; i < this.length; i++) {
        c = this.getChildAt(i);
        t = TableManager.tweenObject(c, 150 + 90 * i, 950 - i * 20, -20 + 8 * i);
        this.fanTweens.push(t);
    }
};
Hand.prototype.removeFromHand = function(card) {
    this.remove(card);
};

module.exports = Hand;
