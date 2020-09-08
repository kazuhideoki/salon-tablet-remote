import { db } from "./db";
import { TUserInfo } from "../app/Store/Types";
import { userInfoParamsFromSql } from "./userInfoParamsFromSql";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const getUserInfoFromSlug = async (
         slug: string
       ): Promise<TUserInfo> => {
         //@ts-ignore
         const data: TUserInfo[] = await db(`SELECT * FROM user_info`);

         const target = data.filter((value) => {
           return value.public_page_slug === slug;
         });

         if (target.length) {
          return userInfoParamsFromSql(target[0]);
         } else {
          return null
         }

       };

