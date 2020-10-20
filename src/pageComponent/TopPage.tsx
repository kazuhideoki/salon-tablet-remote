import React from "react";
import { Typography, makeStyles, createStyles, useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";
import { server } from "../lib/loadUrl";
// import { ParallaxProvider, Parallax, useController, } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';



const useStyles = makeStyles((theme) =>
createStyles({
  featureImgDiv: {
    height: 800,
    minHeight: '80%',
    maxHeight: '100%',
  },
    h1: {
      fontFamily: 'serif',
      background: "rgba(255,255,255,0.6);",
      padding: 20,
      position: "absolute",
      top: "45%",
      left: "20%",
      transform: "translate(-50%,-50%)"
    },
    img: {
      zIndex: 0,
      opacity: 0.5,

      maxWidth: 1000,
      marginLeft: "calc((-1000px + 100%) / 2)",

    },
    mainContents: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: 800,
        objectFit: 'cover',
        position: 'relative',
        zIndex: 100,


      },
    topPageParagraph: {
      margin: theme.spacing(7,0),
    },
    signInForm: {
      margin: theme.spacing(2),
    },
  }
))

type Props = { csrfToken: string, providers: any };

export const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles()

  const isMobile = useMediaQuery("(max-width:480px)");

 
  // const imgFile = isMobile ? 'feature_img_original.jpg' : 'feature_img_lower.jpg'
  const imgFile = 'feature_img_lower.jpg'

  return (
    <>
      <Parallax bgImage={`${server}/images/${imgFile}`} strength={300}>
      <div className={classes.featureImgDiv}>
        <Typography variant='h5' component='h1' align='center' className={classes.h1}>
          「美容室」<br/>×<br/>「タブレット」<br/>の正解
        </Typography>

        {/* <div className={classes.h1}>「美容室」<br/>×<br/>「タブレット」<br/>の正解</div> */}
      </div>
    </Parallax>
    <div className={classes.mainContents}>

      {/* <TopPageParagraph className={classes.topPageParagraph}/> */}

      <AboutST/>
      
      <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/>
      <Link href="/privacy">
        <a>Privacy policy</a>
      </Link>
    </div>
    </>
  );

};
