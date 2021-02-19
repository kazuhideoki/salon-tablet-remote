import { test, expect } from '@jest/globals';
import { checkIsCorrectOrder } from './checkIsCorrectOrder';
import { checkIsCorrectOrderSidebar } from './checkIsCorrectOrder';
import { FooterItems } from '../interface/Interface';

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
] as FooterItems;

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
] as FooterItems;
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
] as FooterItems;

test('checkIsCorrectOrder trueが返る', () => {
  const result1 = checkIsCorrectOrder(footerItems1);
  expect(result1).toBe(true);
});
test('checkIsCorrectOrder 連番になってなくて falseが返る', () => {
  const result2 = checkIsCorrectOrder(footerItems2);
  expect(result2).toBe(false);
});
test('checkIsCorrectOrder 1からの連番になってなくて falseが返る', () => {
  const result3 = checkIsCorrectOrder(footerItems3);
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
] as FooterItems;

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
] as FooterItems;
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
] as FooterItems;

test('checkIsCorrectOrderSidebar ダブりなしで trueが返る', () => {
  const result1 = checkIsCorrectOrderSidebar(footerItemsSideBar1);
  // const result1 = checkIsCorrectOrder(samplefooterItems)
  expect(result1).toBe(true);
});
test('checkIsCorrectOrderSidebar ダブリがあって falseが返る', () => {
  const result2 = checkIsCorrectOrderSidebar(footerItemsSideBar2);
  expect(result2).toBe(false);
});
test('checkIsCorrectOrder 1からの連番になってなくて falseが返る', () => {
  const result3 = checkIsCorrectOrderSidebar(footerItemsSideBar3);
  expect(result3).toBe(false);
});
