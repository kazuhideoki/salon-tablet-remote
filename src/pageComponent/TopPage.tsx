import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";
import { server } from "../lib/loadUrl";
// import { ParallaxProvider, Parallax, useController, } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';



const useStyles = makeStyles((theme) =>
createStyles({
    img: {
      zIndex: 0,
      opacity: 0.5,

      maxWidth: 1000,
      marginLeft: "calc((-1000px + 100%) / 2)",

      // height: 'auto',
      

    },
    mainContents: {
      // marginTop: '-200px',
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
  // visibility: 'visible',

}
const styleOuter = {
  // overflow: 'hidden',
  // visibility: 'hidden',
  
}
// const ParallaxCache = ({children}) => {
//       const parallaxController = typeof window !== 'undefined' ? useController().parallaxController : null;

//       // React.useLayoutEffect(() => {
//       React.useEffect(() => {
//         const handler = () => parallaxController.update();
//         window.addEventListener('load', handler);
//         // return () => window.removeEventListener('load', handler);
//     }, [parallaxController]);
  
//       return <>{children}</>
//   };

 const insideStyles = {
  background: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

type Props = { csrfToken: string, providers: any };

export const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles()

 

  return (
    <>
    {/* <ParallaxProvider> */}
      {/* <ParallaxCache> */}

      {/* <Parallax y={[-30, 0]} styleInner={styleInner} styleOuter={styleOuter} > */}
      {/* <Parallax 
            blur={10}
            bgImage={`${server}/images/hair-stylist-combing-womans-hair.jpg`}
            bgImageAlt="the cat"
            strength={200} > */}
        {/* <img src={`${server}/images/hair-stylist-combing-womans-hair.jpg`} className={classes.img}/> */}
        
      {/* </Parallax> */}
      <Parallax bgImage={`${server}/images/hair-stylist-combing-womans-hair.jpg`} strength={500}>
      <div style={{ height: 500 }}>
        {/* <div style={insideStyles}>HTML inside the parallax</div> */}
      </div>
    </Parallax>
    <div className={classes.mainContents}>

      <TopPageParagraph className={classes.topPageParagraph}/>

      <AboutST/>
      
      <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/>
      <Link href="/privacy">
        <a>Privacy policy</a>
      </Link>
    </div>
    {/* </ParallaxCache> */}
    {/* </ParallaxProvider> */}
    </>
  );

};
