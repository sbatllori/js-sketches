/**
 * Animated design of a bunch of arc bands moving in circles around the center
 * of the canvas.
 */

/******************************************************************************
 * Settings from libraries/soo/canvas_utils.js
 *****************************************************************************/
const capture = false;
SOO_LAST_CAPTURED_FRAME = 2000;

/******************************************************************************
 * Sketch
 *****************************************************************************/
let bgColor, arcBand;
const colors = [
  '#fac71e',
  '#fac8e6',
  '#c8e8fa',
  '#03a4ff',
  '#413696',
  '#106960',
  '#800f53',
  '#800f0f',
  '#383838',
];

function setup() {
  createCanvas(1080, 1080);
  frameRate(fps);

  bgColor = color(22);
  arcBands = [];

  // Define the arc bands
  // (diameter, width, arc, rotate, fill, stroke, strokeWidth, speed)
  addArcBand(450, 50, 90, -5, colors[3], colors[3], 5, -1);
  addArcBand(450, 30, 95, 180, colors[2], colors[3], 5, 2);

  addArcBand(300, 100, 60, 0, color(0, 0), colors[0], 3, 2);
  addArcBand(300, 100, 80, 75, colors[0], colors[0], 3, -3);
  addArcBand(300, 200, 30, 120, color(0, 0), colors[1], 3, -2);

  addArcBand(160, 50, 5, 193, colors[4], colors[4], 3, 3);
  addArcBand(160, 50, 5, 208, colors[4], colors[4], 3, 4);
  addArcBand(160, 50, 5, 223, colors[4], colors[4], 3, 5);

  addArcBand(600, 250, 10, 100, colors[4], colors[4], 3, -2);
  addArcBand(600, 250, 10, 120, colors[4], colors[4], 3, -1);
  addArcBand(600, 250, 10, 140, colors[4], colors[4], 3, 2);
  addArcBand(600, 50, 70, 90, colors[0], colors[4], 3, 3);

  addArcBand(600, 100, 120, 210, colors[6], colors[6], 3, 0);
  addArcBand(600, 150, 45, 10, color(0, 0), colors[6], 3, 0);

  addArcBand(350, 120, 70, 280, colors[5], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 280, colors[8], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 290, colors[5], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 300, colors[8], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 310, colors[5], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 320, colors[8], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 330, colors[5], colors[8], 5, 1.25);
  addArcBand(300, 50, 10, 340, colors[8], colors[8], 5, 1.25);

  addArcBand(900, 30, 90, 270, colors[2], colors[2], 3, 0);
  addArcBand(840, 30, 90, 270, colors[2], colors[2], 3, 0);
  addArcBand(780, 30, 90, 270, colors[2], colors[2], 3, 0);
  addArcBand(780, 30, 90, 180, colors[2], colors[2], 3, 0);
  addArcBand(720, 30, 90, 180, colors[3], colors[3], 3, 0);
  addArcBand(720, 60, 60, 100, colors[7], colors[3], 0, 3.5);

  addArcBand(915, 180, 10, 200, colors[7], colors[8], 3, 0);
  addArcBand(915, 180, 10, 220, color(0, 0), colors[5], 3, 0);
  addArcBand(925, 200, 10, 235, colors[5], colors[3], 3, 0);
  addArcBand(940, 230, 10, 250, color(0, 0), colors[0], 3, 0);

  addArcBand(840, 200, 50.8, 9.6, colors[1], colors[1], 0, -1);
  addArcBand(750, 80, 10, 10, colors[6], colors[1], 5, -1);
  addArcBand(750, 80, 10, 20, colors[6], colors[1], 5, -1);
  addArcBand(750, 80, 10, 30, colors[6], colors[1], 5, -1);
  addArcBand(750, 80, 10, 40, colors[6], colors[1], 5, -1);
  addArcBand(750, 80, 10, 50, colors[6], colors[1], 5, -1);

  addArcBand(60, 120, 60, 60, color(0, 0), colors[2], 3, 1.5);
  addArcBand(60, 120, 60, 180, colors[5], colors[2], 3, 1.5);
  addArcBand(60, 120, 60, 300, colors[2], colors[0], 3, 1.5);

  addArcBand(450, 300, 200, 0, colors[8].concat('50'), colors[8], 0, -3);
  addArcBand(550, 200, 200, 180, colors[0].concat('50'), colors[7], 5, 3);
  addArcBand(600, 400, 200, 0, color(0, 0), colors[1], 5, 0);
  addArcBand(900, 100, 140, 210, color(0, 0), colors[4], 5, -3);
  addArcBand(100, 100, 140, 210, color(0, 0), colors[6], 5, -3.5);
  addArcBand(150, 100, 140, 210, color(0, 0), colors[7], 5, -3.5);
  addArcBand(950, 30, 40, 0, color(0, 0), colors[6], 5, 2);

  arcBands.sort((left, right) =>
    left.diameter - left.width / 2 < right.diameter - right.width / 2 ? 1 : -1
  );

  // Apply a custom speed to the arcBands with speed set to 0
  arcBands
    .filter((x) => x.speed == 0)
    .forEach((x, i) => {
      x.speed = sin(1 + i * radians(x.rotateDeg)) + cos(i + 1);
    });
}

