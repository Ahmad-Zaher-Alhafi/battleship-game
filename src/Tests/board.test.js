import * as abstructTestModule from "./abstructTest";

it("Board cells count is correct", () => {
  expect(abstructTestModule.p1Board.cells.length).toBe(
    abstructTestModule.boardCellsCount
  );
});

it("Board ships count is correct", () => {
  expect(abstructTestModule.p1Board.ships.length).toBe(
    abstructTestModule.p1ShipsData.length
  );
});

it("Ships has correct cells count", () => {
  expect(abstructTestModule.p1Board.ships[0].cells.length).toBe(2);
  expect(abstructTestModule.p1Board.ships[1].cells.length).toBe(1);
});