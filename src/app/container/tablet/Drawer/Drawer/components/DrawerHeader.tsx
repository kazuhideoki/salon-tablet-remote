import React from 'react';
import { Typography, Button, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerPresenterProps } from '../Drawer';
import { Close } from '@material-ui/icons';

export const DrawerHeader: React.FC<DrawerPresenterProps> = (props) => {
  // Open 開いてパスワード入力画面
  if (!props.isSetting) {
    return (
      <IconButton onClick={props.handleCloseDrawerAndGet}>
        {props.theme.direction === 'ltr' ? (
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
            onClick={props.handleCloseDrawerAndGet}
            color="primary">
            <Close />
            <Typography variant="body1">終了</Typography>
          </Button>
          <Button variant="text" onClick={props.handleCloseDrawer}>
            {props.theme.direction === 'ltr' ? (
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
      <Button variant="text" onClick={props.handleCloseDrawerAndGet}>
        {props.theme.direction === 'ltr' ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } else {
    return <></>;
  }
};
