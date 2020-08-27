import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "../lib/checkOrders";
import { T_user_id, T_is_show_mobile_page, T_mobile_page_slug } from "../../../app/Store/Types";
import { correctOrders } from "../lib/correctOrders";
import { changeToBooleanFromNumber } from "../lib/changeToBooleanFromNumber";
import { localhost, server } from "../../../config";
import { TApiResponse, TApiError } from "../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCheckIsShowMobilePage = async (
         slug: string
       ): Promise<TApiResponse<T_check_is_show_mobile_page_return>> => {
         let str = process.browser ? server : localhost;

         const res = await fetch(
           `${str}/api/user_info/check_is_show_mobile_page?slug=${slug}`
         );

         return await res.json();
       };
export type T_check_is_show_mobile_page = {
  slug: string
}
export type T_check_is_show_mobile_page_return = {
  is_show_mobile_page: T_is_show_mobile_page;
  mobile_page_slug: T_mobile_page_slug;
};

const check_is_show_mobile_page = async (req: NextApiRequest, res: NextApiResponse) => {
  const  { slug } = req.query as T_check_is_show_mobile_page

  
  try {
    //@ts-ignore
    const data: T_check_is_show_mobile_page_return[] = await db(`SELECT is_show_mobile_page, mobile_page_slug FROM user_info`)
    
    
    const target = data.filter(value => {
      return value.mobile_page_slug === slug
    })

    const returnData: T_check_is_show_mobile_page_return = {
      is_show_mobile_page: target.length ? target[0].is_show_mobile_page : false,
      mobile_page_slug: target.length ? target[0].mobile_page_slug : null,
    }

    return res.status(200).json(returnData);

  } catch (err) {
    console.log("/user_info/check_is_show_mobile_page/のエラーは " + JSON.stringify(err));
    const errOnj: TApiError = { err: true, data: { message: err.message } };
    return res.status(500).json(errOnj);
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default check_is_show_mobile_page;
