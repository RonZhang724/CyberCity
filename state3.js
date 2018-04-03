catRun.state3 = function(){};

catRun.state3.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#DDDDDD';
        game.add.text(300, 146, 'Game Over!\n', {fontSize: '64px', fill: '#000'});
        game.add.text(230, 180, 'Press ENTER to restart', {fontSize: '32px', fill: '#000'})
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(changeState, null, null, null);
    },
    update: function(){}
};

function changeState(){
    game.state.start('state2')
}