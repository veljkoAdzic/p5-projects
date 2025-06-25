/**
Constructor needs an x and y in the grid, 
not the position in the canvas, canvas position gets calculated
*/
class Cell {
  //Create dead cell with given grid possition
  constructor(_x, _y){
    this.alive = false;
    
    //calculate and store position in canvas
    this.pos = createVector(_x * cellW, _y * cellW);
  }
  //~
  
  //Draw the cell
  draw(){
    push();
    
    if(this.alive)
      fill(200);
    else
      fill(20);
    
    stroke(35);
    strokeWeight(border);
    
    rect(this.pos.x, this.pos.y, cellW); //draw the cell as square
    pop();
  }
  //~
  
  //Edit what cells are dead or alive with mouse click
  invert(){
    if(mouseIsPressed &&
       mouseX >= this.pos.x && mouseX < this.pos.x + cellW &&
       mouseY >= this.pos.y && mouseY < this.pos.y + cellW)
    this.alive = !this.alive;  //invert the cell
  }
  //~
}