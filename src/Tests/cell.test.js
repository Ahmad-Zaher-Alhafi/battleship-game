import * as abstructTestModule from "./abstructTest";

it("Cell can be shot", () => {
  let cell = abstructTestModule.hitCell(0, 0);
  expect(cell.isShot).toBe(true);
});

it("Cell can not be shot twice", () => {
  let cell = abstructTestModule.hitCell(0, 0);
  cell = abstructTestModule.hitCell(0, 0);
  expect(cell.isShot).toBe(true);
});
