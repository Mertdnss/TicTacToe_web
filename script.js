
const cellBtn = document.querySelectorAll(".cell");
const rounDcounter = document.querySelector(".rounDcounter");
const restartBtn = document.querySelector(".restart-btn");
const statusText = document.querySelector(".status-text");

const player = "X";
const bot = "O";

let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let isPlayerTurn = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || !isPlayerTurn) {
        return;
    }

    makeMove(clickedCellIndex, player);
    isPlayerTurn = false;

    if (checkWin(gameState, player)) {
        endGame("Kazandın!");
        return;
    } else if (isDraw(gameState)) {
        endGame("Berabere!");
        return;
    }

    statusText.innerHTML = 'Bot düşünüyor...';
    // Botun hamlesi için küçük bir gecikme ekleyelim
    setTimeout(() => {
        const bestMove = getBestMove(gameState);
        makeMove(bestMove, bot);

        if (checkWin(gameState, bot)) {
            endGame("Bot Kazandı!");
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
    return winningConditions.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function isDraw(board) {
    return board.every(cell => cell !== "");
}

function endGame(message) {
    statusText.innerHTML = message;
    gameActive = false;
}

function handleRestartGame() {
    gameActive = true;
    isPlayerTurn = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `Sıradaki Oyuncu: <span class="rounDcounter">X</span>`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
    document.querySelector('.rounDcounter').innerHTML = 'X';
}

// Minimax Algoritması
function getBestMove(board) {
    let bestVal = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = bot;
            let moveVal = minimax(board, 0, false);
            board[i] = ""; // Hamleyi geri al
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
