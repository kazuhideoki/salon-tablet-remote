import React from 'react';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import Link from 'next/link';
import { AboutST } from './AboutST';
import { Parallax } from 'react-parallax';
import { PlainButton } from './PlainButton';
import { server } from '../../../util/loadUrl';

const useStyles = makeStyles((theme) =>
  createStyles({
    featureImgDiv: {
      height: 800,
      minHeight: '80%',
      maxHeight: '100%',
    },
    msgBox: {
      position: 'absolute',
      top: '30%',
      left: '15%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    h1: {
      fontFamily: 'serif',
      background: 'rgba(255,255,255,0.6);',
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(2),
    },
    startButtonA: {
      textDecoration: 'none',
      display: 'contents',
    },
    startButton: {
      fontFamily: 'serif',
      fontSize: '1.5em',
      background: 'rgba(255,255,255,0.6);',
      textDecoration: 'none',
      borderRadius: theme.spacing(2),
    },
    img: {
      zIndex: 0,
      opacity: 0.5,

      maxWidth: 1000,
      marginLeft: 'calc((-1000px + 100%) / 2)',
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
      margin: theme.spacing(8, 0),
    },
    signInForm: {
      margin: theme.spacing(2),
    },
  })
);

export const TopPage: React.FC = () => {
  const classes = useStyles();

  const imgFile = 'feature_img_lower.jpg';

  return (
    <>
      <div className={classes.mainContents}>
        <Parallax bgImage={`${server}/images/${imgFile}`} strength={300}>
          <div className={classes.featureImgDiv}>
            <div className={classes.msgBox}>
              <Typography
                variant="h5"
                component="h1"
                align="center"
                className={classes.h1}>
                「美容室」
                <br />×<br />
                「タブレット」
                <br />
                をより良く
              </Typography>
              <Link href="/auth/signup">
                <a className={classes.startButtonA}>
                  <PlainButton className={classes.startButton} variant="text">
                    無料で始める
                  </PlainButton>
                </a>
              </Link>
            </div>
          </div>
        </Parallax>

        <AboutST />
      </div>
    </>
  );
};
