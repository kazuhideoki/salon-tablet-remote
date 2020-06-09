import React from "react";
// import fetch from "node-fetch";
import { StoreContextProviderProps } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
import { register, unregister } from "next-offline/runtime";
import { session } from "next-auth/client";
import { signin, signout, useSession, getSession } from "next-auth/client";
import NextAuth from "next-auth";


const Index = (props: StoreContextProviderProps) => {
  const [session, loading] = useSession();
  // const session = props.session;
  console.log(session)

  if (!session) {
    return (<><span>Not signed in</span>
          <a href={`/api/auth/signin`} onClick={(e) => { e.preventDefault(); signin(); }}>
            <button>Sign in</button>
          </a></>)
    
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

export async function getServerSideProps() {
// getSession(context)を動かすために試した↓
// Index.getInitialProps = async (context) => {

  // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
  const res = await fetch(`http://localhost:3000/api/articles/get`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ page: 1, isSetting: false }),
    });
  const data = await res.json();
  console.log("articlesは " + JSON.stringify(data));
  
  const res2 = await fetch(`http://localhost:3000/api/footer_items/get`);
  const data2 = await res2.json();
  console.log("footerItemsは " + JSON.stringify(data2));


  if (data.err === true) {
    return null
  } else {
    return {
      props: {
        data: {
          articles: data.rawData,
          pagination: data.pagination,
          footerItems: data2.rawData,
        },
        // session: await NextAuth.getSession(context),
      },
    };
  }
    
};

export default Index
