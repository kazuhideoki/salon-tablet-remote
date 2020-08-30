import { TUserInfo } from "../app/Store/Types";

export const userInfoParamsFromSql = (userInfo: TUserInfo) => {
  //@ts-ignore
  userInfo.is_first_sign_in = userInfo.is_first_sign_in === 1 ? true : false
  //@ts-ignore
  userInfo.is_admin = userInfo.is_admin === 1 ? true : false;
  //@ts-ignore
  userInfo.is_generate_public_page = userInfo.is_generate_public_page === 1 ? true : false;

  // ★★★ パスワードの有無
  //@ts-ignore
  if (userInfo.bcrypt_password) {
    userInfo.isSetPassword = true;
  } else {
    userInfo.isSetPassword = false;
  }
  // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
  //@ts-ignore
  delete userInfo.bcrypt_password;

  return userInfo
}