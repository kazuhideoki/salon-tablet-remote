import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { ThemeContext } from "../Store/ThemeContext";

const useStyles = makeStyles((theme: Theme) => {
    const themes = React.useContext(ThemeContext);
    return createStyles({
      root: {
        display: "flex",
        position: "absolute",
      },
      menuButton: {
        // marginRight: theme.spacing(2),
        zIndex: 50,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        position: "absolute",
        top: 0,
        left: 0,
      },
      hide: {
        display: "none",
      },
      drawer: {
        width: themes.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: themes.drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -themes.drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      // drawerOpened: {
      //   width: `calc(100% - ${themes.drawerWidth}px)`,
      // },
    })}
  )

export function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, props.open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["新規投稿", "アイコン作成", "設定"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={`${clsx(classes.content, {
        //   [classes.contentShift]: props.open,
        // })} ${props.open ? classes.drawerOpened : null}
          [classes.contentShift]: props.open,
        })} 
        `}
      >
        {props.children}
      </main>
    </div>
  );
}