function draw() {
  if (capture) preCapture();

  background(bgColor);
  translate(width / 2, height / 2);
  const kSpeed = frameCount / 200;

  arcBands.forEach((x) => {
    push();
    {
      rotate(x.speed * kSpeed);
      drawArcBand(x);
      drawArcBandStroke(x);
    }
    pop();
  });

  if (capture) postCapture();
}

function addArcBand(
  diameter,
  width,
  arcDeg,
  rotateDeg,
  fillColor,
  strokeColor,
  strokeWidth,
  speed
) {
  arcBands.push({
    diameter: diameter,
    width: width,
    arcDeg: arcDeg,
    rotateDeg: rotateDeg,
    fillColor: fillColor,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth,
    speed: speed,
  });
}

function drawArcBand(arcBand) {
  const innerDiameter = arcBand.diameter - arcBand.width / 2.0;
  const outerDiameter = arcBand.diameter + arcBand.width / 2.0;

  push();
  {
    rotate(radians(arcBand.rotateDeg));

    // Draw the band without contour
    strokeWeight(0);

    fill(arcBand.fillColor);
    arc(0, 0, outerDiameter, outerDiameter, 0, radians(arcBand.arcDeg));

    fill(bgColor);
    arc(0, 0, innerDiameter, innerDiameter, 0, radians(arcBand.arcDeg));

    // Hide possible edges to the center
    stroke(bgColor);
    strokeWeight(2);
    line(0, 0, innerDiameter / 2.0, 0);
    push();
    {
      rotate(radians(arcBand.arcDeg));
      line(0, 0, innerDiameter / 2.0, 0);
    }
    pop();
  }
  pop();
}

function drawArcBandStroke(arcBand) {
  const innerDiameter = arcBand.diameter - arcBand.width / 2.0;
  const outerDiameter = arcBand.diameter + arcBand.width / 2.0;

  push();
  {
    rotate(radians(arcBand.rotateDeg));

    // Draw the arcs of the band contour
    noFill();
    stroke(arcBand.strokeColor);
    strokeWeight(arcBand.strokeWidth);
    arc(0, 0, outerDiameter, outerDiameter, 0, radians(arcBand.arcDeg));
    arc(0, 0, innerDiameter, innerDiameter, 0, radians(arcBand.arcDeg));

    // Draw the lines of the band contour
    line(innerDiameter / 2.0, 0, outerDiameter / 2.0, 0);
    push();
    {
      rotate(radians(arcBand.arcDeg));
      line(innerDiameter / 2.0, 0, outerDiameter / 2.0, 0);
    }
    pop();
  }
  pop();
}
