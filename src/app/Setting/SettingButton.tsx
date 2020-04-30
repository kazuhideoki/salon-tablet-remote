import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
  VideoLabel,
  NoteAddOutlined,
  Settings,
  Close,
} from "@material-ui/icons";
import { Store } from "../Store/Store";
import { SettingButtonOpened } from "./SettingButtonOpened";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
  })
);


export const SettingButton = () => {
  const classes = useStyles()
  const { appState, dispatchAppState } = React.useContext(Store) 
    return <Settings onClick={() => dispatchAppState({ type: 'OPEN_MODAL', payload: 'setting_password'})} />;
}
