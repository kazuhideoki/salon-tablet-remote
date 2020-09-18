import { db } from "./db";
import { FooterItems } from "../app/Store/Types";

export const correctOrdersSidebar = async (data: FooterItems) => {
  const wrogValues = data.filter((value, index) => {
    return value.order_sidebar !== 0
  });
  const correctedData = wrogValues.map((value, index) => {
    value.footer_item_id = index + 1
    return {
      order_sidebar: value.on_sidebar,
      footer_item_id: value.footer_item_id,
    };
  });
  console.log("correctedDataは " + JSON.stringify(correctedData));

  const idParam = correctedData.map((value) => {
    return value.footer_item_id;
  });
  console.log("idParamは " + JSON.stringify(idParam));

  const updateParamList = correctedData.map((value) => {
    return `WHEN ${value.footer_item_id} THEN ${value.order_sidebar}`;
  });
  const updateParamInCase = updateParamList.join(" ");



  const data2 = await db(
    // ↓文字列を?に挿入しようとすると前後に''が入ってしまうので ＋ で連結した。
    "UPDATE `footer_items` SET `order_sidebar` = CASE `footer_item_id` " +
      updateParamInCase +
      " END WHERE `footer_item_id` IN (?)",
    // queryは文字列で来るため
    [idParam]
  );
};
