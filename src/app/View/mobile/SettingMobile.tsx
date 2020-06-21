import React from 'react'
import { makeStyles,Theme ,createStyles} from '@material-ui/core';
import { signin, signout, useSession, getSession } from "next-auth/client";
import { Store } from '../../Store/Store';
import { useDrawerProps } from '../Drawer';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
  });
});

export const SettingMobile = () => {
  const classes = useStyles()
  const {dispatchAppState, handleOnSingOut} = useDrawerProps()

  return (
    <div className={classes.root}>
      <button onClick={() =>
        dispatchAppState({
          type: "OPEN_MODAL",
          payload: "setting_user_info",
        })
      }>アカウント</button>
      <button onClick={() => handleOnSingOut()}>サインアウト</button>
    </div>
  );
}
