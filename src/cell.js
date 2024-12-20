class Cell {
  #isShot = false;
  #row;
  #column;

  constructor(row, column, containsPartOfShip) {
    this.#row = row;
    this.#column = column;
    this.containsPartOfShip = containsPartOfShip;
  }

  get isShot() {
    return this.#isShot;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  onGotHit() {
    if (this.#isShot) {
      throw("Cell got shot twice");
    }

    this.#isShot = true;
  }
}

function createCell(row, column, containsAShip) {
  return new Cell(row, column, containsAShip);
}

export { createCell };
