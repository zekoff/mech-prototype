/* global Phaser, game */

var GunshotDeformer = function(bmd, x, y, size) {
    bmd.blendXor();
    bmd.circle(x * bmd.width, y * bmd.height, size, 'black');
};

module.exports = GunshotDeformer;
