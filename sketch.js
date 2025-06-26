
let carImage;
let player;
let doors = [];
let gameOver = false;
let miles = 0;
let doorTimer = 0;
let backgroundElements = [];
let milestoneInterval = 100;
let milestoneCount = 0;
let bgTypes = ["circles", "lines", "waves"];
let currentBgTypeIndex = 0;
let bgTheme = [];
let nextThemeSwitch = milestoneInterval;

function preload() {
  carImage = loadImage("https://upload.wikimedia.org/wikipedia/commons/5/59/Go-kart_racing_official_2.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    x: width / 2,
    y: height - 100,
    targetX: width / 2
  };
  bgTheme = [random(bgTypes)];
}

function draw() {
  background(0);

  // Background logic
  drawProceduralBackground();

  // Player
  imageMode(CENTER);
  player.x = lerp(player.x, player.targetX, 0.1);
  image(carImage, player.x, player.y, 60, 60);
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(player.x, player.y, 60, 60);

  if (!gameOver) {
    miles += deltaTime / 100;
    doorTimer += deltaTime;

    if (doorTimer > 1500) {
      doors.push({ x: random(50, width - 50), y: -20 });
      doorTimer = 0;
    }

    for (let i = doors.length - 1; i >= 0; i--) {
      let d = doors[i];
      d.y += 3;
      fill((i * 30) % 255, 100, 100);
      rect(d.x, d.y, 30, 30);
      stroke(255);
      noFill();
      rect(d.x, d.y, 30, 30);

      if (dist(player.x, player.y, d.x, d.y) < 45) {
        gameOver = true;
      }

      if (d.y > height + 30) {
        doors.splice(i, 1);
      }
    }

    if (miles > milestoneCount * milestoneInterval) {
      milestoneCount++;
      let type = random(bgTypes);
      bgTheme.push(type);
    }
  } else {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(32);
    text("Game Over - Press Any Key", width / 2, height / 2);
  }

  fill(255);
  textSize(16);
  text("Miles: " + int(miles), width - 100, 20);
}

function keyPressed() {
  if (gameOver) {
    gameOver = false;
    miles = 0;
    doors = [];
    milestoneCount = 0;
    bgTheme = [random(bgTypes)];
  }
  if (keyCode === LEFT_ARROW) player.targetX -= 50;
  if (keyCode === RIGHT_ARROW) player.targetX += 50;
}

function drawProceduralBackground() {
  for (let i = 0; i < milestoneCount; i++) {
    let t = bgTheme[i];
    let intensity = constrain((miles - i * milestoneInterval) / milestoneInterval, 0, 1);

    if (t === "circles") {
      noStroke();
      fill(0, 0, 255, 50 * intensity);
      ellipse(width / 2, height / 2, 200 * intensity);
    } else if (t === "lines") {
      stroke(255, 0, 0, 50 * intensity);
      for (let j = 0; j < 10; j++) {
        let x = map(j, 0, 10, 0, width);
        line(x, 0, x, height);
      }
    } else if (t === "waves") {
      noFill();
      stroke(0, 255, 0, 50 * intensity);
      beginShape();
      for (let x = 0; x < width; x += 10) {
        vertex(x, height / 2 + sin(x * 0.01 + frameCount * 0.05) * 50 * intensity);
      }
      endShape();
    }
  }
}
