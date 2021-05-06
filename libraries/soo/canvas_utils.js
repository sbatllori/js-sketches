/**
 * Assumes the following variables have been initialized:
 * - capturer (CCapture)
 * - frameCount, canvas, width, height (p5)
 */

/******************************************************************************
 * Static variables
 *****************************************************************************/
let SOO_LAST_CAPTURED_FRAME;

/******************************************************************************
 * Functions to capture the canvas
 *****************************************************************************/
SOO_LAST_CAPTURED_FRAME = 1;

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

/******************************************************************************
 * Class to define and draw a water mark frame
 *****************************************************************************/
class FramedWaterMark {
  constructor() {
    this.backgroundColor = '#dcdcdc';
    this.frameColor = '#161616';
    this.textColor = '#eb8f34';
  }

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  setFrameColor(frameColor) {
    this.frameColor = frameColor;
  }

  setTextColor(textColor) {
    this.textColor = textColor;
  }

  preload() {
    this.font = loadFont('../../assets/Fishfingers.ttf');
  }

  setup() {
    textFont(this.font);
    textSize(40);
    textAlign(CENTER, CENTER);
  }

  draw() {
    background(this.frameColor);

    fill(this.backgroundColor);
    strokeWeight(0);
    const s = 70;
    square(s, s, width - 2 * s, 0.5 * s);

    textAlign(RIGHT);
    fill(this.textColor);
    text('@soo.logical', width - 15, height - 35);
  }
}
