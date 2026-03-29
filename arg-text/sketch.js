let img;
let flowingBuffer;
let textGraphic;
let maskedGraphic;

let milis = 0;
let playing = true;
let currentTextIndex = -1; // Tracks text changes

function setup() {
  pixelDensity(1);
  createCanvas(640, 480);

  img = generateBackground(width, height);

  textGraphic = createGraphics(width * 0.8, height * 0.8);
  textGraphic.textWrap(WORD);
  textGraphic.textSize(80);
  textGraphic.textAlign(CENTER, CENTER);
  textGraphic.textStyle(BOLD);
  
  // Create an extra graphic buffer for masking
  maskedGraphic = createGraphics(width * 0.8, height * 0.8);

  flowingBuffer = generateBackground(textGraphic.width, textGraphic.height);

  initControls();
  
  frameRate(30)
}

function draw() {
  milis += deltaTime;

  if (frameCount % 2 == 0) {
    shuffleBackground();
  }

  updateFlowingBuffer();
  image(img, 0, 0);

  updateText()
  applyMask()

  image(maskedGraphic, (width - textGraphic.width) / 2, (height - textGraphic.height) / 2);
}

function mousePressed() {
  if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) return;

  if (playing) noLoop();
  else loop();

  playing = !playing;
}

function shuffleBackground() {
  img.loadPixels();
  
  // Directly writing to array without function call overhead
  for (let i = 0; i < img.pixels.length; i += 4) {
    const r = getRandomPixelFast();
    img.pixels[i] = r;
    img.pixels[i + 1] = r;
    img.pixels[i + 2] = r;
    // We skip i+3 (alpha) since it's already 255 from generateBackground
  }
  
  img.updatePixels();
}

function updateText() {
  const showDuration = shownSlider.value() * 1000;
  const gapDuration = betweenSlider.value() * 1000;
  const periodDuration = showDuration + gapDuration;
  const timeInCycle = milis % periodDuration;

  // no text to display or in text gap
  if (texts.length == 0 || timeInCycle > showDuration) {
    textGraphic.clear();
    return;
  }
  
  const cycleIndex = Math.floor(milis / periodDuration);
  const index = cycleIndex % texts.length;

  textGraphic.clear();
  textGraphic.fill(255);
  textGraphic.text(texts[index], 0, 0, textGraphic.width, textGraphic.height);
}

function applyMask() {
  // OPTIMIZATION: Native Canvas Compositing instead of looping over pixels
  maskedGraphic.clear();
  maskedGraphic.image(flowingBuffer, 0, 0);
  
  // 'destination-in' keeps the existing image (flowing buffer) 
  // ONLY where the new image (textGraphic) is opaque.
  maskedGraphic.drawingContext.globalCompositeOperation = 'destination-in';
  maskedGraphic.image(textGraphic, 0, 0);
  maskedGraphic.drawingContext.globalCompositeOperation = 'source-over'; // reset
}

// OPTIMIZATION: Native Math object is significantly faster than p5's random/map
function getRandomPixelFast() {
  return Math.floor(Math.random() * 230)  ;
}

function generateBackground(w, h) {
  let res = createImage(w, h);
  res.loadPixels();

  for (let i = 0; i < res.pixels.length; i += 4) {
    let val = getRandomPixelFast();
    res.pixels[i] = val;
    res.pixels[i + 1] = val;
    res.pixels[i + 2] = val;
    res.pixels[i + 3] = 255;
  }

  res.updatePixels();
  return res;
}

function updateFlowingBuffer() {
  // OPTIMIZATION: Use native copy to shift image down 1px instead of array iteration
  flowingBuffer.copy(
    flowingBuffer, 
    0, 0, flowingBuffer.width, flowingBuffer.height - 1, // Source
    0, 1, flowingBuffer.width, flowingBuffer.height - 1  // Destination
  );

  // Now we ONLY need to generate the top single row of pixels
  flowingBuffer.loadPixels();
  for (let i = 0; i < flowingBuffer.width * 4; i += 4) {
    const r = getRandomPixelFast();
    flowingBuffer.pixels[i] = r;
    flowingBuffer.pixels[i + 1] = r;
    flowingBuffer.pixels[i + 2] = r;
  }
  flowingBuffer.updatePixels();
}