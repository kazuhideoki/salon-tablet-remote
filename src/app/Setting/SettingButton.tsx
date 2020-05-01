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

type Props = {
  className?: string
  handleOpen?: () => void
}

export const SettingButton = ({className, handleOpen }:Props) => {
  const { appState, dispatchAppState } = React.useContext(Store) 

    return (
      <SpeedDial
      ariaLabel="SpeedDial SettingO
      Button"
      // propsでSettingButtonと同じものを渡すように
      className={className}
      icon={
        <SpeedDialIcon
          icon={<Settings />}
          onClick={() =>
          dispatchAppState({ type: "OPEN_MODAL", payload: "setting_password" })
        }
        />
      }
      open={false}
    ></SpeedDial>
    );
}
