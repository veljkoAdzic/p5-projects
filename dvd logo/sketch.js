let logo;
function setup() {
  createCanvas(windowWidth, windowHeight); //700,525  4:3
  logo = new Logo(width/2, height/2, round(random(360)));
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(20);
  angleMode(DEGREES);
  
  logo.draw();
  logo.update();
}