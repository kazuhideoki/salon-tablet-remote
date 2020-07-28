import React from 'react'
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
  })
);

export const ManageInstagmaAccounts = () => {
  const classes = useStyles()

  const handleResisterInstagram = () => {

  }
  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ管理
      </Typography>
      <Button onClick={() => handleResisterInstagram()}>
        インスタグラムアカウントを登録する
      </Button>
    </div>
  );
}
