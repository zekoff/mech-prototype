/* global Phaser, game */

var CardTextureBuilder = function(color, title, text, image) {
    var group = game.make.group();
    group.create(0,0,color);
    group.add(game.make.text(15,190,title,{font:"24pt Arial",
        fontVariant:'small-caps', boundsAlignH:'center', wordWrap:true,
        wordWrapWidth:270}));
    group.add(game.make.text(15,250,text,{font:"18pt Arial", align:'left',
        wordWrap:true, wordWrapWidth:270}));
    // apply flavor image
    var bmd = game.make.bitmapData(group.width, group.height);
    game.stage.updateTransform();
    bmd.drawGroup(group);
    bmd.blendXor();
    var i, j = game.rnd.between(0,4);
    for (i = 0; i < j; i++)
        bmd.circle(game.rnd.between(50, 250), game.rnd.between(50, 450),
        game.rnd.between(5, 15),'black');
    group.destroy();
    return bmd;
};

module.exports = CardTextureBuilder;