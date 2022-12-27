
let dreidel;
let img;
let scoreDiv;
let dreidelInstance;
let rotation = 60;
let word;
let score =0;
let pot =0;
let isInplay;;
let winner ='';
let spinning =false;
let offset =0;
let clearButton;
let endGame;

function preload() {
  dreidel = loadModel('assets/Dreidel.obj', true);
  img = loadImage('assets/Dreidel_texture.png');
  angleMode(DEGREES);

  endGame=false;
  
  document.getElementById("potValue").innerHTML = `${pot}`;
  document.getElementById("scoreValue").innerHTML = `${score}`;
  isInplay=true;


}

function setup() {
 createCanvas(400, 400, WEBGL);
 textureWrap(CLAMP);
 dreidelInstance = new dreidelObject();

 clearButton = createButton('Start Game');
 clearButton.style('background-color', '#DBAD4A');
 clearButton.style('border', 'none');
 clearButton.style('padding', '20px');
 clearButton.style('font-weight', '800');
 clearButton.style('color', '#fff');
 clearButton.position(400, 400)
 clearButton.mousePressed(resetGame);
}

function resetGame(){
  preload();
  score = 200;
  pot = 1000;
  winner ='';
}

function dreidelObject(){
  this.draw = function(){
  if(mouseX > 0 && mouseX < width/2 && mouseY > 0 && mouseY < height/2){
    rotation= (mouseX*100);
    spinning = true;
    setTimeout(() => {
      text('divided by ' + score(rotation%360))
      changeText(score(rotation%360), rotation%360);
      spinning =false;
    
    }, "2000")
    }
    
    rotateY(rotation);
    noStroke();
    scale(-1, 1)
    texture(img);
    model(dreidel);
   
  }
  
  function score(x) {
    if(x >60 && x < 149 ){
     return 'shin'
    }
    if(x > 150 && x < 201){
      return 'hey'
    }
    if(x > 200 && x < 320){
      return 'gimmel'
    }
    return 'nun'
  }
}

function draw() {
  rotate(180);
  background('#3d5c71');
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, -1);
  dreidelInstance.draw();
  
}

function changeText(text){
  document.getElementById("scoreText").innerHTML = `${text}`;
  changeHText(text);
}

function changeHText(text){
  let hebrewLetter;
  let description;
  switch(text){
    case 'hey':
      hebrewLetter = 'ה';
      word = 'היה  -  Hiya - Was' ;
      description = "Hey You get to take half of the pot. Hey stands for halb, half. If the pot has an odd amount of units, don't try to split that penny, nut, or piece of chocolate in half. Leave the odd item there."
      calculateScore(0);
      break;
    case 'nun':
      hebrewLetter = 'נ‎';
      word = 'נס - Ness - Miracle';
      description = "Nun Absolutely nothing happens. Nun stands for the Yiddish word nul, which means zero. It's time for the player to your left to take a spin."
      break;
    case 'shin':
      hebrewLetter = 'ש';
      word = 'שם - Sham - There'
      description="Shin You put a unit into the pot. Shin is for shenk; yes, that means give";
      calculateScore(1);
      break;
    case 'gimmel':
      hebrewLetter = 'ג';
      word = 'גדול - Gadol - Great/Big' ;
      description = "Gimel You get to take the whole pot! Gimmel stands for gantz, which means whole. Everyone, including you, now puts another unit into the pot, and the person to your left tries his luck at spinning."
      calculateScore(2);
      break;
      
  }
  document.getElementById("HebrewText").innerHTML = `${hebrewLetter}`;
  document.getElementById("Rule").innerHTML = `${description}`;
  document.getElementById("hebrewWord").innerHTML = `${word}`;
  document.getElementById("potValue").innerHTML = `${pot}`;
  document.getElementById("scoreValue").innerHTML = `${score}`;
  document.getElementById("result").innerHTML = `${winner}`;
}

function calculateScore(spinResult){
  if(!isInplay){
    return;
  }
  if(spinResult===0){
    const price = Math.floor(pot/2);
    score = score + price;
    pot = pot - price;
  }
  if(spinResult===1){
    const price = Math.floor(score *.1);
    pot = pot + price;
    score = score - price;
  }
  if(spinResult===2){
    score = score + pot;
    pot = 0;
    isInplay = false;
    winner = 'Player 1 Wins'
    return;
  }
  if(score <1 || pot < 1){
    isInplay = false;
    winner = score < 1 ? "CPU Wins" : " Player 1 Wins"
  }
  
}



