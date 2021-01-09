import React from 'react';
import { HighlightOff } from '@material-ui/icons';
import { IconButton, makeStyles, createStyles } from '@material-ui/core';

export const CloseButton = (props: any) => {
  let position: 'absolute' | 'fixed' = 'absolute';
  let top = -8;
  let right = -8;
  if (props.fix) {
    position = 'fixed';
    top = 40;
    right = 40;
  }
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        zIndex: 200,
        position: position,
        top: top,
        right: right,
      },
    })
  );

  const classes = useStyles();

  return (
    <IconButton onClick={props.onClick} className={classes.root}>
      <HighlightOff style={{ fontSize: '60px' }} />
    </IconButton>
  );
};
