import React from "react";
import { StoreContextProviderProps, TUserInfo } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
import { register, unregister } from "next-offline/runtime";
import { session } from "next-auth/client";
import { signin, signout, useSession, getSession } from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext } from "next";


const Index = (props: StoreContextProviderProps) => {

  if (!props.data.session) {
    return (
      <>
        <Head><title>SALON TABLET</title></Head>
        <h1>Salon Tablet</h1>
          <h2>〜美容室のためのコミュニケーション支援タブレットツール〜</h2>
          <a href={`/api/auth/signin`} onClick={(e) => { e.preventDefault(); signin(); }}>
            <button>メールアドレスでサインインする</button>
          </a>
      </>
    )
    
  }

  // service-worker.jsの登録と解除。unmount時に解除することで、キャッシュが残り画面が更新されない状態を防ぐ
  // ※今next-offlineを使ってないのでコメントアウトしている。※
  // React.useEffect(() => {
  //   register()
  //   return () => {
  //     unregister()
  //   }
  // },[])
   
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
    <Head><title>SALON TABLET</title></Head>

    <App data={props.data}/>
    
    </>
  );
};

export async function getServerSideProps({req}:NextPageContext) { 

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const sessionObj = await session({ req });
  console.log("sessionObjは " + JSON.stringify(sessionObj));
  
  let userInfo: any = null
  if (sessionObj) {
    userInfo = await db(
      "select * from `user_info` where email = ?",
      sessionObj.user.email
    );
  }

  console.log("userInfoは " + JSON.stringify(userInfo));

  // let data = null
  // let data2 = null
  if (userInfo) {
    
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
          session: null
        }
      }
    }
  }


    
};

export default Index
