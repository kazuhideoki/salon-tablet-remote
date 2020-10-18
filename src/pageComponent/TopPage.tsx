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
    img: {
      zIndex: 0,
      opacity: 0.5,
      
      maxWidth: 1000,
      marginLeft: "calc((-1000px + 100%) / 2)",


    },
    mainContents: {
      marginTop: '-200px',
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

const styleInner = { // https://tnyk.jp/frontend/centering-wide-img/ を参考に途中まで
  maxWidth: "100%",
  overflow: 'hidden',
}
const styleOuter = {
  // display: 'flex',
  // alignContent: 'center',
  
}

type Props = { csrfToken: string, providers: any };

export const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <>
    <ParallaxProvider>
      {/* <Parallax y={[-30, 30]} className={classes.img}> */}
      <Parallax y={[-30, 30]} styleInner={styleInner} styleOuter={styleOuter}>
        <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`} className={classes.img}/>
        {/* <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`}/> */}
      </Parallax>
    <div className={classes.mainContents}>

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
