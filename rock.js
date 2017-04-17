
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
    stroke(110-(colourMultiplier*colourMultiplierSecond), 110-(colourMultiplier*colourMultiplierSecond), 110-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    fill(193-(colourMultiplier*colourMultiplierSecond), 197-(colourMultiplier*colourMultiplierSecond), 199-(colourMultiplier*colourMultiplierSecond));
    rect(this.pos.x, this.pos.y, this.r, this.r, 20);
    strokeWeight(0);
    fill(213-(colourMultiplier*colourMultiplierSecond), 227-(colourMultiplier*colourMultiplierSecond), 232-(colourMultiplier*colourMultiplierSecond));
    rect(this.pos.x + this.r*0.15, this.pos.y + this.r*0.15, this.r*0.75, this.r*0.75, 20);
  }
}
