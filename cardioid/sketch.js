let r;
let points = 350;
let mul = 1;
let an = 185,
    grow = true,
    maxGrow = 15;
let sliderSpeed;


function setup() {
  createCanvas(600, 600);
  r = width / 2 - 20;

  sliderSpeed = createSlider(0.1, 1, 0.15, 0.01);
  sliderSpeed.style("width", "150px");
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  angleMode(DEGREES);

  //draw outer circle
  noFill();
  stroke(150);
  circle(0, 0, r * 2);
  //~

  //draw points on outer circle
  push();
  for (let i = 0; i < 360; i += 360 / points) {
    noStroke();
    fill(200);

    let x = cos(i) * r,
      y = sin(i) * r;

    circle(x, y, 3);
  }
  pop();
  //~

  //draw lines
  push();
  for (let i = 0; i < 360; i += 360 / points) {
    stroke(255, 50);

    let num = i / (360 / points);
    let x = cos(i) * r,
      y = sin(i) * r,
      x2 = cos(num * mul * (360 / points)) * r,
      y2 = sin(num * mul * (360 / points)) * r;

    line(x, y, x2, y2);
  }
  pop();
  //~

  //grow and shrink animation
  if (grow) {
    mul = map(cos(an), -1, 1, 1, maxGrow);
    an += sliderSpeed.value();
  } else {
    mul = 2;
  }
  //~
}
