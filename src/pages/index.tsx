import React from "react";
import { render } from "react-dom";
import { App } from "../App";
import { ThemeProvider } from "../modules/ThemeContext";
import { StoreContextProvider, Store, PostData } from "../modules/Store";
import fetch from "node-fetch";
// import * as serviceWorker from "../serviceWorker";

const Index = (props) =>{
    console.log(props);
    
    const {dispatchPostData} = React.useContext(Store);

    // React.useEffect(() => {
    //     dispatchPostData({ type: "SET_ARTICLES", payload: props.data });
    // },[])

    

    return (
  <ThemeProvider>
    <StoreContextProvider data={props.data}>
      <App />
    </StoreContextProvider>
  </ThemeProvider>
)}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data", {method: 'GET'});
    const data: PostData = await res.json();
    console.log('initialは' + data);
    
    return {props: {data}};

};

export default Index
// serviceWorker.register();
