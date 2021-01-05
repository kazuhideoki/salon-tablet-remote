import { FooterItems } from '../interface/Interface';

export const checkOrders = (footerItems: FooterItems) => {
  let result = true;
  footerItems.forEach((footerItem, index) => {
    // 昇順でDBから取得しているので、orderがindex+1でないと間違い
    if (footerItem.order !== index + 1) {
      result = false;
    }
  });

  return result;
};

export const checkOrdersSidebar = (footerItems: FooterItems) => {
  let result = true;
  const footerItemsOnSidebar = footerItems.filter((value) => {
    return value.order_sidebar !== 0;
  });
  const orderSidebar = footerItemsOnSidebar.map((value) => {
    return value.order_sidebar;
  });
  orderSidebar.sort((a, b) => a - b);

  orderSidebar.forEach((value, index) => {
    if (value !== index + 1) {
      result = false;
    }
  });

  return result;
};
