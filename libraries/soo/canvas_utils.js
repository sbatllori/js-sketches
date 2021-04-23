// canvas_utils.js

// Capturer functions
let SOO_LAST_CAPTURED_FRAME = 300;

function preCapture() {
  if (frameCount === 1) capturer.start();
}

function postCapture() {
  if (frameCount <= SOO_LAST_CAPTURED_FRAME) capturer.capture(canvas);
  else if (frameCount === SOO_LAST_CAPTURED_FRAME + 1) {
    capturer.save();
    capturer.stop();
  }
}

// Framed water mark functions
let wmFont;
let wmBackgroundColor = '#dcdcdc';
let wmFrameColor = '#161616';
let wmTextColor = '#eb8f34';

function wmPreload() {
  wmFont = loadFont('../../assets/Fishfingers.ttf');
}

function wmSetup() {
  textFont(wmFont);
  textSize(40);
  textAlign(CENTER, CENTER);
}

function wmDraw() {
  background(wmFrameColor);

  fill(wmBackgroundColor);
  strokeWeight(0);
  const s = 70;
  square(s, s, width - 2 * s, 0.5 * s);

  textAlign(RIGHT);
  fill(235, 143, 52);
  text('@soo.logical', width - 15, height - 35);
}
