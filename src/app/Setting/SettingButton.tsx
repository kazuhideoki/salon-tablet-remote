import React from "react";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
  Settings,
} from "@material-ui/icons";
import { Store } from "../Store/Store";

type Props = {
  className?: string
  handleOpen?: () => void
}

export const SettingButton = ({className, handleOpen }:Props) => {
  const { dispatchAppState } = React.useContext(Store) 

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
