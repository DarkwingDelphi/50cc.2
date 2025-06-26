
let player;
let speed = 5;
let distance = 0;
let gameOver = false;
let doors = [];
let bgHue = 0;
let version = "v1.6.0";

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createVector(width / 2, height - 60);
  textAlign(CENTER, CENTER);
  textSize(24);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  if (gameOver) {
    background(0);
    fill(0, 0, 100);
    text("You touched the d00r", width / 2, height / 2);
    text("Tap to restart", width / 2, height / 2 + 40);
    return;
  }

  drawBackground();
  drawPlayer();
  drawDoors();
  updateGame();

  fill(0, 0, 100);
  text("Distance: " + distance + " miles", width / 2, 30);
  text(version, width - 60, height - 30);
}

function drawBackground() {
  bgHue = (bgHue + 0.2) % 360;
  background(bgHue, 80, 30);
}

function drawPlayer() {
  fill(60, 100, 100);
  text("c50c", player.x, player.y);
}

function drawDoors() {
  fill(300, 100, 100);
  for (let i = doors.length - 1; i >= 0; i--) {
    text("d00r", doors[i].x, doors[i].y);
    doors[i].y += speed;

    if (dist(player.x, player.y, doors[i].x, doors[i].y) < 20) {
      gameOver = true;
    }

    if (doors[i].y > height + 40) {
      doors.splice(i, 1);
    }
  }
}

function updateGame() {
  if (frameCount % 60 === 0) {
    distance++;
    if (distance % 100 === 0) {
      bgHue = (bgHue + 60) % 360;
    }
    if (random(1) < 0.5) {
      doors.push(createVector(random(50, width - 50), -20));
    }
  }
}

function mousePressed() {
  if (gameOver) {
    resetGame();
  } else {
    player.x += 40;
    if (player.x > width) player.x = width;
  }
}

function touchStarted() {
  mousePressed();
  return false;
}

function resetGame() {
  player = createVector(width / 2, height - 60);
  distance = 0;
  doors = [];
  gameOver = false;
  bgHue = 0;
}
