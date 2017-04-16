var blob;
var blobs = [];
var zoom = 1;
var surroundblobs = [];
var splitblobs = [];
var enemy = [];
var trees = [];
var rocks = [];
var bullets = [];
var waveMultiplier = 1;
var sizeMultiplier = 1;
var walls = [];
var attackCounter = 0;
var attackSpeed = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  splitblobs[0] = new Blob(0, 0, 64);
  newWave();

  for (var i = 0; i < 5; i++){
      var x = random(-1000, 1000);
      var y = random(-1000, 1000);
      trees[i] = new Tree(x, y, 128);
  }

  for (var i = 0; i < 5; i++){
      var x = random(-1000, 1000);
      var y = random(-1000, 1000);
      rocks[i] = new Rock(x, y, 128);
  }

  for (var i = 0; i < 5; i++)
  {
    var x = 0 + 128*(sin(54 * i));
    var y = 0 + 128*(cos(54 * i));
    surroundblobs[i] = new AllyBlob(x, y, 32);
  }
}

function draw() {
  background(180, 213, 83);
  strokeWeight(0);
  var mouseXpos = mouseX-width/2;
  var mouseYpos = mouseY-height/2;
  translate(width/2, height/2);
  var newzoom = 64/splitblobs[0].r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-splitblobs[0].pos.x, -splitblobs[0].pos.y);

  push();
  fill(255, 213, 83);
  rect(-1000, -1000, 2000, 2000);
  pop();
  strokeWeight(1);
  for (var i = -1000; i < 1000; i+=40) {
    stroke(168, 200, 73);
    line(-1000, i, 1000, i);
  }
  for (var i = -1000; i < 1000; i+=40) {
    line(i, -1000, i, 1000);
  }
  push();
  //translate to get center pos to center of character
  translate((splitblobs[0].pos.x + splitblobs[0].r/2), (splitblobs[0].pos.y + splitblobs[0].r*0.3));
  //rotate towards mouse
  var math = atan2(mouseXpos, -(mouseYpos));

  rotate(math);
  //translate the object back to orig coords
  translate(-(splitblobs[0].pos.x + splitblobs[0].r/2), -(splitblobs[0].pos.y + splitblobs[0].r*0.3));
  //console.log(splitblobs[0].pos.y);
  for (var i = 0; i < splitblobs.length; i++) {
    splitblobs[i].show();
    splitblobs[i].update();
    splitblobs[i].constrain();
  }
  pop();
  for (var i = 0; i < enemy.length; i++) {
    enemy[i].show();
    enemy[i].update(splitblobs[0]);
    if (enemy[i].health <= 0)
    {
      enemy.splice(i,1);
    }
  }

  for (var i = 0; i < trees.length; i++) {
    trees[i].show();
    rocks[i].show();
  }

  spawnEnemies();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].update();
  }

  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
    walls[i].update();
  }
  if (enemy.length == 0)
  {
    waveMultiplier += 0.1;
    sizeMultiplier += 0.1;
    newWave();
  }
  if (attackCounter < attackSpeed)
  {
    attackCounter++;
  }

  if (keyIsDown(32) || mouseIsPressed)
  {
    //console.log(attackCounter);
    splitblobs[0].attack();
    //attackCounter = 0;
  }
  var valX = 0;
  var valY = 0;
  var speed = 3;

  if (keyIsDown(87))
  {
    valY -= 1;
  }
  if (keyIsDown(83))
  {
    valY += 1;
  }
  if (keyIsDown(65))
  {
    valX -= 1;
  }
  if (keyIsDown(68))
  {
    valX += 1;
  }

  if (dist(splitblobs[0].pos.x + valX*speed, splitblobs[0].pos.y + valY*speed, trees[i].pos.x, trees[i].pos.y) < trees[i].r)
    splitblobs[0].vel = createVector( valX * speed , valY * speed);
}
function keyRelease()
{
  splitblobs[0].vel = createVector(0,0);
}
function keyPressed() {

  if (keyCode == ENTER)
  {
    walls[walls.length] = new Wall(splitblobs[0].pos.x, splitblobs[0].pos.y, 32);
  }

}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function spawnEnemies(){

}

function newWave(){
  for (var i = 0; i < 2*waveMultiplier; i++){
      var x = random(-1000, 1000);
      var y = random(-1000, 1000);
      enemy[i] = new Enemy(random(-1000, 1000), random(-1000, 1000), random(64*sizeMultiplier, 128*sizeMultiplier));
  }
}
