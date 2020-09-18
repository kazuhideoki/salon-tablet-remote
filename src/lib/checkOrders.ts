import { FooterItems } from "../app/Store/Types";

export const checkOrders = (footerItems: FooterItems) => {

  let result = true
  footerItems.forEach((footerItem, index) => {
    // 昇順でDBから取得しているので、orderがindex+1でないと間違い
    if (footerItem.order !== index + 1) {
      result = false
    }
  })

  return result

}