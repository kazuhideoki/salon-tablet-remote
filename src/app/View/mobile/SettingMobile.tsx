import React from 'react'
import { makeStyles,Theme ,createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1, 
    },
  });
});

export const SettingMobile = () => {
  const classes = useStyles()

  return <div className={classes.root}>SettingMobile</div>;
}
