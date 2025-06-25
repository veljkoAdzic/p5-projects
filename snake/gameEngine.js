/**
Constructor needs the maximum points, 
ie the the number of tiles

This engine runs and controls the whole game
*/
class GameEngine {
  constructor(_mp){
    this.maxPoints = _mp;
    this.started = false;  //Game hasn't started
  }
  
  //The engine that runs and controls the game
  engine(){
    if(this.started === false){
      this.startScreen();  //show start screen
    } else {
      
      if(S.isDead())  //check for death
        this.fail();  //death screen
      else
        if(S.tail.length >= this.maxPoints)  //check for victory
          this.win();  //win screen
        else
          this.gamePlay(); //run  the game if no death or win
    }
  }
  //~
  
  //Draw the start screen
  startScreen(){
    let t = "Use the Arrow or WASD keys to move around" + "\n\n" +
            "Click the button to start the game";
    push();
    background(35);
    
    //~Text
    textSize(35);
    textAlign(CENTER);
    fill(200);
    text(t, width*0.1, height*0.2, width*0.8);
    //~~
    
    //~Button
    fill(199, 64, 64);
    noStroke();
    rect(width*0.4, height*0.7, width*0.2, 35, 5);
    
    textAlign(LEFT);
    textSize(32);
    fill(190);
    text("Start", width*0.4 + 18, height*0.7+29);
    //~~
    
    pop();
    
  }
  //~
  
  //Play the game
  gamePlay(){
    push();
    
    if(counter >= (fps * 0.15) ){
      background(0);

      S.update();
      if(S.eaten(F.pos)){
        S.grow();
        F.newFood(S.head, S.tail);
      }
      F.draw();
      S.draw();
      counter = 0;
    } else
      counter++;
    
    S.changeDir();
    pop();
  }
  //~
  
  //Check if startscreen button is clicked
  isButtonClick(){
    if(mouseX >= width*0.4 +3 && mouseX <= width*0.6 - 3 &&
       mouseY >= height*0.7 + 3 && mouseY <= height*0.7 +32){
      this.started = true;
    }
  }
  //~
  
  //Death screen
  fail(){
    let t = "You died :(" + "\n\n" + "Your Score: " + S.len;
    push();
    background(158, 49, 49);
    
    //~Text
    textSize(35);
    textAlign(CENTER);
    fill(200);
    text(t, width*0.1, height*0.3, width*0.8);
    //~~
    
    pop();
  }
  //~
  
  //Win screen
  win(){
    let t = "Congrats!" + "\n\n" + "You won Snake! :)";
    push();
    background(49, 158, 80);
    
    //~Text
    textSize(35);
    textAlign(CENTER);
    fill(200);
    text(t, width*0.1, height*0.3, width*0.8);
    //~~
    
    pop();
  }
  //~
}
