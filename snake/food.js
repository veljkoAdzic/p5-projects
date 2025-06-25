/**
Constructor needs starting position of the food 
in the grid, not the canvas position, cavas 
position get galculated
*/
class Food{
  
  constructor(_x, _y){
    //calculate and store position in canvas
    this.pos = createVector(_x * tileSize, _y * tileSize);
  }
  
  //Draw the Food
  draw(){
    push();
    fill(220, 0, 0);
    stroke(0);
    strokeWeight(1);
    
    rect(this.pos.x, this.pos.y, tileSize)
    pop();
  }
  //~
  
  //create new random food position
  newFood(_head, _tailAr){
    let rX = floor(random(tpc)) * tileSize;
    let rY = floor(random(tpr)) * tileSize;
    
    if(this.isUnderSnake(rX, rY)){  //L42
      this.newFood(_head, _tailAr); //recursivity
    }else{
      //~asign new random position
      this.pos.x = rX;  
      this.pos.y = rY;
      //~~
    }
  }
  //~
  
  //Test if new position is invalid
  isUnderSnake(_x, _y){
    if(_x == S.head.x && _y == S.head.y)
      return true;
    else{
      for(let t of S.tail){
        if(_x == t.x && _y == t.y)
          return true;
      }
      return false;
    }
  }
  //~
}