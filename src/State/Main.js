/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Enemy = require('../Element/Enemy');
var TableManager = require('../Helper/TableManager');
var ActionQueue = require('../Element/ActionQueue');
var Hand = require('../Element/Hand');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        mech.actionQueue = new ActionQueue();
        mech.cardActivated = new Phaser.Signal();
        mech.cardActivated.add(function() {
            // XXX pop up sample damage text
            var bmt = game.add.bitmapText(400, 600, 'western', 'Hit! 34dmg', 128);
            bmt.tint = 0xff0000;
            bmt.anchor.set(0.5, 0.5);
            var bmtTween = game.tweens.create(bmt).to({
                y: bmt.y - 200,
                alpha: 0.5
            }, 1500);
            bmtTween.onComplete.add(function() {
                bmt.destroy();
            });
            bmtTween.start();
            // XXX end sample damage text
            mech.cardsPlayedThisTurn++;
            if (mech.cardsPlayedThisTurn > 2) {
                // end turn and cycle to enemy turn
                print('player turn ended');
                mech.cardsPlayedThisTurn = 0;
                mech.hand.forEach(function(card) {
                    mech.actionQueue.registerTween(TableManager.createTweenToDiscardPile(card));
                });
                // TableManager.tweenToDiscardPile);
                var i = 0,
                    num = mech.hand.length;
                for (i; i < num; i++) {
                    mech.actionQueue.registerFunction(function() {
                        mech.discardPile.add(mech.hand.getTop());
                    });
                }
                TableManager.drawCard(5);
            }
            // else TableManager.drawCard();
        });
        mech.cardsPlayedThisTurn = 0;
        var temp,
            i = 0,
            totalCardsInDeck = 0;
        mech.drawPile = game.add.group(undefined, 'drawPile');
        mech.transitionGroup = game.add.group(undefined, 'transitionGroup');
        mech.hand = new Hand();
        mech.discardPile = game.add.group(undefined, 'discardPile');
        while (deck.length > 0) {
            temp = deck.pop();
            totalCardsInDeck += temp.copies;
            for (i = 0; i < temp.copies; i++)
                mech.drawPile.add(new Card(temp.tint, temp.title, temp.text));
        }
        TableManager.initializeDrawPile();
        mech.hand.onChildInputDown.add(TableManager.pickCardFromHand);
        mech.hand.onChildInputUp.add(function(card) {
            if (card.y > 500)
                TableManager.returnCardToHand(card);
            else {
                mech.hand.removeFromHand(card);
                mech.discardPile.add(card);
                mech.actionQueue.registerTween(TableManager.createTweenToDiscardPile(card));
                // TableManager.tweenToDiscardPile(card);
                // mech.hand.removeFromHand(card);
                // mech.discardPile.add(card);
                // mech.cardActivated.dispatch();

                mech.actionQueue.registerFunction(mech.cardActivated.dispatch.bind(mech.cardActivated));
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
