/* global game, Phaser */
module.exports = {
    preload: function(){
        game.input.maxPointers = 1;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.baseURL = './assets/';
        game.load.image('pix');
        game.load.image('back');
        game.load.image('blue');
        game.load.image('red');
        game.load.image('green');
        game.load.image('legs');
        game.load.image('body');
        game.load.image('left_arm');
        game.load.image('right_arm');
        game.load.image('head');
    },
    create: function(){
        game.state.start('Main');
    }
};