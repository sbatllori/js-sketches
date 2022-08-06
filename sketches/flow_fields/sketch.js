// Constants.
const kImageSizePx = {width: 1080, height: 1080};
const kGridMargins = {
  leftX: parseInt(kImageSizePx.width * -0.25),
  rightX: parseInt(kImageSizePx.width * 1.25),
  topY: parseInt(kImageSizePx.height * -0.25),
  bottomY: parseInt(kImageSizePx.height * 1.25),
};
const kResolution = parseInt(kImageSizePx.width * 0.01);
const kNumColumns = parseInt(
  (kGridMargins.rightX - kGridMargins.leftX) / kResolution
);
const kNumRows = parseInt(
  (kGridMargins.bottomY - kGridMargins.topY) / kResolution
);

// Global variables.
let grid;

function setup() {
  createCanvas(kImageSizePx.width, kImageSizePx.height);
  angleMode(RADIANS);
  noLoop();
  randomSeed(0);

  console.log(kNumColumns, kNumRows);

  noiseSeed(0);
  noiseDetail(8, 0.95);
  const noiseScale = 0.0005; //0.0005;
  const perlinNoiseAngle = (col, row) => {
    const scaledX = col * noiseScale;
    const scaledY = row * noiseScale;
    const noiseVal = noise(scaledX, scaledY);
    const angle = map(noiseVal, 0.0, 1.0, 0.0, 2.0 * PI);
    return angle;
  };

  grid = [];
  for (let col = 0; col < kNumColumns; ++col) {
    for (let row = 0; row < kNumRows; ++row) {
      // const angle = (row * PI) / kNumRows;
      const angle = perlinNoiseAngle(col, row);
      grid.push(angle);
    }
  }
}

function draw() {
  background(250);

  const arrowColor = color(0, 0, 0, 50);
  strokeWeight(1);
  stroke(arrowColor);
  fill(arrowColor);
  // drawAngles();

  for (let col = 0; col < kNumColumns; ++col) {
    for (let row = 0; row < kNumRows; ++row) {
      fill(20);
      strokeWeight(0);
      drawCurve(col * kResolution, row * kResolution, 1, 8 * kResolution);
    }
  }

  noFill();
  const numCurves = 6000;
  const stepLength = 0.5 * kResolution;
  const numSteps = 1000;
  for (let curveIdx = 0; curveIdx < numCurves; ++curveIdx) {
    let x, y;
    if (curveIdx < numCurves / 2) {
      x = random(kGridMargins.leftX, 0);
      y = random(kGridMargins.topY, kGridMargins.bottomY);
    } else {
      x = random(kGridMargins.leftX, kGridMargins.rightX);
      y = random(kGridMargins.topY, 0);
    }

    const r = map(sin(x), -1, 1, 0, 255);
    const g = map(cos(y * x), -1, 1, 50, 150);
    const b = 100;
    stroke(r, g, b);

    const weight = map(sin(x * y), -1, 1, 0.1, 2);
    strokeWeight(weight);
    drawCurve(x, y, stepLength, numSteps);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function getGridAngle(col, row) {
  return grid[col * kNumColumns + row];
}

function drawGrid() {
  for (let col = 0; col < kNumColumns; ++col) {
    for (let row = 0; row < kNumRows; ++row) {
      const topLeftCornerX = col * kResolution;
      const topLeftCornerY = row * kResolution;

      push();
      translate(topLeftCornerX, topLeftCornerY);
      rect(0, 0, kResolution, kResolution);
      pop();
    }
  }
}

function drawAngles() {
  for (let col = 0; col < kNumColumns; ++col) {
    for (let row = 0; row < kNumRows; ++row) {
      const angle = getGridAngle(col, row);
      const cellCenterX = (col + 0.5) * kResolution;
      const cellCenterY = (row + 0.5) * kResolution;

      push();

      // Rotate the space using the center of the cell as the pivot point.
      translate(cellCenterX, cellCenterY);
      rotate(angle);

      // Draw an arrow representing the angle.
      translate(-0.5 * kResolution, 0);
      const startVec = createVector(0, 0);
      const endVec = createVector(kResolution, 0);
      drawArrow(startVec, endVec);

      pop();
    }
  }
}

// Source: https://p5js.org/reference/#/p5.Vector/heading
function drawArrow(base, vec) {
  push();
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 0.25 * kResolution;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function drawCurve(x, y, stepLength, numSteps) {
  beginShape();
  for (let _ = 0; _ < numSteps; ++_) {
    vertex(x, y);

    const offsetX = x - kGridMargins.leftX;
    const offsetY = y - kGridMargins.topY;

    const col = parseInt(offsetX / kResolution);
    const row = parseInt(offsetY / kResolution);
    if (col >= kNumColumns || row >= kNumRows) {
      break;
    }
    const angle = getGridAngle(col, row);

    const stepX = stepLength * cos(angle);
    const stepY = stepLength * sin(angle);

    x += stepX;
    y += stepY;
  }
  endShape();
}
