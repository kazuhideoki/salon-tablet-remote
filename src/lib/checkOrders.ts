import { FooterItems } from "../app/Store/Types";

export const checkOrders = (footerItems: FooterItems) => {

  let result = true
  footerItems.forEach((footerItem, index) => {
    if (footerItem.order !== index + 1) {
      result = false
    }
  })

  return result

}