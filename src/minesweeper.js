// generate player's game board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  // overall game board
  let board = [];


  for(let r = 1; r <= numberOfRows; r++) {
    // single row
    let row = [];

    for(let c = 1; c <= numberOfColumns; c++) {
      // add column to row
      row.push(' ');
    }

    // add row to board
    board.push(row);
  }


  return board;
};



//  generate bomb game board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  // overall game board
  let board = [];


  for(let r = 1; r <= numberOfRows; r++) {
    // Single row
    let row = [];

    for(let c = 1; c <= numberOfColumns; c++) {
      // add column to row
      row.push(null);
    }

    // add row to board
    board.push(row);
  }


  let numberOfBombsPlaced = 0;

  // check if all bombs have been placed
  while(numberOfBombsPlaced < numberOfBombs) {
    // get random indexes
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    // if there is no bomb in the space
    if(board[randomRowIndex][randomColumnIndex] !== 'B') {

      // add bomb to board
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }


  return board;
};


// check adjacent tiles for bombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  // adjacent tiles
  const neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];


  // game board dimensions
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfBombs = 0;

  // check each adjacent tile
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    // check if indices are valid
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

      // check if tile contains bomb
      if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });


  return numberOfBombs;
};


// allow player to flip a tile
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // tile alrady flipped
  if(playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  }

  // tile contains bomb
  else if(bombBoard[rowIndex][columnIndex] === 'B') {
    // place bomb on player's board
    playerBoard[rowIndex][columnIndex] === 'B';
  }

  // tile can be flipped
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};


// print board to console
const printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n'));



// test code
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
