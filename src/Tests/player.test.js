import * as abstructTestModule from "./abstructTest";

it("Player has correct name and id", () => {
  expect(abstructTestModule.p1.name).toBe("zaherha");
  expect(abstructTestModule.p1.id).toBe(1);
});

it("Has lost all ships", () => {
  abstructTestModule.hitCell(0, 0);
  abstructTestModule.hitCell(0, 1);
  abstructTestModule.hitCell(1, 1);

  expect(abstructTestModule.p1.hasLostAllShips()).toBe(true);
});
