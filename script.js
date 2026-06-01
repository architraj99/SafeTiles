const board = document.getElementById("board");

const restartBtn = document.getElementById("restartBtn");

const statusEl = document.getElementById("status");

const timerEl = document.getElementById("timer");

const card = document.querySelector(".card");

const SIZE = 6;
const BOMB_COUNT = 6;
let bombs = [];
let gameOver = false;
let revealedTiles = 0;
let seconds = 0;
let timer;

function startTimer() {

    clearInterval(timer);
    seconds = 0;
    timerEl.textContent = "Time: 0s";

    timer = setInterval(function() {

        seconds++;
        timerEl.textContent = "Time: " + seconds + "s";

    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

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

    for(let r = row - 1; r <= row + 1; r++) {

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

function disableBoard() {

    document.querySelectorAll(".tile").forEach(tile => {

        tile.disabled = true;
    });
}

function createBoard() {

  board.innerHTML = "";
  gameOver = false;
  revealedTiles = 0;

  card.classList.remove("win-card", "lose-card");

  statusEl.className = "";
  statusEl.textContent = "Safe Tiles Left: " + (SIZE * SIZE - BOMB_COUNT);
  placeBombs();

  startTimer();

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
          stopTimer();
          gameOver = true;

          disableBoard();
          card.classList.add("lose-card");
    
          statusEl.textContent = "Game Over";
          statusEl.className = "lose";
          return;
        }

        if(tile.classList.contains("revealed") ) {
            return;
        }

        tile.classList.add("revealed");
        revealedTiles++;
        const count = countNearbyBombs(index);
        tile.textContent = count;

        statusEl.textContent = "Safe Tiles Left: " + (SIZE * SIZE - BOMB_COUNT - revealedTiles);

        if(revealedTiles === SIZE * SIZE - BOMB_COUNT) {

            stopTimer();

            gameOver = true;
            disableBoard();
            card.classList.add("win-card");

            statusEl.textContent = "You Won In " + seconds + "s";
            statusEl.className = "win";
        }
    });

    board.appendChild(tile);
  }
}

restartBtn.addEventListener("click", function() {
    createBoard();
});

createBoard(); 