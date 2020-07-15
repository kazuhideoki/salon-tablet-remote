import { TArticles } from "../../../app/Store/Store"

export const tagIdsParse = (data: TArticles) => {
  // tag_idsをnumber[]化する
  const newData = data.map((value) => {
    // 値がある場合のみ(nullではないとき)変換
    if (value.tag_ids) {

      // まずstringをstring[]にして,number[]に変換
      //@ts-ignore
      const parsedTagId = JSON.parse(value.tag_ids);
      console.log("parsedTagIdは " + JSON.stringify(parsedTagId) + " typeは " + typeof value.tag_ids);
      
      const intArray = parsedTagId.map((str) => parseInt(str, 10));
      console.log("intArrayは " + JSON.stringify(intArray) + " typeは " + typeof intArray);
      
      value.tag_ids = intArray;
      console.log("value.tag_idsは " + JSON.stringify(value.tag_ids) + " typeは " + typeof value.tag_ids);
  
      console.log(
        "valueは " + JSON.stringify(value));
    } else {
      value.tag_ids = []
      console.log("NULLのときのvalue.tag_idsは " + JSON.stringify(value.tag_ids));
    }
    
    return value
  })

  console.log("newDataは " + JSON.stringify(newData));

  return newData
}