/* global game */
var ActionQueue = function() {
    this.queue = [];
};
ActionQueue.registerFunction = function(f) {
    var t = game.tweens.create({});
    t.onStart.add(f);
    t.onComplete.add(this.execute);
};
ActionQueue.registerTween = function(t) {
    t.onComplete.add(this.execute);
};
ActionQueue.execute = function() {
    if (this.queue.length > 0) this.queue.shift().start();
};
module.exports = ActionQueue;
