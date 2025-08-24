document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const gameOverMessage = document.getElementById("game-over-message");
    const restartButton = document.getElementById("restart-button");
    let currentPlayer = "X";
    let gameOver = false;

    function createCell() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleCellClick);
        return cell;
    }

    function handleCellClick(event) {
        if (gameOver || event.target.textContent !== "" || currentPlayer !== "X") {
            return;
        }

        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            showWinner(`${currentPlayer} wins!`);
            return;
        } else {
            currentPlayer = "O";
        }

        if (checkDraw()) {
            showWinner("It's a draw!");
        } else if (!gameOver) {
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        const cells = document.querySelectorAll(".cell");
        let availableCells = Array.from(cells).filter(cell => cell.textContent === "");

        if (availableCells.length > 0) {
            const bestMove = findBestMove();
            bestMove.textContent = "O";

            if (checkWinner()) {
                showWinner("O wins!");
                return;
            } else {
                currentPlayer = "X";
            }

            if (checkDraw() && !gameOver) {
                showWinner("It's a draw!");
            }
        }
    }

    function showWinner(message) {
        gameOverMessage.textContent = message;
        gameOverMessage.style.display = "block";
        gameOver = true;
        restartButton.style.display = "block";
    }

    function checkWinner() {
        const cells = document.querySelectorAll(".cell");
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombinations) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        const cells = document.querySelectorAll(".cell");
        return Array.from(cells).every(cell => cell.textContent !== "");
    }

    function findBestMove() {
        const cells = document.querySelectorAll(".cell");
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombinations) {
            const [a, b, c] = combo;
            const combination = [cells[a], cells[b], cells[c]];

            if (combination.filter(cell => cell.textContent === "O").length === 2 && combination.some(cell => cell.textContent === "")) {
                return combination.find(cell => cell.textContent === "");
            }

            if (combination.filter(cell => cell.textContent === "X").length === 2 && combination.some(cell => cell.textContent === "")) {
                return combination.find(cell => cell.textContent === "");
            }
        }

        if (cells[4].textContent === "") return cells[4];

        const availableCells = Array.from(cells).filter(cell => cell.textContent === "");
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }

    restartButton.addEventListener("click", function () {
        location.reload();
    });

    for (let i = 0; i < 9; i++) {
        board.appendChild(createCell());
    }
});
