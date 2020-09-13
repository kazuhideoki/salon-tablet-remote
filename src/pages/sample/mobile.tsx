import WebSiteDrawer from "../../pageComponent/WebsiteDrawer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { server } from "../../lib/loadUrl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // ※iPhone plus系のサイズ
    iframe: {
      width: "414px",
      height: "736px",
    },
  })
);

function Mobile() {
  const classes = useStyles()

  return (
    <div>
      <WebSiteDrawer />
      Mobileだよ
      <iframe
        id="sample-mobile"
        className={classes.iframe}
        src={`${server}/public_page/bu2j6bfup547?sample=mobile`}
      ></iframe>
    </div>
  );
}

export default Mobile;
