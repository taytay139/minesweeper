// Generate Player's Game Board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  // Overall game board
  let board = [];

  for(let r = 1; r <= numberOfRows; r++) {
    // Single row
    let row = [];

    for(let c = 1; c <= numberOfColumns; c++) {
      // Add column to row
      row.push(' ');
    }

    // Add row to board
    board.push(row);
  }

  return board;
};


//  Generate Bomb Game Board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  // Overall game board
  let board = [];

  for(let r = 1; r <= numberOfRows; r++) {
    // Single row
    let row = [];

    for(let c = 1; c <= numberOfColumns; c++) {
      // Add column to row
      row.push(null);
    }

    // Add row to board
    board.push(row);
  }

  let numberOfBombsPlaced = 0;

  while(numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    if(board[randomRowIndex][randomColumnIndex] !== 'B') {
      
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};


// Print Board to console
const printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n'));



// Test code
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);
