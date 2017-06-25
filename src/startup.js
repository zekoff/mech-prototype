/* global Phaser */
var game = new Phaser.Game(600, 900);
var print = console.log.bind(console);
global.game = game;
global.mech = {};
global.print = print;
game.state.add('Load', require('./State/Load'));
game.state.add('Main', require('./State/Main'));
game.state.start('Load');