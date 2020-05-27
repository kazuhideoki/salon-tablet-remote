import React from 'react'
import { MainMobile } from './MainMobile'
import { FooterMobile } from './FooterMobile'
import { SettingMobile } from "./SettingMobile";
import { TabMobile } from './TabMobile'
import { PaginationMobile } from './PaginationMobile';
import { PModal } from '../PModal/PModal';
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    },
  });
});

export const AppMobile = () => {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)

  let Display: React.FC
  switch (tab) {
    case 0:
      Display = () => <MainMobile />
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
        <Display />
        {tab === 0 ? <PaginationMobile /> : null}
        <TabMobile tab={tab} setTab={setTab} />
      </div>
      <PModal />
    </>
  );
}
