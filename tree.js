
function Tree(x, y, r) {
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

    fill(103-(colourMultiplier*colourMultiplierSecond), 104-(colourMultiplier*colourMultiplierSecond), 81-(colourMultiplier*colourMultiplierSecond));
    stroke(53-(colourMultiplier*colourMultiplierSecond), 53-(colourMultiplier*colourMultiplierSecond), 77-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * cos(2 * PI * i / 5), this.pos.y + this.r * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);

    fill(117-(colourMultiplier*colourMultiplierSecond), 143-(colourMultiplier*colourMultiplierSecond), 88-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(0);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * 0.75 * cos(2 * PI * i / 5), this.pos.y + this.r * 0.75 * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);
  }
}
