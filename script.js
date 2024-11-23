// script.js

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkForWinner()) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    alert("Draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkForWinner() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
