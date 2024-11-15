class Player {
  #id;
  #name;
  #board;

  constructor(id, name, board) {
    this.#id = id;
    this.#name = name;
    this.#board = board;
  }

  // Shoot(cellRow, cellColumn);
  // GetHot(cellRow, cellColumn);
}

function createPlayer(id, name, board) {
  return new Player(id, name, board);
}

export { createPlayer };
