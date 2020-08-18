import {noop} from "./utils";
import {isPersistable} from "./persistable";

it("should be persistable", () => {
  expect(isPersistable({persist: noop})).toBe(true);
  expect(isPersistable(Object.assign([], {persist: noop}))).toBe(true);
});

it("should not be persistable", () => {
  expect(isPersistable("string")).toBe(false);
  expect(isPersistable(42)).toBe(false);
  expect(isPersistable(false)).toBe(false);
  expect(isPersistable(true)).toBe(false);
  expect(isPersistable([])).toBe(false);
});
