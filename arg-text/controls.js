let textInput, textsList, betweenSlider, shownSlider;

let texts = [];
/*
let texts = [
    ':. -= .:',
    "THERE", 
    '=- -:. . -.=',
    'IS', 
    'NO', 
    'WAR', 
    '-. -=',
    "IN", 
    '.: :- -:. = : -',
    'BA SING SE',
  ];
*/
function initControls() {
  textInput = document.querySelector("#text-input")
  // textsList = document.querySelector("#texts-list")
  const form = document.querySelector("form#controls")
  
  betweenSlider = new p5.Element(
    document.getElementById("between-slider")
  )
    
  shownSlider = new p5.Element(
    document.getElementById('shown-slider')
  )


  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  console.log(textInput)

  textInput.addEventListener('input', updateTextField)

  textInput.value = texts.join('\n')
}

function updateTextField(e){
  let t = e.target.value.trim();
  
  if(t == null) return;

  
  texts = t.split('\n').map( x => x.trim()).filter(x => x.length != 0)
}

function saveAsGif(){
  const fr = Math.round(frameRate())

  // idk why the duration has to be doubled
  const duration = texts.length * (shownSlider.value()*fr + betweenSlider.value()*fr) * 2 
  const delay = frameCount % duration

  saveGif('arg_text', duration, {
    units: 'frames',
    delay
  })
}