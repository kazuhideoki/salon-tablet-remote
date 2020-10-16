import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";
import { server } from "../lib/loadUrl";

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      position: 'absolute',
      top: 0,
      zIndex: 0,
      opacity: 0.5,
    },
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
      <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`} className={classes.img}/>

      <TopPageParagraph />

      <AboutST/>
      
      <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/>
      <Link href="/privacy">
        <a>Privacy policy</a>
      </Link>
    </>
  );

};
