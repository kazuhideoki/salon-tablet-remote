import React from "react";
import { render } from "react-dom";
import { App } from "../App";
import { ThemeProvider } from "../modules/ThemeContext";
import { StoreContextProvider, Store, PostData } from "../modules/Store";
import fetch from "node-fetch";
// import * as serviceWorker from "../serviceWorker";
const os = require("os");


const Index = (props) =>{
    console.log("フロント側では " + os.hostname());
    const hostname = os.hostname()
    
    return (
      <ThemeProvider>
        <StoreContextProvider data={props.data} hostname={hostname}>
          <App />
        </StoreContextProvider>
      </ThemeProvider>
    );}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data/get", {
      method: "GET",
    });
    const data = await res.json();
    console.log("initialは" + data);
    
    return {props: {data}};

};

export default Index
// serviceWorker.register();
