import * as boardModule from "./board";

it("Board created correctly", () => {
  const p1CellsData = [
    { containsAShip: true },
    { containsAShip: false },
    { containsAShip: false },
    { containsAShip: true },
  ];

  const board = boardModule.createBoard(p1CellsData);
  expect(board.cells.length).toBe(4);

  expect(board.cells[0].containsAShip).toBe(true);
  expect(board.cells[1].containsAShip).toBe(false);
  expect(board.cells[2].containsAShip).toBe(false);
  expect(board.cells[3].containsAShip).toBe(true);
});
