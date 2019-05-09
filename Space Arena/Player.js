function Player(){
  this.hp = 10;
  this.ammo = 20;
  this.score = 0;
  this.pos = createVector(width / 2, height / 2);
  this.angle = 0;
  this.show = function(){
    dx = scl * cos(this.angle);
    dy = scl * sin(this.angle);
    push();
    translate(this.pos.x , this.pos.y);
    rotate(this.angle - HALF_PI);
    image(playerImg, 0, 0, 2.5 * scl, 2.5 * scl);
    //rect(0, 0, scl * 0.8, scl / 3);
    pop();
    //ellipse(this.pos.x, this.pos.y, scl, scl);
  }
  this.regen = function(){
    if(frameCount % 60 == 0){
      this.ammo = Math.min(this.ammo + 1, 20);
      this.hp = Math.min(this.hp + 1 / 2, 10) ;
    }
  }
}
