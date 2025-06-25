//noise variables
let xoff = 0,
    yoff = 0,
    zoff = 0;
//~

//aneba variables
let xs = [],
    ys = [];
let x, y, r;
//~

//min and max distance from (0,0) 
let minD = 50, 
    maxD = 300;
//~

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  translate(width / 2, height / 2);
  
  //Get all vetecies
  for (let i = 0; i < 360; i++) {
    xoff = map(sin(i), -1, 1, 0, 1);
    yoff = map(cos(i), -1, 1, 0, 1);

    r = map(noise(xoff, yoff, zoff), 0, 1, minD, maxD);

    x = sin(i) * r;
    y = cos(i) * r;
    
    xs[i] = x;
    ys[i] = y;
    
  }
  //~
}

function draw() {
  background(255, 0);
  translate(width / 2, height / 2);
  
  noStroke();
  fill(217, 233, 255);
  circle(0, 0, width);
  
  //Draw the nucleus
  let xav = 0,
      yav = 0;
  for(let a = 0; a < 360; a++){
    let temp = 0;
    temp += xs[a];
    xav = (temp / 360);
    temp = 0;
    temp += ys[a];
    yav = temp / 360;
  }
  xav += map(noise(xoff+1, yoff+1, zoff), 0, 1, -35, 35);
  yav += map(noise(xoff+10, yoff+10, zoff), 0, 1, -35, 35);
  
  fill(121, 157, 201, 245);
  stroke(121, 157, 201);
  circle(xav, yav, 50);
  //~
  
  //Draw the membrane
  fill(123, 184, 92, 100);
  stroke(123, 184, 92, 200);
  strokeWeight(1);
  beginShape();
  
  for (let i = 0; i < 360; i++) {
    xoff = map(sin(i), -1, 1, 0, 1);
    yoff = map(cos(i), -1, 1, 0, 1);

    r = map(noise(xoff, yoff, zoff), 0, 1, minD, maxD);

    x = sin(i) * r;
    y = cos(i) * r;
    
    xs[i] = x;
    ys[i] = y;
    
    vertex(x, y);
  }
  
  endShape(CLOSE);
  //~
  
  zoff += 0.002;
}
