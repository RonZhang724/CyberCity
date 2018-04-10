catRun.state2 = function(){};

var score = 0;
var diamondSpeed = -350;
var player;
var platforms;
var enemySmall; 
var playerSpeed = 6;
var facingRight = 1;
var mark;
var bullets, bullet, bulletSpeed = 1000;
var nextFire = 0, fireRate = 250;
var explosions;

catRun.state2.prototype = {
    preload: function(){
        //load the background image
        game.load.image('level1','assets/level1.png')
        // load the 3D platform
        game.load.image('ground3D','assets/platform3D.png')
        //load the platform
        game.load.image('ground','assets/platform.png')
        //load the player
        game.load.spritesheet('girl','assets/female.png', 180, 300)
        //load the smallEnemy
        game.load.spritesheet('enemySmall','assets/enemySmall.png',200,200)
        //load the revolver bullet 
        game.load.image('bullet1','assets/bulletRevolver.png');
        //load the mark
        game.load.image('mark','assets/mark.png');
        //load the explosion
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    },

    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Load the back ground image
        levelOne = game.add.sprite(0,0,'level1')
        levelOne.height = game.height;
        levelOne.width = game.width;
        
        // Create the depth ground (no physics just for asthetic)
        var ground1 = game.add.sprite(-30, game.height - 50, 'ground3D');
        ground1.height = 30;
        ground1.width = game.width+50;
        var ledge1_d = game.add.sprite(395, 300, 'ground3D');
        ledge1_d.height = 30;
        ledge1_d.width = 450;
        var ledge2_d = game.add.sprite(-145, 175, 'ground3D');
        ledge2_d.height = 40;
        ledge2_d.width = 470;
        
        // Platform group = ground + ledges
        platforms = game.add.group();
        platforms.enableBody = true;
            // Add ground 
        var ground = platforms.create(0, game.height - 30, 'ground');    
        ground.height = 30;
        ground.width = game.width;
        ground.body.immovable = true;
            //  Add two ledges
        ledge1 = platforms.create(400, 320, 'ground');  
        ledge1.height = 30;
        ledge1.width = 400;
        ledge1.body.immovable = true;
        ledge2 = platforms.create(0, 200, 'ground');
        ledge2.height = 20;
        ledge2.width = 300;
        ledge2.body.immovable = true;
        
        // Add the character
        player = game.add.sprite(32, game.world.height - 150, 'girl');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;
        player.scale.setTo(0.3,0.3);
        player.animations.add('left', [0, 1, 2], 10, true);
        player.animations.add('right', [5, 6, 7], 10, true);
        
        // Add the mark
        mark = game.add.sprite(player.body.x + 27, player.body.y + 27, 'mark');
        game.physics.arcade.enable(mark);
        mark.scale.setTo(0.4,0.4);
        
        // Add the bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet1');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        //  An explosion pool
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        
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
        enemySmall1 = game.add.sprite(600, game.world.height - 300, 'enemySmall');
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
        game.physics.arcade.collide(enemySmall, player);
        game.physics.arcade.collide(enemySmall1, player);

        // Make the mark follow the cursor
        mark.rotation = game.physics.arcade.angleToPointer(mark);
        mark.body.x = player.body.x + 27;
        mark.body.y = player.body.y + 27;
        // Fire a bullet
        if (game.input.activePointer.isDown){
            this.fire();
        }
        // Bullets hits enemy
        game.physics.arcade.overlap(bullets, enemySmall, this.hitEnemy);
        game.physics.arcade.overlap(bullets, enemySmall1, this.hitEnemy1);
        
        this.playerMove();
        this.enemyMove();
    },

    fire: function(){
        if(game.time.now > nextFire){
            nextFire = game.time.now + fireRate;
            console.log('Firing!')
            bullet = bullets.getFirstDead();
            bullet.scale.setTo(0.1,0.1);
            bullet.reset(player.x + 27, player.y + 45);
            game.physics.arcade.moveToPointer(bullet, bulletSpeed);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        }
    },
    hitEnemy: function(){
        enemySmall.kill();
        bullet.kill();
    },
    hitEnemy1: function(){
        enemySmall1.kill();
        bullet.kill();
    },
    playerMove: function(){
        // Reset the player velocity (make her stop)
        player.body.velocity.x = 0;
        // Player movement mechanisms 
        if (cursors.left.isDown){           // Move to the left
            //player.body.x -= playerSpeed;
            player.body.velocity.x = -350;
            player.animations.play('left');
            facingRight = 0;
        }
        else if (cursors.right.isDown){     // Move to the right
            //player.scale.setTo(0.3,0.3);
            //player.body.x += playerSpeed;
            player.body.velocity.x = 350;
            player.animations.play('right');
            facingRight = 1;
        }
        else{                               // Stand still
            player.animations.stop();
            if(facingRight == 1){
                player.frame = 4;
            }
            else{
                player.frame = 3;
            }
        }                                   // Jump 
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -650;  
        }
        if (cursors.down.isDown){
            player.body.velocity.y = 600;  
        }
    },
    enemyMove: function(){
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
