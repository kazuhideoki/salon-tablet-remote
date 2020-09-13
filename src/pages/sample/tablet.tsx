import WebSiteDrawer from "../../pageComponent/WebsiteDrawer";
import { makeStyles,Theme,createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      width: '100%',
      height:'100vh'
    },
  })
    
);

function Tablet() {
  const classes = useStyles()

  return (
    <div>
      <WebSiteDrawer />
      <iframe
        id="sample-tablet"
        className={classes.iframe}
        src="http://localhost:3000/public_page/bu2j6bfup547"
      ></iframe>
    </div>
  );
}

export default Tablet;
