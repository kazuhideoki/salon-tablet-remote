import { db } from "./db";
import { TUserInfo } from "../app/Store/Types";
import { userInfoParamsFromSql } from "./userInfoParamsFromSql";

export const getUserInfoFromEmail = async (email: string): Promise<TUserInfo> => {
  //@ts-ignore
  const data: TUserInfo[] = await db(
    "select * from `user_info` where `user_email` = ?",
    email
  );

  if (data.length) {
    return userInfoParamsFromSql(data[0]);
  } else {
    return null
  }



  // const userInfo: TUserInfo = res[0];

  // const userInfoParams = userInfoParamsFromSql(userInfo)

  // return userInfoParams;
}