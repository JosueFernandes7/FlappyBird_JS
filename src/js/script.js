const bird = document.querySelector('.gameBird')
const gameBoard = document.querySelector('.gameBoard')

const board = gameBoard.getBoundingClientRect()
const birdSetting = bird.getBoundingClientRect()
let posicaoAtual = bird.getBoundingClientRect().bottom
let perdeu = false;

let downTimer = null
let timer = null
let i = 0
gameBoard.addEventListener('click', jump)
function jump() {
  clearInterval(downTimer)
  const salto = 200 // Define a altura do salto

  // Calcula a nova posição com base na posição atual e no salto
  let novaPosicao = posicaoAtual + salto

  if (novaPosicao >= board.height) {
    novaPosicao = board.height - birdSetting.height/2
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
  }, 80)
}
function birdWingMovement() {
  timer = setInterval(() => {
    bird.classList.remove(...["birdUp", "birdDown"])
    if (i % 2 == 0) {
      bird.classList.add("birdUp")
      i++
    } else {
      bird.classList.add("birdDown")
      i--
    }
  }, 300)
}
birdWingMovement()