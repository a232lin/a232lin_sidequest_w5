class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;

    this.camLerp = json.camera?.lerp ?? 0.12;

    // Generate flowers
    this.flowers = [];

    for (let i = 0; i < 350; i++) {
      this.flowers.push({
        x: random(this.w),
        y: random(this.h),
        size: random(6, 14),
        offset: random(TWO_PI),
        col: random([
          [255, 182, 193], // pink
          [255, 223, 100], // yellow
          [200, 180, 255], // lavender
          [255, 160, 122], // coral
        ]),
      });
      // Rare smiley faces scattered across the world
      this.smileys = [];
      for (let i = 0; i < 25; i++) {
        // only 5 smileys → rare
        this.smileys.push({
          x: random(200, this.w - 200),
          y: random(200, this.h - 200),
          discovered: false,
        });
      }
    }
  }

  // Soft screen background
  drawBackground() {
    background(171, 214, 172); // #ABD6AC base
  }

  // Meadow world
  drawWorld() {
    noStroke();

    // Dark green base
    fill(110, 170, 110);
    rect(0, 0, this.w, this.h);

    // Soft lighter glow in center
    let centerX = this.w / 2;
    let centerY = this.h / 2;

    fill(171, 214, 172, 180);
    ellipse(centerX, centerY, this.w * 0.9, this.h * 0.9);

    fill(171, 214, 172, 120);
    ellipse(centerX, centerY, this.w * 0.6, this.h * 0.6);

    this.drawFlowers();
    this.drawSmileys(player);
  }

  drawFlowers() {
    noStroke();

    for (let f of this.flowers) {
      let floatY = sin(frameCount * 0.02 + f.offset) * 2;

      push();
      translate(f.x, f.y + floatY);

      // Draw 5 petals
      let petalCount = 5;
      let radius = f.size / 2;

      fill(...f.col);
      for (let i = 0; i < petalCount; i++) {
        let angle = (TWO_PI / petalCount) * i;
        let petalX = cos(angle) * radius;
        let petalY = sin(angle) * radius;

        // Slightly elongated ellipse for natural petal shape
        ellipse(petalX, petalY, radius, radius * 1.2);
      }

      // Draw flower center
      fill(255, 240, 150);
      ellipse(0, 0, radius, radius);

      pop();
    }
  }
  drawSmileys(player) {
    for (let s of this.smileys) {
      // Reveal if player is nearby
      let distance = dist(player.x, player.y, s.x, s.y);
      if (distance < 200) s.discovered = true;

      if (s.discovered) {
        push();
        translate(s.x, s.y);

        // Body
        noStroke();
        fill(255, 200, 0); // yellow
        ellipse(0, 0, 25);

        // Eyes
        fill(0);
        ellipse(-5, -3, 4, 4);
        ellipse(5, -3, 4, 4);

        // Smile
        noFill();
        stroke(0);
        strokeWeight(1.5);
        arc(0, 2, 12, 6, 0, PI);

        pop();
      }
    }
  }
}
