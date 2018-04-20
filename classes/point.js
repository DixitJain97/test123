class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.value = null;
	}

	/**
	 * Returns weather the Point has a ship assigned or is null
	 *
	 * @readonly
	 * @memberof Point
	 */
	get isEmpty() {
		return this.value === null;
	}

	/**
	 * Returns the key of the assigned ship or `.`
	 *
	 * @readonly
	 * @memberof Point
	 */
	get occupant() {
		return this.value ? this.value.key : '.';
	}
}

module.exports = Point;
