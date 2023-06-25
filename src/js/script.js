const bird = document.querySelector('.gameBird')
const gameBoard = document.querySelector('.gameBoard')

const board = gameBoard.getBoundingClientRect()
let birdSetting = bird.getBoundingClientRect()
let posicaoAtual = bird.getBoundingClientRect().bottom
let perdeu = false;
let pontuacao = 0;

let pipeTimer = null
let monitorTimer = null
let downTimer = null
let timer = null
let i = 0



gameBoard.addEventListener('click', jump)

birdWingMovement()
handleGame()
function handleGame() {
  // zera os timers
  pipeTimer = setInterval(() => {
    clearInterval(monitorTimer)
    deletePipeIfExists()
    const gamePipe = createPipe();
    gameBoard.append(gamePipe)
    monitorTimer = setInterval(() => {
      const pipe = document.querySelector('.pipe');
      checkColision(pipe)
    }, 50) // monitora a cada 100ms
  }, 3000)
}

function checkColision(pipe) {
  const pipeSettings = pipe.getBoundingClientRect();
  birdSetting = bird.getBoundingClientRect()
  let colidiu = false;

  const verifyHeight =  birdSetting.top+birdSetting.height >= pipeSettings.top;
  const verifyWidth = pipeSettings.left + pipeSettings.width + birdSetting.width <= birdSetting.left 

  if(verifyWidth && verifyHeight) {
    colidiu = true
  } else if (verifyWidth) {
    pontuacao++;
    clearInterval(monitorTimer)
  }

  if (colidiu) {
    pipe.style.right = '195px'
    pipe.style.animation = 'none'
    clearInterval(pipeTimer)
    clearInterval(monitorTimer)
  }
}

function deletePipeIfExists() {
  if (gameBoard.children[2]) {
    gameBoard.children[2].remove()
  }
}
function createPipe() {
  let gamePipe = document.createElement('img');
  gamePipe.src = "src/assets/images/pipe-green.png"
  gamePipe.classList.add("pipe")
  return gamePipe;
}

function jump() {
  clearInterval(downTimer)
  const salto = 200 // Define a altura do salto

  // Calcula a nova posição com base na posição atual e no salto
  let novaPosicao = posicaoAtual + salto

  if (novaPosicao >= board.height) {
    novaPosicao = board.height - birdSetting.height / 2
  }
  // Atualiza a posição do personagem
  bird.style.bottom = novaPosicao + 'px'

  // Atualiza a posição atual
  posicaoAtual = novaPosicao
  downMovement()
}
function downMovement() {
  downTimer = setInterval(() => {
    // Calcula a nova posição com base na posição atual na queda de 10px a cada 0.1s
    let novaPosicao = parseFloat(posicaoAtual - 10);

    if (novaPosicao <= 70) {
      novaPosicao = 70;
      perdeu = true;
    }
    // Atualiza a posição atual
    posicaoAtual = novaPosicao;
    // Atualiza a posição do personagem
    bird.style.bottom = novaPosicao + "px"
  }, 50)
}
function birdWingMovement() {
  timer = setInterval(() => {
    // bird.classList.remove(...["birdUp", "birdDown"])
    if (i % 2 == 0) {
      bird.style.backgroundImage = "url(src/assets/images/bluebird-upflap.png)"
    } else {
      bird.style.backgroundImage = "url(src/assets/images/bluebird-downflap.png)"
    }
    i++;
  }, 300)
}