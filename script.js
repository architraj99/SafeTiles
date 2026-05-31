const board = document.getElementById("board");

const restartBtn = document.getElementById("restartBtn");

const SIZE = 6;
const BOMB_COUNT = 6;
let bombs = [];
let gameOver = false;

function placeBombs() {

  bombs = [];

  while (bombs.length < BOMB_COUNT) {

    const random = Math.floor(Math.random() * SIZE * SIZE);

    if (!bombs.includes(random) ) {

      bombs.push(random);
    }
  }
}

function revealBombs() {

  const tiles = document.querySelectorAll(".tile");

  bombs.forEach(index => {

    tiles[index].classList.add("bomb");
    tiles[index].textContent = "💣";
  });

}

function createBoard() {

  board.innerHTML = "";
  gameOver = false;
  placeBombs();

  for (let i = 0; i < SIZE * SIZE; i++) {

    const tile = document.createElement("button");

    tile.classList.add("tile");
    tile.dataset.index = i;

    tile.addEventListener("click", function() {

        if (gameOver) return;

        const index = Number(tile.dataset.index);

        if (bombs.includes(index) ) {

          tile.textContent = "💣";
          tile.classList.add("bomb");

          revealBombs();
          gameOver = true;
          return;
        }

        tile.classList.add("revealed");
    });

    board.appendChild(tile);
  }
}

restartBtn.addEventListener("click", function() {
    createBoard();
});

createBoard();