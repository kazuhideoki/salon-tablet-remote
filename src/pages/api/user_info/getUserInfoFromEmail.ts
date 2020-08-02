import { db } from "../lib/db";
import { TUserInfo } from "../../../app/Store/Types";

// ※bcrypt_passwordが入っているのでフロントサイドに持っていく場合はdeleteする必要がある
export const ApiUserInfoGetFromEmail = async (email: string): Promise<TUserInfo> => {
  const res = await db(
    "select * from `user_info` where `user_email` = ?",
    email
  );

  const userInfo = res[0];

  // ★★★ パスワードの有無
  if (userInfo.bcrypt_password) {
    userInfo.isSetPassword = true;
  } else {
    userInfo.isSetPassword = false;
  }
  // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
  delete userInfo.bcrypt_password;

  return userInfo;
}