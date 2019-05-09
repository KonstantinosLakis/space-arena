
function Bullet(angle){
  this.angle = angle;
  this.pos = player.pos.copy();
  var dx = scl * cos(angle);
  var dy = scl * sin(angle);
  this.vel = createVector(dx, dy);
  this.pos.x +=  this.vel.x;
  this.pos.y +=  this.vel.y;
  this.vel.setMag(2);
  this.move = function(){
    this.pos.add(this.vel);
  }
  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    image(bulletImg, 0, 0,2 * scl, scl);
    //ellipse(0, 0, scl, scl / 3);
    pop();
  }
  this.die = function(){
    if(this.pos.x < - 2 * scl || this.pos.x > width + 2 * scl
     || this.pos.y < - 2 * scl || this.pos.y > height + 2 * scl){
       bullets.splice(bullets.indexOf(this), 1);
     }
  }
}
