const gameBird = document.querySelector('.gameBird')
let i = 0;
window.addEventListener('click',(e) => {
})
let timer = null;
function birdWingMovement() {
    timer = setInterval(() => {
      if(i % 2 == 0) {
        gameBird.classList.add("birdUp")
      i++;
    } else {
      gameBird.classList.add("birdDown")
      i--;
      gameBird.classList.remove(...["birdUp","birdDown"])
    }
  }, 300)
}