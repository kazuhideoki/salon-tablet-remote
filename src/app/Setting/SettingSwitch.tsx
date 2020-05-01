import React from 'react'
import { SettingButton } from "./SettingButton";
import { SettingButtonOpened } from "./SettingButtonOpened";
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Store } from '../Store/Store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(4),
        right: theme.spacing(4),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(4),
        left: theme.spacing(4),
      },
    },
    setting: {
      position: "absolute",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
);

export const SettingSwitch = () => {
  const classes = useStyles()
  const {appState} = React.useContext(Store)
  //   const [open, setOpen] = React.useState(false);


  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {appState.isSetting ? (
        <SettingButtonOpened
          className={classes.speedDial}
          // handleOpen={handleOpen}
          // handleClose={handleClose}
        />
      ) : (
        <SettingButton className={classes.setting}
        // handleOpen={handleOpen}
        />
      )}
    </>
  );
}
