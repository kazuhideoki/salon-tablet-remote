import React from "react";
import { StoreContextProviderProps, TUserInfo } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
const fetchI = require("isomorphic-fetch");
import { register, unregister } from "next-offline/runtime";
import {
  signin,
  signout,
  useSession,
  getSession,
  csrfToken,
  session,
} from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext } from "next";
import { server } from "../config";
import { SignInForm } from "../component/SignInForm";


const Index = (props: StoreContextProviderProps) => {

  if (!props.data.session) {
    return (
      <>
        <Head>
          <title>SALON TABLET</title>
        </Head>
        <h1>Salon Tablet</h1>
        <h2>〜美容室のためのコミュニケーション支援タブレットツール〜</h2>

        <SignInForm csrfToken={props.csrfToken} />

      </>
    );
    
  }
   
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
    <Head><title>SALON TABLET</title></Head>

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

// export async function getServerSideProps({req}:NextPageContext) { 
export async function getServerSideProps(context:NextPageContext) { 

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req
  const sessionObj: TSessionOnj = await session({ req });


  // apiをfetchするとsessionがあっても{}が返ってくる。ブラウザで直接getすると取得できるのに...
  // const sessionRespose = await fetch(`http://localhost:3000/api/auth/session/`)
  // const sessionRespose = await fetchI(`http://localhost:3000/api/auth/session/`)
  // console.log("sessionResposeは " + JSON.stringify(sessionRespose));
  // const sessionObj = await sessionRespose.json();

  // const sessionObj = fetchI("http://localhost:3000/api/auth/session/")
  //   .then(function(response) {
  //     if (response.status >= 400) {
  //       throw new Error("Bad response from server");
  //     }
  //     return response.json();
  //   })
  //   .then(function(stories) {
  //     console.log(stories);
  //   });

  console.log(
    "sessionObjは " + JSON.stringify(sessionObj)
  );

  
  let resData = null
  let userInfo: TUserInfo
  // sessionがなくても{"user":{"name":null,"email":null,"image":null},"expires":"2020-07-20T11:55:05.277Z"}が返ってきた。
  // セッションがない場合、セッションが空のオブジェクトの場合
  // sessionObj === {};は / api / auth / sessionでsessionがないとき
  if (
    sessionObj === null ||
    !Object.keys(sessionObj).length // {} の場合
    // || sessionObj.user.email === null
  ) {
    return {
      props: {
        data: {
          session: null,
        },
        csrfToken: await csrfToken(context),
      },
    };

    // センションがある場合
  } else {
    //@ts-ignore
    resData = await db(
      // "select `user_id`, `user_name`, `shop_name`, `user_email`, `created_at`, `updated_at` from `user_info` where `user_email` = ?",
      "select * from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
    userInfo = resData[0];
    console.log(
      "resData.bcrypt_passwordは " + JSON.stringify(userInfo.bcrypt_password)
    );

    if (userInfo.bcrypt_password) {
      userInfo.isSetPassword = true;
    } else {
      userInfo.isSetPassword = false;
    }

    // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
    delete userInfo.bcrypt_password;

  }

  // if (userInfo.length) {
  if (userInfo) {
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
    // console.log("articleのresは " + res);

    const data = await res.json();

    const res2 = await fetch(
      // `http://localhost:3000/api/footer_items/get?userId=${userInfo[0].user_id}`
      `http://localhost:3000/api/footer_items/get?userId=${userInfo.user_id}`
    );
    const data2 = await res2.json();

    return {
      props: {
        data: {
          articles: data.rawData,
          pagination: data.pagination,
          footerItems: data2.rawData,
          // session: userInfo && JSON.parse(JSON.stringify(userInfo[0])),
          session: userInfo && JSON.parse(JSON.stringify(userInfo)),
        },
      },
    };
  } else {
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
