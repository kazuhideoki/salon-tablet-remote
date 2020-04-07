// import fetch from "isomorphic-unfetch";
import fetch from "node-fetch";
// const http = require("http");
import useSWR from "swr";
// const mysql = require("mysql");



const TestData = (props) => {
    console.log('propsは'  + props);
    

    //     const { data, error } = await useSWR("http://localhost:10080/test");
    //   console.log('返り値は' + data);

    // const res = fetch("http://localhost:10080/test", {method: 'GET'});
    // const text = res.text();


    
    return (
    <div>
       {props.data.title} 
       {/* {text}  */}
       これはただの文章d
    </div>
    )
}


// TestData.getServerSideProps = async () => {
// export async function getStaticProps() {
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data", {method: 'GET'});
    // const res = await http.get("http://localhost:3000/post_data");
    const data = await res.json();
    console.log('initialは' + data);
    
    return {props: {data}};



};

export default TestData;