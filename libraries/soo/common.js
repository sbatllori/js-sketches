// common.js

// Capturer functions
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

// Framed water mark functions
let font;

function wmPreload() {
  font = loadFont('../../assets/Fishfingers.ttf');
}

function wmSetup() {
  textFont(font);
  textSize(40);
  textAlign(CENTER, CENTER);
}

function wmDraw(backgroundColor, frameColor) {
  background(frameColor);

  fill(backgroundColor);
  strokeWeight(0);
  const s = 70;
  square(s, s, width - 2 * s, 0.5 * s);

  textAlign(RIGHT);
  fill(235, 143, 52);
  text('@soo.logical', width - 15, height - 35);
}
