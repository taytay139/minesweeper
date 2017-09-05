'use strict';

// Generate Player's Game Board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  // Overall game board
  var board = [];

  for (var r = 1; r <= numberOfRows; r++) {
    // Single row
    var row = [];

    for (var c = 1; c <= numberOfColumns; c++) {
      // Add column to row
      row.push(' ');
    }

    // Add row to board
    board.push(row);
  }

  return board;
};

//  Generate Bomb Game Board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  // Overall game board
  var board = [];

  for (var r = 1; r <= numberOfRows; r++) {
    // Single row
    var row = [];

    for (var c = 1; c <= numberOfColumns; c++) {
      // Add column to row
      row.push(null);
    }

    // Add row to board
    board.push(row);
  }

  var numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    // Possible to add a bomb on top of an already existing bomb
    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced++;
  }

  return board;
};

// Print Board to console
var printBoard = function printBoard(board) {
  return console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

// Test code
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);