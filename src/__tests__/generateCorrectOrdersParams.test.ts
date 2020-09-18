import { generateCorrectOrdersParams } from "../lib/correctOrders";

const footerItems = [
  {
    footer_item_id: 0,
    order: 2,
  },
  {
    footer_item_id: 200,
    order: 3
  },
  {
    footer_item_id: 59,
    order: 50
  },
  {
    footer_item_id: 10,
    order: 33
  },
]

test("generateCorrectOrdersParamsの返り値が正しい", () => {
  const {
    updateParamInCase,
    idParam,
    correctedData,
    //@ts-ignore
  } = generateCorrectOrdersParams(footerItems);
  expect(idParam[1]).toBe(200);

  const orders = correctedData.map((value) => {
    return value.order
  })

  expect(
    orders.reduce(function(a, x) {return a + x;}, 0)
  ).toBe(10);
});
