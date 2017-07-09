/* global Phaser, game, mech */
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
        t = game.tweens.create(c).to({
            x: 150 + 90 * i,
            y: 950 - i * 20,
            angle: -20 + 8 * i

        }, 300, null, true);
        this.fanTweens.push(t);
    }
};
Hand.prototype.removeFromHand = function(card) {
    this.remove(card);
};

module.exports = Hand;
