import React from "react";
import {
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      display: "flex",
    },
    circularProgress: {
      marginBottom: theme.spacing(2),
    },
    message: {
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  });
});

type Props = {
  message: string
}

export const AuthCircular:React.FC<Props> = ({message}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress
        size={60}
        thickness={5}
        className={classes.circularProgress}
      />
      <Typography className={classes.message} variant="subtitle1" component="p" color='textSecondary'>
        {message}
      </Typography>
    </div>
  );
};
