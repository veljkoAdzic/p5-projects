function seeCard(){
  document.getElementById('SC').style.display = "none";
  document.getElementById('SA').style.display = "block";
  grow = false;
}

function seeAnim(){
  document.getElementById('SA').style.display = "none";
  document.getElementById('SC').style.display = "block";
  grow = true;
  
  for(let i = 180; i < 360; i+= 0.1){
    if(floor(map(cos(i), -1, 1, 1, maxGrow)) == 2){
      an = i - sliderSpeed.value();
      break;
    }
  }
}