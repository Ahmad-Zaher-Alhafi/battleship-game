class Cell {
  isShot = false;

  constructor(row, column, containsAShip) {
    this.row = row;
    this.column = column;
    this.containsAShip = containsAShip;
  }

  get isShot() {
    return this.isShot;
  }

  // takeShot();
}
