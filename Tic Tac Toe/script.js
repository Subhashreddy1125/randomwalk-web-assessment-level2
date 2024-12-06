// Selecting DOM elements
const board = document.getElementById("game-board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const playerXScore = document.getElementById("player-x");
const playerOScore = document.getElementById("player-o");

// Initial game setup
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };
let boardState = Array(9).fill(null); // To track cell values

// Winning combinations
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initializeGame() {
  board.innerHTML = ""; // Clear any previous grid
  boardState.fill(null); // Reset the board state
  gameActive = true;
  currentPlayer = "X";
  status.textContent = "Player X's Turn";

  // Create 9 grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i; // Store index for logic
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;

  // Ignore clicks on already-taken cells or if the game is over
  if (boardState[cellIndex] || !gameActive) return;

  // Mark the cell
  boardState[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  // Check for win or draw
  if (checkWinner(currentPlayer)) {
    status.textContent = `🎉 Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScore();
    gameActive = false;
  } else if (boardState.every(cell => cell)) {
    status.textContent = "It's a 🤝 Draw!";
    gameActive = false;
  } else {
    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check if the current player has won
function checkWinner(player) {
  return winningPatterns.some(pattern =>
    pattern.every(index => boardState[index] === player)
  );
}

// Update the score
function updateScore() {
  playerXScore.textContent = `Player X: ${scores.X}`;
  playerOScore.textContent = `Player O: ${scores.O}`;
}

// Reset the game
resetButton.addEventListener("click", initializeGame);

// Start the game
initializeGame();
