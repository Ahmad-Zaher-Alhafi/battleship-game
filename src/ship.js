class Ship {
  #isDestroyed = false;
  #length;
  #cells = [];
  #takenHitsCount = 0;

  constructor(cells) {
    this.#cells = cells;
    this.#length = cells.length;
  }

  get isDestroyed() {
    return this.#isDestroyed;
  }

  get cells() {
    return [...this.#cells];
  }

  isDestroyed() {
    return this.#takenHitsCount >= this.#length;
  }

  //getHit();
}

function createShip(cells) {
  return new Ship(cells);
}

export { createShip };
