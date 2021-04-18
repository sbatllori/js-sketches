// Quad Intro

const capture = false;

let corners;
let font;
const fontsize = 40;

function preload() {
  font = loadFont('../../assets/Fishfingers.ttf');
}

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  corners = [
    [0.2 * width, 0.2 * height], // top left
    [0.8 * width, 0.2 * height], // top right
    [0.8 * width, 0.8 * height], // bottom right
    [0.2 * width, 0.8 * height], // bottom left
  ];
}

function draw() {
  if (capture) preCapture();

  background(22);

  fill(220);
  strokeWeight(0);
  const s = 70;
  square(s, s, width - 2 * s, 0.5 * s);

  noFill();
  stroke(22);
  strokeWeight(2);
  const spacing = 0.033 * width;
  for (let i = 0; i < 20; ++i) {
    quad(
      corners[0][0] + i * spacing,
      corners[0][1] + i * spacing,
      corners[1][0] - i * spacing,
      corners[1][1] + i * spacing,
      corners[2][0] - i * spacing,
      corners[2][1] - i * spacing,
      corners[3][0] + i * spacing,
      corners[3][1] - i * spacing
    );
  }

  corners = corners.map(([x, y], i) => [
    x + sin(0.05 * i * frameCount),
    y + (i - 1) * cos(0.05 * frameCount),
  ]);

  textAlign(RIGHT);
  fill(235, 143, 52);
  text('@soo.logical', width - 15, height - 35);

  if (capture) postCapture(374);
}

function preCapture() {
  if (frameCount === 1) capturer.start();
}

function postCapture(numFrames) {
  if (frameCount <= numFrames) capturer.capture(canvas);
  else if (frameCount === numFrames + 1) {
    capturer.save();
    capturer.stop();
  }
}
