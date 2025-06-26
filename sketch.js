
let player;
let obstacles = [];
let score = 0;
let gameState = "start";
let version = "1.5.7";
let touchStartX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  score = 0;
}

function draw() {
  background(0);

  if (gameState === "start") {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Touch to Start
50cc v" + version, width / 2, height / 2);
  } else if (gameState === "play") {
    player.update();
    player.display();

    // Obstacle logic placeholder
    for (let obs of obstacles) {
      obs.update();
      obs.display();
    }

    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Miles: " + floor(score / 60), 10, 10);
    score++;
  } else if (gameState === "gameover") {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over
Touch to Restart", width / 2, height / 2);
  }
}

function touchStarted() {
  if (gameState === "start" || gameState === "gameover") {
    gameState = "play";
    score = 0;
    obstacles = [];
    player = new Player();
  } else {
    touchStartX = mouseX;
  }
}

function touchMoved() {
  if (gameState === "play") {
    if (mouseX < touchStartX) {
      player.move(-1);
    } else {
      player.move(1);
    }
  }
  return false;
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.size = 50;
  }

  update() {
    // Gravity and limits
    this.x = constrain(this.x, 0, width - this.size);
  }

  display() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  move(dir) {
    this.x += dir * 15;
  }
}

class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 40;
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}
