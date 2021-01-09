import { test, expect } from '@jest/globals';
import { FooterItems } from '../interface/Interface';
import { generateCorrectOrdersParams } from './correctOrders';
import { generateCorrectOrdersSidebarParams } from './correctOrders';

const footerItems = [
  {
    footer_item_id: 0,
    order: 2,
  },
  {
    footer_item_id: 200,
    order: 3,
  },
  {
    footer_item_id: 59,
    order: 50,
  },
  {
    footer_item_id: 10,
    order: 33,
  },
] as FooterItems;

test('generateCorrectOrdersParamsの返り値が正しい', () => {
  const { idParam, correctedData } = generateCorrectOrdersParams(footerItems);
  expect(idParam[1]).toBe(200);

  const orders = correctedData.map((value) => {
    return value.order;
  });

  expect(
    orders.reduce(function (a, x) {
      return a + x;
    }, 0)
  ).toBe(10);
});

const footerItemsSideBar = [
  {
    footer_item_id: 0,
    order_sidebar: 2,
  },
  {
    footer_item_id: 200,
    order_sidebar: 0,
  },
  {
    footer_item_id: 59,
    order_sidebar: 50,
  },
  {
    footer_item_id: 10,
    order_sidebar: 33,
  },
] as FooterItems;

test('generateCorrectOrdersSidebarParamsの返り値が正しい', () => {
  const { idParam, correctedData } = generateCorrectOrdersSidebarParams(
    footerItemsSideBar
  );

  expect(idParam[2]).toBe(10);

  const order_sidebars = correctedData.map((value) => {
    return value.order_sidebar;
  });

  expect(
    order_sidebars.reduce(function (a, x) {
      return a + x;
    }, 0)
  ).toBe(6);
});
