var rectWidth = 65;
function Enemy(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);
  this.health = 20;
  this.maxhp = 20;
  this.attackrate = 0;

  this.update = function (player) {
    var newve = createVector(player.pos.x, player.pos.y);
    var newvel = createVector(player.pos.x + random(30) - this.pos.x, player.pos.y + random(30) - this.pos.y);
    newvel.setMag(1);
    //this.vel.lerp(newvel, 1);
    if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 40)
    {
      if (this.attackrate < 30)
      {
        this.attackrate++;
      }
      if (this.attackrate == 30 && player.health > 0)
      {
        this.attackrate = 0;
        player.health--;
      }

      newvel = createVector(0,0);
    }

    this.pos.add(newvel);
  }

  this.show = function() {
    //hp bars

    fill(155, 184, 74);
    stroke(87, 96, 53);
    strokeWeight(3);
    textSize(16);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    textAlign(CENTER);
    text(round(this.r), this.pos.x, this.pos.y);
    stroke(0);
    strokeWeight(0);



    //fill(255, 255, 255);
    //triangle(this.pos.x + cos(60) * this.r, this.pos.y + sin(60) * this.r, this.pos.x + cos(120) * this.r, this.pos.y + sin(120) * this.r, this.pos.x + cos(180) * this.r, this.pos.y + sin(180) * this.r);
    //ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);

  }
}
