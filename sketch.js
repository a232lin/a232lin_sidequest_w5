/*
Week 5 — Example 4: Data-driven world with JSON + Smooth Camera

Course: GBDA302 | Instructors: Dr. Karen Cochrane & David Han
Date: Feb. 12, 2026

Move: WASD/Arrows

Learning goals:
- Extend the JSON-driven world to include camera parameters
- Implement smooth camera follow using interpolation (lerp)
- Separate camera behavior from player/world logic
- Tune motion and feel using external data instead of hard-coded values
- Maintain player visibility with soft camera clamping
- Explore how small math changes affect “game feel”
*/

const VIEW_W = 800;
const VIEW_H = 480;

let worldData;
let level;
let player;

let camX = 0;
let camY = 0;

function preload() {
  worldData = loadJSON("world.json");
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");
  textSize(14);

  level = new WorldLevel(worldData);

  const start = worldData.playerStart;
  player = new Player(start.x, start.y, start.speed);

  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function draw() {
  player.updateInput();

  // Keep player inside world
  player.x = constrain(player.x, 0, level.w);
  player.y = constrain(player.y, 0, level.h);

  // Target camera
  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  const maxCamX = max(0, level.w - width);
  const maxCamY = max(0, level.h - height);

  targetX = constrain(targetX, 0, maxCamX);
  targetY = constrain(targetY, 0, maxCamY);

  camX = lerp(camX, targetX, level.camLerp);
  camY = lerp(camY, targetY, level.camLerp);

  // Draw sky
  level.drawBackground();

  // Draw world
  push();
  translate(-camX, -camY);
  level.drawWorld();
  player.draw();
  pop();
  drawUI(); // draws instructions
}
function drawUI() {
  noStroke();

  // Soft transparent background panel
  fill(255, 255, 255, 180);
  rect(20, 20, 310, 70, 12);

  fill(60);
  textSize(14);
  textAlign(LEFT);

  text("Use WASD / Arrow Keys to Move Around >.>", 35, 45);

  textSize(14);
  text("Flower Field Adventure!", 35, 70);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    const start = worldData.playerStart;
    player = new Player(start.x, start.y, start.speed);
  }
}
