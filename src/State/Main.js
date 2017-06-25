/* global game, mech, Phaser */
var Card = require('../Element/Card');

module.exports = {
    create: function(){
        console.log('Game created');
        new Card();
    }
};