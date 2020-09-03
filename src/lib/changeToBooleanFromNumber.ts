import { FooterItems } from "../app/Store/Types";

// mysqlではbooleanが 0, 1 なのでbooleanに変換する。
export const changeToBooleanFromNumber = (data:FooterItems) => {
  return data.map((value) => {
    //@ts-ignore
    if (value.is_published === 1) {
      value.is_published = true
    } else {
      value.is_published = false
    }

    return value
    
  })
}