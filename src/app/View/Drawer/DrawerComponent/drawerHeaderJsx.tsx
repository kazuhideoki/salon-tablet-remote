import React from "react";
import {
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TUseDrawerProps } from "../Drawer/view/Drawer";
import { Close } from "@material-ui/icons";

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
    if (props.isMobile && props.isDrawerOpen) {
      return (
        <>
          <Button
            variant="text"
            onClick={props.handleDrawerClose}
            color="primary"
          >
            <Close />
            <Typography variant="body1">終了</Typography>
          </Button>
          <Button variant="text" onClick={props.handleDrawerCloseKeepIsSetting}>
            {/* {props.isMobile ? null : (
              <Typography variant="body1">終了</Typography>
            )} */}

            {props.theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
            <Typography variant="body1">閉じる</Typography>
          </Button>
        </>
      );
    }
    return (
      <Button variant="text" onClick={props.handleDrawerClose}>
        {/* <Typography variant="body1">終了</Typography> */}

        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } 
}