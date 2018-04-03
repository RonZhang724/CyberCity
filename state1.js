
var catRun = {};

catRun.state1 = function(){};

catRun.state1.prototype = {
    preload: function(){
        game.load.image('cover','assets/Concept.gif');
    },
    create: function(){
        game.stage.backgroundColor = '#DDDDDD';
        //background = game.add.tileSprite(0, 0, 736, 460 'cover');
        //background.height = game.height;
        //background.width = game.width;
        game.add.text(300, 146, 'Cyber City\n', {fontSize: '64px', fill: '#000'});
        game.add.text(230, 180, 'Press ENTER to start', {fontSize: '32px', fill: '#000'})
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(changeState, null, null, null);
    },
    update: function(){
        
    }
};

function changeState(){
    game.state.start('state2')
}