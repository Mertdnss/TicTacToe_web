const cellBtn = document.querySelectorAll(".cell");
const rounDcounter = document.querySelector(".rounDcounter");
const restartBtn = document.querySelector(".restart-btn");
const statusText = document.querySelector(".status-text");
const strike = document.querySelector(".strike");

const player = "X";
const bot = "O";

let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let isPlayerTurn = false;

const winningConditions = [
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },
    { combo: [0, 4, 8], strikeClass: "strike-diag-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diag-2" },
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || !isPlayerTurn) {
        return;
    }

    makeMove(clickedCellIndex, player);

    const playerWin = checkWin(gameState, player);
    if (playerWin) {
        endGame("Kazandın!", playerWin.strikeClass);
        return;
    } else if (isDraw(gameState)) {
        endGame("Berabere!");
        return;
    }

    isPlayerTurn = false;
    botTurn();
}

function botTurn() {
    statusText.innerHTML = 'Bot düşünüyor...';
    setTimeout(() => {
        const bestMove = getBestMove(gameState);
        makeMove(bestMove, bot);

        const botWin = checkWin(gameState, bot);
        if (botWin) {
            endGame("Bot Kazandı!", botWin.strikeClass);
        } else if (isDraw(gameState)) {
            endGame("Berabere!");
        } else {
            statusText.innerHTML = `Sıradaki Oyuncu: <span class="rounDcounter">X</span>`;
            isPlayerTurn = true;
        }
    }, 750);
}

function makeMove(index, currentPlayer) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        const cell = document.querySelector(`[data-index='${index}']`);
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
    }
}

function checkWin(board, currentPlayer) {
    for (const condition of winningConditions) {
        const { combo, strikeClass } = condition;
        if (combo.every(index => board[index] === currentPlayer)) {
            return { strikeClass: strikeClass };
        }
    }
    return null;
}

function isDraw(board) {
    return board.every(cell => cell !== "");
}

function endGame(message, strikeClass) {
    statusText.innerHTML = message;
    gameActive = false;
    if (strikeClass) {
        strike.classList.add(strikeClass);
    }
}

function startGame() {
    gameActive = true;
    isPlayerTurn = false;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `Sıradaki Oyuncu: <span class="rounDcounter">O</span>`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
    document.querySelector('.rounDcounter').innerHTML = 'O';
    strike.className = "strike";
    botTurn();
}


function handleRestartGame() {
    startGame();
}

// Minimax Algorithm
function getBestMove(board) {
    let bestVal = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = bot;
            let moveVal = minimax(board, 0, false);
            board[i] = ""; // Undo the move
            if (moveVal > bestVal) {
                move = i;
                bestVal = moveVal;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, bot)) return 10 - depth;
    if (checkWin(board, player)) return depth - 10;
    if (isDraw(board)) return 0;

    if (isMaximizing) {
        let bestVal = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = bot;
                bestVal = Math.max(bestVal, minimax(board, depth + 1, false));
                board[i] = "";
            }
        }
        return bestVal;
    } else {
        let bestVal = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = player;
                bestVal = Math.min(bestVal, minimax(board, depth + 1, true));
                board[i] = "";
            }
        }
        return bestVal;
    }
}

cellBtn.forEach((cell, index) => {
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestartGame);

startGame();