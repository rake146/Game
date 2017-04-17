
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

    fill(155-(colourMultiplier*colourMultiplierSecond), 184-(colourMultiplier*colourMultiplierSecond), 74-(colourMultiplier*colourMultiplierSecond));
    stroke(87-(colourMultiplier*colourMultiplierSecond), 96-(colourMultiplier*colourMultiplierSecond), 53-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * cos(2 * PI * i / 5), this.pos.y + this.r * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);

    fill(176-(colourMultiplier*colourMultiplierSecond), 212-(colourMultiplier*colourMultiplierSecond), 80-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(0);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * 0.75 * cos(2 * PI * i / 5), this.pos.y + this.r * 0.75 * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);
  }
}
