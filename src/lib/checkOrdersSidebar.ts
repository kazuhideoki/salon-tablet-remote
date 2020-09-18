import { FooterItems } from "../app/Store/Types";

export const checkOrdersSidebar = (footerItems: FooterItems) => {

  let result = true;
  const footerItemsOnSidebar = footerItems.filter((value) => {
    return value.order_sidebar !== 0
  })
  const onSidebars = footerItemsOnSidebar.map((value) => {
    return value.order_sidebar
  })

  //重複した値があったら resultはfalse
  // 重複のみをリスト + それがあるか？(length)
  result =
    onSidebars.filter(function(x, i, self) {
      return self.indexOf(x) !== self.lastIndexOf(x);
    }).length === 0;

  return result;
};
