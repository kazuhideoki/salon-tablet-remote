import { ArticleFromDB } from '../interface/Interface';

type Props = ArticleFromDB | { article_id: number; tag_ids: number[] | string };

export const tagIdsFromString = (data: Props[]): Props[] => {
  // tag_idsをnumber[]化する
  const newData = data.map((value) => {
    // 値がある場合のみ(nullではないとき)変換
    if (value.tag_ids) {
      const parsedTagId: string[] = JSON.parse(value.tag_ids as string);

      const intArray = parsedTagId.map((str) => parseInt(str, 10));

      value.tag_ids = intArray;
    } else {
      value.tag_ids = [];
    }

    return value;
  });

  return newData;
};
