import fetch from "node-fetch";

const TestData = (props) => {
    console.log('propsは'  + props);
    
    return (
    <div>
       {props.data[0].title} 
       {/* {text}  */}
       これはただの文章d
    </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/post_data/get", {
      method: "GET",
    });
    const data = await res.json();
    console.log('initial is' + data);
    
    return {props: {data}};

};

export default TestData;