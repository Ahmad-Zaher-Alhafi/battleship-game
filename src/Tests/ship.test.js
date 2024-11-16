import * as abstructTestModule from "./abstructTest";

it("Ships has correct cells count", () => {
  expect(abstructTestModule.board.ships[0].cells.length).toBe(2);
  expect(abstructTestModule.board.ships[1].cells.length).toBe(1);
});
