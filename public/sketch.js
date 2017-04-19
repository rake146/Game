var blob;
var blobs = [];
var zoom = 1;
var gameover = false;
var surroundblobs = [];
var splitblobs = [];
var enemy = [];
var trees = [];
var gameEntered = false;
var rocks = [];
var bullets = [];
var waveMultiplier = 1;
var sizeMultiplier = 1;
var walls = [];
var attackCounter = 0;
var attackSpeed = 20;
var skillpointsHP = 0;
var skillpointsDmg = 0;
var skillpointsAtSp = 0;
var skillpointsRegen = 0;
var remainingSkillPoints = 10;
var wave = 0;
var rangedEnemy = [];
var enemyBullets = [];
var timeTilInvasion = 60;
var millitimer = 60;
var timerInitiated = false;
var colourMultiplier = 30-timeTilInvasion;
var colourMultiplierSecond = 0;
var opacityMultiplier = 0;
var backgroundOverlay;
function setup() {
  createCanvas(windowWidth, windowHeight);

  var colourMultiplier = 30-timeTilInvasion;
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

  //newWave();

  for (var i = 0; i < 5; i++)
  {
    var x = 0 + 128*(sin(54 * i));
    var y = 0 + 128*(cos(54 * i));
    surroundblobs[i] = new AllyBlob(x, y, 32);
  }
}

