/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TUserInfo } from '../interface/Interface';

export const userInfoParamsFromSql = (userInfo: TUserInfo) => {
  //@ts-ignore
  userInfo.is_first_sign_in = userInfo.is_first_sign_in === 1 ? true : false;
  //@ts-ignore
  userInfo.is_admin = userInfo.is_admin === 1 ? true : false;
  //@ts-ignore
  userInfo.is_generate_public_page =
    //@ts-ignore
    userInfo.is_generate_public_page === 1 ? true : false;

  return userInfo;
};
