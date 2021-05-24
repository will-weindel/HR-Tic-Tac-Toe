
//setup intial game-board
function initialize() {
  var gameSquares = document.querySelectorAll('td');

  gameSquares.forEach((el) => {
    el.classList.add('game-square');
    el.addEventListener('click', () => {
      el.innerText = getNextXorO(el);
    })
  });
}

function getNextXorO(element) {
  console.log(element);
}



initialize();