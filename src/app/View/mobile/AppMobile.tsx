import React from 'react'
import { MainMobile } from './MainMobile'
import { FooterMobile } from './FooterMobile'
import { SettingMobile } from "./SettingMobile";
import { TabMobile } from './TabMobile'
import { PaginationMobile } from './PaginationMobile';
import { PModal } from '../PModal/PModal';
import { makeStyles, createStyles, Theme, Button, CircularProgress } from "@material-ui/core";
import { HomeButton } from '../PFooter/Pagination/HomeButton';
import { Store } from '../../Store/Store';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    },
    quit: {
      width: "100%",
      backgroundColor: "whitesmoke",
    },
    homeAndPagination: {
      display: "flex",
    },
    tabMobile: {
      position: "absolute",
      bottom: 0,
    }
  });
});

export const AppMobile = () => {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)
  const { dispatchAppState, loading } = React.useContext(Store)

  let Display: React.FC
  switch (tab) {
    case 0:
      Display = () => (
        <>
          <MainMobile />
          <div className={classes.homeAndPagination}>
            <HomeButton />
            <PaginationMobile />
          </div>
        </>
      );
      break;
    case 1:
      Display = () => <FooterMobile />;
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
        <Button className={classes.quit} onClick={() => dispatchAppState({type: "OFF_IS_SETTING"})}>観覧モードに切り替える</Button>
        <Display />
        {/* {tab === 0 ? <PaginationMobile /> : null} */}
        <TabMobile tab={tab} setTab={setTab} className={classes.tabMobile}/>
      </div>
      <PModal />
    </>
  );
}
