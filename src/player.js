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

  get board() {
    return this.#board;
  }

  hasLostAllShips() {
    return this.#board.areAllShipsDestroyed();
  }

  recieveHit(cellIndex) {
    this.#board.recieveHit(cellIndex);
  }
}

export { Player };
