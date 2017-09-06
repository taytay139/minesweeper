'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // main game functionality


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);

      // bomb was hit - game over
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game over!');
        this._board.print();
      }

      // no safe tiles left - game won
      else if (!this._board.hasSafeTiles()) {
          console.log('Congrats! You win!');
        }

        // user continues playing
        else {
            console.log('Current Board: ');
            this._board.print();
          }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // getter methods


  _createClass(Board, [{
    key: 'flipTile',


    // other methods
    value: function flipTile(rowIndex, columnIndex) {
      // tile alrady flipped
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      }

      // tile contains bomb
      else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
          // place bomb on player's board
          this._playerBoard[rowIndex][columnIndex] === 'B';
        }

        // tile can be flipped
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
          }

      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      // adjacent tiles
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [1, 1]];

      // game board dimensions
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;

      var numberOfBombs = 0;

      // check each adjacent tile
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        // check if indices are valid
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

          // check if tile contains bomb
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
            numberOfBombs++;
          }
        }
      });

      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      // overall game board
      var board = [];

      for (var r = 1; r <= numberOfRows; r++) {
        // single row
        var row = [];

        for (var c = 1; c <= numberOfColumns; c++) {
          // add column to row
          row.push(' ');
        }

        // add row to board
        board.push(row);
      }

      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      // overall game board
      var board = [];

      for (var r = 1; r <= numberOfRows; r++) {
        // Single row
        var row = [];

        for (var c = 1; c <= numberOfColumns; c++) {
          // add column to row
          row.push(null);
        }

        // add row to board
        board.push(row);
      }

      var numberOfBombsPlaced = 0;

      // check if all bombs have been placed
      while (numberOfBombsPlaced < numberOfBombs) {
        // get random indexes
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        // if there is no bomb in the space
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {

          // add bomb to board
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();

// test code


var g = new Game(3, 3, 3);
g.playMove(1, 1);