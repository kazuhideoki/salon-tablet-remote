import { FooterItems } from "../../../app/Store/Store";

export const checkOrders = (footerItems: FooterItems) => {

  let result = true
  footerItems.forEach((footerItem, index) => {
    if (footerItem.order !== index + 1) {
      result = false
    }
  })

  return result

}