import React from 'react'
import { HighlightOff } from '@material-ui/icons';
import {
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core";

export const CloseButton = (props:any) => {
   let position = "absolute";
   let top = -8;
   let right = -8;
   if (props.fix) {
     position = "fixed";
     top = 40;
     right = 40;
   }
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        zIndex: 200,
        //@ts-ignore
        position: position,
        top: top,
        right: right,
      },
    })
  );

  const classes = useStyles()

    return (
      //@ts-ignore
      <IconButton onClick={props.onClick} className={classes.root}>
        {/* //@ts-ignore */}
        <HighlightOff style={{ fontSize: "60px" }} />
      </IconButton>
    );
}
