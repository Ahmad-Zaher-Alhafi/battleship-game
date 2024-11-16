import * as abstructTestModule from "./abstructTest";

it("Ships has correct cells count", () => {
  expect(abstructTestModule.p1Board.ships[0].cells.length).toBe(2);
  expect(abstructTestModule.p1Board.ships[1].cells.length).toBe(1);
});
