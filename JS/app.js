var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function avatar(img, x,y,width,height){
    this.img = new Image();
    this.img.src = img;
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;

    this.intersects = function (rect) {
        if (rect == null) {
            window.console.warn('Missing parameters on function intersects');
        } else {
            return (this.x < rect.x + rect.width &&
                this.x + this.width > rect.x &&
                this.y < rect.y + rect.height &&
                this.y + this.height > rect.y);
        }
    };

    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    };
}


//alert("WELCOME TO GETME\n PRESS THE KEYS TO MOVE\n GOOD LUCK!");

var score = 0;

var heroX = 0;
var heroY = 100;


var enemy1Y = 10;
var enemy1X = aleatorio(0,580);

var enemy2X = aleatorio(0,580);

var enemy2Y = 200;

var enemy1;
var enemy2;
var enemy3;
var enemy4;

var enemy3X = 10;
var enemy3Y = aleatorio(0,580);

var enemy4X = 200;
var enemy4Y = aleatorio(0,580);

var hero;

var lastPress;
var gameOver = false;


var enemyVelocity = 2;

var sound = new Audio();
sound.src = "chomp.oga";




var imgEnemies = "IMG/enemies.gif";
var hero = "IMG/hero.png";






document.addEventListener("keydown", function (event) {
    lastPress = event.keyCode;
    keyEvent();
})


var keyEvent = function () {
    if (lastPress == 39){heroX += 8;}
    if (lastPress == 37){heroX -= 8;}
    if (lastPress == 40){heroY += 8;}
    if (lastPress == 38){heroY -= 8;}
}


var limits = function () {

    if (enemy1Y > canvas.height) { enemy1Y = -5; enemy1X = null; enemy1X = aleatorio(0,580);}
    if (enemy2Y < 0) {enemy2Y = canvas.height; enemy2X = null; enemy2X = aleatorio(0,580);}
    if (enemy3X < 0) {enemy3X = canvas.width; enemy3Y = null; enemy3Y = aleatorio(0,580);}
    if (enemy4X < 0) {enemy4X = canvas.width; enemy4Y = null; enemy4Y = aleatorio(0,580);}

	if(heroX < 0) {heroX = 0;}
	if(heroY < 0) {heroY = 0;}
	if(heroX + hero.width > canvas.width) {heroX = canvas.width - hero.width;}
	if(heroY + hero.height > canvas.height) {heroY = canvas.height - hero.height;}
}



 function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



var ag = function (text, posX, posY, color) {
    ctx.beginPath();
    ctx.font = "26px Berlin Sans FB";
    ctx.fillText(text, posX, posY);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}



var animate = function () {
	score += 0.1;
    ctx.clearRect(0,0,1000,1000);
	
	ctx.beginPath();
	ctx.font = "16px Consolas";
	ctx.fillText("Score: "+ parseInt(score), 500,550);
	ctx.fillStyle = "white";
	ctx.closePath();

	enemyVelocity += 0.001;

    enemy1Y += enemyVelocity;
    enemy2Y -= enemyVelocity;
	enemy3X += enemyVelocity;
	enemy4X -= enemyVelocity;

    enemy1 = new avatar("IMG/enemies.gif", enemy1X, enemy1Y, 20, 20);
    enemy1.fill(ctx);

    enemy2 = new avatar("IMG/enemies.gif", enemy2X, enemy2Y, 20 ,20);
    enemy2.fill(ctx);
	
	enemy3 = new avatar("IMG/enemies.gif", enemy3X, enemy3Y, 20, 20);
	enemy3.fill(ctx);
	
	enemy4 = new avatar("IMG/enemies.gif", enemy4X, enemy4Y, 20, 20);
	enemy4.fill(ctx);
	

    hero = new avatar("IMG/hero.gif", heroX, heroY, 20, 20);
    hero.fill(ctx);


    var boom = function () {
        if (hero.intersects(enemy2)){gameOver = true;sound.play();}
        if (hero.intersects(enemy1)){gameOver = true;sound.play();}
        if (hero.intersects(enemy3)){gameOver = true;sound.play();}
        if (hero.intersects(enemy4)){gameOver = true;sound.play();}


        if (gameOver == true){
			
			ctx.clearRect(0,0,1000,1000);
			ctx.beginPath();
			ctx.font = "55px Consolas";
			ctx.fillText("GAME OVER", 155,270);
			ctx.fillStyle = "white";
			ctx.closePath();
			
			ctx.beginPath();
            ctx.font = "30px Consolas";
			ctx.fillText("YOUR SCORE: " + parseInt(score), 160,320);
			ctx.fillStyle = "white";
			ctx.closePath();
            
            if(score < 50){ag("You can do it better... Try Again!", 120, 400, "white");}
            if(score < 100 && score > 51){ag("You don't was so bad... Try Again!", 120, 400, "white");}
            if(score < 200 && score > 101){ag("Wow you're good in this! Continue trying!", 80, 400, "white");}
            if(score < 400 && score > 201){ag("Gongratulations! You're very, very nimble!", 70, 400, "white");}
            if(score > 401){
                ag("WOW! HOW DO YOU DID IT?!", 140, 400, "#00ffff");
                ag("YOU'RE A PROFFESIONAL!!", 150, 430, "#00ffff");
            }

            



            animate = null;
            
		}
    } 
    
    boom();

    window.requestAnimationFrame(animate);
    limits();
}




animate();
keyEvent();