function draw() {

  if (gameEntered == true)
  {
    if (timeTilInvasion < 15)
      opacityMultiplier = 4;
    else {
      opacityMultiplier = 0;
    }
    colourMultiplier = 30-timeTilInvasion;
    if (millitimer > 0)
      millitimer--;
    else {
      if (timeTilInvasion > 0)
        timeTilInvasion--;
      millitimer = 60;
    }

    background(108-(colourMultiplier*colourMultiplierSecond), 130-(colourMultiplier*colourMultiplierSecond), 85-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(0);
    var mouseXpos = mouseX-width/2;
    var mouseYpos = mouseY-height/2;
    translate(width/2, height/2);
    var newzoom = 64/splitblobs[0].r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-splitblobs[0].pos.x, -splitblobs[0].pos.y);

    push();
    fill(118-(colourMultiplier*colourMultiplierSecond), 143-(colourMultiplier*colourMultiplierSecond), 90-(colourMultiplier*colourMultiplierSecond));
    strokeWeight(2);
    stroke(102,123,81);
    for (var i = -2000; i < 2000; i+=40) {
      //stroke(112-(colourMultiplier*colourMultiplierSecond), 135-(colourMultiplier*colourMultiplierSecond), 86-(colourMultiplier*colourMultiplierSecond));
      line(-2000, i, 2000, i);
    }
    for (var i = -2000; i < 2000; i+=40) {
      line(i, -2000, i, 2000);
    }

    rect(-1000, -1000, 2000, 2000);
    pop();
    strokeWeight(2);
    stroke(112,135,86);
    for (var i = -1000; i < 1000; i+=40) {
      if (i < -1000 || i > 1000)
        stroke(0,0,0);
      else {
          stroke(112,135,86);
      }
      //stroke(112-(colourMultiplier*colourMultiplierSecond), 135-(colourMultiplier*colourMultiplierSecond), 86-(colourMultiplier*colourMultiplierSecond));
      line(-1000, i, 1000, i);
    }
    for (var i = -1000; i < 1000; i+=40) {
      if (i < -1000 || i > 1000)
        stroke(0,0,0);
      else {
        stroke(112,135,86);
      }
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
    push();
    for (var i = 0; i < rangedEnemy.length; i++) {
      var centerOfRangedX = rangedEnemy[i].pos.x + rangedEnemy[i].r/2;
      var centerOfRangedY = rangedEnemy[i].pos.y + rangedEnemy[i].r/2;
      var centerOfPlayerX = splitblobs[0].pos.x + splitblobs[0].r/2;
      var centerOfPlayerY = splitblobs[0].pos.y + splitblobs[0].r*0.3;
      //translate to get center pos to center of character

      translate(centerOfRangedX, centerOfRangedY);

      var math = atan2(centerOfRangedX - centerOfPlayerX, - centerOfRangedY + centerOfPlayerY);

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
      rocks[i].show();
      trees[i].show();
    }

    spawnEnemies();

    for (var i = 0; i < walls.length; i++) {
      walls[i].show();
      walls[i].update();
    }
    if (enemy.length == 0)
    {

      if (timerInitiated == false)
      {
        timeTilInvasion = 30;
        timerInitiated = true;
      }
      if (timeTilInvasion == 0)
      {
        waveMultiplier += 0.1;
        sizeMultiplier += 0.1;
        timerInitiated = false;
        newWave();
      }
      for (var i = 0; i < rangedEnemy.length; i++) {
        rangedEnemy.splice(i, 1);
      }
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
    text("Timer " + timeTilInvasion, splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y - windowHeight/2 + 60);
    strokeWeight(1);
    fill(0, 0, 0);


    drawSkillPoints();
    drawXPBar();
    push();
    //translate to get center pos to center of character
    translate((splitblobs[0].pos.x), (splitblobs[0].pos.y));
    //rotate towards mouse
    var mathFirst = atan2(mouseXpos, -(mouseYpos));

    rotate(mathFirst);
    //translate the object back to orig coords
    translate(-(splitblobs[0].pos.x), -(splitblobs[0].pos.y));
    //console.log(splitblobs[0].pos.y);
    for (var i = 0; i < splitblobs.length; i++) {
      splitblobs[i].show();
      splitblobs[i].update();
      splitblobs[i].constrain();
    }
    pop();
    if (keyIsDown(32) || mouseIsPressed)
    {
      //console.log(attackCounter);
      splitblobs[0].attack(mathFirst);
      //attackCounter = 0;
    }
    for (var j = 0; j < bullets.length; j++) {
      bullets[j].show();
      bullets[j].update(mathFirst);
    }
    for (var j = 0; j < enemyBullets.length; j++) {
      enemyBullets[j].show();
      enemyBullets[j].update(mathFirst);
    }
    fill(0,0,0,0+(colourMultiplier * opacityMultiplier));
    rect(-2000,-2000,4000, 4000);
    for (var i = 0; i < rangedEnemy.length; i++) {
      rangedEnemy[i].attack();
    }
  }
  }

  function keyRelease()
  {
    splitblobs[0].vel = createVector(0,0);
  }
  function keyPressed() {
    if (keyCode == 49)
    {
      if (skillpointsAtSp < 6 && remainingSkillPoints > 0)
      {
        skillpointsAtSp++;
        remainingSkillPoints--;
      }

    }
    if (keyCode == 50)
    {
      if (skillpointsDmg < 6 && remainingSkillPoints > 0)
      {
        skillpointsDmg++;
        remainingSkillPoints--;
      }
    }
    if (keyCode == 52)
    {
      if (skillpointsHP < 6 && remainingSkillPoints > 0)
      {
        skillpointsHP++;
        remainingSkillPoints--;
      }
    }
    if (keyCode == 51)
    {
      if (skillpointsRegen < 6 && remainingSkillPoints > 0)
      {
        skillpointsRegen++;
        remainingSkillPoints--;
      }
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
        rangedEnemy[i] = new RangedEnemy(random(-1000, 1000), random(-1000, 1000), 64);
    }
    wave++;
  }
  function drawSkillPoints(){
    fill(51);
    stroke(53,53,77);
    strokeWeight(2);
    textSize(12);

    rect(splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y + windowHeight/2 - 60, 150, 15, 15);
    fill(255);
    textAlign(CENTER);
    text("Max Health", splitblobs[0].pos.x - windowWidth/2 + 10+75, splitblobs[0].pos.y + windowHeight/2 - 49);
    text("[4]", splitblobs[0].pos.x - windowWidth/2 + 10+75+85, splitblobs[0].pos.y + windowHeight/2 - 49);
    for (var i = 0; i < skillpointsHP; i++) {
      fill(103,104,81);
      if (i == 0)
      {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 59, 20, 13, 15, 0, 0, 15);
      }
      else if(i == 5)
      {
        rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 59, 20, 13);
      }
      else {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 59, 20, 13)
      }

    }
    fill(153, 216, 17);
    rect(splitblobs[0].pos.x - windowWidth/2 + 12 + 120, splitblobs[0].pos.y + windowHeight/2 - 59, 25, 13, 0, 15, 15, 0);
    fill(51);
    rect(splitblobs[0].pos.x - windowWidth/2 + 142, splitblobs[0].pos.y + windowHeight/2 - 53, 7, 1);
    rect(splitblobs[0].pos.x - windowWidth/2 + 145, splitblobs[0].pos.y + windowHeight/2 - 56, 1, 7);
    //text("Timer " + timeTilInvasion, splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y - windowHeight/2 + 60);

    fill(51);
    stroke(53,53,77);
    strokeWeight(2);
    textSize(12);

    rect(splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y + windowHeight/2 - 80, 150, 15, 15);
    fill(255);
    textAlign(CENTER);
    text("Health Regen", splitblobs[0].pos.x - windowWidth/2 + 10+75, splitblobs[0].pos.y + windowHeight/2 - 69);
    text("[3]", splitblobs[0].pos.x - windowWidth/2 + 10+75+85, splitblobs[0].pos.y + windowHeight/2 - 69);
    for (var i = 0; i < skillpointsRegen; i++) {
      fill(103,104,81);
      if (i == 0)
      {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 79, 20, 13, 15, 0, 0, 15);
      }
      else if(i == 5)
      {
        rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 79, 20, 13);
      }
      else {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 79, 20, 13)
      }

    }
    fill(57, 123, 229);
    rect(splitblobs[0].pos.x - windowWidth/2 + 12 + 120, splitblobs[0].pos.y + windowHeight/2 - 79, 25, 13, 0, 15, 15, 0);
    fill(51);
    rect(splitblobs[0].pos.x - windowWidth/2 + 142, splitblobs[0].pos.y + windowHeight/2 - 73, 7, 1);
    rect(splitblobs[0].pos.x - windowWidth/2 + 145, splitblobs[0].pos.y + windowHeight/2 - 76, 1, 7);



    fill(51);
    stroke(53,53,77);
    strokeWeight(2);
    textSize(12);

    rect(splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y + windowHeight/2 - 100, 150, 15, 15);
    fill(255);
    textAlign(CENTER);
    text("Attack Damage", splitblobs[0].pos.x - windowWidth/2 + 10+75, splitblobs[0].pos.y + windowHeight/2 - 89);
    text("[2]", splitblobs[0].pos.x - windowWidth/2 + 10+75+85, splitblobs[0].pos.y + windowHeight/2 - 89);
    for (var i = 0; i < skillpointsDmg; i++) {
      fill(103,104,81);
      if (i == 0)
      {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 99, 20, 13, 15, 0, 0, 15);
      }
      else if(i == 5)
      {
        rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 99, 20, 13);
      }
      else {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 99, 20, 13)
      }

    }
    fill(237, 33, 94);
    rect(splitblobs[0].pos.x - windowWidth/2 + 12 + 120, splitblobs[0].pos.y + windowHeight/2 - 99, 25, 13, 0, 15, 15, 0);
    fill(51);
    rect(splitblobs[0].pos.x - windowWidth/2 + 142, splitblobs[0].pos.y + windowHeight/2 - 93, 7, 1);
    rect(splitblobs[0].pos.x - windowWidth/2 + 145, splitblobs[0].pos.y + windowHeight/2 - 96, 1, 7);


    rect(splitblobs[0].pos.x - windowWidth/2 + 10, splitblobs[0].pos.y + windowHeight/2 - 120, 150, 15, 15);
    fill(255);
    textAlign(CENTER);
    text("Attack Speed", splitblobs[0].pos.x - windowWidth/2 + 10+75, splitblobs[0].pos.y + windowHeight/2 - 109);
    text("[1]", splitblobs[0].pos.x - windowWidth/2 + 10+75+85, splitblobs[0].pos.y + windowHeight/2 - 109);
    for (var i = 0; i < skillpointsAtSp; i++) {
      fill(103,104,81);
      if (i == 0)
      {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 119, 20, 13, 15, 0, 0, 15);
      }
      else if(i == 5)
      {
        rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 119, 20, 13);
      }
      else {
          rect(splitblobs[0].pos.x - windowWidth/2 + 12 + i*10+10*i, splitblobs[0].pos.y + windowHeight/2 - 119, 20, 13)
      }

    }
    fill(234, 172, 150);
    rect(splitblobs[0].pos.x - windowWidth/2 + 12 + 120, splitblobs[0].pos.y + windowHeight/2 - 119, 25, 13, 0, 15, 15, 0);
    fill(51);
    rect(splitblobs[0].pos.x - windowWidth/2 + 142, splitblobs[0].pos.y + windowHeight/2 - 113, 7, 1);
    rect(splitblobs[0].pos.x - windowWidth/2 + 145, splitblobs[0].pos.y + windowHeight/2 - 116, 1, 7);

    fill(255);
    textSize(18);
    text("x" + remainingSkillPoints, splitblobs[0].pos.x - windowWidth/2 + 10+75+60, splitblobs[0].pos.y + windowHeight/2 - 130);
    splitblobs[0].name = document.getElementById('nameInput').value;

  }

