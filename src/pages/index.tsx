import React from "react";
import { StoreContextProviderProps, TUserInfo } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
import { register, unregister } from "next-offline/runtime";
import { session } from "next-auth/client";
import { signin, signout, useSession, getSession, csrfToken } from "next-auth/client";
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

// export async function getServerSideProps({req}:NextPageContext) { 
export async function getServerSideProps(context:NextPageContext) { 

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req
  const sessionObj = await session({ req });
  console.log("sessionObjは " + JSON.stringify(sessionObj));
  
  let userInfo: any = null
  // sessionがなくても{"user":{"name":null,"email":null,"image":null},"expires":"2020-07-20T11:55:05.277Z"}が返ってきた。
  // のでemailがnullじゃなければuserInfoを取りに行く
  // if (sessionObj) {
  // サインアウトで TypeError: Cannot read property 'user' of null
  // if (sessionObj.user.email !== null) {

  // セッションがない場合、セッションが空のオブジェクトの場合
  if (sessionObj === null || sessionObj.user.email === null) {
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
    userInfo = await db(
      "select `user_id`, `user_name`, `shop_name`, `user_email`, `created_at`, `updated_at` from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
    console.log(JSON.stringify(userInfo));
    
  }

  
  // if (sessionObj && userInfo.length) {
  // if (sessionObj.user.email !== null && userInfo.length) {
  if (userInfo.length) {
    console.log("userInfoは " + JSON.stringify(userInfo));

    // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
    const res = await fetch(`http://localhost:3000/api/articles/get`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        page: 1,
        isSetting: false,
        userId: userInfo[0].user_id,
      }),
    });
    // console.log("articleのresは " + res);

    const data = await res.json();

    const res2 = await fetch(
      `http://localhost:3000/api/footer_items/get?userId=${userInfo[0].user_id}`
    );
    const data2 = await res2.json();

    return {
      props: {
        data: {
          articles: data.rawData,
          pagination: data.pagination,
          footerItems: data2.rawData,
          session: userInfo && JSON.parse(JSON.stringify(userInfo[0])),
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
