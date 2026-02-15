class WorldLevel {
  constructor(data) {
    this.data = data;

    this.w = data.world.w;
    this.h = data.world.h;
    this.camLerp = data.camera.lerp;

    this.flowers = [];

    // Generate flowers
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
    }
  }

  drawBackground() {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(180, 225, 255), color(255, 245, 220), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld() {
    // Grass base
    noStroke();
    fill(126, 217, 87);
    rect(0, 0, this.w, this.h);

    this.drawFlowers();
    this.drawGrassSway();
  }

  drawFlowers() {
    noStroke();

    for (let f of this.flowers) {
      let floatY = sin(frameCount * 0.02 + f.offset) * 2;

      push();
      translate(f.x, f.y + floatY);

      fill(...f.col);
      ellipse(0, 0, f.size);

      fill(255, 240, 150);
      ellipse(0, 0, f.size / 2);

      pop();
    }
  }

  drawGrassSway() {
    stroke(100, 190, 100, 120);

    for (let i = 0; i < this.w; i += 25) {
      let sway = sin(frameCount * 0.01 + i * 0.1) * 6;
      line(i, this.h, i + sway, this.h - 35);
    }
  }
}
