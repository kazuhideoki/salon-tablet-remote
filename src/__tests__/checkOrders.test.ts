import { checkOrders } from "../pages/api/lib/checkOrders";
import { samplefooterItems } from "../stories/footerItems";

const footerItems1 = [
  {
    order: 1
  },
  {
    order: 2
  },
  {
    order: 3
  },
  {
    order: 4
  },
  {
    order: 5
  },
]

const footerItems2 = [
  {
    order: 1
  },
  {
    order: 2
  },
  {
    order: 2
  },
  {
    order: 4
  },
  {
    order: 5
  },
]

test("checkOrders trueが返る", () => {
  
  //@ts-ignore
  const result1 = checkOrders(footerItems1)
  // const result1 = checkOrders(samplefooterItems)
  expect(result1).toBe(true);

});
test("checkOrders falseが返る", () => {
  
  //@ts-ignore
  const result2 = checkOrders(footerItems2)
  expect(result2).toBe(false);

});
