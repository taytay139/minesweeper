class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // main game functionality
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    // bomb was hit - game over ******ISSUE WITH IF STATEMENT*******
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over!');
      this._board.print();
    }

    // no safe tiles left - game won
    else if(!this._board.hasSafeTiles()) {
      console.log('Congrats! You win!');
    }

    // user continues playing
    else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}



class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }


  // getter methods
  get playerBoard() {
    return this._playerBoard;
  }


  // other methods
  flipTile(rowIndex, columnIndex) {
    // tile alrady flipped
    if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    }

    // tile contains bomb
    else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
      // place bomb on player's board
      this._playerBoard[rowIndex][columnIndex] === 'B';
    }

    // tile can be flipped
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

    this._numberOfTiles--;
  }


  getNumberOfNeighborBombs(rowIndex, columnIndex) {
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
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;


    // check each adjacent tile
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      // check if indices are valid
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

        // check if tile contains bomb
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          numberOfBombs++;
        }
      }
    });

    return numberOfBombs;
  }


  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }


  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
  }


  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
  }


}


// test code
const g = new Game(3, 3, 3);
g.playMove(1,1);
