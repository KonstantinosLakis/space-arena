var scl = 25;
var player;
var loopSound;
var shootSound;
var takeDownSound;
var gameoverSound;
var explosions = [];
var explosionFrames = [];
var playerImg;
var bg;
var bulletImg;
var enemyImg;
var gameover;
var chance = 0.015;
var playing = true;
var diag;
var bullets = [];
var enemies = [];
function preload(){
 loopSound = loadSound('sounds/loop.mp3');
 shootSound = loadSound('sounds/shoot.wav');
 takeDownSound = loadSound('sounds/takedown.wav');
 gameoverSound = loadSound('sounds/gameover.mp3');
 takeDownSound.amp(0.2);
 takeDownSound.rate(2);
 shootSound.rate(1.5);
}
function setup(){
 imageMode(CENTER);
 createCanvas(1440, 810);
 diag = Math.sqrt(width * width + height * height) / 2;
 player = new Player();
 playerImg = loadImage('images/ship.png');
 bg = loadImage('images/bg.jpg');
 gameover = loadImage('images/gameover.jpg');
 bulletImg = loadImage('images/bullet.png');
 enemyImg = loadImage('images/enemy.png');
 for (var i = 0; i < 8 ; i ++){
   var frame = loadImage('images/explosion/frame' + String(i) + '.png');
   explosionFrames.push(frame);
 }
 loopSound.loop();
}

function draw() {
  if(playing){
  textSize(30);
  translate(width / 2, height / 2);
  background(bg);
  translate(-width / 2, -height / 2);
  fill(0);
  player.regen();
  player.show();
  setAngle();
  spawnEnemies();
  fill(0, 255, 0);
  for (var i = bullets.length - 1; i>=0; i --){
    var b = bullets[i];
    b.move();
    b.show();
    b.die();
  }
  fill(255, 0, 0);
  for (var i = enemies.length - 1; i>=0; i --){
    var e = enemies[i];
    e.move();
    e.show();
  }
  for (var i = explosions.length - 1; i>=0; i --){
    var e = explosions[i];
    e.show();
    e.die();
  }
  showStats();
  checkCollisions();
}
}

function setAngle(){
  var arrow = createVector(mouseX - player.pos.x, mouseY - player.pos.y);
  var angle = arrow.heading();
  player.angle = angle;
}
function mousePressed(){
  if (player.ammo > 0){
   shootSound.play();
   bullets.push(new Bullet(player.angle));
   player.ammo --;
 }
}
function spawnEnemies(){
  if (random(1) < chance && enemies.length < 10){
    chance += 0.001;
    enemies.push(new Enemy(random(TWO_PI)));
  }
}
function checkCollisions(){
  for (var i = bullets.length - 1; i >=0 ; i --){
    for (var j = enemies.length - 1; j >=0 ; j --){
      var b = bullets[i];
      var e = enemies[j];
      var d = dist(b.pos.x, b.pos.y, e.pos.x, e.pos.y);
      if (d < scl){
        takeDownSound.play();
        explosions.push(new Explosion(e.pos.x, e.pos.y));
        bullets.splice(bullets.indexOf(b), 1);
        enemies.splice(enemies.indexOf(e), 1);
        player.score ++;
        break;
      }
    }
  }

  for (var j = enemies.length - 1; j >=0 ; j --){
    var e = enemies[j];
    var d = dist(player.pos.x, player.pos.y, e.pos.x, e.pos.y);
    if (d < scl / 2){
      player.hp --;
      enemies.splice(enemies.indexOf(e), 1);
      if (player.hp <= 0){
        console.log('GameOver');
        playing = false;
        loopSound.stop();
        gameoverSound.play();
        translate(width / 2, height / 2);
        background(gameover);
        translate(-width / 2, -height / 2);
      } else if (player.hp < 2){
        player.ammo = 20;
      }
    }
  }
}
function showStats(){
  noFill();
  stroke(255);
  rect(width / 50, height / 50, width / 10, height / 50);
  rect(width / 50, height / 15, width / 10, height / 50);
  var health = map(player.hp, 0, 10, 0, width / 10);
  var ammo = map(player.ammo, 0, 20, 0, width / 10);
  fill(0, 255, 0);
  rect(width / 50, height / 50, health, height / 50);
  fill(255, 0, 0);
  rect(width / 50, height / 15, ammo, height / 50);
  stroke(0);
  text('Score : ' + String(player.score), width / 50 , height / 8);
}
