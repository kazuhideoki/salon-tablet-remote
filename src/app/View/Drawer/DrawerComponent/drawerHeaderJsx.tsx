import React from "react";
import {
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TUseDrawerProps } from "../Drawer";

export const drawerHeaderJsx = (props: TUseDrawerProps) => {
  // Open 開いてパスワード入力画面
  if (!props.isSetting) {
    return (
      <IconButton onClick={props.handleDrawerClose}>
        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    );
  } 
  // Open isSetting 開いて編集モード
  else if (props.isSetting) {
    return (
      <Button variant="text" onClick={props.handleDrawerClose}>
        {props.isMobile ? null : (
          <Typography variant="body1">観覧モードに切り替え</Typography>
        )}

        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } 
}