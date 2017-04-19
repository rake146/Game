var rectWidth = 65;
function RangedEnemy(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);
  this.health = 20;
  this.maxhp = 20;
  this.attackrate = 30;
  this.attackCounter = 0;
  this.update = function (player) {
    if(this.attackCounter < this.attackrate)
      this.attackCounter++;
    var newvel = createVector(player.pos.x + random(30) - this.pos.x, player.pos.y + random(30) - this.pos.y);
    newvel.setMag(1);
    //this.vel.lerp(newvel, 1);
    if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 100)
    {
      if (this.attackCounter < this.attackSpeed)
      {
        this.attackCounter++;
      }
      if (this.attackCounter == 30 && player.health > 0)
      {
        this.attackCounter = 0;
        player.health--;
      }

      newvel = createVector(0,0);
    }

    this.pos.add(newvel);
  }
  this.attack = function(){
    if (this.attackCounter >= this.attackrate)
    {
      //translate the object back to orig coords
      enemyBullets[enemyBullets.length] = new EnemyBullet(this.pos.x, this.pos.y, this.r/6, mouseX-width/2, mouseY-height/2);
      //bullets[bullets.length] = new Bullet(playerX + this.r*cos(angle - PI/2), playerY + this.r*sin(angle - PI/2), this.r/6, mouseX-width/2, mouseY-height/2);
      //console.log(angle);
      this.attackCounter = 0;
    }
  }
  this.show = function() {
    fill(155-(colourMultiplier*colourMultiplierSecond), 184-(colourMultiplier*colourMultiplierSecond), 74-(colourMultiplier*colourMultiplierSecond));
    stroke(87-(colourMultiplier*colourMultiplierSecond), 96-(colourMultiplier*colourMultiplierSecond), 53-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(3);
    textSize(16);
    rect(this.pos.x - this.r/8, this.pos.y, this.r/4, this.r);
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
