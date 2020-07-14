import React from "react";
import { TUserInfo, TArticles, PaginationParams, FooterItems, TTags } from "../app/Store/Store";
import { App } from "../app/View/App";
//@ts-ignore
import { getCsrfToken, getSession } from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext } from "next";
//@ts-ignore
import { TopPage } from "../component/TopPage";

export type IndexProps = {
  data: {
    articles: TArticles;
    pagination: PaginationParams;
    footerItems: FooterItems;
    tags: TTags
    session?: TUserInfo;
  };
  csrfToken?: any;
  bcrypt_password?: string
};

const Index = (props: IndexProps) => {
  if (!props.data.session) {
    // console.log("Index" + JSON.stringify(props.csrfToken));

    return (
      <>
        <TopPage csrfToken={props.csrfToken} />
      </>
    );

  }
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
      <App data={props.data} />
    </>
  );
};

type TSessionOnj = {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  expires: string | null;
};

export async function getServerSideProps(context: NextPageContext) {  

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req;
  // const sessionObj: TSessionOnj = await session({ req });
  // ↓document通りだけど、これはうまく行かない?
  const sessionObj: TSessionOnj = await getSession({ req });
  console.log("sessionObjは " + JSON.stringify(sessionObj));
  let userInfo: TUserInfo;

  // ★★★セッションがある
  if (sessionObj !== null) {
    const res = await db(
      "select * from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
    userInfo = res[0];
    const { user_id } = userInfo

    // ★★★ユーザーデータがある
    if (userInfo) {
      console.log("userInfoは " + JSON.stringify(userInfo.bcrypt_password));

      // ★★★ パスワードの有無
      if (userInfo.bcrypt_password) {
        userInfo.isSetPassword = true;
      } else {
        userInfo.isSetPassword = false;
      }
      // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
      delete userInfo.bcrypt_password;
      console.log("userInfoは " + JSON.stringify(userInfo));


      let data
      let data2
      let data3
      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        console.log("indexのis_first_sign_inのとこだよ");
        
        const res = await fetch(`http://localhost:3000/api/create_sample_data`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(user_id),
        });

        

      }

      // 記事一覧取得
      const res = await fetch(`http://localhost:3000/api/articles/get`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          page: 1,
          isSetting: true,
          userId: userInfo.user_id,
        }),
      });

      data = await res.json();

      // アイテム一覧取得
      const res2 = await fetch(
        `http://localhost:3000/api/footer_items/get?userId=${userInfo.user_id}`
      );
      data2 = await res2.json();

      // タグ一覧取得

      const res3 = await fetch(
        `http://localhost:3000/api/tags/get?userId=${userInfo.user_id}`
      );
      data3 = await res3.json();

      return {
        props: {
          data: {
            articles: data ? data.rawData : [],
            pagination: data ? data.pagination : [],
            footerItems: data2 ? data2.rawData : [],
            tags: data2 ? data3.rawData : [],
            // JSONのエラーになったので、このような書き方↓
            session: userInfo && JSON.parse(JSON.stringify(userInfo)),
          },
        },
      };

    } // ★★★ユーザーデータがある

  } // ★★★セッションがある

  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  // ★★★セッションがない
  if (sessionObj === null || !userInfo) {
    // const token = await csrfToken(context);
    const token = await getCsrfToken();
    console.log("index,getServerSidePropsのcsrfToken" + JSON.stringify(token));
    return {
      props: {
        data: {
          session: null,
        },
        csrfToken: token,
      },
    };
  }
}

export default Index;
