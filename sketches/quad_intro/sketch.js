// Quad Intro

let corners;
const capture = false;

function preload() {
  wmPreload();
}

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);

  wmSetup();

  corners = [
    [0.2 * width, 0.2 * height], // top left
    [0.8 * width, 0.2 * height], // top right
    [0.8 * width, 0.8 * height], // bottom right
    [0.2 * width, 0.8 * height], // bottom left
  ];
}

function draw() {
  if (capture) preCapture();
  wmDraw(color(220), color(22));

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

  if (capture) postCapture(374);
}
