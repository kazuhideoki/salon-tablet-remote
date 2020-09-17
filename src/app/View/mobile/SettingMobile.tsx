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
    button: {
      marginBottom: 10,
    }
  });
});

export const SettingMobilePresenter: React.FC<TUseDrawerProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <button
        className={classes.button}
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_MODAL",
            payload: "edit_tags",
          })
        }
      >
        タグ管理
      </button>
      <br />
      <button
        className={classes.button}
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_MODAL",
            payload: "manage_instagram",
          })
        }
      >
        Instagram 連携
      </button>
      <br />
      <button
        className={classes.button}
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_MODAL",
            payload: "setting_theme",
          })
        }
      >
        あああ
      </button>
      <br />
      <button
        className={classes.button}
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
      <button
        className={classes.button}
        onClick={() => props.handleOnSingOut()}
      >
        サインアウト
      </button>
    </div>
  );
}

export const SettingMobile = () => {
  const props = useDrawerProps()

  return <SettingMobilePresenter  {...props}/>
}
