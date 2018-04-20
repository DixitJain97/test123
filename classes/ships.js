class Ship {
	constructor(options) {
		this.size = options.size;
	}

	/**
	 * Here I could add methods that are relevant to gameplay
	 * like damageShip() or isShipDestroyed(), etc.
	*/
}

class Tug extends Ship {
	constructor() {
		super({size: 2});
		this.key = 'T';
	}
}

class Destroyer extends Ship {
	constructor() {
		super({size: 3});
		this.key = 'D';
	}
}

class Submarine extends Ship {
	constructor() {
		super({size: 3});
		this.key = 'S';
	}
}

class Battleship extends Ship {
	constructor() {
		super({size: 4});
		this.key = 'B';
	}
}


class Cruiser extends Ship {
	constructor() {
		super({size: 5});
		this.key = 'C';
	}
}

module.exports = {
	Tug,
	Destroyer,
	Submarine,
	Battleship,
	Cruiser
}
