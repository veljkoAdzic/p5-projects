// const density = '@#O%+=|i-:.       '; 
const density = 'Ñ@#W$9876543210?!abc;:+=-,._       ';
// const density = 'Ñ@W$875421?!bc:+-,_       ';
let capture;

const size = 10;

function setup() {
  createCanvas(640, 480);
  
  capture = createCapture(VIDEO);
  capture.size(width/size, height/size);
  
  capture.hide();
}

function draw() {
  background(20);
  
  capture.loadPixels();
  for(let i = 0; i < capture.width; i++){
    for(let j = 0; j < capture.height; j++){
      let ind = ( i + j * capture.width ) * 4;
      
      let r = capture.pixels[ind + 0],
          g = capture.pixels[ind + 1],
          b = capture.pixels[ind + 2];
      let avg =  (r+g+b) / 3 ;
      
      noStroke();
      fill(220);
      
      
      let len = density.length;
      let charInd = floor( map(avg, 0, 255, len, 0) );
      
      textSize(size);
      textAlign(CENTER, CENTER);
      text(density.charAt(charInd), i * size + size*0.5, j * size + size*0.5 );
    }
  }
  
  // image(capture, 0, 0);
}

function grapscale(img){
  let res = createImage(width/size, height/size);
  
  img.loadPixels();
  res.loadPixels();
  
  for(let y = 0; y < res.height; y++ ){
  for(let x = 0; x < res.width; x++ ){
    let ind = x + y * res.width;
    let section = img.get(x*size, y*size, size, size);
    let avg;
    
    section.loadPixels();
    for(let i = 0; i < section.length; i++){
      avg += brightness(section.pixels[i]);
    }
    
    avg = floor(avg / (size*size));
    
    res.pixels[ind] = color(avg);
    
  }}
  
  res.updatePixels();
  
  return res;
}