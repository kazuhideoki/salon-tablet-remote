const Index = (props) => (
  <div>
    <h1>{props.test}</h1>
  </div>
);

Index.getInitialProps = ({ req }) => {
  return { test: "Hello, worldかな" };
};

export default Index;
