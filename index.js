// Import stylesheets


let score = 0;
let cWidth = 600;
let cHeight = 400;
let boxSize = 50;
let boxArray = [];
let timer = 0;
let stopGame = false;



const canvas = document.getElementById('app');
let ctx = canvas.getContext("2d");

paintBg();
startGame();

// Write Javascript code!


function paintBg() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, cWidth, cHeight);
  var centerX = cWidth;
  var centerY = 0;
  var radius = 80;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();

  ctx.fillRect(0, cHeight - 50, cWidth, cHeight);

  paintScore();
}


function paintScore() {
  ctx.font = 20 + "px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 28);
}

function paintBox(x, y, text) {
  ctx.font = 10 + "px Comic Sans MS";
  ctx.fillStyle = "yellow"
  ctx.fillRect(x, y, boxSize, boxSize);
  ctx.fillStyle = "black";
  ctx.fillText(text, x + 10, y + boxSize/2);

}

function createBox() {
  let sign = Math.floor(Math.random() * 2);
  let result = 0;
  let text = "";
  let speed = 0;
  if (sign == 0) {// plus
    while (1) {
      let first = Math.floor(Math.random() * 10);
      let second = Math.floor(Math.random() * 10);
      if (first + second < 10) {
        result = first + second;
        text = first + "+" + second;
        break;
      }
    }
  } else if (sign == 1) { // minus
    while (1) {
      let first = Math.floor(Math.random() * 19);
      let second = Math.floor(Math.random() * 10);
      if (first - second < 10 && first - second >= 0) {
        result = first - second;
        text = ""+first + "-" + second;
        break;
      }
    }
  }
  let x = Math.floor(Math.random() * (cWidth - boxSize));
  while (isCollision())
    x = Math.floor(Math.random() * (cWidth - boxSize));
  var box = new myBox();
  box.posX = x;
  box.posY = 0.0;
  box.speed = 0.1+Math.floor(Math.random() * 30)/10;
  box.text = text;
  box.res = result;
  return box;
}

function isCollision(x2,y2) {
  for (let i = 0; i < boxArray.length; i++) {
    let x1 = boxArray[i].posX;
    let y1 = boxArray[i].posY;
    if (x1 < x2 + boxSize &&
      x1 + boxSize > x2 &&
      y1 < y2 + boxSize &&
      y1 + boxSize > y2) {
      return true;
    }
  }
  return false;
}

function myBox() {
  this.posX = 0;
  this.posY = 0;
  this.speed = 0;
  this.text = "";
  this.res = 0;
}



document.addEventListener('keydown', function (event) {
    switch (event.which) {
      case 48: checkBox(0); break; //Left key
      case 49: checkBox(1); break; //Up key
      case 50: checkBox(2); break; //Right key
      case 51: checkBox(3); break; //Down key
      case 52: checkBox(4); break; //A key
      case 53: checkBox(5); break; //W key
      case 54: checkBox(6); break; //D key
      case 55: checkBox(7); break; //S key
      case 56: checkBox(8); break; //A key
      case 57: checkBox(9); break; //W key
    }
});


function checkBox(val) {
  for (let i = 0; i<boxArray.length;i++){
    if (boxArray[i].res == val ){
      boxArray.splice(i,1);
      score+=1;
      playSound();
      return;
    }
  }
}

function startGame() {
  timer = new Date();
  boxArray = [];
  score = 0;
  boxArray.push(createBox());
  requestAnimationFrame(() => {updateGame()});
}

function updateGame(){
  if (new Date().getTime() - timer.getTime()> 3000){

    boxArray.push(createBox());
    timer = new Date();
  }
  paintBg();
  paintScore();
  for (let i =0; i<boxArray.length;i++){
    boxArray[i].posY += boxArray[i].speed;
    paintBox(boxArray[i].posX,boxArray[i].posY,boxArray[i].text);
  }
  checkGroundCollision();
  
  if (!stopGame)
    requestAnimationFrame(() => {updateGame()});
}

function playSound(){

}

function checkGroundCollision(){
  for (let i = 0; i< boxArray.length; i++){
    if (boxArray[i].posY + boxSize >= cHeight - 50){
      stopGame = true;
      console.log("STOP GAME")
    }
  }
}