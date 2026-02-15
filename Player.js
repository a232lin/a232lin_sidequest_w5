class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Bubble trail
    this.bubbles = [];
  }

  updateInput() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.speed; // A
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += this.speed; // D
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= this.speed; // W
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.speed; // S
  }

  draw() {
    this.updateBubbles();

    // Draw bubbles first
    this.drawBubbles();

    // Draw player on top
    push();
    translate(this.x, this.y);

    noStroke();
    fill("255, 165, 0"); // orange body
    ellipse(0, 0, 30);

    // Eyes
    fill(255);
    ellipse(-6, -5, 6, 10);
    ellipse(6, -5, 6, 10);

    fill(0);
    ellipse(-6, -5, 3, 6);
    ellipse(6, -5, 3, 6);

    // Smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 3, 15, 10, 0, PI);

    pop();
  }

  updateBubbles() {
    // Add new bubble at player position
    this.bubbles.push({
      x: this.x,
      y: this.y,
      alpha: 200,
      size: random(4, 10),
    });

    // Reduce alpha and remove old bubbles
    for (let b of this.bubbles) {
      b.alpha -= 3; // fade speed
    }
    this.bubbles = this.bubbles.filter((b) => b.alpha > 0); // keep visible bubbles
  }

  drawBubbles() {
    noStroke();
    for (let b of this.bubbles) {
      fill(200, 220, 255, b.alpha);
      ellipse(b.x, b.y, b.size);
    }
  }
}
