const body = document.querySelector("body");

var maxNumber = 4; 

function paintBackground() {
  let imageNum = genRandom();
  const image = new Image();
  image.src = `images/${imageNum}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);}

function genRandom () {
  let randomNumber= Math.floor(Math.random() * (parseInt(maxNumber) ));
  randomNumber = parseInt(randomNumber) + 1 ; 
  console.log (randomNumber); 
  return randomNumber; 

}

function init() {
  paintBackground(); 
}

init() ; 
