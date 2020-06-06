import React from "react";
// import fetch from "node-fetch";
import { StoreContextProviderProps } from "../app/Store/Store";
import { App } from "../app/View/App";
import Head from "next/head";
import { register, unregister } from "next-offline/runtime";
import { sampleData } from "../stories/SampleData";
import Router from "next/router";


const Index = (props: StoreContextProviderProps) => {

  // service-worker.jsの登録と解除。unmount時に解除することで、キャッシュが残り画面が更新されない状態を防ぐ
  React.useEffect(() => {
    register()
    return () => {
      unregister()
    }
  },[])
   
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
    <Head><title>SALON TABLET</title></Head>

    <App data={props.data}/>
    
    </>
  );
};

export async function getServerSideProps() {

  // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
  // articlesでknex+bookshelfをつかっているせいかfooter_itemsがうまく行かなかったので順番を入れ替えた。
  // const res = await fetch(`http://localhost:3000/articles/get`,
  //   {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     mode: "cors",
  //     body: JSON.stringify({ page: 1, isSetting: false }),
  //   });
  // const data = await res.json();
  // console.log("articlesは " + JSON.stringify(data));
  
  const res2 = await fetch(`http://localhost:3000/api/get`);
  const data2 = await res2.json();
  console.log("footerItemsは " + JSON.stringify(data2));

  // const initAppState = {
  //   isSetting: false,
  //   setModal: "edit_article",
  //   articleContentModal: "",
  //   footerItemContentModal: "",
  //   isModalOpen: false,
  //   isArticleModalOpen: false,
  // };

  // if (data.err === true) {
  if (data2.err === true) {
    return null
  } else {
    return {
      props: {
        data: {
          // articles: data.rawData,
          articles: sampleData,
          // pagination: data.pagination,
          pagination: {
            page: 1,
            pageCount: 2,
            pageSize: 5,
            rowCount: 1,
          },
          footerItems: data2.rawData,
          // appState: initAppState,
        },
      },
    };
  }
    
};

export default Index
