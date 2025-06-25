/**
  Constructor(x, y, an, [ria])
x    starting x position in canvas
y    starting y position in canvas
an   starting angle
ria  (optional) random +/- of a percentage of the angle (0.0-1.0)
*/
class Logo {
  //constructor
  constructor(_x, _y, _an, _ria){
    this.pos = createVector(_x, _y);  //position
    this.ang = _an;  //angle
    
    //~random impact angle
    if(_ria == null)
      this.ria = 0;
    else
      this.ria = _ria;
    //~~
    
    //~hue variables
    this.hueCounter = 0;
    this.colourChange();
    //~~
  }
  //~
  
  //draw the logo
  draw(){
    push();
    fill(this.hue);
    noStroke();
    
    this.w = width*0.13;
    this.h = height*0.13;
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }
  //~
  
  //impact angle and hue change
  hit(){
    if(this.pos.x < 0){
      this.ang += 2*(90 - (this.ang - 180));
      this.colourChange();
      this.randomHitAngle();
    }
    
    if(this.pos.x >= width - this.w){
      this.ang += 2*(90 - this.ang);
      this.colourChange();
      this.randomHitAngle();
    }
    
    if(this.pos.y <= 0){
      this.ang = 360 - this.ang;
      this.colourChange();
      this.randomHitAngle();
    }
    
    if(this.pos.y >= height - this.h){
      this.ang = 360 - this.ang;
      this.colourChange();
      this.randomHitAngle();
    }
  }
  //~
  
  //update the logo
  update(){
    this.hit();
    
    //~angle touch up
    if(this.ang < 0)
      this.ang += 360;
    this.ang %= 360;
    //~
    
    this.pos.x +=  cos(this.ang);
    this.pos.y += -sin(this.ang);
  }
  //~
  
  //cycle thru colours on impact
  colourChange(){
    switch(this.hueCounter){
      case 0:
        this.hue = color(199, 36, 47); //Red 
      break;
      
      case 1:
        this.hue = color(235, 186, 52); //Yellow
      break;
      
      case 2:
        this.hue = color(9, 181, 9); //Green 
      break;
      
      case 3:
        this.hue = color(36, 126, 199); //Blue 
      break;
      
      case 4:
        this.hue = color(147, 52, 235); //Purple
      break;
    }
    
    this.hueCounter++;
    this.hueCounter %= 5;
    
  }
  //~
  
  //calculate random angle +/- on impact
  randomHitAngle(){
    if(random() > 0.5)
      this.ang += round(random(360 * this.ria));
    else
      this.ang -= round(random(360 * this.ria));
  }
  //~
}