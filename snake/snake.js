/**
Constructer needs x and y of position in the grid, 
not canvas position, it needs directions 
from -1 to 1 in both x and y direction
*/
class Snake {
  constructor(_x, _y, _dirX, _dirY){
    //calculate and store head position in canvas
    this.head = createVector(_x * tileSize, _y * tileSize);
    //calculate and store direction
    this.dir = createVector(_dirX, _dirY);
    this.tail = [];  //create tail array
    this.len = 0;
  }
  
  //Draw the snake
  draw(){
    push();
    stroke(0);
    strokeWeight(1);
    
    //~draw the tail
    for(let t of this.tail){
      fill(220);
      rect(t.x, t.y, tileSize);
    }
    //~~
    
    fill(255);
    rect(this.head.x, this.head.y, tileSize);
    pop();
  }
  //~
  
  //Update the snake
  update(){
    //~Update tail array
    this.tail.shift();
    this.tail.push(JSON.parse(JSON.stringify(this.head)));
    //~~
    
    this.head.x += this.dir.x * tileSize;  //Update head pos
    this.head.y += this.dir.y * tileSize;  //Update head pos
  }
  //~
  
  //Change direction with WASD or Arrow Keys
  changeDir(){
    if(keyIsPressed){
      //~Go left
      if((keyCode === LEFT_ARROW || keyCode == 65) && this.dir.x == 0){
        this.dir.x = -1;
        this.dir.y = 0;
      }
      //~~
      
      //~Go right
      if((keyCode === RIGHT_ARROW || keyCode == 68) && this.dir.x == 0){
        this.dir.x = 1;
        this.dir.y = 0;
      }
      //~~
      
      //~Go up
      if((keyCode === UP_ARROW || keyCode == 87) && this.dir.y == 0){
        this.dir.x = 0;
        this.dir.y = -1;
      }
      //~~

      //~Go down
      if((keyCode === DOWN_ARROW || keyCode == 83) && this.dir.y == 0){
        this.dir.x = 0;
        this.dir.y = 1;
      }
      //~
    }
  }
  //~
  
  //Test if head is on top of food
  eaten(foodPos){
    return this.head.x == foodPos.x &&
           this.head.y == foodPos.y;
  }
  //~
  
  //Add extra lenght to snake
  grow(){
    this.tail.push(JSON.parse(JSON.stringify(this.head)));
    this.len++;
  }
  //~
  
  //Is snake Dead
  isDead(){
    //~is head out of bounds
    if(this.head.x > (tpc - 1) * tileSize || this.head.x < 0 ||
       this.head.y > (tpr - 1) * tileSize || this.head.y < 0)
      return true;
    //~~
    else {
      //~is head over tail
      if(this.tail.length > 3){
        let nextX = this.head.x + this.dir.x * tileSize;
        let nextY = this.head.y + this.dir.y * tileSize;
        
        for(let i = 0; i < this.tail.length - 1; i++){
          if(this.head.x == this.tail[i].x && 
             this.head.y == this.tail[i].y)
            return true;
        }
      }
      //~
      return false;
      }
    }
  //~
}