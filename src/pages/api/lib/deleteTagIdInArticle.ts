import { db } from "./db";
import { tagIdsParse } from "../lib/tagIdsParse";
import {
  T_tag_ids,
  T_tag_id,
  T_user_id,
  T_article_id,
} from "../../../app/Store/Store";

export const deleteTagIdInArticle = async (tag_id: T_tag_id, user_id: T_user_id) => {
  // ★まずarticleのtag_idsの該当タグを消す
      const data0: any = await db(`SELECT article_id, tag_ids FROM articles WHERE user_id = ?`, user_id);
      console.log("data0は " + JSON.stringify(data0)); 

      const article_ids: T_article_id[] = data0.map((value) => {
        return value.article_id;
      });

      // パースしてtag_idsをnumber[]にする
      const parsedData: {article_id: T_article_id, tag_ids: number[] }[] = tagIdsParse(data0);
      console.log("parsedDataは " + JSON.stringify(parsedData))
      
      // 該当tag_idを取り除いたtag_idsの入ったdataを新たに生成
      const newData = parsedData.map((value) => {
      
        // 該当tag_idが含まれていたらその部分のみ削除する
        if (value.tag_ids.includes(tag_id)) {
          const new_tag_ids = value.tag_ids.filter((value) => {
            return value !== tag_id
          })
          value.tag_ids = new_tag_ids;
          return value;

        } else {
          return value
        }

      })
      console.log("tags/deleteのnewDataは " + JSON.stringify(newData));

      // DBのデータ型似合わせてstring化
      const stringifiedNewData:{article_id: T_article_id,tag_ids: T_tag_ids}[] = newData.map((value) => {
        // tag_idsの中身がなくなったらDBの型NULLに合わせてnullにする
        if (!value.tag_ids.length) {
          return {
            article_id: value.article_id,
            tag_ids: null,
          }
        }
        //@ts-ignore
        value.tag_ids = JSON.stringify(value.tag_ids);
        return value
      })
      console.log(
        "tags/deleteのstringifiedNewDataは " +
          JSON.stringify(stringifiedNewData)
      );

      const newTagIds = stringifiedNewData.map((value) => {
        return value.tag_ids
      })
      
      // 同時にarticlesの複数のrowをupdateする ELT FIELD の関数を使う
      // （参考） https://qiita.com/maxima/items/ee87d9bea31eddf667e0
      const data1: any = await db(
        `UPDATE articles SET tag_ids = ELT(FIELD(article_id, ? ), ? ) WHERE article_id IN ( ? )`,
        [article_ids, newTagIds, article_ids]
      );
}