import { db } from "./db";
import { FooterItems } from "../app/Store/Types";

export const generateCorrectOrdersParams = (data: FooterItems) => {
  const correctedData = data.map((value, index) => {
    value.order = index + 1;
    // return value;
    return { order: value.order, footer_item_id: value.footer_item_id };
  });
  console.log("correctedDataは " + JSON.stringify(correctedData));

  const idParam = correctedData.map((value) => {
    return value.footer_item_id;
  });
  console.log("idParamは " + JSON.stringify(idParam));

  const updateParamList = correctedData.map((value) => {
    return `WHEN ${value.footer_item_id} THEN ${value.order}`;
  });
  const updateParamInCase = updateParamList.join(" ");

  return { updateParamInCase, idParam, correctedData };
};

export const correctOrders = async (data: FooterItems) => {
        const { updateParamInCase, idParam } = generateCorrectOrdersParams(
          data
        );

         await db(
           // ↓文字列を?に挿入しようとすると前後に''が入ってしまうので ＋ で連結した。
           "UPDATE `footer_items` SET `order` = CASE `footer_item_id` " +
             updateParamInCase +
             " END WHERE `footer_item_id` IN (?)",
           // queryは文字列で来るため
           [idParam]
         );
       };