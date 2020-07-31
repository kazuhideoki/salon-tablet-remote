import { db } from "./db";
import { TUserInfo } from "../../../app/Store/Store";

// ※bcrypt_passwordが入っているのでフロントサイドに持っていく場合はdeleteする必要がある
export const getUserInfoFromEmailServerSide = async (email: string): Promise<TUserInfo> => {
  const res = await db(
    "select * from `user_info` where `user_email` = ?",
    email
  );
  return res[0];
}