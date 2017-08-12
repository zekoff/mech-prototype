/* global Phaser */
var game = new Phaser.Game(800, 1200);
var print = console.log.bind(console);
global.game = game;
global.mech = {};
global.print = print;
game.state.add('Load', require('./State/Load'));
game.state.add('Main', require('./State/Main'));
game.state.add('Win', require('./State/Win'));
game.state.add('Lose', require('./State/Lose'));
game.state.add('Title', require('./State/Title'));
game.state.add('Interstitial', require('./State/Interstitial'));
game.state.start('Load');
