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
TableManager.tweenSpeed = 100; //ms
TableManager.createObjectTween = function(obj, newX, newY, newAngle) {
    obj.inputEnabled = false;
    if (!newAngle) newAngle = 0;
    var t = game.tweens.create(obj).to({
        x: newX,
        y: newY,
        angle: newAngle
    }, TableManager.tweenSpeed);
    t.onStart.add(function() {
        this.inputEnabled = false;
    }, obj);
    t.onComplete.add(function() {
        this.inputEnabled = true;
    }, obj);
    return t;
};
TableManager.initializeDrawPile = function() {
    print('initializing draw pile');
    Phaser.ArrayUtils.shuffle(mech.drawPile.children);
    mech.drawPile.forEach(function(child) {
        child.x = TableManager.drawPileLocation.x;
        child.y = TableManager.drawPileLocation.y;
        child.instantFlip();
        child.angle = game.rnd.between(-2, 2);
    });
};
TableManager.createTweenToDiscardPile = function(card) {
    card.width = card.startingWidth;
    card.height = card.startingHeight;
    card.alpha = 1;
    return TableManager.createObjectTween(card, 400 + game.rnd.between(-20, 20), 1250 + game.rnd.between(-10, 10), game.rnd.between(-20, 20));
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
    // TODO get rid of this, and when releasing card just return to hand via hand-fan function
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
    if (!number) number = 1;
    var leftover = 0;
    if (number > mech.drawPile.length) {
        leftover = number - mech.drawPile.length;
        number = mech.drawPile.length;
    }
    var i;
    for (i = 0; i < number; i++) {
        mech.actionQueue.registerFunction(
            function() {
                print('drawing card');
                var c = mech.drawPile.getTop();
                c.flip();
                mech.hand.addToHand(c);
            });
    }
    if (leftover) {
        mech.actionQueue.registerFunction(TableManager.reshuffle);
        for (i = 0; i < leftover; i++)
            mech.actionQueue.registerFunction(TableManager.drawCard);
    }

};
TableManager.reshuffle = function() {
    print('reshuffling');
    var temp = [];
    mech.discardPile.forEach(function(element) {
        temp.push(element);
    });
    temp.forEach(function(element) {
        mech.discardPile.remove(element);
        mech.drawPile.add(element);
    });
    TableManager.initializeDrawPile();
};

module.exports = TableManager;
