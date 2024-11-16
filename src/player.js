class Player {
  #id;
  #name;
  #board;

  constructor(id, name, board) {
    this.#id = id;
    this.#name = name;
    this.#board = board;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  hasLostAllShips() {
    return this.#board.areAllShipsDestroyed();
  }

  recieveHit(cellRow, cellColumn) {
    this.#board.recieveHit(cellRow, cellColumn);
  }
}

export { Player };
