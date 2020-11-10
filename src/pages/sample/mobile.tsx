import { makeStyles, Theme, createStyles, Fab } from "@material-ui/core";
import { server } from "../../lib/loadUrl";
import { ScrollTop } from "../../pageComponent/ScrollTop";
import { KeyboardArrowUp } from "@material-ui/icons";
import { SEO } from "../../pageComponent/SEO";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      width: "100vw",
      height: "100vh",
      borderTop: "none",
      borderBottom: "none",
    },
  })
);

function Mobile() {
  const classes = useStyles()

  return (
    <div>
      <SEO title="サンプルページ Mobile"/>
      <iframe
        id="sample-mobile"
        className={classes.iframe}
        src={`${server}/public_page/bu2j6bfup547?sample=mobile`}
      ></iframe>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default Mobile;
