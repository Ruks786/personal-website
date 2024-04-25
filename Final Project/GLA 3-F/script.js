const board = document.getElementById('board');
let currentPlayer = 'red';
let gameMatrix = [];

// Initialize game board
function initializeBoard() {
  for (let i = 0; i < 6; i++) {
    gameMatrix[i] = [];
    for (let j = 0; j < 3; j++) {
      gameMatrix[i][j] = '';
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.addEventListener('click', () => dropPiece(j));
      board.appendChild(cell);
    }
  }
}

// Drop a piece into the selected column
function dropPiece(col) {
  for (let i = 5; i >= 0; i--) {
    if (gameMatrix[i][col] === '') {
      gameMatrix[i][col] = currentPlayer;
      const cell = document.querySelector(`[data-row="${i}"][data-col="${col}"]`);
      cell.textContent = currentPlayer;
      cell.style.backgroundColor = currentPlayer;
      if (checkWin(i, col)) {
        alert(currentPlayer.toUpperCase() + ' wins!');
        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
      return;
    }
  }
}

// Check for a winning condition
function checkWin(row, col) {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal
    [-1, 1] // Diagonal 
  ];

  for (let dir of directions) {
    const [dv, dc] = dir;
    let count = 1;

    // Check in one direction
    let newRow = row + dv;
    let newCol = col + dc;
    while (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 3 && gameMatrix[newRow][newCol] === currentPlayer) {
      count++;
      newRow += dv;
      newCol += dc;
    }

    // Check in the opposite direction
    newRow = row - dv;
    newCol = col - dc;
    while (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 3 && gameMatrix[newRow][newCol] === currentPlayer) {
      count++;
      newRow -= dv;
      newCol -= dc;
    }

    if (count >= 3) return true;
  }

  return false;
}

// Restart the game
function restartGame() {
  board.innerHTML = '';
  currentPlayer = 'red';
  gameMatrix = [];
  initializeBoard();
}


initializeBoard();
