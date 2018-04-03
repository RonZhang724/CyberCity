
var game = new Phaser.Game(800, 500, Phaser.AUTO, '');
game.state.add('state1',catRun.state1);
game.state.add('state2',catRun.state2);
game.state.add('state3',catRun.state3);
game.state.start('state1');
            
