// Import stylesheets
import './style.css';


let score = 0;
let cWidth = 600;
let cHeight = 400;


// Write Javascript code!
const canvas = document.getElementById('app');
let ctx = canvas.getContext("2d");


function paintBg(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cWidth, cHeight);
  console.log("loading")
}

window.onload = function s(){
  console.log("lslsls")
  paintBg();
}



