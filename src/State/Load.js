/* global game, Phaser */
module.exports = {
    preload: function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.baseURL = './assets/';
        game.load.image('pix');
        game.load.image('back');
        game.load.image('blue');
        game.load.image('red');
        game.load.image('green');
    },
    create: function(){
        game.state.start('Main');
    }
};