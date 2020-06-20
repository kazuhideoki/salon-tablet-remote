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

        {/* <SignInForm/>   */}

        <form
          method="post"
          action="/api/auth/signin/email"
          onSubmit={(e) => {
            e.preventDefault();
            //@ts-ignore
            signin("email", { email: document.getElementById("email").value });
            // signin("email", { email: document.getElementById("email").nodeValue });
          }}
        >
          <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
          <label>
            Email address
            <input type="text" id="email" name="email" />
          </label>
          <button type="submit">Sign in with Email</button>
        </form>
        <form method="post" action={`${server}/api/auth/callback/credentials`}>
          <input name="email" type="text" defaultValue="" />
          <input name="password" type="password" defaultValue="" />
          <button type="submit">Sign in</button>
        </form>
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
  // console.log("sessionObjは " + JSON.stringify(sessionObj));
  
  let userInfo: any = null
  if (sessionObj) {
    userInfo = await db(
      "select `user_id`, `user_name`, `shop_name`, `user_email`, `created_at`, `updated_at` from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
  }

  
  if (sessionObj && userInfo.length) {    
    console.log("userInfoは " + JSON.stringify(userInfo));
    
    // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
    const res = await fetch(`http://localhost:3000/api/articles/get`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ page: 1, isSetting: false, userId: userInfo[0].user_id}),
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
