import React from 'react'
import { CircularProgress, makeStyles,Theme,createStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "absolute",
      width: "100vw",
      height: "100vh",
      // top: 0,
      // bottom: 0,
      // left: 0,
      // right: 0,
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      display: "flex",
    },
  });
})

export const AuthCircular = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress size={60} thickness={5} />
      <Typography variant="subtitle1" component="p">
        読込み中
      </Typography>
    </div>
  );
}
