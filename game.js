console.log(maps);

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');


const startGame = () => {
  game.fillRect(0,0,100,100)//siempre se empieza a dibujar desde el contexto que en este caso es 2d. las coordenadas clearRect(x, y, width, height)
}

window.addEventListener('load', startGame);//esta linea es necesaria para encapsular el codigo y que no falle el canvas.