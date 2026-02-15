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

  drawUI(); // existing instructions
  drawEndSign(player); // <-- Add this here
}

function drawUI() {
  noStroke();

  // Soft transparent background panel
  fill(255, 255, 255, 180);
  rect(20, 20, 330, 70, 12);

  fill(60);
  textSize(14);
  textAlign(LEFT);

  text("Use WASD / Arrow Keys to Move Around >.>", 35, 45);

  textSize(14);
  text("Explore the flower field and meet more smileys!", 35, 70);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    const start = worldData.playerStart;
    player = new Player(start.x, start.y, start.speed);
  }
}

function drawEndSign(player) {
  // Trigger when player is within the last ~20% of width/height
  const nearRight = player.x > level.w * 0.8; // shows sooner
  const nearBottom = player.y > level.h * 0.8; // shows sooner

  if (nearRight || nearBottom) {
    push();
    resetMatrix(); // fixed on screen

    fill(255, 230, 180, 240);
    stroke(150, 100, 0);
    strokeWeight(2);

    // Move to bottom
    let rectY = height - 80; // top of rectangle
    let textY = height - 55; // text inside rectangle

    rect(width / 2 - 180, rectY, 360, 50, 10); // rectangle
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Almost at the end of the world! Go back!", width / 2, textY);

    pop();
  }
}
