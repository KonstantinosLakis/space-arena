
function Enemy(angle){
  var dx = diag * cos(angle);
  var dy = diag * sin(angle);
  this.angle = angle;
  this.pos = createVector(width / 2 + dx, height / 2 + dy);
  this.vel = createVector(-dx, -dy);
  this.vel.setMag(3);
  this.move = function(){
    this.pos.add(this.vel);
  }
  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + HALF_PI);
    image(enemyImg, 0, 0, 2 * scl,2 * scl);
    //ellipse(0, 0, scl / 3, scl * 0.8);
    pop();
  }
}
