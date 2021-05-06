/**
 * Displays a dot on the mouse position, and, when pressed, draws the dot and a
 * line connecting it to the next dot. The line also draws its normal on the
 * middle point between the two dots that define it. Several colors and options
 * are available to draw the edges.
 */

/******************************************************************************
 * Sketch
 *****************************************************************************/
let savedPoints, bEdge, colorIdx;
const colors = ['#fec520', '#b01b22', '#209915', '#1a257f'];

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);

  savedPoints = [];
  bEdge = true;
  colorIdx = 0;
}

function draw() {
  background(255);

  let mouse = {x: mouseX, y: mouseY, bEdge: bEdge, colorIdx: colorIdx};
  let points = savedPoints.concat([mouse]);
  if (mouseIsPressed && !isLastTooCloseTo(mouse, 50)) savedPoints.push(mouse);

  // Draw edges
  R.aperture(2, points)
    .filter(([_, q]) => q.bEdge)
    .forEach(([p, q]) => {
      strokeWeight(15);
      stroke(colors[q.colorIdx]);

      // Draw an edge between P and Q
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
    colorIdx = (colorIdx + 1) % colors.length;
  }
}

function isLastTooCloseTo(currentPoint, tooCloseThreshold) {
  if (savedPoints.length === 0) return false;

  const lastPoint = savedPoints[savedPoints.length - 1];
  const last = createVector(lastPoint.x, lastPoint.y);
  const current = createVector(currentPoint.x, currentPoint.y);
  return last.dist(current) <= tooCloseThreshold;
}
