
function EnemyBullet(x, y, r, mouseXpos, mouseYpos) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);

  var newvel = createVector((splitblobs[0].pos.x - this.pos.x + this.r/2), (splitblobs[0].pos.y - this.pos.y + this.r/2));
  this.update = function () {
    //if (playerposy > 0)
    var extrapX = (2000/mouseX-width/2);
    var extrapY = (2000/mouseY-height/2);

    newvel.setMag(random(6,12));
    //this.vel.lerp(newvel, 1);
    this.pos.add(newvel);
    //console.log(playerposy);

    for (var i = 0; i < splitblobs.length; i++) {
      if (dist(splitblobs[0].pos.x + splitblobs[0].r/2, splitblobs[0].pos.y + splitblobs[0].r*0.3, this.pos.x, this.pos.y) < splitblobs[0].r)
      {
        if (splitblobs[0].health > 0)
          splitblobs[0].health --;
        //enemy[i].vel = createVector((splitblobs[0].pos.x - this.pos.x), (splitblobs[0].pos.y - this.pos.y));
        enemyBullets.splice(this, 1);
      }
    }
    if (this.pos.x < -1000 || this.pos.x > 1000 || this.pos.y < -1000 || this.pos.y > 1000)
    {
      enemyBullets.splice(this, 1);
    }
  }
  this.show = function() {

    fill(155-(colourMultiplier*colourMultiplierSecond), 184-(colourMultiplier*colourMultiplierSecond), 74-(colourMultiplier*colourMultiplierSecond));
    stroke(87-(colourMultiplier*colourMultiplierSecond), 96-(colourMultiplier*colourMultiplierSecond), 53-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}
