// https://www.color-hex.com/color-palette/107816
const palette1 = ['#bfd9d7', '#ddbd4d', '#4c807c', '#987239', '#353745'];
// https://www.color-hex.com/color-palette/95230
const palette2 = ['#f8e6d1', '#f39f87', '#f6af1a', '#978e91', '#36513a'];

let bEdge = true;
let edgeColorIdx = 0;
const edgeColors = palette2;

let savedPoints = []; // [x y bEdge edgeColorIdx]

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);
}

function draw() {
  background(50);

  let mouse = [mouseX, mouseY, bEdge, edgeColorIdx];
  let points = savedPoints.concat([mouse]);
  if (mouseIsPressed) savedPoints.push(mouse);

  // Draw edges
  strokeWeight(15);
  R.aperture(2, points).forEach(([p, q]) => {
    if (q[2]) {
      stroke(edgeColors[q[3]]);
      line(p[0], p[1], q[0], q[1]);

      // Draw a normal line in the middle of the edge
      // - compute direction P---->Q
      // - compute middle point P--x--Q
      // - compute normal vector
      let direction = createVector(q[0] - p[0], q[1] - p[1]);
      let middelPoint = [p[0] + direction.x / 2, p[1] + direction.y / 2];
      direction.rotate(HALF_PI).normalize();

      const normalLength = 50;
      line(
        middelPoint[0],
        middelPoint[1],
        middelPoint[0] + normalLength * direction.x,
        middelPoint[1] + normalLength * direction.y
      );
    }
  });

  // Draw points
  strokeWeight(0);
  points.forEach(([x, y]) => {
    fill(0);
    circle(x, y, 80);

    fill(255);
    circle(x, y, 50);
  });
}

function keyPressed() {
  if (keyCode === 'E'.charCodeAt(0)) {
    bEdge = !bEdge;
  }

  if (keyCode === 'C'.charCodeAt(0)) {
    edgeColorIdx = (edgeColorIdx + 1) % edgeColors.length;
  }
}
