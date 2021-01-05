import { UserInfo } from '../interface/Interface';
import { db } from './db';
import { userInfoParamsFromSql } from './userInfoParamsFromSql';

export const checkIsGeneratePubulicPage = async (
  slug: string
): Promise<UserInfo | null> => {
  try {
    const data = (await db(`SELECT * FROM user_info`)) as UserInfo[];

    const target = data.filter((value) => {
      return value.public_page_slug === slug && value.is_generate_public_page;
    });

    if (target.length) {
      return userInfoParamsFromSql(target[0]);
    } else {
      return null;
    }
  } catch (err) {
    throw `checkIsGeneratePubulicPage: ${err}`;
  }
};
