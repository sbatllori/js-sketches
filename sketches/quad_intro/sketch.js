/**
 * Draws a sequence of quads, each one a bit smaller than the previous one, that
 * get deformed in a looping animation.
 */

/******************************************************************************
 * Settings from libraries/soo/canvas_utils.js
 *****************************************************************************/
const capture = false;
SOO_LAST_CAPTURED_FRAME = 374;
let framedWaterMark = new FramedWaterMark();

/******************************************************************************
 * Sketch
 *****************************************************************************/
let corners;

function preload() {
  framedWaterMark.preload();
}

function setup() {
  createCanvas(1080, 1080);
  frameRate(fps);

  framedWaterMark.setup();
  framedWaterMark.setBackgroundColor(color(220));
  framedWaterMark.setFrameColor(color(22));

  corners = [
    [0.2 * width, 0.2 * height], // top left
    [0.8 * width, 0.2 * height], // top right
    [0.8 * width, 0.8 * height], // bottom right
    [0.2 * width, 0.8 * height], // bottom left
  ];
}

function draw() {
  if (capture) preCapture();
  framedWaterMark.draw();

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

  if (capture) postCapture();
}
