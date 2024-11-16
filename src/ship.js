class Ship {
  #isDestroyed = false;
  #length;
  #cells = [];

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

  //getHit();
}

function createShip(cells) {
  return new Ship(cells);
}

export { createShip };
