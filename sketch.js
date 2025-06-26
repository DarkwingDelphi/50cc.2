
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("50cc loaded successfully!", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30);
  text("50cc loaded successfully!", width / 2, height / 2);
}
