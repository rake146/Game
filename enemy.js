var rectWidth = 65;

function Enemy(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);
  this.health = 20;
  this.maxhp = 20;
  this.attackrate = 0;

  this.update = function (player) {
    var newvel = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
    newvel.setMag(1);
    //this.vel.lerp(newvel, 1);
    if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < this.r/2)
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

    fill(155-(colourMultiplier*colourMultiplierSecond), 184-(colourMultiplier*colourMultiplierSecond), 74-(colourMultiplier*colourMultiplierSecond));
    stroke(87-(colourMultiplier*colourMultiplierSecond), 96-(colourMultiplier*colourMultiplierSecond), 53-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    textSize(16);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    fill(155-(colourMultiplier), 184-(colourMultiplier), 74-(colourMultiplier));
    stroke(87-(colourMultiplier), 96-(colourMultiplier), 53-(colourMultiplier));
    textAlign(CENTER);
    text(round(this.r), this.pos.x, this.pos.y);
    stroke(0);
    strokeWeight(0);



    //fill(255, 255, 255);
    //triangle(this.pos.x + cos(60) * this.r, this.pos.y + sin(60) * this.r, this.pos.x + cos(120) * this.r, this.pos.y + sin(120) * this.r, this.pos.x + cos(180) * this.r, this.pos.y + sin(180) * this.r);
    //ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);

  }
}
