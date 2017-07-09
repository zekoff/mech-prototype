/* global mech, game, Phaser */

var TableManager = {};
TableManager.discardPileLocation = {
    x: 400,
    y: 1250
};
TableManager.drawPileLocation = {
    x: 700,
    y: 1050
};
TableManager.initializeDrawPile = function() {
    mech.drawPile.forEach(function(child) {
        child.x = TableManager.drawPileLocation.x;
        child.y = TableManager.drawPileLocation.y;
        child.instantFlip();
        child.angle = game.rnd.between(-2, 2);
    });
};
TableManager.tweenToDiscardPile = function(card) {
    game.tweens.create(card).to({
        width: card.startingWidth,
        height: card.startingHeight,
        x: 400 + game.rnd.between(-20, 20),
        y: 1250 + game.rnd.between(-10, 10),
        angle: game.rnd.between(-20, 20),
        alpha: 1
    }, 200, null, true);
};
TableManager.pickCardFromHand = function(card) {
    card.startingAngle = card.angle;
    card.startingWidth = card.width;
    card.startingHeight = card.height;
    card.startingIndex = mech.hand.getChildIndex(card);
    mech.hand.bringToTop(card);
    game.tweens.create(card).to({
        width: card.width * 2,
        height: card.height * 2,
        angle: 0,
        alpha: 0.9
    }, 75, null, true);
};
TableManager.returnCardToHand = function(card) {
    card.inputEnabled = false;
    mech.hand.setChildIndex(card, card.startingIndex);
    game.tweens.create(card).to({
        angle: card.startingAngle,
        x: card.input.dragStartPoint.x,
        y: card.input.dragStartPoint.y,
        width: card.startingWidth,
        height: card.startingHeight,
        alpha: 1
    }, 100, null, true).onComplete.add(function(card) {
        card.inputEnabled = true;
    }, card);
};
TableManager.drawCard = function(number) {
    // TODO make card drawing smarter; add cards to queue if a card is supposed to be drawn while cards are already tweening to player's hand
    // TODO re-arrange hand if cards leave hand
    if (!number) number = 1;
    var i, t, c;
    for (i = 0; i < number; i++) {
        c = mech.drawPile.getTop();
        mech.transitionGroup.add(c, false, 0);
        t = game.tweens.create(c).to({
            x: 150 + 90 * i,
            y: 950 - i * 20,
            angle: -20 + 8 * i
        }, 500, null, true, 300 + i * 200);
        t.onStart.add(function() {
            this.flip();
        }, c);
        t.onComplete.add(function() {
            mech.hand.addToHand(this);
        }, c);
    }
};

module.exports = TableManager;
