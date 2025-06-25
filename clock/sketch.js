let sec, min, hur;
let sh = 165,
    mh = 150,
    hh = 100,
    os = 35;

function setup() {
  createCanvas(450, 450);
}

function draw() {
  background(125, 196, 240);

  //Put 0,0 in he center
  translate(width / 2, height / 2);
  //~
  
  //Get System time
  sec = second();
  min = minute();
  hur = hour() % 12;
  //~
  
  angleMode(DEGREES);

  //white background of clock
  fill(220);
  noStroke();
  circle(0, 0, 390);
  //~
  
  //tic marks on clock
  for (let i = 0; i < 360; i += 6) {
    if (i % 30) {
      stroke(100);
      strokeWeight(1.5);
      line(sin(i) * 160, cos(i) * -160, sin(i) * 170, cos(i) * -170);
    } else {
      stroke(70);
      strokeWeight(1.5);
      line(sin(i) * 150, cos(i) * -150, sin(i) * 173, cos(i) * -173);
    }
  }
  //~
  
  //Draw hour hand
  hur = (hour() % 12) + min / 60; // makes smoother transitions
  stroke(20);
  strokeWeight(4);
  line(0, 0, sin(hur * 30) * hh, cos(hur * 30) * -hh);
  //~
  
  //Draw minute hand
  min = minute() + sec / 60; // makes smoother transitions
  stroke(20);
  strokeWeight(3);
  line(0, 0, sin(min * 6) * mh, cos(min * 6) * -mh);
  //~
  
  //Draw second hand
  strokeWeight(2);
  stroke(252, 63, 85);
  line(sin(sec * 6) * -os, cos(sec * 6) * os, 
       sin(sec * 6) * sh, cos(sec * 6) * -sh);
  //~
  
  //~
  fill(38, 21, 10);
  noStroke();
  circle(0, 0, 7);
  //~
  
  //Draw clock frame
  noFill();
  stroke(252, 135, 63);
  strokeWeight(15);
  circle(0, 0, 390);
  //~
}
