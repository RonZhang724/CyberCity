catRun.state2 = function(){};

var score = 0;
var diamondSpeed = -350;
var player;
var platforms;
var enemySmall; 

catRun.state2.prototype = {
    preload: function(){
        //load the background image
        game.load.image('level1','assets/level1.png')
        //load the platform
        game.load.image('ground','assets/platform.png')
        //load the player
        game.load.spritesheet('girl','assets/female.png', 180, 300)
        //load the smallEnemy
        game.load.spritesheet('enemySmall','assets/enemySmall.png',200,200)
        //load the 
    },

    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Load the back ground image
        levelOne = game.add.sprite(0,0,'level1')
        levelOne.height = game.height;
        levelOne.width = game.width;
        
        // Create the depth ground 
        var ground1 = game.add.sprite(0, game.height - 50, 'ground');
        ground1.height = 30;
        ground1.width = game.width;
        var ledge1_d = game.add.sprite(430, 300, 'ground');
        ledge1_d.height = 30;
        ledge1_d.width = 400;
        
        // Add the platforms
        platforms = game.add.group();
        // Add this line so the character can collide with the ground
        platforms.enableBody = true;
        // Create the actual ground 
        var ground = platforms.create(0, game.height - 30, 'ground');    
        ground.height = 30;
        ground.width = game.width;
        ground.body.immovable = true;
        
        //  Now let's create two ledges
        ledge1 = platforms.create(400, 320, 'ground');
        ledge1.height = 30;
        ledge1.width = 400;
        ledge1.body.immovable = true;
        ledge2 = platforms.create(0, 200, 'ground');
        ledge2.height = 30;
        ledge2.width = 300;
        ledge2.body.immovable = true;
        
        // Add the character
        player = game.add.sprite(32, game.world.height - 150, 'girl');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;
        player.width = 60;
        player.height = 100;
        player.animations.add('left', [0, 1, 2], 10, true);
        player.animations.add('right', [5, 6, 7], 10, true);
        
        // Add the enemySmall
        enemySmall = game.add.sprite(600, game.world.height - 150, 'enemySmall');
        game.physics.arcade.enable(enemySmall);
        enemySmall.body.gravity.y = 900;
        enemySmall.body.collideWorldBounds = true;
        enemySmall.width = 100;
        enemySmall.height = 100;
        enemySmall.animations.add('left', [1], 10, true);
        enemySmall.animations.add('right', [0], 10, true);
        enemySmall.body.velocity.x = -100;
        enemySmall.frame = 1;
        
        // Add the enemySmall
        enemySmall1 = game.add.sprite(600, game.world.height - 500, 'enemySmall');
        game.physics.arcade.enable(enemySmall1);
        enemySmall1.body.gravity.y = 900;
        enemySmall1.body.collideWorldBounds = true;
        enemySmall1.width = 100;
        enemySmall1.height = 100;
        enemySmall1.animations.add('left', [1], 10, true);
        enemySmall1.animations.add('right', [0], 10, true);
        enemySmall1.body.velocity.x = -100;
        enemySmall1.frame = 1;

        cursors = game.input.keyboard.createCursorKeys();
        },

    update: function(){
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemySmall, platforms);
        game.physics.arcade.collide(enemySmall1, platforms);
        
        
        // Reset the player velocity (make her stop)
        player.body.velocity.x = 0;
        // Player movement mechanisms 
        if (cursors.left.isDown){           // Move to the left
            player.body.velocity.x = -350;
            player.animations.play('left');
        }
        else if (cursors.right.isDown){     // Move to the right
            player.body.velocity.x = 350;
            player.animations.play('right');
        }
        else{                               // Stand still
            player.animations.stop();
            player.frame = 4;
        }                                   // Jump 
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -650;  
        }
        if (cursors.down.isDown){
            player.body.velocity.y = 600;  
        }
        // Move the enemy 0
        if (enemySmall.x <= 50){
            enemySmall.body.velocity.x = 100;
            enemySmall.frame = 0;
        }
        else if (enemySmall.x >= 650){
            enemySmall.body.velocity.x = -100;
            enemySmall.frame = 1;
        }
        // Move the enemy 1
        if (enemySmall1.x <= 440){
            enemySmall1.body.velocity.x = 100;
            enemySmall1.frame = 0;
        }
        else if (enemySmall1.x >= 660){
            enemySmall1.body.velocity.x = -100;
            enemySmall1.frame = 1;
        }
    }
}
