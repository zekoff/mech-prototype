/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Enemy = require('../Element/Enemy');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function(){
        var temp, c, i = 0, totalCardsInDeck = 0;
        while (deck.length > 0) {
            temp = deck.pop();
            totalCardsInDeck += temp.copies;
            for (i = 0; i < temp.copies; i++) {
                c = new Card(temp.tint, temp.title, temp.text);
                c.x = game.rnd.between(200, 600);
                c.y = game.rnd.between(800, 1000);
                c.angle = game.rnd.between(-10,10);
            }
        }
        new Enemy();
    }
};