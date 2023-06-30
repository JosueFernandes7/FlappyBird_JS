const bird = document.querySelector('.gameBird')
const gameBoard = document.querySelector('.gameBoard')
const pontuacaoBoard = document.querySelector('.pontuacao')
const start = document.querySelector('.start')
const gameOver = document.querySelector('.gameOver')
const gameBase = document.querySelector('.gameBase')

const backgroundAudio = document.querySelectorAll('audio')[0];
const pointAudio = document.querySelectorAll('audio')[1];
const dieAudio = document.querySelectorAll('audio')[2];

backgroundAudio.volume = .5

const board = gameBoard.getBoundingClientRect()
let birdSetting = bird.getBoundingClientRect()
let posicaoAtual = bird.getBoundingClientRect().bottom
let perdeu = false;
let pontuacao = 0;

let backgroundTimer = null;
let pipeTimer = null
let monitorTimer = null
let downTimer = null
let timer = null
let i = 0


start.addEventListener('click', startGame)

function toggleGameBase() {
  gameBase.classList.toggle("baseMov")
}
function startGame() {
  gameBoard.addEventListener('click', jump)
  pontuacao = 0;
  cleanBoard()
  backgroundAudio.play()
  toggleGameBase()
  updatePoints()
  birdWingMovement()
  handleBackground()
  handleGame()
  start.style.display = 'none'

}
function endGame() {
  clearInterval(downTimer)
  clearInterval(backgroundTimer);
  start.removeEventListener('click', startGame)
  backgroundAudio.pause()
  toggleGameBase()
  clearInterval(timer)
  gameBoard.removeEventListener('click', jump)
  gameOver.style.display = "block"
  setTimeout(() => {
    start.addEventListener('click', startGame);
    gameOver.style.display = "none"
    start.style.display = 'block'
  }, 3000)

}
function pipeAleatPosition(pipe, pipeTop) {
  const alturaPipe = 320;
  const GAP = 135.5;
  pipeTop.style.top = `${-Math.random() * 290}px`
  const distanciaPipeBaixo = +getComputedStyle(document.querySelector('.pipeTop')).top.replace('px', '') + GAP + alturaPipe;
  pipe.style.top = `${distanciaPipeBaixo}px`
}
function handleGame() {
  // zera os timers
  pipeTimer = setInterval(() => {
    clearInterval(monitorTimer)
    cleanBoard()
    const [gamePipe, gamePipeTop] = createPipes();
    gameBoard.append(gamePipe, gamePipeTop)
    pipeAleatPosition(gamePipe, gamePipeTop)

    monitorTimer = setInterval(() => {
      checkColision(gamePipe, gamePipeTop)
    }, 50) // monitora a cada 50ms
  }, 3000)
}
function checkColision(pipe, pipeTop) {
  const pipeSettings = pipe.getBoundingClientRect();
  const pipeTopSettings = pipeTop.getBoundingClientRect();
  birdSetting = bird.getBoundingClientRect()
  let colidiu = false;

  const verifyWidth = pipeSettings.left + pipeSettings.width + birdSetting.width <= birdSetting.left
  const verifyHeight = birdSetting.top + birdSetting.height >= pipeSettings.top;
  const verifyWidthWithoutPipe = pipeSettings.left <= birdSetting.left + birdSetting.width

  const verifyTopHeight = birdSetting.bottom - birdSetting.height <= pipeTopSettings.bottom - 4;


  if (verifyWidthWithoutPipe && (verifyHeight || verifyTopHeight)) {
    colidiu = true
  } else if (verifyWidth) {
    pontuacao++;
    updatePoints()
    pointAudio.play()
    clearInterval(monitorTimer)
  }
  if (colidiu) {
    clearInterval(pipeTimer)
    clearInterval(monitorTimer)
    dieAudio.play()
    endGame()
    pipe.style.right = '195px'
    pipe.style.animation = 'none'

    pipeTop.style.right = '195px'
    pipeTop.style.animation = 'none'

    bird.style.bottom = '80px'
  }

}
function cleanBoard() {
  if (gameBoard.querySelectorAll('.pipe') && gameBoard.querySelector('.pipeTop')) {
    gameBoard.querySelector('.pipe').remove()
    gameBoard.querySelector('.pipeTop').remove()
  }
}
function updatePoints() {
  pontuacaoBoard.innerHTML = pontuacao
}
function createPipes() {
  let gamePipe = document.createElement('img');
  gamePipe.src = "src/assets/images/pipe-green.png"
  gamePipe.classList.add("pipe")

  let gamePipeTop = document.createElement('img');
  gamePipeTop.src = "src/assets/images/pipe-green.png"
  gamePipeTop.classList.add('pipeTop')
  return [gamePipe, gamePipeTop];
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
    if (i % 2 == 0) {
      bird.style.backgroundImage = "url(src/assets/images/bluebird-upflap.png)"
    } else {
      bird.style.backgroundImage = "url(src/assets/images/bluebird-downflap.png)"
    }
    i++;
  }, 300)
}

function handleBackground() {
  let i = 0;
  backgroundTimer = setInterval(() => {
    if (i % 2 == 0) {
      gameBoard.style.backgroundImage = "url(src/assets/images/background-day.png"
    } else {
      gameBoard.style.backgroundImage = "url(src/assets/images/background-night.png"
    }
    i++
  }, 15 * 1000) // a cada um minuto troca o background
}