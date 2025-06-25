/** 
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
rows/cols must be 2+
*/
let cellW = 15,   //with in px
    cpr = 40,     //cells per row
    cpc = 50,     //cells per colum
    border = 1,   //px between cells
    deltaT = 3;   //timestep fps
    
let animate = false;

let grid = new Array(cpr),  //grid of cells
    next = new Array(cpr);  //nex gen of grid

function setup() {
  let w = cellW * cpc; //calculate width
  let h = cellW * cpr; //calculate height 
  createCanvas(w, h);
  
  //Make a 2D array
  for(let i = 0; i < cpr; i++){
    grid[i] = new Array(cpc);
    next[i] = new Array(cpc);
  }
  //~
  
  //create cells in the grid
  for(let y = 0; y < cpr; y++){
    for(let x = 0; x < cpc; x++){
      grid[y][x] = new Cell(x,y);
      next[y][x] = new Cell(x,y);
    }
  }
  //~
}

function draw() {
  frameRate(deltaT);
  background(50);
  
  //draw the geid
  for(let y = 0; y < cpr; y++){
    for(let x = 0; x < cpc; x++){
      grid[y][x].draw();
    }
  }
  //~
  
  calculateGrid();  //L66
}

//Edit functionality (p5 function)
function mousePressed(){
  if(!animate){
    for(let y = 0; y < cpr; y++){
      for(let x = 0; x < cpc; x++){
        grid[y][x].invert();
      }
    }
  }
}
//~

//Calculate nex generation
function calculateGrid(){
  if(animate){
  for(let y = 0; y < cpr; y++){
    for(let x = 0; x < cpc; x++){
      let ln = 0;  //number of living neighbours
      
      //~Top row
      if(y == 0 && x == 0)  //left corner
        ln = grid[y+1][x].alive +
             grid[y][x+1].alive +
             grid[y+1][x+1].alive;
      
      if(y == 0 && x == cpc-1)  //right corner
        ln = grid[y+1][x].alive +
             grid[y][x-1].alive +
             grid[y+1][x-1].alive;
      
      if(y == 0 && x != 0 & x != cpc-1)  //non coreners
        ln = grid[y][x-1].alive +
             grid[y+1][x-1].alive +
             grid[y+1][x].alive +
             grid[y+1][x+1].alive +
             grid[y][x+1].alive;
      //~~
      
      //~Bottom row
      if(y == cpr-1 && x == 0)  //left corner
        ln = grid[y-1][x].alive +
             grid[y-1][x+1].alive +
             grid[y][x+1].alive;
      
      if(y == cpr-1 && x == cpc-1)  //right corner
        ln = grid[y-1][x].alive +
             grid[y-1][x-1].alive +
             grid[y][x-1].alive;
      
      if(y == cpr-1 && x != 0 & x != cpc-1)  //non corners
        ln = grid[y][x-1].alive +
             grid[y-1][x-1].alive +
             grid[y-1][x].alive +
             grid[y-1][x+1].alive +
             grid[y][x+1].alive;
      //~~
      
      //~Left enge (Corners already calculated)
      if(x == 0 && y != 0 & y != cpr-1)
         ln = grid[y-1][x].alive +
              grid[y-1][x+1].alive +
              grid[y][x+1].alive +
              grid[y+1][x].alive +
              grid[y+1][x+1].alive;
      //~~
      
      //~Right enge (Corners already calculated)
      if(x == cpc-1 && y != 0 & y != cpr-1)
         ln = grid[y-1][x].alive +
              grid[y-1][x-1].alive +
              grid[y][x-1].alive +
              grid[y+1][x].alive +
              grid[y+1][x-1].alive;
      //~~
      
      //~Non Enges
      if(x != 0 && x != cpc-1 &&
         y != 0 && y != cpr-1)
         ln = grid[y-1][x-1].alive +
              grid[y-1][x].alive +
              grid[y-1][x+1].alive +
              grid[y][x-1].alive +
              grid[y][x+1].alive +
              grid[y+1][x-1].alive +
              grid[y+1][x].alive +
              grid[y+1][x+1].alive;
      //~~
      
      //~Compute next generation
      if(grid[y][x].alive){
        if(ln < 2 || ln > 3)
          next[y][x].alive = false; //death if too many/few
        else
          next[y][x].alive = true;  // continues for next gen
      } else {
        if(ln == 3)
          next[y][x].alive = true;  //reanimates
        else
          next[y][x].alive = false; //continues for next gen
      }
      //~~
    }
  }
  
  //~Copy next gen into grid
  for(let y = 0; y < cpr; y++){
    for(let x = 0; x < cpc; x++){
      grid[y][x].alive = next[y][x].alive;
    }
  }
  //~~
  }
}
//~