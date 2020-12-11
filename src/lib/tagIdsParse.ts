export const tagIdsParse = (data: any) => {
  // tag_idsをnumber[]化する
  const newData = data.map((value) => {
    // 値がある場合のみ(nullではないとき)変換
    if (value.tag_ids) {

      // まずstringをstring[]にして,number[]に変換
      //@ts-ignore
      const parsedTagId = JSON.parse(value.tag_ids);
      
      const intArray = parsedTagId.map((str) => parseInt(str, 10));
     
      value.tag_ids = intArray;

    } else {
      value.tag_ids = []
    }
    
    return value
  })

  return newData
}