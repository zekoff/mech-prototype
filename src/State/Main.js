/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Player = require('../Element/Player');
var Enemy = require('../Element/Enemy');
var TableManager = require('../Helper/TableManager');
var ActionQueue = require('../Element/ActionQueue');
var Hud = require('../Element/Hud');
var Hand = require('../Element/Hand');
var Deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        mech.battlesRemaining--;
        mech.actionQueue = new ActionQueue();
        mech.cardActivated = new Phaser.Signal();
        mech.cardActivated.add(function(card) {
            mech.player.adjustColorStacks(card.color);
            card.action(card.value * mech.player[card.color + 'Stacks'] * (mech.player.showdown ? 2 : 1));
            mech.player.showdown = false;
            mech.player.actionsRemaining -= card.cost;
            mech.hud.updateActionsRemaining();
            if (mech.player.actionsRemaining <= 0 || mech.hand.length <= 0) {
                print('player turn ended');
                mech.player.setHighNoon(false);
                mech.hud.getByName('highNoonBuff').visible = false;
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
                mech.actionQueue.registerFunction(mech.hud.updateActionsRemaining.bind(mech.hud));
            }
            else {
                mech.actionQueue.registerFunction(function() {
                    if (mech.player.reloadStacks > 0 && mech.hand.length < 5) {
                        print('reloading. stacks remaining ', mech.player.reloadStacks);
                        var i;
                        var numberToReload = Math.min(mech.player.reloadStacks, 5 - mech.hand.length);
                        print('number to reload: ', numberToReload);
                        mech.player.reloadStacks -= numberToReload;
                        mech.hud.getByName('reloadBuff').text = "RELOAD x" + mech.player.reloadStacks;
                        if (mech.player.reloadStacks < 1) mech.hud.getByName('reloadBuff').visible = false;
                        for (i = 0; i < numberToReload; i++)
                            mech.actionQueue.registerFunction(TableManager.drawCard);
                    }
                });
            }
        });
        var temp, i, j;
        mech.drawPile = game.add.group(undefined, 'drawPile');
        mech.transitionGroup = game.add.group(undefined, 'transitionGroup');
        mech.hand = new Hand();
        mech.discardPile = game.add.group(undefined, 'discardPile');
        for (j = 0; j < Deck.length; j++) {
            temp = Deck[j];
            for (i = 0; i < temp.copies; i++)
                mech.drawPile.add(new Card(temp.tint, temp.title, temp.text, temp.cost, temp.value, temp.action));
        }
        for (i = 0; i < mech.numberOfJunkCards; i++) mech.drawPile.add(new Card('grey', 'DAMAGED', "NO EFFECT. Your mech has taken damage and will need to be repaired.", 1, 1));
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

        // var uiLine = game.add.sprite(0, 500, 'pix');
        // uiLine.height = 2;
        // uiLine.width = 800;

        mech.hud = new Hud();
        var bg = game.add.image(0, 0, 'western_bg');
        bg.width = 800;
        bg.height = 1200;
        bg.sendToBack();
    }
};
