import React from 'react'
import { makeStyles,Theme ,createStyles} from '@material-ui/core';
import { useDrawerProps, TUseDrawerProps } from '../Drawer/Drawer';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
  });
});

export const SettingMobilePresenter: React.FC<TUseDrawerProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <button
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_MODAL",
            payload: "setting_theme",
          })
        }
      >
        テーマ変更(制作中)
      </button>
      <br />
      <button
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_MODAL",
            payload: "setting_user_info",
          })
        }
      >
        アカウント
      </button>
      <br />
      <button onClick={() => props.handleOnSingOut()}>サインアウト</button>
    </div>
  );
}

export const SettingMobile = () => {
  const props = useDrawerProps()

  return <SettingMobilePresenter  {...props}/>
}
