
function Bullet(x, y, r, mouseXpos, mouseYpos) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function () {
    //if (playerposy > 0)
    var extrapX = (2000/mouseX-width/2);
    var extrapY = (2000/mouseY-height/2);
    var newvel = createVector(((mouseXpos)*50 - this.pos.x), ((mouseYpos)*50 - this.pos.y));

    newvel.setMag(6);
    //this.vel.lerp(newvel, 1);
    this.pos.add(newvel);
    //console.log(playerposy);

    for (var i = 0; i < enemy.length; i++) {
      if (dist(enemy[i].pos.x, enemy[i].pos.y, this.pos.x, this.pos.y) < enemy[i].r/2)
      {
        enemy[i].r -= 5;
        //enemy[i].vel = createVector((splitblobs[0].pos.x - this.pos.x), (splitblobs[0].pos.y - this.pos.y));
        bullets.splice(this, 1);
      }
      if (enemy[i].r <= 48)
      {
        enemy.splice(i,1);
      }
    }
    if (this.pos.x < -1000 || this.pos.x > 1000 || this.pos.y < -1000 || this.pos.y > 1000)
    {
      bullets.splice(this, 1);
    }
  }
  this.show = function() {

    fill(155, 184, 74);
    stroke(87, 96, 53);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}
