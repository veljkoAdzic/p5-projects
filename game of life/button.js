/**
This is the code that gives the functionality to the buttons
*/

//Pause the animation
function pauseAn(){
  //~Set button to "Play"
  document.getElementById('pauseBTN').style.display = "none";
  document.getElementById('playBTN').style.display = "inline-block";
  //~~
  
  //~Enable Clear button
  document.getElementById('dissabledClear').style.display = "none";
  document.getElementById('clearBTN').style.display = "inline-block";
  //~~
  
  animate = false;  //Pause animation
}

//Play the animation
function playAn(){
  //~Set button to "Pause"
  document.getElementById('playBTN').style.display = "none";
  document.getElementById('pauseBTN').style.display = "inline-block";
  //~~
  
  //~Dissable Clear button
  document.getElementById('clearBTN').style.display = "none";
  document.getElementById('dissabledClear').style.display = "inline-block";
  //~~
  
  animate = true;  //Play animation
}
//~

//Set all cells to dead
function clearGrid(){
  for(let y = 0; y < cpr; y++){
    for(let x = 0; x < cpc; x++){
      grid[y][x].alive = false;
      next[y][x].alive = false;
    }
  }
}
//~