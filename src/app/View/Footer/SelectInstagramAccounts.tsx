import React from 'react'
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2),
    },
  })
);

export const SelectInstagramAccounts = () => {
  const classes = useStyles()
  
  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        インスタグラムアカウント選択
      </Typography>
    </div>
  );
}
