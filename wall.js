
function Wall(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function () {

  }

  this.show = function() {

    fill(155, 184, 74);
    stroke(87, 96, 53);
    strokeWeight(3);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * cos(2 * PI * i / 5), this.pos.y + this.r * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);

    fill(176, 212, 80);
    strokeWeight(0);
    beginShape();
    for (i = 0; i < 5; i++) {
      vertex(this.pos.x + this.r * 0.75 * cos(2 * PI * i / 5), this.pos.y + this.r * 0.75 * sin(2 * PI * i / 5));
    }
    endShape(CLOSE);
  }
}
