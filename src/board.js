import * as cellModule from "./cell";
import * as shipModule from "./ship";

class Board {
  #cells = [];
  #ships = [];

  constructor(rowsNumber, shipsData) {
    this.#createCells(rowsNumber);
    this.#createShips(shipsData);
  }

  #createCells(rowsNumber) {
    const columnsNumber = rowsNumber;

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

  recieveHit(cellIndex) {
    const cell = this.#cells[cellIndex];

    if (cell.isShot) return;

    cell.onGotHit();

    if (cell.containsPartOfShip) {
      const ship = this.#ships.find((ship) => ship.cells.includes(cell));
      ship.onGotHit();
    }
  }

  getNotShotCells() {
    return this.#cells.filter((cell) => !cell.isShot);
  }
}

function createBoard(rowsNumber, shipsData) {
  return new Board(rowsNumber, shipsData);
}

export { createBoard };
