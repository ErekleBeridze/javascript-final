const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const timerValue = document.getElementById('timer-value');

let currentPlayer = 'X';
let moves = 0;
let timer;

function handleMove(cellIndex) {
    clearInterval(timer);
    const cell = cells[cellIndex];
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        moves++;
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            resetBoard();
        } else if (moves === 9) {
            alert("It's a draw!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            startTimer();
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            return true;
        }
    }

    return false;
}

function startTimer() {
    let timeLeft = 10;
    timerValue.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            alert(`Time's up! Player ${currentPlayer}'s turn.`);
            startTimer();
        }
    }, 1000);
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    moves = 0;
    clearInterval(timer);
}

startTimer();