function mousePressed(){
  var x = mouseX - width/2;
  var y = mouseY - height/2;

  if (dist(x, y, splitblobs[0].pos.x - windowWidth/2 + 142, splitblobs[0].pos.y + windowHeight/2 - 53) < 100)
    skillpoints++;
}
function drawXPBar(){
  stroke(53,53,77);
  fill(51);
  rect(splitblobs[0].pos.x - 150, splitblobs[0].pos.y + windowHeight/2 - 60, 300, 20, 15);

  //fill(34,103,214);
  textAlign(CENTER);
  textSize(16);
  fill(255);
  text("Level " + splitblobs[0].level, splitblobs[0].pos.x, splitblobs[0].pos.y + windowHeight/2 - 45);
  fill(34,103,214);
  noStroke();
  // Get fraction 0->1 and multiply it by width of bar
  var drawW = (splitblobs[0].currentXP / splitblobs[0].maxXP) * 300;
  rect(splitblobs[0].pos.x - 150, splitblobs[0].pos.y + windowHeight/2 - 60, drawW, 20, 15, 0, 0, 15);
  // Outline


  fill(255,255,255, 40)
  //rect(splitblobs[0].pos.x - 150, splitblobs[0].pos.y + windowHeight/2 - 60, 300, 15, 15);
}
function enterGame(){
  gameEntered = true;
  var elem = document.getElementById('nameInput');
  elem.style.display = "none";
  var elem2 = document.getElementById('menuButton');
  elem2.style.display = "none";
  var elem3 = document.getElementById('mainText');
  elem3.style.display = "none";
  var elem4 = document.getElementById('modal');
  elem4.style.display = "none";
  console.log(gameEntered);
}
