import { FooterItems } from "../app/Store/Types";

export const checkOrdersSidebar = (footerItems: FooterItems) => {

  let result = true;
  const footerItemsOnSidebar = footerItems.filter((value) => {
    return value.order_sidebar !== 0
  })
  const orderSidebar = footerItemsOnSidebar.map((value) => {
    return value.order_sidebar
  })
  orderSidebar.sort((a, b) => a - b);

  orderSidebar.forEach((value, index) => {
    if (value !== index + 1) {
      result = false
    }
  })

  return result;
};
