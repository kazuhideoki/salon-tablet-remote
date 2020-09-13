import WebSiteDrawer from "../../pageComponent/WebsiteDrawer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        src="http://localhost:3000/public_page/bu2j6bfup547"
      ></iframe>
    </div>
  );
}

export default Mobile;
