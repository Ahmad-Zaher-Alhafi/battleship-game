class Cell {
  #isShot = false;
  #row;
  #column;
  #containsAShip;

  constructor(row, column, containsAShip) {
    this.#row = row;
    this.#column = column;
    this.#containsAShip = containsAShip;
  }

  get isShot() {
    return this.isShot;
  }

  get containsAShip() {
    return this.#containsAShip;
  }

  // takeShot();
}

function createCell(row, column, containsAShip) {
  return new Cell(row, column, containsAShip);
}

export { createCell };
