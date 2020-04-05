const Index = ({test}) => (
  <div>
    <h1>{test}</h1>
  </div>

);

Index.getInitialProps = ({ req }) => {
  return { test: "Hello, いろいろ" };
};

export default Index;
