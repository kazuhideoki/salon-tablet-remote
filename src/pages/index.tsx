import React from "react";
import fetch from "node-fetch";
import { useGetPost } from "../app/Store/postData/postDataActionCreator";
import { paginationParamsReducer } from "../app/Store/paginationParams/paginationParamsReducer";
import { StoreContextProviderProps } from "../app/Store/Store";
// import * as serviceWorker from "../serviceWorker";

// ★★★ 通常版
// import { App } from "../app/App";
// import { ThemeProvider } from "../app/Store/ThemeContext";
// import { StoreContextProvider} from "../app/Store/Store";
// import { EditorContextProvider } from "../app/Store/EditorContext";

// ★★★ デバック版
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(() => import("../app/Store/ThemeContext"), {
  ssr: false,
});
const StoreContextProvider = dynamic(() => import("../app/Store/Store"), {
  ssr: false,
});
const EditorContextProvider = dynamic(() => import("../app/Store/EditorContext"), {
  ssr: false,
});
const App = dynamic(() => import("../app/App"), {
  ssr: false,
});


const Index = (props: StoreContextProviderProps) => {
  console.log("initialPropsは " + JSON.stringify(props));

  return (
    <ThemeProvider>
      <StoreContextProvider data={props.data} >
        <EditorContextProvider>
          <App />
        </EditorContextProvider>
      </StoreContextProvider>
    </ThemeProvider>
  );
};

export async function getServerSideProps() {

      const res = await fetch(
        `http://localhost:3000/post_data/get/1`
      );
      
      const data = await res.json();
      console.log("getServerSidePropsは " + JSON.stringify(data));

      if (data.err === true) {
        alert("投稿できませんでした");
      } else {

        return { props: { data } };  

      }

};

export default Index
// serviceWorker.register();
