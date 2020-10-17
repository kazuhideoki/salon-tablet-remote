import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";
import { server } from "../lib/loadUrl";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';


const useStyles = makeStyles((theme) =>
  createStyles({
    sideSpace: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: 800,
        objectFit: 'cover',

      },
    img: {
      // position: 'absolute',
      // top: 0,
      zIndex: 0,
      opacity: 0.5,
      width: 1200,
      minWidth: '100%',
      maxWidth: '100%',
      // marginBottom: '-100px'
    },
    topPageParagraph: {
      margin: theme.spacing(7,0),
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
    <ParallaxProvider>
      {/* <Parallax y={[-30, 30]} className={classes.img}> */}
      <Parallax y={[-30, 30]} >
        <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`} className={classes.img}/>
        {/* <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`}/> */}
      </Parallax>
    <div className={classes.sideSpace}>

      <TopPageParagraph className={classes.topPageParagraph}/>

      <AboutST/>
      
      <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/>
      <Link href="/privacy">
        <a>Privacy policy</a>
      </Link>
    </div>
    </ParallaxProvider>
    </>
  );

};
