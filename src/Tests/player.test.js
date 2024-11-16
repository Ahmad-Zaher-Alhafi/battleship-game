import * as abstructTestModule from "./abstructTest";

it("Player has correct name and id", () => {
  expect(abstructTestModule.p1.name).toBe("zaherha");
  expect(abstructTestModule.p1.id).toBe(1);
});
