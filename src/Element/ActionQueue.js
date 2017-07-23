/* global game, Phaser */
var ActionQueue = function() {
    this._queue = [];
    this._processing = false;
};
ActionQueue.prototype.registerFunction = function(f) {
    print('_REGISTERFUNCTION');
    var mock = {};
    var self = this;
    mock.start = function() {
        f();
        self._execute();
    };
    this._queue.push(mock);
    this._execute();
};
ActionQueue.prototype.registerTween = function(t) {
    print('_REGISTERTWEEN');
    t.onComplete.add(function() {
        this._processing = false;
        this._execute();
    }, this);
    this._queue.push(t);
    this._execute();
};
ActionQueue.prototype._execute = function() {
    print('_EXECUTE');
    if (this._queue.length > 0 && this._processing === false) {
        this._queue.shift().start();
        this._processing = true;
    }
};
module.exports = ActionQueue;
