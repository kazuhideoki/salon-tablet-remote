import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";

const useStyles = makeStyles((theme) =>
  createStyles({
    signInForm: {
      margin: theme.spacing(2),
    },
  })
);

type Props = { csrfToken: string, providers: any };

export const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <>
      <TopPageParagraph />

      <AboutST/>
      
      <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/>
      <Link href="/privacy">
        <a>Privacy policy</a>
      </Link>
    </>
  );

};
