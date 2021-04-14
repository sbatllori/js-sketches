// Connected dots

let savedPoints = [];

let bEdge = true;
let colorIdx = 0;
const edgeColors = ['#fec520', '#b01b22', '#209915', '#1a257f'];

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);
}

function draw() {
  background(50);

  let mouse = {x: mouseX, y: mouseY, bEdge: bEdge, colorIdx: colorIdx};
  let points = savedPoints.concat([mouse]);
  if (mouseIsPressed) saveCurrentPointNoDuplicates(mouse, 50);

  // Draw edges
  strokeWeight(15);
  R.aperture(2, points).forEach(([p, q]) => {
    if (q.bEdge) {
      stroke(edgeColors[q.colorIdx]);

      // Draw and edge between P and Q
      line(p.x, p.y, q.x, q.y);

      // Draw the normal vector of the edge at its middle point
      let direction = createVector(q.x - p.x, q.y - p.y);
      let midPoint = createVector(p.x, p.y).add(direction.div(2));
      let normal = direction.copy().rotate(HALF_PI).normalize().mult(50);

      line(
        midPoint.x,
        midPoint.y,
        midPoint.x + normal.x,
        midPoint.y + normal.y
      );
    }
  });

  // Draw points
  strokeWeight(0);
  points.forEach((p) => {
    fill(0);
    circle(p.x, p.y, 70);

    fill(255);
    circle(p.x, p.y, 50);
  });
}

function keyPressed() {
  if (keyCode === 'E'.charCodeAt(0)) {
    bEdge = !bEdge;
  }

  if (keyCode === 'C'.charCodeAt(0)) {
    colorIdx = (colorIdx + 1) % edgeColors.length;
  }
}

// TODO this is not functional programming
function saveCurrentPointNoDuplicates(current, distThreshold) {
  if (savedPoints.length === 0) {
    savedPoints.push(current);
  } else {
    const last = savedPoints[savedPoints.length - 1];

    createVector(last.x, last.y).dist(createVector(current.x, current.y)) >
    distThreshold
      ? savedPoints.push(current)
      : null;
  }
}
