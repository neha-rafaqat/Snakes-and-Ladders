const board = document.getElementById('board');
const message = document.getElementById('message');
const boardSize = 10;
const totalCells = boardSize * boardSize;

let playerPositions = [1, 1]; // Positions for Player 1 and Player 2
let currentPlayer = 0; // 0 for Player 1, 1 for Player 2

const snakes = { 23: 3, 30: 10, 39: 20, 47: 26, 56: 36, 71: 10, 78: 24, 86: 66, 98: 79 };
const ladders = { 13: 27, 16: 67, 28: 32, 33: 39, 42: 63, 53: 87, 62: 80, 72: 90, 85: 95 };


// Create board
for (let row = 0; row < boardSize; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    if (row % 2 === 0) {
        for (let col = boardSize; col > 0; col--) {
            const cellNumber = (boardSize - row) * boardSize - (boardSize - col);
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${cellNumber}`;
            cell.textContent = cellNumber;
            rowDiv.appendChild(cell);
        }
    } else {
        for (let col = 1; col <= boardSize; col++) {
            const cellNumber = (boardSize - row - 1) * boardSize + col;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${cellNumber}`;
            cell.textContent = cellNumber;
            rowDiv.appendChild(cell);
        }
    }

    board.appendChild(rowDiv);
}

// Place players
const placePlayers = () => {
    document.querySelectorAll('.player').forEach(p => p.remove());

    playerPositions.forEach((position, index) => {
        const player = document.createElement('div');
        player.className = 'player';
        player.style.backgroundColor = index === 0 ? 'red' : 'blue'; // Player 1: red, Player 2: blue
        const currentCell = document.getElementById(`cell-${position}`);
        currentCell.appendChild(player);
    });
};

// Roll dice
const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    message.textContent = `Player ${currentPlayer + 1} rolled a ${diceRoll}!`;

    let nextPosition = playerPositions[currentPlayer] + diceRoll;

    if (nextPosition > totalCells) {
        message.textContent += " You need an exact roll to win!";
        return;
    }

    playerPositions[currentPlayer] = nextPosition;

    // Check for snakes
    if (snakes[nextPosition]) {
        message.textContent += ` Oh no, a snake! Player ${currentPlayer + 1} slides down to ${snakes[nextPosition]}.`;
        playerPositions[currentPlayer] = snakes[nextPosition];
    }
    // Check for ladders
    else if (ladders[nextPosition]) {
        message.textContent += ` Great! A ladder! Player ${currentPlayer + 1} climbs up to ${ladders[nextPosition]}.`;
        playerPositions[currentPlayer] = ladders[nextPosition];
    }

    // Check if the player wins
    if (playerPositions[currentPlayer] === totalCells) {
        message.textContent = `Congratulations! Player ${currentPlayer + 1} wins!`;
        return;
    }

    placePlayers();

    // Switch turns to the other player
    currentPlayer = (currentPlayer + 1) % 2;
    message.textContent += ` It's now Player ${currentPlayer + 1}'s turn.`;
};

// Reset game
const resetGame = () => {
    playerPositions = [1, 1];
    currentPlayer = 0;
    message.textContent = "Player 1's turn: Roll the dice to start!";
    placePlayers();
};

placePlayers();
