// wip

let bgColor;
const minBranchLen = 10;
const maxBranchLen = 200;

const capture = false;
SOO_LAST_CAPTURED_FRAME = 2000;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  frameRate(fps);
  angleMode(DEGREES);

  bgColor = color(220);
}

function draw() {
  if (capture) preCapture();

  background(bgColor);

  noFill();
  stroke(22);
  strokeWeight(2);
  line(-500, 200, 500, 200);

  const r = 0.4 * width;
  const x = r * cos(frameCount + 180);
  const y = r * sin(-frameCount);
  circle(x, y, 100);

  scale(1.5);
  randomSeed(1);
  // drawTree(200, 0, 250, 0);

  if (capture) postCapture();
}

function branchRecursive(len) {
  drawBranch(len);

  if (len > minBranchLen) {
    translate(0, -len, 0);

    for (let i = 0; i < 3; i++) {
      rotateY(360 / 3);
      rotateY(random(-30, 30));

      push();
      rotateZ(45);
      rotateZ(random(-10, 10));
      branchRecursive(0.62 * len);
      pop();
    }
  } else {
    drawLeafs(len);
  }
}

function drawTree(len, x, y, z) {
  push();
  {
    translate(x, y, z);
    branchRecursive(len);
  }
  pop();
}

function drawBranch(len) {
  strokeWeight(len < 40 ? 0.05 * len : 4);
  stroke(22);
  fill(53, 43, 40);

  const coneRadius = map(len, 0, maxBranchLen, 1, 15);
  push();
  {
    rotateZ(180);
    translate(0, 0.5 * len, 0);
    cone(coneRadius, len, 7, 1);
  }
  pop();
  push();
  {
    translate(0, -0.5 * len, 0);
    cone(0.5 * coneRadius, len, 7, 1);
  }
  pop();
}

function drawLeafs(len) {
  strokeWeight(0.8);
  fill(50, 196, 138);

  translate(0, -1.8 * len, 0);
  const r = len;

  beginShape();
  for (let i = 0; i <= 90; ++i) {
    vertex(r * cos(i), r * sin(i));
  }
  for (let i = 180; i <= 270; ++i) {
    vertex(r * cos(i) + r, r * sin(i) + r);
  }
  endShape(CLOSE);

  rotateZ(90);
  randomSeed(null);
  rotateX(random(-20, 20));
  randomSeed(1);
  beginShape();
  for (let i = 0; i <= 90; ++i) {
    vertex(r * cos(i), r * sin(i));
  }
  for (let i = 180; i <= 270; ++i) {
    vertex(r * cos(i) + r, r * sin(i) + r);
  }
  endShape(CLOSE);
}
