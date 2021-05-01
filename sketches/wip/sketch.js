// wip

let bgColor;
let trunkLen;
const maxTrunkLen = 200;

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
  randomSeed(1);

  rotateY(0.5 * frameCount);
  scale(2);
  translate(0, maxTrunkLen, 0);
  trunkLen = map(mouseX, 0, width, 0, maxTrunkLen);
  branch(trunkLen);

  if (capture) postCapture();
}

function branch(len) {
  strokeWeight(0);
  fill(43, 33, 30);

  let coneRadius = map(len, 0, maxTrunkLen, 1, 15);

  push();
  rotateZ(180);
  translate(0, 0.5 * len, 0);
  cone(coneRadius, len, 7, 7);
  pop();

  push();
  translate(0, -0.5 * len, 0);
  cone(0.5 * coneRadius, len, 7, 7);
  pop();

  if (len > 15) {
    translate(0, -len, 0);

    let numChildBranches = map(mouseY, 0, height, 7, 2);
    let childBranchLen = map(mouseX, 0, width, 0.1, 0.7) * len;

    for (let i = 0; i < numChildBranches; i++) {
      rotateY(360 / numChildBranches);
      rotateY(random(0, 40));

      push();
      rotateZ(180 / numChildBranches);
      rotateZ(random(-10, 30));
      branch(childBranchLen);
      pop();
    }
  } else {
    leaf(len);
  }
}

function leaf(len) {
  stroke(22, 100);
  strokeWeight(2);
  fill(50, 156, 138);
  // fill(255, 244, 163);

  push();
  translate(0, -1.25 * len, 0);
  ellipse(0, 0, 0.5 * len, len);
  pop();
}
