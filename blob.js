//var health = 100;
var rectWidth = 65;
var playAnimation = false;
function Blob(x, y, r) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);
  this.health = 100;
  this.maxhp = 100;

  this.update = function () {
    this.vel.lerp(this.vel.y, 0, 0.1);

    this.pos.add(this.vel);
    if (!keyIsPressed)
    {
      this.vel = createVector(0,0);
    }

    fill(0);
  }

  this.constrain = function(){
      this.pos.x = constrain(this.pos.x, -1000-this.r/2, 1000-this.r/2);
      this.pos.y = constrain(this.pos.y, -1000-this.r*0.3, 1000-this.r*0.3);
  }
  this.attack = function(angle){
    //this.playAnimation();
    var mouseXpos = mouseX-width/2;
    var mouseYpos = mouseY-height/2;
    var playerX = this.pos.x - this.r/2;
    var playerY = this.pos.y - this.r*0.3;
    if (attackCounter >= attackSpeed)
    {
      //translate the object back to orig coords

      bullets[bullets.length] = new Bullet(playerX + this.r*cos(angle), playerY + this.r*sin(angle), this.r/6, mouseX-width/2, mouseY-height/2);
      //console.log(angle);
      attackspeed = (random(4,20));
      attackCounter = 0;
    }
  }
  this.show = function() {
    //hp bars
    fill(0, 255, 0);
    noStroke();
    // Get fraction 0->1 and multiply it by width of bar
    var drawWidth = (splitblobs[0].health / splitblobs[0].maxhp) * rectWidth;
    rect(splitblobs[0].pos.x, splitblobs[0].pos.y + 55, drawWidth, 5, 5);
    // Outline
    stroke(0);
    noFill();
    rect(splitblobs[0].pos.x, splitblobs[0].pos.y + 55, rectWidth, 5, 5);
    fill(211-(colourMultiplier*colourMultiplierSecond), 155, 232);
    strokeWeight(3);
    stroke(85-(colourMultiplier*colourMultiplierSecond), 67, 91);
    rect(this.pos.x + this.r/2 - this.r/8, this.pos.y + this.r*0.3 - this.r, this.r/4, this.r);
    fill(211-(colourMultiplier*colourMultiplierSecond), 155, 232);
    strokeWeight(3);
    stroke(85-(colourMultiplier*colourMultiplierSecond), 67, 91);
    rect(this.pos.x, this.pos.y, this.r, this.r*0.6, 10);
    fill(145-(colourMultiplier*colourMultiplierSecond), 53, 14);
    strokeWeight(1);

    //rect(this.pos.x - this.r/2, this.pos.y - this.r*0.4, this.r*0.6, this.r/6);

    strokeWeight(3);
    fill(211-(colourMultiplier*colourMultiplierSecond), 155-(colourMultiplier*colourMultiplierSecond), 232-(colourMultiplier*colourMultiplierSecond));
    ellipse(this.pos.x - this.r/6, this.pos.y + this.r/4, this.r/4, this.r/4);
    ellipse(this.pos.x + this.r/6 + this.r, this.pos.y + this.r/4, this.r/4, this.r/4);
    fill(0);
    stroke(0);
    ellipse(this.pos.x - this.r/4 + this.r, this.pos.y + this.r/4, this.r/4, this.r/4);
    ellipse(this.pos.x - this.r *0.75 + this.r, this.pos.y + this.r/4, this.r/4, this.r/4);
    strokeWeight(0);
    fill(255,255,255);
    ellipse(this.pos.x - this.r *0.75 + this.r, this.pos.y + this.r/5, this.r/5, this.r/5);
    ellipse(this.pos.x - this.r/4 + this.r, this.pos.y + this.r/5, this.r/5, this.r/5);
    //ellipse(this.pos.x + this.r/3, this.pos.y + this.r/3, this.r/3, this.r/3);
    //ellipse(this.pos.x - this.r/3, this.pos.y - this.r/3, this.r/3, this.r/3);
    stroke(0);
    strokeWeight(0);

  }
}
