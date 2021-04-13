// https://www.color-hex.com/color-palette/107816
// const palette1 = ['#bfd9d7', '#ddbd4d', '#4c807c', '#987239', '#353745'];
// https://www.color-hex.com/color-palette/95230
// const palette2 = ['#f8e6d1', '#f39f87', '#f6af1a', '#978e91', '#36513a'];

let saved_points = [];

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);
}

function draw() {
  background(50);

  let mouse = [mouseX, mouseY];
  let points = saved_points.concat([mouse]);

  stroke(0);
  strokeWeight(15);
  R.aperture(2, points).forEach(([p, q]) => {
    line(p[0], p[1], q[0], q[1]);
  });

  strokeWeight(0);
  points.forEach(([x, y]) => {
    fill(0);
    circle(x, y, 80);

    fill(255);
    circle(x, y, 50);
  });

  if (mouseIsPressed) saved_points.push(mouse);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
