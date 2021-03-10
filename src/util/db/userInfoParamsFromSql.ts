/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserInfoFromDB } from '../interface/Interface';

export const userInfoParamsFromSql = (
  userInfo: UserInfoFromDB
): UserInfoFromDB => {
  userInfo.is_admin = userInfo.is_admin === 1 ? true : false;
  userInfo.is_generate_public_page =
    userInfo.is_generate_public_page === 1 ? true : false;
  return userInfo;
};
