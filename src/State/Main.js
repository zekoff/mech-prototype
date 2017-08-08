/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Player = require('../Element/Player');
var Enemy = require('../Element/Enemy');
var TableManager = require('../Helper/TableManager');
var ActionQueue = require('../Element/ActionQueue');
var Hud = require('../Element/Hud');
var Hand = require('../Element/Hand');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        mech.actionQueue = new ActionQueue();
        mech.cardActivated = new Phaser.Signal();
        mech.cardActivated.add(function(card) {
            // XXX pop up sample damage text
            card.action(card.value);
            // XXX end sample damage text
            mech.player.actionsRemaining -= card.cost;
            if (mech.player.actionsRemaining <= 0 || mech.hand.length <= 0) {
                print('player turn ended');
                mech.player.actionsRemaining = 3;
                mech.hand.forEach(function(card) {
                    mech.actionQueue.registerTween(TableManager.createTweenToDiscardPile(card));
                });
                var i = 0,
                    num = mech.hand.length;
                for (i; i < num; i++) {
                    mech.actionQueue.registerFunction(function() {
                        mech.discardPile.add(mech.hand.getTop());
                    });
                }
                mech.actionQueue.registerFunction(function() {
                    mech.enemy.takeTurn();
                });
                mech.actionQueue.registerFunction(TableManager.drawCard.bind(null, 5));
            }
        });
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
                mech.drawPile.add(new Card(temp.tint, temp.title, temp.text, temp.cost, temp.value, temp.action));
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
                mech.actionQueue.registerFunction(mech.cardActivated.dispatch.bind(mech.cardActivated, card));
            }
        });
        mech.player = new Player();
        mech.enemy = new Enemy();
        game.world.sendToBack(mech.enemy);
        var timer = game.time.create();
        // Some kind of race condition occurs by starting the card draw tweens so soon after game init. Adding this half-second delay helps for some reason.
        timer.add(500, function() {
            TableManager.drawCard(5);
        });
        timer.start();
        var uiLine = game.add.sprite(0, 500, 'pix');
        uiLine.height = 2;
        uiLine.width = 800;

        mech.hud = new Hud();
    }
};
