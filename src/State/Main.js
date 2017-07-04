/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Enemy = require('../Element/Enemy');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        var temp, c, i = 0,
            totalCardsInDeck = 0,
            hand = [],
            drawPile = [];
        while (deck.length > 0) {
            temp = deck.pop();
            totalCardsInDeck += temp.copies;
            for (i = 0; i < temp.copies; i++) {
                c = new Card(temp.tint, temp.title, temp.text);
                drawPile.push(c);
                c.x = 700;
                c.y = 1050;
                c.instantFlip();
                c.angle = game.rnd.between(-5, 5);
            }
        }
        new Enemy();
        // fan cards to hand
        for (i = 0; i < 5; i++) {
            c = drawPile.pop();
            hand.push(c);
            game.tweens.create(c).to({
                x: 200 + 75 * i,
                y: 950 - i * 10,
                angle: -20 + 5 * i
            }, 500, null, true, 300 + i * 200).onStart.add(function() {
                this.flip();
                game.world.bringToTop(this);
            }, c);
        }
    }
};
