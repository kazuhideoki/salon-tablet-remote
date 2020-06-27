import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { SignInForm } from "./SignInForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    typography: {
      marginBottom: theme.spacing(2),
    },
  })
);

type Props = { csrfToken: string };

export const TopPage: React.FC<Props> = (props) => {
  // console.log("TopPage" + JSON.stringify(props.csrfToken));
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        // className={classes.typography}
      >
        Salon Tablet
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        // className={classes.typography}
      >
        〜美容師のためのコミュニケーション支援タブレットツール〜
      </Typography>
      <h2></h2>

      <SignInForm csrfToken={props.csrfToken} />
    </>
  );

};
