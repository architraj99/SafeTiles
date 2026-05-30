const board = document.getElementById("board");

const restartBtn = document.getElementById("restartBtn");

const SIZE = 6;

function createBoard() {

    board.innerHTML = "";

    for(let i = 0; i < SIZE * SIZE; i++) {

        const tile = document.createElement("button");
        tile.classList.add("tile");
        
        tile.addEventListener("click", function() {

            tile.classList.add("revealed");
        });

        board.appendChild(tile);
    }

}

restartBtn.addEventListener("click", function() {
    createBoard();
});

createBoard();