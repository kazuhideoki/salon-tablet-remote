import { T_user_id, TInfoBarWithoutId, T_selected_article_id, TInfoBar } from "../app/Store/Types";
import { db } from "./db";

export const createInitInfoBar = async (user_id: T_user_id) => {  
  const params: TInfoBarWithoutId = {
    user_id: user_id,
    info_bar_type: "shop_name",
    scrolling_sentence: "",
    scrolling_animation_duration: 8,
    selected_article_id: null as T_selected_article_id,
  };

  await db(`INSERT INTO info_bar SET ?`, params);

  //@ts-ignore
  const data: TInfoBar[] = await db(
    // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
    "SELECT * FROM info_bar WHERE user_id = ?",
    user_id
  );

  return data
}