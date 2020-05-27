import React from 'react'
import { makeStyles,Theme ,createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
  });
});

export const SettingMobile = () => {
  const classes = useStyles()

  return <div className={classes.root}>SettingMobile</div>;
}
