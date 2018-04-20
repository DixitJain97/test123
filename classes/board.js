const Ships = require('./ships.js');
const Point = require('./point.js');

class Board {
	constructor(width = 10, height = 10) {
		this.width = width;
		this.height = height;
		this.board = [];
		this.ships = this.generateShips();
	}

	/**
	 * Setups a clean board
	 *
	 * @memberof Board
	 */
	setup() {
		for (let x = 0; x < this.width; x++) {
			this.board[x] = [];
			for (let y = 0; y < this.height; y++) {
				// Every coordinate has a Point
				this.board[x][y] = new Point(x, y);
			}
		}
	}

	/**
	 * Generates the ships to be used in the board
	 *
	 * @returns {Object}
	 * @memberof Board
	 */
	generateShips() {
		return {
			tug: new Ships.Tug(),
			destroyer: new Ships.Destroyer(),
			submarine: new Ships.Submarine(),
			battleship: new Ships.Battleship(),
			cruiser: new Ships.Cruiser()
		}
	}

	/**
	 * Places ships randomly on the board
	 *
	 * @memberof Board
	 */
	placeShips() {
		const directions = [
			{x: 1, y: 0},
			{x: -1, y: 0},
			{x: 0, y: 1},
			{x: 0, y: -1}
		];

		for (const key in this.ships) {
			const ship = this.ships[key];
			let shipWasPlaced = false;

			while (!shipWasPlaced) {
				// Start with a random position
				const randomPosition = {
					x: Math.floor(Math.random() * this.width),
					y: Math.floor(Math.random() * this.height)
				};
				const randomPoint = this.board[randomPosition.x][randomPosition.y];

				// Get a random direction (of 4 available)
				const direction = directions[Math.floor(Math.random() * directions.length)];

				// Find open seas
				const openSpaces = this._findOpenSeas(ship, randomPoint, direction);

				// If openSpaces is an array of Points
				if (openSpaces && openSpaces.length) {
					openSpaces.forEach(point => {
						// Assign ship to each open point
						point.value = ship;
					});

					// Can now end the search for a space
					shipWasPlaced = true;
				}
			}
		}
	}

	/**
	 * Locates available spaces on the board for the ship
	 *
	 * @param {Tug|Destroyer|Submarine|Battleship|Cruiser} ship
	 * @param {Point} point
	 * @param {Object} direction
	 * @param {Array} [availableSpaces=[]]
	 * @returns {Array|null}
	 * @memberof Board
	 */
	_findOpenSeas(ship, point, direction, availableSpaces = []) {
		if (!point || !point.isEmpty) {
			// Reached a dead end
			return null;
		}

		// Add current point to the list of available spaces
		availableSpaces = availableSpaces.concat(point);

		if (ship.size === availableSpaces.length) {
			// Found open spaces necessary
			return availableSpaces;
		}

		// Look for remaining spaces
		const nextX = point.x + direction.x;
		const nextY = point.y + direction.y;
		// Verify next point is valid
		const nextPoint = this.board[nextX] ? this.board[nextX][nextY] : null;

		// Keep looking
		return this._findOpenSeas(ship, nextPoint, direction, availableSpaces);
	}

	/**
	 * Prints the board
	 *
	 * @memberof Board
	 */
	print() {
		let rows = [];
		for (let y = 0; y < this.height; y++) {
			rows[y] = "";
			for (let x = 0; x < this.width; x++) {
				rows[y] = rows[y] + this.board[x][y].occupant + " ";
			}
		}

		console.log(rows.join('\n'));
	}
}

module.exports = Board;
