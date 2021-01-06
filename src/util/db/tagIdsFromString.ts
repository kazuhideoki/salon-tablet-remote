import { Article } from '../interface/Interface';

type Props = Article | { article_id: number; tag_ids: number[] };

export const tagIdsFromString = <T extends Props>(data: T[]): T[] => {
  // tag_idsをnumber[]化する
  const newData = data.map((value) => {
    // 値がある場合のみ(nullではないとき)変換
    if (value.tag_ids) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const parsedTagId: string[] = JSON.parse(value.tag_ids);

      const intArray = parsedTagId.map((str) => parseInt(str, 10));

      value.tag_ids = intArray;
    } else {
      value.tag_ids = [];
    }

    return value;
  });

  return newData;
};
