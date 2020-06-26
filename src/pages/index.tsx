import React from "react";
import { StoreContextProviderProps, TUserInfo } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
import {
  csrfToken,
  session,
} from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext } from "next";
//@ts-ignore
import { SignInForm } from "../component/SignInForm";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { TopPage } from "../component/TopPage";




const Index = (props: StoreContextProviderProps) => {

  if (!props.data.session) {
    return (
      <>
        <TopPage csrfToken={props.csrfToken} />
      </>
    );
    
  } 
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
      <App data={props.data}/>
    </>
  );
};

type TSessionOnj = {
  user: {
    name: string | null,
    email: string | null,
    image: string | null,
  },
  expires: string | null,
}

export async function getServerSideProps(context:NextPageContext) { 
  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req
  const sessionObj: TSessionOnj = await session({ req });
  console.log(
    "sessionObjは " + JSON.stringify(sessionObj)
  );
  let userInfo: TUserInfo

  // セッションがある
  if (sessionObj !== null) {
    const res = await db(
      "select * from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
    userInfo = res[0];

    // ユーザーデータがある
    if (userInfo) {
      console.log(
        "userInfoは " + JSON.stringify(userInfo.bcrypt_password)
      );

      if (userInfo.bcrypt_password) {
        userInfo.isSetPassword = true;
      } else {
        userInfo.isSetPassword = false;
      }

      // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
      delete userInfo.bcrypt_password;

      console.log("userInfoは " + JSON.stringify(userInfo));



      // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
      const res = await fetch(`http://localhost:3000/api/articles/get`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          page: 1,
          isSetting: false,
          userId: userInfo.user_id,
        }),
      });

      const data = await res.json();

      const res2 = await fetch(
        `http://localhost:3000/api/footer_items/get?userId=${userInfo.user_id}`
      );
      const data2 = await res2.json();

      return {
        props: {
          data: {
            articles: data.rawData,
            pagination: data.pagination,
            footerItems: data2.rawData,
            // JSONのエラーになったので、このような書き方↓
            session: userInfo && JSON.parse(JSON.stringify(userInfo)),
          },
        },
      };
      
    } 

  } 
  
  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  if (sessionObj === null || !userInfo) {
    return {
      props: {
        data: {
          session: null,
        },
        csrfToken: await csrfToken(context),
      },
    };

  }

  


    
};

export default Index
