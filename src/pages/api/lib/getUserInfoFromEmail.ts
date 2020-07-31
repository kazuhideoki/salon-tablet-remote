import { db } from "./db";
import { TUserInfo } from "../../../app/Store/Store";

// ※bcrypt_passwordが入っているのでフロントサイドに持っていく場合はdeleteする必要がある
export const getUserInfoFromEmail = async (email: string): Promise<TUserInfo> => {
  const res = await db(
    "select user_id, user_name, shop_name, user_email, created_at, updated_at, is_first_sign_in, selected_theme from `user_info` where `user_email` = ?",
    email
  );

  const userInfo = res[0];
   // ★★★ パスワードの有無
  if (userInfo.bcrypt_password) {
    userInfo.isSetPassword = true;
  } else {
    userInfo.isSetPassword = false;
  }
  return userInfo;
}