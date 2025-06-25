let tpc = 15,       //tiles per colum 15
    tpr = 20,       //tiles per row   20
    tileSize = 35   //tile size in px
    ;

let S, F, game;  //objects

//Speed of snake to be the fraction of the fps rate
let fps = 30,       //fps
    counter = fps;  //counter for when to update
//~

function setup() {
  let w = tpc * tileSize;  //calculate width
  let h = tpr * tileSize;  //calculate height
  createCanvas(w, h);
  
  game = new GameEngine(tpc * tpr);  //create GameEngine object
  S = new Snake(2, 8, 1, 0);         //create Snake object
  F = new Food(11, 8);               //create Food object
}

function draw() {
  frameRate(fps);  //refres reate
  
  game.engine();   //game engine

}

//check if start button has been pressed (p5 function)
function mousePressed(){
  game.isButtonClick();
}
//~