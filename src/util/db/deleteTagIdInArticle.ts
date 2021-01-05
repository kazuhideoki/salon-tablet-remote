import { db } from './db';
import { tagIdsFromString } from './tagIdsFromString';

export const deleteTagIdInArticle = async (tag_id: number, user_id: number) => {
  try {
    // ★まずarticleのtag_idsの該当タグを消す
    const data0 = (await db(
      `SELECT article_id, tag_ids FROM articles WHERE user_id = ?`,
      user_id
    )) as { article_id: number; tag_ids: number[] }[];

    const article_ids = data0.map((value) => {
      return value.article_id;
    });
    // パースしてtag_idsをnumber[]にする
    const parsedData = tagIdsFromString(data0) as {
      article_id: number;
      tag_ids: number[];
    }[];

    // 該当tag_idを取り除いたtag_idsの入ったdataを新たに生成
    const newData = parsedData.map((value) => {
      // 該当tag_idが含まれていたらその部分のみ削除する
      if (value.tag_ids.includes(tag_id)) {
        const new_tag_ids = value.tag_ids.filter((value) => {
          return value !== tag_id;
        });
        value.tag_ids = new_tag_ids;
        return value;
      } else {
        return value;
      }
    });

    // DBのデータ型似合わせてstring化
    const stringifiedNewData = newData.map((value) => {
      // tag_idsの中身がなくなったらDBの型NULLに合わせてnullにする
      if (!value.tag_ids.length) {
        return {
          article_id: value.article_id,
          tag_ids: null,
        };
      }

      // ※number[]とstringが違うので、別々のtypeを設定する予定
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      value.tag_ids = JSON.stringify(value.tag_ids);
      return value;
    });
    const newTagIds = stringifiedNewData.map((value) => {
      return value.tag_ids;
    });

    // 同時にarticlesの複数のrowをupdateする ELT FIELD の関数を使う
    // （参考） https://qiita.com/maxima/items/ee87d9bea31eddf667e0
    await db(
      `UPDATE articles SET tag_ids = ELT(FIELD(article_id, ? ), ? ) WHERE article_id IN ( ? )`,
      [article_ids, newTagIds, article_ids]
    );
  } catch (err) {
    throw `deleteTagIdInArticle: ${err}`;
  }
};
