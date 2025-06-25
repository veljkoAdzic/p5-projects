class Node {
  constructor(_x, _y){
    this.pos = createVector(_x, _y);
    this.points = [];
  }
  
  getPossibleDir(){
    let res = [];
    
    if(this.pos.y != 0) //not top most
      res.push("U");
    
    if(this.pos.x != SIZE-1) //not right most
      res.push("R");
    
    if(this.pos.y != SIZE-1) //not bottom most
      res.push("D");
    
    if(this.pos.x != 0) //not left most
      res.push("L");
    
    if(res.length == 0) //ERROR
      println("ERROR: " + this);
    
    return res;
  }
  
  show(){
    push();    
    let _x = this.pos.x * width/SIZE + width/SIZE * 0.5;
    let _y = this.pos.y * height/SIZE + height/SIZE * 0.5;
    
    noStroke();
    fill(220);
    // circle(_x, _y, 10);
    
    
    stroke(220);
    strokeWeight(width/SIZE * 0.8);
    strokeCap(PROJECT);
    
    for(let d of this.points){
      if(d == "U")
        line(_x, _y, _x, _y - height/SIZE);
        
      if(d == "R")
        line(_x, _y, _x + width/SIZE, _y);
      
      if(d == "D")
        line(_x, _y, _x, _y + height/SIZE);
      
      if(d == "L")
        line(_x, _y, _x - width/SIZE, _y);
    }
    pop();
  }
}