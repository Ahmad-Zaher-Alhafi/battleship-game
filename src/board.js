import * as cellModule from "./cell";
import * as shipModule from "./ship";

class Board {
  #cells = [];
  #ships = [];

  constructor(cellsCount, shipsData) {
    this.#createCells(cellsCount);
    this.#createShips(shipsData);
  }

  #createCells(cellsCount) {
    const rowsNumber = cellsCount / 2;
    const columnsNumber = cellsCount / 2;

    for (let row = 0; row < rowsNumber; row++) {
      for (let column = 0; column < columnsNumber; column++) {
        const cell = cellModule.createCell(row, column, false);
        this.#cells.push(cell);
      }
    }
  }

  #createShips(shipsData) {
    shipsData.forEach((shipData) => {
      const shipsCells = this.#cells.filter(
        (cell) =>
          cell.row >= shipData.rowStart &&
          cell.row <= shipData.rowEnd &&
          cell.column >= shipData.columnStart &&
          cell.column <= shipData.columnEnd
      );

      shipsCells.forEach((cell) => {
        cell.containsPartOfShip = true;
      });

      const ship = shipModule.createShip(shipsCells);
      this.#ships.push(ship);
    });
  }

  get cells() {
    return [...this.#cells];
  }

  get ships() {
    return [...this.#ships];
  }

  areAllShipsDestroyed() {
    return this.#ships.every((ship) => ship.isDestroyed === true);
  }

  recieveHit(cellRow, cellColumn) {
    const cell = this.#cells.find(
      (cell) => cell.row === cellRow && cell.column === cellColumn
    );

    if (cell.isShot) return;

    cell.onGotHit();

    if (cell.containsPartOfShip) {
      const ship = this.#ships.find((ship) => ship.cells.includes(cell));
      ship.onGotHit();
    }
  }
}

function createBoard(cellsCount, shipsData) {
  return new Board(cellsCount, shipsData);
}

export { createBoard };
