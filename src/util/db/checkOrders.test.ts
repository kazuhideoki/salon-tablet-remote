import { test, expect } from '@jest/globals';
import { checkOrders } from './checkOrders';
import { checkOrdersSidebar } from './checkOrders';

const footerItems1 = [
  {
    order: 1,
  },
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
];

const footerItems2 = [
  {
    order: 1,
  },
  {
    order: 2,
  },
  {
    order: 2,
  },
  {
    order: 4,
  },
  {
    order: 5,
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

test('checkOrders trueが返る', () => {
  //@ts-ignore
  const result1 = checkOrders(footerItems1);
  // const result1 = checkOrders(samplefooterItems)
  expect(result1).toBe(true);
});
test('checkOrders 連番になってなくて falseが返る', () => {
  //@ts-ignore
  const result2 = checkOrders(footerItems2);
  expect(result2).toBe(false);
});
test('checkOrders 1からの連番になってなくて falseが返る', () => {
  //@ts-ignore
  const result3 = checkOrders(footerItems3);
  expect(result3).toBe(false);
});

const footerItemsSideBar1 = [
  {
    order_sidebar: 1,
  },
  {
    order_sidebar: 2,
  },
  {
    order_sidebar: 3,
  },
  {
    order_sidebar: 4,
  },
  {
    order_sidebar: 5,
  },
];

const footerItemsSideBar2 = [
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
const footerItemsSideBar3 = [
  {
    order_sidebar: 2,
  },
  {
    order_sidebar: 3,
  },
  {
    order_sidebar: 4,
  },
  {
    order_sidebar: 5,
  },
  {
    order_sidebar: 6,
  },
];

test('checkOrdersSidebar ダブりなしで trueが返る', () => {
  //@ts-ignore
  const result1 = checkOrdersSidebar(footerItemsSideBar1);
  // const result1 = checkOrders(samplefooterItems)
  expect(result1).toBe(true);
});
test('checkOrdersSidebar ダブリがあって falseが返る', () => {
  //@ts-ignore
  const result2 = checkOrdersSidebar(footerItemsSideBar2);
  expect(result2).toBe(false);
});
test('checkOrders 1からの連番になってなくて falseが返る', () => {
  //@ts-ignore
  const result3 = checkOrdersSidebar(footerItemsSideBar3);
  expect(result3).toBe(false);
});
