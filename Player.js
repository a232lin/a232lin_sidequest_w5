class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  updateInput() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.speed; // A
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += this.speed; // D
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= this.speed; // W
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.speed; // S
  }

  draw() {
    push();
    translate(this.x, this.y);

    // Body
    noStroke();
    fill(255, 165, 0); // orange
    ellipse(0, 0, 30);

    // Eyes (oval)
    fill(255);
    ellipse(-6, -5, 6, 10); // left
    ellipse(6, -5, 6, 10); // right

    fill(0);
    ellipse(-6, -5, 3, 6); // left pupil
    ellipse(6, -5, 3, 6); // right pupil

    // Smiling mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 3, 15, 10, 0, PI); // smile

    pop();
  }
}
