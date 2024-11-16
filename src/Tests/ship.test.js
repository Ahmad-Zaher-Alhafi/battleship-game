import * as abstructTestModule from "./abstructTest";

it("Ships has correct cells count", () => {
  expect(abstructTestModule.p1Board.ships[0].cells.length).toBe(2);
  expect(abstructTestModule.p1Board.ships[1].cells.length).toBe(1);
});

function findShipOfCell(cell) {
  const ship = abstructTestModule.p1Board.ships.find((ship) =>
    ship.cells.includes(cell)
  );

  return ship;
}

it("Ship got hit", () => {
  const cell = abstructTestModule.hitCell(0, 0);
  const ship = findShipOfCell(cell);
  expect(ship.isDestroyed).toBe(false);
});

it("Ship got destroyed", () => {
  let cell = abstructTestModule.hitCell(0, 0);
  let ship = findShipOfCell(cell);
  expect(ship.isDestroyed).toBe(false);

  cell = abstructTestModule.hitCell(1, 1);
  ship = findShipOfCell(cell);
  expect(ship.isDestroyed).toBe(true);
});
