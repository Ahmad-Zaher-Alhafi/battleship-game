import * as cellModule from "./cell";

class Board {
  #cells = [];
  #cellsCount;

  constructor(cellsData) {
    this.#cellsCount = cellsData.length;
    this.#createCells(cellsData);
  }

  #createCells(cellsData) {
    const rowsNumber = this.#cellsCount / 2;
    const columnsNumber = this.#cellsCount / 2;

    let counter = 0;

    for (let row = 0; row < rowsNumber; row++) {
      for (let column = 0; column < columnsNumber; column++) {
        const cell = cellModule.createCell(
          row,
          column,
          cellsData[counter++].containsAShip
        );

        this.#cells.push(cell);
      }
    }
  }

  get cells() {
    return [...this.#cells];
  }

  // deliverCellHit(cellRow, cellColumn);
  // haveAllShipsGotDestroyed();
}

function createBoard(cellsData) {
  return new Board(cellsData);
}

export { createBoard };
