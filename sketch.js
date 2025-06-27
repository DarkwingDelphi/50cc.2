let player;
let doors = [];
let distance = 0;
let version = "v1.6.1";
let touchX = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
}

function draw() {
  background(0);

  distance += 0.02;
  fill(255);
  textSize(16);
  text("Distance: " + int(distance) + " miles", 10, 20);
  text(version, 10, 40);

  player.update();
  player.show();

  if (frameCount % 60 === 0) {
    doors.push(new Door());
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].show();
    if (doors[i].hits(player)) {
      noLoop();
      textSize(32);
      textAlign(CENTER, CENTER);
      fill(255, 0, 0);
      text("You touched the d00r!", width / 2, height / 2);
    }
    if (doors[i].offscreen()) {
      doors.splice(i, 1);
    }
  }

  let bgIntensity = map(distance % 100, 0, 100, 0, 255);
  fill(bgIntensity, 10);
  rect(0, 0, width, height);
}

function touchMoved() {
  player.x = mouseX;
  return false;
}

function mouseDragged() {
  player.x = mouseX;
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 20;
  }

  update() {}

  show() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("c50c", this.x, this.y);
  }
}

class Door {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = random(20, 50);
    this.hue = random(360);
  }

  update() {
    this.y += 3;
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 80, 100);
    textAlign(CENTER, CENTER);
    textSize(this.size / 2);
    text("d00r", this.x, this.y);
  }

  hits(player) {
    return dist(this.x, this.y, player.x, player.y) < this.size / 2;
  }

  offscreen() {
    return this.y > height + 20;
  }
}
