import fetch from "isomorphic-unfetch";
import {
  signin,
  signout,
  useSession,
  getSession,
  csrfToken,
  session,
} from "next-auth/client";
import { server } from "../config";


function About({ sessionObj }) {

  console.log(sessionObj);
  
  return (
    <div>
      About
      <br/>
      {Object.keys(sessionObj).length ? "session取得" : "sessionなし"}
    </div>
  );
}

export default About

export async function getServerSideProps(context) { 

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req
  process.env.NEXTAUTH_SITE = "http://localhost:3000";
  const sessionObj = await session({ req });
  process.env.NEXTAUTH_SITE = server;
  // apiをfetchするとsessionがあっても{}が返ってくる。ブラウザで直接getすると取得できるのに...
  // const sessionRespose = await fetch(`http://localhost:3000/api/auth/session/`)
  // console.log("aboutのsessionResposeは " + JSON.stringify(sessionRespose));

  // const sessionObj = await sessionRespose.json();
  console.log(
    "sessionObjは " + JSON.stringify(sessionObj)
  );



  const sessionRespose_footer_items = await fetch(
    `http://localhost:3000/api/footer_items/get?userId=1`
  );
  const fi = await sessionRespose_footer_items.json()
  console.log(
    "sessionRespose_footer_itemsは " +
      JSON.stringify(sessionRespose_footer_items)
  );
  console.log("footer_itemsは " + JSON.stringify(fi));


    return {
      props: {
        sessionObj
      },
    };

}

