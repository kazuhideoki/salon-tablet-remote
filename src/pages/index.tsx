import React from "react";
import { App } from "../app/App";
import { ThemeProvider } from "../app/Store/ThemeContext";
import { StoreContextProvider} from "../app/Store/Store";
import fetch from "node-fetch";
// import * as serviceWorker from "../serviceWorker";

const Index = (props) =>{

    return (
      <ThemeProvider>
        <StoreContextProvider data={props.data}>
          <App />
        </StoreContextProvider>
      </ThemeProvider>
    );}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data/get");
    console.log(JSON.stringify(res));

    const data = await res.json();
    console.log("indexのserversideは" + JSON.stringify(data));
    
    return {props: {data: data.rawData}};

};

export default Index
// serviceWorker.register();
