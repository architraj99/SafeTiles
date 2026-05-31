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

function countNearbyBombs(index) {

    const row = Math.floor(index / SIZE);
    const col = index % SIZE;

    let count = 0;

    for(let r= row - 1; r <= row + 1; r++) {

        for(let c = col - 1; c <= col + 1; c++) {

            if(r < 0 || c < 0 || r >= SIZE || c >= SIZE) {
                continue;
            }

            const neighbor = r * SIZE + c;

            if(bombs.includes(neighbor) ) {
                count++;
            }

        }

    }
    
    return count;
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

        if(tile.classList.contains("revealed") ) {
            return;
        }

        tile.classList.add("revealed");
        const count = countNearbyBombs(index);
        tile.textContent = count;
    });

    board.appendChild(tile);
  }
}

restartBtn.addEventListener("click", function() {
    createBoard();
});

createBoard();