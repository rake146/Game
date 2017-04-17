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
var wave = 0;
var rangedEnemy = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  for (var i = 0; i < 5; i++){
    do{
      var x = random(-900, 900);
      var y = random(-900, 900);
      splitblobs[0] = new Blob(x, y, 64);
    }
    while(dist(x + 32, y + 64*0.3, trees[i].pos.x, trees[i].pos.y) < trees[i].r*2 && dist(x + 32, y + 64*0.3, rocks[i].pos.x, rocks[i].pos.y) < rocks[i].r);
  }
  newWave();

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

  //text("Wave " + wave, splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y - windowHeight/2 + 30);

  for (var i = 0; i < enemy.length; i++) {
    enemy[i].show();
    enemy[i].update(splitblobs[0]);
    if (enemy[i].health <= 0)
    {
      enemy.splice(i,1);
    }
  }
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].update();
  }
  push();
  for (var i = 0; i < rangedEnemy.length; i++) {
    var centerOfRangedX = rangedEnemy[i].pos.x + rangedEnemy[i].r/2;
    var centerOfRangedY = rangedEnemy[i].pos.y + rangedEnemy[i].r/2;
    var centerOfPlayerX = splitblobs[0].pos.x + splitblobs[0].r/2;
    var centerOfPlayerY = splitblobs[0].pos.y + splitblobs[0].r*0.3;
    //translate to get center pos to center of character

    translate(centerOfRangedX, centerOfRangedY);
    //rotate towards mouse
    var math = atan2(centerOfPlayerX -width/2, -(centerOfPlayerY -height/2));

    rotate(math);
    //translate the object back to orig coords
    translate(-centerOfRangedX, -centerOfRangedY);
    //console.log(splitblobs[0].pos.y);

    rangedEnemy[i].show();
    rangedEnemy[i].update(splitblobs[0]);
    if (rangedEnemy[i].health <= 0)
    {
      rangedEnemy.splice(i,1);
    }
  }
  pop();
  for (var i = 0; i < trees.length; i++) {
    trees[i].show();
    rocks[i].show();

  }

  spawnEnemies();

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

  var ableToMove = true;
  var centerOfCharX = splitblobs[0].pos.x + splitblobs[0].r/2;
  var centerOfCharY = splitblobs[0].pos.y + splitblobs[0].r*0.3;
  for (var i = 0; i < trees.length; i++) {
    if (dist(centerOfCharX + valX * speed, centerOfCharY + valY * speed, trees[i].pos.x, trees[i].pos.y) < trees[i].r)
      ableToMove = false;
  }
  for (var i = 0; i < rocks.length; i++) {
    if (dist(centerOfCharX + valX * speed, centerOfCharY + valY * speed, rocks[i].pos.x + rocks[i].r/2, rocks[i].pos.y + rocks[i].r/2) < rocks[i].r/2)
      ableToMove = false;
  }

  if (ableToMove)
  {
    splitblobs[0].vel = createVector( valX * speed , valY * speed);
  }
  else {
    var bounce = createVector(-splitblobs[0].vel.x, -splitblobs[0].vel.y);
    bounce.setMag(1);
    splitblobs[0].vel = bounce;
  }
  strokeWeight(1);
  fill(0, 0, 0);

  textSize(24);
  textStyle(BOLD);
  textFont("Ubuntu");
  fill(0, 0, 0);
  strokeWeight(0);
  textAlign(LEFT);
  text("Wave " + wave, splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y - windowHeight/2 + 30);
  strokeWeight(1);
  fill(0, 0, 0);
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

  if (keyIsDown(32) || mouseIsPressed)
  {
    //console.log(attackCounter);
    splitblobs[0].attack();
    //attackCounter = 0;
  }
  pop();


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
      rangedEnemy[i] = new RangedEnemy(random(-1000, 1000), random(-1000, 1000), 48);
  }
  wave++;
}
