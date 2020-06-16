import { cipher } from "../module/bcrypt";


test("cipher", () => {

  const bcrypt = cipher("0000");

  expect(bcrypt).toBe(typeof "文字列");
})