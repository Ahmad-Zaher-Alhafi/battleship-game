class Ship {
  #length;
  #cells = [];
  #takenHitsCount = 0;

  constructor(cells) {
    this.#cells = cells;
    this.#length = cells.length;
  }

  get cells() {
    return [...this.#cells];
  }

  get isDestroyed() {
    return this.#takenHitsCount >= this.#length;
  }

  onGotHit() {
    ++this.#takenHitsCount;
  }
}

function createShip(cells) {
  return new Ship(cells);
}

export { createShip };
