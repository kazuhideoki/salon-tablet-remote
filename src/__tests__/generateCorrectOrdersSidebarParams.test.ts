import { generateCorrectOrdersSidebarParams } from "../lib/correctOrdersSidebar";

const footerItems = [
  {
    footer_item_id: 0,
    order_sidebar: 2,
    on_sidebar: true,
  },
  {
    footer_item_id: 200,
    order_sidebar: 0,
    on_sidebar: false,
  },
  {
    footer_item_id: 59,
    order_sidebar: 50,
    on_sidebar: true,
  },
  {
    footer_item_id: 10,
    order_sidebar: 33,
    on_sidebar: true,
  },
];

test("generateCorrectOrdersSidebarParamsの返り値が正しい", () => {
  const {
    updateParamInCase,
    idParam,
    correctedData,
    //@ts-ignore
  } = generateCorrectOrdersSidebarParams(footerItems);
  console.log(
    "generateCorrectOrdersSidebarParamsは" +
    //@ts-ignore
      generateCorrectOrdersSidebarParams(footerItems)
  );
  
  expect(idParam[2]).toBe(10);

  const order_sidebars = correctedData.map((value) => {
    return value.order_sidebar;
  });

  expect(
    order_sidebars.reduce(function(a, x) {
      return a + x;
    }, 0)
  ).toBe(6);
});
