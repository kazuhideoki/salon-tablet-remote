import WebSiteDrawer from "../../pageComponent/WebsiteDrawer";
import { makeStyles,Theme,createStyles, Fab } from "@material-ui/core";
import { server } from "../../lib/loadUrl";
import { ScrollTop } from "../../pageComponent/ScrollTop";
import { KeyboardArrowUp } from "@material-ui/icons";
import { SEO } from "../../pageComponent/SEO";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      width: "100vw",
      height: "100vh",
      // borderLeft: '10px solid darkgrey',
      // borderRight: '10px solid darkgrey',
      borderTop: 'none',
      borderBottom: 'none',
    },
  })
);


function Tablet() {
  const classes = useStyles()

  return (
    <div>
      <SEO title="サンプルページ Tablet"/>
      <iframe
        id="sample-tablet"
        className={classes.iframe}
        src={`${server}/public_page/bu2j6bfup547?sample=tablet`}
      ></iframe>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default Tablet;
