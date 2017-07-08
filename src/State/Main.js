/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Enemy = require('../Element/Enemy');
var TableManager = require('../Helper/TableManager');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        mech.cardActivated = new Phaser.Signal();
        mech.cardActivated.add(function() {
            mech.cardsPlayedThisTurn++;
            if (mech.cardsPlayedThisTurn > 2) {
                // end turn and cycle to enemy turn
                print('player turn ended');
                mech.cardsPlayedThisTurn = 0;
                mech.hand.forEach(TableManager.tweenToDiscardPile);
                TableManager.drawCard(5);
            }
        });
        mech.cardsPlayedThisTurn = 0;
        var temp, c, i = 0,
            totalCardsInDeck = 0;
        mech.drawPile = game.add.group(undefined, 'drawPile');
        mech.hand = game.add.group(undefined, 'hand');
        mech.discardPile = game.add.group(undefined, 'discardPile');
        while (deck.length > 0) {
            temp = deck.pop();
            totalCardsInDeck += temp.copies;
            for (i = 0; i < temp.copies; i++) {
                c = new Card(temp.tint, temp.title, temp.text);
                mech.drawPile.add(c);
            }
        }
        Phaser.ArrayUtils.shuffle(mech.drawPile.children);
        TableManager.initializeDrawPile(mech.drawPile);
        mech.hand.onChildInputDown.add(TableManager.pickCardFromHand);
        mech.hand.onChildInputUp.add(function(card) {
            if (card.y > 500) {
                TableManager.returnCardToHand(card);
            }
            else {
                print('card activated');
                mech.cardActivated.dispatch();
                TableManager.tweenToDiscardPile(card);
                mech.hand.remove(card);
                mech.discardPile.add(card);
            }
        });
        var e = new Enemy();
        game.world.sendToBack(e);
        var timer = game.time.create();
        // Some kind of race condition occurs by starting the card draw tweens so soon after game init. Adding this half-second delay helps for some reason.
        timer.add(500, function() {
            TableManager.drawCard(5);
        });
        timer.start();
        var uiLine = game.add.sprite(0, 500, 'pix');
        uiLine.height = 2;
        uiLine.width = 800;
    }
};
