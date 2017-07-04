/* global game, mech, Phaser */
var Card = require('../Element/Card');
var Enemy = require('../Element/Enemy');
var deck = require('../Deck/Cowboy');

module.exports = {
    create: function() {
        var temp, c, i = 0,
            totalCardsInDeck = 0,
            drawPile = game.add.group(),
            hand = game.add.group(),
            discardPile = game.add.group();
        while (deck.length > 0) {
            temp = deck.pop();
            totalCardsInDeck += temp.copies;
            for (i = 0; i < temp.copies; i++) {
                c = new Card(temp.tint, temp.title, temp.text);
                drawPile.add(c);
                c.x = 700;
                c.y = 1050;
                c.instantFlip();
                c.angle = game.rnd.between(-5, 5);
            }
        }
        hand.onChildInputDown.add(function(target) {
            target.startingAngle = target.angle;
            target.startingWidth = target.width;
            target.startingHeight = target.height;
            target.startingX = target.x;
            target.startingY = target.y;
            game.tweens.create(target).to({
                width: target.width * 2,
                height: target.height * 2,
                angle: 0
            }, 75, null, true);
        });
        hand.onChildInputUp.add(function(target) {
            if (target.y > 500) {
                target.inputEnabled = false;
                game.tweens.create(target).to({
                    angle: target.startingAngle,
                    x: target.startingX,
                    y: target.startingY,
                    width: target.startingWidth,
                    height: target.startingHeight,
                }, 100, null, true).onComplete.add(function(card) {
                    card.inputEnabled = true;
                }, target);
                return;
            }
            print('card activated');
            target.inputEnabled = false;
            game.tweens.create(target).to({
                width: target.startingWidth,
                height: target.startingHeight,
                x: 400 + game.rnd.between(-10, 10),
                y: 1250 + game.rnd.between(-10, 10),
                angle: game.rnd.between(-20, 20)
            }, 200, null, true).onComplete.add(function(card) {
                // card.inputEnabled = true;
            }, target);
            hand.remove(target);
            discardPile.add(target);
        });
        Phaser.ArrayUtils.shuffle(drawPile.children);
        var e = new Enemy();
        game.world.sendToBack(e);
        for (i = 0; i < 5; i++) {
            c = drawPile.getTop();
            drawPile.remove(c);
            hand.add(c);
            game.tweens.create(c).to({
                x: 150 + 90 * i,
                y: 950 - i * 20,
                angle: -20 + 8 * i
            }, 500, null, true, 300 + i * 200).onStart.add(function() {
                this.flip();
                hand.bringToTop(this);
            }, c);
        }
        var uiLine = game.add.sprite(0, 500, 'pix');
        uiLine.height = 2;
        uiLine.width = 800;
    }
};
