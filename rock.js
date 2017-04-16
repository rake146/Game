
function Rock(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function () {

  }

  this.constrain = function(){

  }

  this.eats = function(other){

  }
  this.split = function(length) {

  }
  this.show = function() {
    stroke(110, 110, 110);
    strokeWeight(3);
    fill(193, 197, 199);
    rect(this.pos.x - this.r, this.pos.y - this.r, this.r, this.r, 20);
    strokeWeight(0);
    fill(213, 227, 232);
    rect(this.pos.x - this.r*0.85, this.pos.y - this.r*0.85, this.r*0.75, this.r*0.75, 20);
  }
}
