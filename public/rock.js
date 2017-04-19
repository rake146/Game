
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
    stroke(0);
    fill(0,0,0);
    stroke(53, 53, 72);
    strokeWeight(3);
    fill(96, 96, 120);
    rect(this.pos.x, this.pos.y, this.r, this.r, 20);
    strokeWeight(0);
    fill(121, 121, 146);
    rect(this.pos.x + this.r*0.15, this.pos.y + this.r*0.15, this.r*0.75, this.r*0.75, 20);
  }
}
