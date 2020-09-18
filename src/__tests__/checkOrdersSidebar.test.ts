import { samplefooterItems } from "../stories/lib/sampleFooterItems";
import { checkOrdersSidebar } from "../lib/checkOrdersSidebar";

const footerItems1 = [
  {
    order_sidebar: 1,
  },
  {
    order_sidebar: 2,
  },
  {
    order_sidebar: 4,
  },
  {
    order_sidebar: 5,
  },
  {
    order_sidebar: 3,
  },
];

const footerItems2 = [
  {
    order_sidebar: 1,
  },
  {
    order_sidebar: 2,
  },
  {
    order_sidebar: 2,
  },
  {
    order_sidebar: 4,
  },
  {
    order_sidebar: 5,
  },
];
const footerItems3 = [
  {
    order: 2,
  },
  {
    order: 3,
  },
  {
    order: 4,
  },
  {
    order: 5,
  },
  {
    order: 6,
  },
];

test("checkOrdersSidebar ダブりなしで trueが返る", () => {
  //@ts-ignore
  const result1 = checkOrdersSidebar(footerItems1);
  // const result1 = checkOrders(samplefooterItems)
  expect(result1).toBe(true);
});
test("checkOrdersSidebar ダブリがあって falseが返る", () => {
  //@ts-ignore
  const result2 = checkOrdersSidebar(footerItems2);
  expect(result2).toBe(false);
});
test("checkOrders 1からの連番になってなくて falseが返る", () => {
  //@ts-ignore
  const result3 = checkOrdersSidebar(footerItems3);
  expect(result3).toBe(false);
});

