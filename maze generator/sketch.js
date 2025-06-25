const SIZE = 24;

let nodes = [];
let origin = null;

function shiftOrigin(){
  //1. origin points to a new place
  //2. move the origin there
  //3. remove outgowings of new origin
  
  let ind = origin.x + origin.y * SIZE;
  
  //1
  let dir = random(nodes[ind].getPossibleDir());
  nodes[ind].points.push(dir);
  
  //2
  if(dir == "U") origin.y -= 1;
  if(dir == "R") origin.x += 1;
  if(dir == "D") origin.y += 1;
  if(dir == "L") origin.x -= 1;
  
  ind = origin.x + origin.y * SIZE;
  //3
  nodes[ind].points = [];
}

function setup() {
  createCanvas(600, 600);
  
  origin = createVector(SIZE-1, SIZE-1);
  
  for(let i = 0; i < SIZE; i++){
    for(let j = 0; j < SIZE; j++){
      let n = new Node(j, i);
      
      if(j != SIZE-1 )
        n.points.push("R");
      else if(i < SIZE-1)
        n.points.push("D");
      
      nodes.push(n);
    }
  }
  
  for(let i = 0; i < SIZE * 200; i++){
    shiftOrigin();
  }
}

function draw() {
  background(20);
  
  frameRate(10);
  
  fill(220);
  
  shiftOrigin(nodes, origin);
  
  for(let i = 0; i < SIZE*SIZE; i++){
    nodes[i].show();
  }
  
  push();
  fill(220, 0, 0);
  noStroke();
  circle(origin.x * width/SIZE + width/SIZE * 0.5,
         origin.y * height/SIZE + height/SIZE * 0.5,
        7);
  pop();
}

let paused = false;

function mousePressed(){
  if(paused){
    loop();
  }else{
    noLoop();
  }
  
  paused = !paused;
}