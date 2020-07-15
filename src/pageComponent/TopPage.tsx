import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";

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
      <TopPageParagraph/>
      <SignInForm csrfToken={props.csrfToken} />
    </>
  );

};
