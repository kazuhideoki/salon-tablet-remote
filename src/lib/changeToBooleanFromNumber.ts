import { FooterItems } from "../app/Store/Types";

// mysqlではbooleanが 0, 1 なのでbooleanに変換する。
export const changeToBooleanFromNumber = (data:FooterItems) => {
  return data.map((value) => {

    //@ts-ignore
    value.is_published = value.is_published === 1 ? true : false;
    //@ts-ignore
    value.on_sidebar = value.on_sidebar === 1 ? true : false;

    return value
    
  })
}