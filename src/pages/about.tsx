
function About({ sessionObj }) {

  console.log(sessionObj);
  
  return (
    <div>
      About
      <br/>
      {/* {Object.keys(sessionObj).length ? "session取得" : "sessionなし"} */}
    </div>
  );
}

export default About

