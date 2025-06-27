<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>50cc Vanilla JS</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #000;
      overflow: hidden;
    }
    canvas {
      display: block;
      background: #111;
    }
    #overlay {
      position: absolute;
      top: 10px;
      left: 10px;
      color: white;
      font-family: monospace;
      font-size: 14px;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div id="overlay">Score: 0 miles</div>
  <canvas id="gameCanvas"></canvas>
  <script src="game.js"></script>
</body>
</html>
