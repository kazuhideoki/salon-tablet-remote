import React from 'react'
import { MainMobile } from './MainMobile'
import { makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from '../../Store/Store';
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';
import { Drawer } from '../Drawer/Drawer';
import InfoBar from '../InfoBar';
import { PPagination } from '../Footer/PaginationBar/PPagination';
import { themeArgs, TThemeArgs, ThemeContext } from '../../Store/ThemeContext';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflow: "hidden",
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      alignItems: "stretch",
    },
    gridRoot: {
      width: "100vw",
      position: "relative",
    },
    gridRootOpen: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    // item: {
    //   width: '100vw',
    // },
    // infoBar: {
    //   height: 60,
    // },
    infoBar: {
      width: "100vw",
      height: 60,
    },
    infoBarOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    main: {
      width: "100vw",
    },
    mainOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    footer: {
      width: "100vw",
    },
    footerOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    emptyMain: {
      flexGrow: 1,
    },
    circularProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  });
});

export const AppMobile = () => {
  const themes = React.useContext(ThemeContext)
  const classes = useStyles(themes);
  const [tab, setTab] = React.useState(0)
  const { dispatchAppState, appState} = React.useContext(Store)
  const open = appState.isDrawerOpen
  const getArticles = useGetArticles()

  const onClickOffIsSetting = () => {
    dispatchAppState({type: "CLOSE_DRAWER"})
    getArticles(false, 1, appState.selectedArticlesTags, false);

  }

  return (
    <>
      <Drawer className={classes.root}>
        <Grid
          spacing={0}
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={`${classes.gridRoot} ${
            appState.isDrawerOpen ? classes.gridRootOpen : ""
          }`}
        >
          <Grid
            item
            className={`${classes.infoBar} ${
              open ? classes.infoBarOpened : null
            }`}
          >
            <InfoBar />
          </Grid>
          <Grid
            item
            className={`${classes.main} ${open ? classes.mainOpened : null}`}
          >
            <MainMobile />
          </Grid>
          <Grid
            item
            className={`${classes.footer} ${open ? classes.footerOpened : null}`}
          >
            <PPagination />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
