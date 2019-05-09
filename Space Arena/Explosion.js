
function Explosion(x, y){
  this.start = frameCount;
  this.x = x;
  this.y = y;
  this.show = function(){
    var index = Math.min(Math.floor((frameCount - this.start) / 3), 7);
    image(explosionFrames[index], this.x, this.y,2 * scl, 2 * scl);
  }
  this.die = function(){
    if (frameCount > this.start + 21){
      explosions.splice(explosions.indexOf(this), 1);
    }
  }
}
