// https://www.color-hex.com/color-palette/107816
const palette1 = ['#bfd9d7', '#ddbd4d', '#4c807c', '#987239', '#353745'];
// https://www.color-hex.com/color-palette/95230
const palette2 = ['#f8e6d1', '#f39f87', '#f6af1a', '#978e91', '#36513a'];

let bEdge = true;
const edgeColors = palette1;
let edgeColorIdx = 0;

let savedPoints = []; // [x y bEdge edgeColorIdx]

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);
}

function draw() {
  background(50);

  let mouse = [mouseX, mouseY, bEdge, edgeColorIdx];
  let points = savedPoints.concat([mouse]);

  strokeWeight(15);
  R.aperture(2, points).forEach(([p, q]) => {
    if (q[2]) {
      stroke(edgeColors[q[3]]);
      line(p[0], p[1], q[0], q[1]);
    }
  });

  strokeWeight(0);
  points.forEach(([x, y]) => {
    fill(0);
    circle(x, y, 80);

    fill(255);
    circle(x, y, 50);
  });

  if (mouseIsPressed) savedPoints.push(mouse);
}

function keyPressed() {
  if (keyCode === 'E'.charCodeAt(0)) {
    bEdge = !bEdge;
  }

  if (keyCode === 'C'.charCodeAt(0)) {
    edgeColorIdx = (edgeColorIdx + 1) % edgeColors.length;
  }
}
