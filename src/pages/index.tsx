import React from "react";
import { App } from "../app/App";
import { ThemeProvider } from "../app/Store/ThemeContext";
import { StoreContextProvider, Store} from "../app/Store/Store";
import { EditorContextProvider } from "../app/Store/EditorContext";
import fetch from "node-fetch";
import { useGetPost } from "../app/Store/postDataRducer";
import { paginationParamsReducer } from "../app/Store/paginationParamsReducer";
import { StoreContextProviderProps } from "../app/Store/Store";
// import * as serviceWorker from "../serviceWorker";

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
