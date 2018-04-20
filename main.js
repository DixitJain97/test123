const Board = require('./classes/board.js');

const board = new Board();
board.setup();
board.placeShips();
board.print();
