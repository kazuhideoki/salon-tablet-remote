import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { Facebook } from "@material-ui/icons";
import { pageList } from "./WebsiteDrawer";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBarRoot: {
      boxShadow: 'none',
    },
    // トップページ以外ではAppBarはスクロールとともに隠れるように、sampleとかあるので
    appBarNotTop: {
      position: 'static',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function WebsiteAppBar({onClick, id}) {
  const classes = useStyles();

  const router = useRouter();
  const slug = router.asPath;
  // console.log("pidは " + slug);


  const headerStringArray = pageList.filter((value) => {
    return value[1] === slug
  })
  // iframe内でエラーになるので、ない場合は空文字に
  const header = headerStringArray.length ? headerStringArray[0][0] : ''

  return (
    <div className={classes.root} id={id}>
      <AppBar color='transparent' className={`${classes.appBarRoot} ${slug !== '/' && classes.appBarNotTop}`}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* ここをページ名に変えたい */}
            {header}
          </Typography>
          <IconButton>
            <a
              href="https://www.facebook.com/salontablet/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook />
            </a>
          </IconButton>
          <Link href="/api/auth/signin">
            <Button color="inherit">Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
