import React from 'react'
import { MainMobile, useMainMobileProps } from './MainMobile'
import { FooterMobile, useFooterMobileProps } from './FooterMobile'
import { SettingMobile } from "./SettingMobile";
import { TabMobile } from './TabMobile'
import { PaginationMobile } from './PaginationMobile';
import { Modal } from '../Modal';
import { makeStyles, createStyles, Theme, Button, CircularProgress } from "@material-ui/core";
import { HomeButton } from '../Footer/Pagination/HomeButton';
import { Store } from '../../Store/Store';
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';
import { Home } from '@material-ui/icons';
import { useDrawerProps } from '../Drawer/Drawer';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    quitButton: {
      width: "100%",
      backgroundColor: "whitesmoke",
    },
    createButton: {
      width: "100%",
    },
    tabMobile: {
      // position: "absolute",
      // bottom: 0,
      height: "auto",
    },
  });
});

export const AppMobile = () => {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)
  const { dispatchAppState, loading } = React.useContext(Store)
  const getArticles = useGetArticles()
  const {
    handleOpenArticleEditor,
    handleOpenFooterItemEditor,
  } = useDrawerProps();

  const onClickOffIsSetting = () => {
    dispatchAppState({ type: "OFF_IS_SETTING" })
    dispatchAppState({type: "CLOSE_DRAWER"})
  }

  let Display: React.FC
  switch (tab) {
    case 0:
      Display = () => (
        <>
          <Button color="primary" className={classes.createButton} onClick={() => handleOpenArticleEditor()}>記事作成</Button>
          <MainMobile />
          <PaginationMobile />
        </>
      );
      break;
    case 1:
      Display = () => (
        <>
          <Button
            color="primary"
            className={classes.createButton}
            onClick={() => handleOpenFooterItemEditor()}
          >
            アイテム追加
          </Button>
          <FooterMobile />
        </>
      );
      break;
    case 2:
      Display = () => <SettingMobile />;
      break;
  
    default:
      break;
  }

  return (
    <>
      <div className={classes.root}>
        <Button className={classes.quitButton} onClick={() => onClickOffIsSetting()}>観覧モードに切り替える</Button>
        <Display />
        <TabMobile tab={tab} setTab={setTab} className={classes.tabMobile}/>
      </div>
    </>
  );
}
