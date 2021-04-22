// WIP

let bgColor;
let arcBands = [];

const capture = false;

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);

  bgColor = color(22);

  let arcBand = {
    diameter: 300,
    width: 100,
    angleDeg: 60,
    // fillColor: color(250, 200, 30),
    strokeColor: color(250, 200, 230),
    strokeWidth: 3,
    speed: 2,
  };

  arcBands.push(arcBand);

  arcBand = {
    diameter: 300,
    width: 200,
    angleDeg: 30,
    strokeColor: color(250, 200, 230),
    strokeWidth: 3,
    speed: -5,
  };

  arcBands.push(arcBand);
}

function draw() {
  if (capture) preCapture();

  background(bgColor);
  const kSpeed = frameCount / 200;

  arcBands
    .filter((arcBand) => arcBand.fillColor)
    .forEach((arcBand) => {
      push();
      translate(width / 2, height / 2);
      rotate(arcBand.speed * kSpeed);
      drawArcBand(arcBand);
      pop();
    });

  arcBands
    .filter((arcBand) => arcBand.strokeColor && arcBand.strokeWidth)
    .forEach((arcBand) => {
      push();
      translate(width / 2, height / 2);
      rotate(arcBand.speed * kSpeed);
      drawArcBandStroke(arcBand);
      pop();
    });

  if (capture) postCapture(374);
}

function drawArcBand(arcBand) {
  const innerDiameter = arcBand.diameter - arcBand.width / 2.0;
  const outerDiameter = arcBand.diameter + arcBand.width / 2.0;
  const angleRad = radians(arcBand.angleDeg);
  const strokeWidth = arcBand.strokeWidth;
  const fillColor = arcBand.fillColor;

  // Draw the band without contour
  strokeWeight(0);

  fill(fillColor);
  arc(0, 0, outerDiameter, outerDiameter, 0, angleRad);

  fill(bgColor);
  arc(0, 0, innerDiameter, innerDiameter, 0, angleRad);

  // Hide possible edges to the center
  stroke(bgColor);
  strokeWeight(strokeWidth);
  line(0, 0, innerDiameter / 2.0 - strokeWidth, 0);
  push();
  rotate(angleRad);
  line(0, 0, innerDiameter / 2.0 - strokeWidth, 0);
  pop();
}

function drawArcBandStroke(arcBand) {
  const innerDiameter = arcBand.diameter - arcBand.width / 2.0;
  const outerDiameter = arcBand.diameter + arcBand.width / 2.0;
  const angleRad = radians(arcBand.angleDeg);
  const strokeWidth = arcBand.strokeWidth;
  const strokeColor = arcBand.strokeColor;

  // Draw the band contour
  // - draw the arcs
  // - draw the lines
  noFill();
  stroke(strokeColor);
  strokeWeight(strokeWidth);
  arc(0, 0, outerDiameter, outerDiameter, 0, angleRad);
  arc(0, 0, innerDiameter, innerDiameter, 0, angleRad);

  line(innerDiameter / 2.0, 0, outerDiameter / 2.0, 0);
  push();
  rotate(angleRad);
  line(innerDiameter / 2.0, 0, outerDiameter / 2.0, 0);
  pop();
}
