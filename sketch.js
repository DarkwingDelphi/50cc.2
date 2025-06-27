const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Player state
let player = {
  x: width / 2,
  y: height - 50,
  size: 20,
  speed: 5
};

// Distance tracking
let distance = 0;

// Obstacles
let obstacles = [];

// Background state
let bgShade = 0;
let bgIncreasing = true;
let lastBgUpdate = 0;

// Input
let inputLeft = false;
let inputRight = false;

// Handle resize
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Keyboard controls
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') inputLeft = true;
  if (e.key === 'ArrowRight') inputRight = true;
});
window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') inputLeft = false;
  if (e.key === 'ArrowRight') inputRight = false;
});

// Touch controls
canvas.addEventListener('touchstart', e => {
  const touchX = e.touches[0].clientX;
  if (touchX < width / 2) {
    inputLeft = true;
  } else {
    inputRight = true;
  }
});
canvas.addEventListener('touchend', () => {
  inputLeft = false;
  inputRight = false;
});

// Game loop
function loop(timestamp) {
  update(timestamp);
  render();
  requestAnimationFrame(loop);
}

function update(timestamp) {
  // Move player
  if (inputLeft) player.x -= player.speed;
  if (inputRight) player.x += player.speed;

  // Keep within bounds
  if (player.x < 0) player.x = 0;
  if (player.x > width - player.size) player.x = width - player.size;

  // Update distance
  distance += 0.05;
  document.getElementById('overlay').innerText = `Score: ${Math.floor(distance)} miles`;

  // Update background every 100 miles
  if (Math.floor(distance / 100) !== Math.floor(lastBgUpdate / 100)) {
    bgShade = (bgShade + 30) % 255;
    lastBgUpdate = distance;
  }

  // Move obstacles
  obstacles.forEach(o => o.y += o.speed);

  // Remove off-screen obstacles
  obstacles = obstacles.filter(o => o.y < height + 50);

  // Spawn new obstacles
  if (Math.random() < 0.02) {
    obstacles.push({
      x: Math.random() * (width - 40),
      y: -20,
      size: 20,
      speed: 2 + Math.random() * 2
    });
  }

  // Collision detection
  obstacles.forEach(o => {
    if (
      player.x < o.x + o.size &&
      player.x + player.size > o.x &&
      player.y < o.y + o.size &&
      player.y + player.size > o.y
    ) {
      alert('You touched the door!');
      distance = 0;
      obstacles = [];
    }
  });
}

function render() {
  // Background
  ctx.fillStyle = `rgb(${bgShade},${bgShade},${bgShade})`;
  ctx.fillRect(0, 0, width, height);

  // Player
  ctx.fillStyle = '#fff';
  ctx.font = '20px monospace';
  ctx.fillText('c50c', player.x, player.y);

  // Obstacles
  ctx.fillStyle = '#0f0';
  obstacles.forEach(o => {
    ctx.font = '20px monospace';
    ctx.fillText('d00r', o.x, o.y);
  });
}

// Start the loop
loop();
