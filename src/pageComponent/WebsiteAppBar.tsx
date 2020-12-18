import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Facebook } from "@material-ui/icons";
import { pageList } from "./WebsiteDrawer";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBarRoot: {
      boxShadow: "none",
    },
    // トップページ以外ではAppBarはスクロールとともに隠れるように、sampleとかあるので
    appBarStatic: {
      position: "static",
    },
    appBarWhite: {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    signin: {
      textDecoration: "none",
    },
  })
);

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  id: string
}

export default function WebsiteAppBar({onClick, id}: Props) {
  const classes = useStyles();

  const router = useRouter();
  const slug = router.asPath;


  const headerStringArray = pageList.filter((value) => {
    return value[1] === slug
  })
  // iframe内でエラーになるので、ない場合は空文字に
  const header = headerStringArray.length ? headerStringArray[0][0] : ''

  const isStatic = () => {
    if (slug === "/" || slug === "/auth/signin" || slug === "/auth/signup") {
      return false
    }
    return true
  }
  const isBackgroundWhite = () => {
    if (slug === '/auth/signin' || slug === '/auth/signup') {
      return true
    }
    return false
  }

  return (
    <div className={classes.root} id={id}>
      <AppBar
        color="transparent"
        className={`${classes.appBarRoot} ${
          isStatic() ? classes.appBarStatic : ""
        } ${isBackgroundWhite() ? classes.appBarWhite : ""}`}
      >
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
