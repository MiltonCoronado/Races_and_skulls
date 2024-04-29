const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const canvas = document.querySelector('#game');
const spanLives = document.querySelector('#lives');
const spantime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');

const context = canvas.getContext('2d');

let canvasSise;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPositions = [];

window.addEventListener('load', setCanvasSize)//con "Window.addEvenlistener" hacemos que el html espere un evento, en este caso que cargue todo el HTML para que se ejecute la Fn "setCancasSize()" y esta Fn ejecuta "startGame". es lo mas recomendable usando un CANVAS!!!
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {
  if(window.innerHeight > window.innerWidth){
    canvasSise = window.innerWidth * 0.8
  } else{
    canvasSise = window.innerHeight * 0.8
  };

  canvas.setAttribute('width', canvasSise);
  canvas.setAttribute('height', canvasSise);

  elementSize = (canvasSise / 10) - 1;

  startGame();
};

function startGame() {
  // console.log({canvasSise, elementSize});

  context.font = elementSize + 'px Verdana';
  context.textAlign = 'start'

  const map = maps[level]

  if(!map){
    gameWin()
    return
  };

  if (!timeStart){
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)

    showRecord()
  };

  const mapRow = map.trim().split('\n');//quita los espacios en blanco del array, luego crea arrays separandolos por saltode linea.
  const mapRowCols = mapRow.map(item => item.trim().split(''))//quita los espacios en blanco de cada array de string, luego separa los string del array en elemento por elemento.
  // console.log(mapRowCols)

  showLives();
  
  enemyPositions = [];
  context.clearRect(0 , 0, canvasSise, canvasSise)

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const postX = elementSize * colIndex;
      const postY = elementSize * (rowIndex + 1);

      if(col === 'O') {
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = postX;
          playerPosition.y = postY;
        }
      }else if (col === 'I') {
        giftPosition.x = postX;
        giftPosition.y = postY;
      } else if(col === 'X') {
        enemyPositions.push({
          x: postX, 
          y: postY,
        })
      }
      context.fillText(emoji, postX , postY)
    })
  });

  movePlayer();
};

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(2) === giftPosition.x.toFixed(2);
  const giftCollisionY = playerPosition.y.toFixed(2) === giftPosition.y.toFixed(2)
  const giftCollision = giftCollisionX && giftCollisionY;

  if(giftCollision){
    levelWin();
  }

  const enemyCollision = enemyPositions.find(item => {
    const enemyCollisionX = item.x.toFixed(2) === playerPosition.x.toFixed(2);
    const enemyCollisionY = item.y.toFixed(2) === playerPosition.y.toFixed(2);
    return enemyCollisionX && enemyCollisionY;
  })

  if(enemyCollision) {
    levelFail();
  }

  context.fillText([emojis['PLAYER']], playerPosition.x, playerPosition.y)
};

function levelWin() {
console.log('subiste de nivel')
level++
startGame();
};

function levelFail(){
  lives--;

  if(lives <= 0){
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
};

function gameWin(){
  console.log('terminaste el juego')
  clearInterval(timeInterval)//Mata al setInterval(showTime, 100)

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;
    
    if(recordTime){
      if(recordTime >= playerTime){
        localStorage.setItem('record_time', playerTime);
      } 
    } else {
      localStorage.setItem('record_time', playerTime);
    }
    console.log({recordTime, playerTime});
};

function showLives(){
  const heartsArray = Array(lives).fill(emojis['HEART']);

  spanLives.innerHTML = heartsArray;
};

function showTime(){
  spantime.innerHTML = Date.now() - timeStart;
};

function showRecord(){
  spanRecord.innerHTML = localStorage.getItem('record_time');
};


//PLAYER MOVEMENT///////////////////////////////////////////
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

window.addEventListener('keydown', moveByKeys)

function moveByKeys(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
  
    case "ArrowDown":
      moveDown();
      break;
  
    case "ArrowLeft":
      moveLeft();
      break;
  
    case "ArrowRight":
      moveRight();
      break;
  
    default:
      break;
  };
};


function moveUp() {
  if((playerPosition.y - elementSize) < elementSize){
    console.log('OUT')
  }else {
    playerPosition.y -= elementSize
    startGame();
  }
};

function moveLeft() {
  if((playerPosition.x - elementSize) < 0){
    console.log('OUT')
  }else {
    playerPosition.x -= elementSize
    startGame();
  }
};

function moveRight() {
  if((playerPosition.x + elementSize) > (canvasSise - elementSize)){
    console.log('OUT')
  }else {
    playerPosition.x += elementSize
    startGame();
  }
};

function moveDown() {
  if((playerPosition.y + elementSize) > canvasSise){
    console.log('OUT')
  }else {
    playerPosition.y += elementSize
    startGame();
  }
};


// context.fillRect(0,0,100,100)
// context.clearRect(0,0,50,50)
// context.clearRect(50,50,50,50)
// context.fillText('Milton',1,25)
// context.textAlign = 'start'//'end', 'right', 'left', 'center'.
// context.font = '25px Verdana'
// context.fillStyle = 'blue'
