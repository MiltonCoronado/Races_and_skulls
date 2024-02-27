const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

let canvasSise;
let elementSize;

window.addEventListener('load', setCanvasSize)//con "Window.addEvenlistener" hacemos que el html espere un evento, en este caso que cargue todo el HTML para que se ejecute la Fn "resize" y esta Fn ejecuta "startGame". es lo mas recomendable usando un CANVAS!!!
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
  console.log({canvasSise, elementSize});

  context.font = elementSize + 'px Verdana';
  context.textAlign = 'start'

  const map = maps[2]
  const mapRow = map.trim().split('\n');//quita los espacios en blanco del array, luego crea arrays separandolos por saltode linea.
  const mapRowCols = mapRow.map(item => item.trim().split(''))//quita los espacios en blanco de cada array de string, luego separa los string del array en elemento por elemento.
  console.log(mapRowCols)
  
  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const postX = elementSize * colIndex;
      const postY = elementSize * (rowIndex + 1);
      context.fillText(emoji, postX , postY)
      console.log({row, rowIndex, col, colIndex})
    })
  });
};

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
  console.log('Me quiero mover hacia arriba')
};

function moveLeft() {
  console.log('Me quiero mover a la izquierda')
};

function moveRight() {
  console.log('Me quiero mover a la derecha')
};

function moveDown() {
  console.log('Me quiero mover hacia abajo')
};


// context.fillRect(0,0,100,100)
// context.clearRect(0,0,50,50)
// context.clearRect(50,50,50,50)
// context.fillText('Milton',1,25)
// context.textAlign = 'start'//'end', 'right', 'left', 'center'.
// context.font = '25px Verdana'
// context.fillStyle = 'blue'