// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xRange = [-100, 550];
    this.yRange = [220, 60, 140];
    this.speedRange = [130, 160, 190, 220, 250, 280, 320, 350];
    this.reset();
};

//Enemy Prototype reset
Enemy.prototype.reset = function() {
    this.x = this.xRange[0];
    this.y = this.yPositionSetting();
    this.speed = this.speedSetting();
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > this.xRange[1]) {
        this.reset();
    }
    if ((player.x <= this.x + 40 && player.x >= this.x - 40) &&
        (player.y === this.y)) {
        player.reset();
        gameScore.decrease();
        gameLife.decrease();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy speed setting function
Enemy.prototype.speedSetting = function() {
    return this.speedRange[Math.floor(Math.random() * 7)];
}

//Enemy y position setting function
Enemy.prototype.yPositionSetting = function() {
    return this.yRange[Math.floor(Math.random() * 3)];
}

// Now write your own player class
var Player = function() {
        this.sprite = 'images/char-cat-girl.png';
        this.x = 200;
        this.y = 380;
    }
    // This class requires an update(), render() and
    // a handleInput() method.
Player.prototype.update = function() {
    if (this.y == -20) {
        // player is on water, reset
        this.reset();
        gameScore.increase();
    }
}

/**
 * Move the player to initial position.
 */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Implement ternary operators later for x conditions***
Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'left':
            if (this.x > 1)
                this.x = this.x - 100;
            break;
        case 'right':
            if (this.x < 380)
                this.x = this.x + 100;
            break;
        case 'up':
            this.y = this.y - 80;
            break;
        case 'down':
            if (this.y < 380)
                this.y = this.y + 80;
            break;
    }
}


//Instantiate the score object
var Score = function() {
    this.value = 0;
}

//Render the score board on screen
Score.prototype.render = function() {
  ctx.font = '25px Arial';
  ctx.fillText("Score = " + this.value,360,620);  
}

// increase score on crossing road
Score.prototype.increase = function() {
    this.value += 10;
    if (gameScore.value % 10 === 0) {
            allEnemies.push(new Enemy());
    }
}

// decrease score on collision
Score.prototype.decrease = function() {
    this.value -= 5;
}


//Instantiate the life object
var Life = function() {
    this.sprite = 'images/Heart_s.png';
    this.count = 3
}

//render life object on screen
Life.prototype.render = function() {
    var x = 0;
    for(var i = 0; i < this.count; i++) {
        ctx.drawImage(Resources.get(this.sprite), x, 590);
        x += 50;
    }
    if (this.count === 0) {
        ctx.drawImage(Resources.get('images/Game-Over.png'), 0, 0)
        ctx.font = '25px Arial';
        ctx.fillText("Your final score is " + gameScore.value, 120, 400);
        ctx.fillText("Refresh page to begin new game", 60, 450);
    }
}

//decrease life 
Life.prototype.decrease = function() {
    if (this.count > 0) {
        this.count = this.count - 1;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var gameScore = new Score();
var gameLife = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});

//disable scrolling with arrow keys
document.addEventListener("keydown", function (e) {
  if([37,38,39,40].indexOf(e.keyCode) > -1){
    e.preventDefault();
  }
}, false);