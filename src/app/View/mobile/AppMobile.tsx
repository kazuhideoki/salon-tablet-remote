import React from 'react'
import { MainMobile } from './MainMobile'
import { makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from '../../Store/Store';
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';
import { Drawer } from '../Drawer/Drawer';
import InfoBar from '../InfoBar';
import { PPagination } from '../Footer/PaginationBar/PPagination';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      // width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    gridRoot: {
      width: '100%',
      position: "relative",
    },
    gridRootOpen: {
      width: `calc(100% - 60px)`
    },
    item: {
      width: '100%',
    },
    infoBar: {
      height: 60,
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
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)
  const { dispatchAppState, appState} = React.useContext(Store)
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
          <Grid item className={classes.item}>
            <InfoBar className={classes.infoBar} />
          </Grid>
          <Grid item className={classes.item}>
            <MainMobile />
          </Grid>
          <Grid item className={classes.item}>
            <PPagination />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
