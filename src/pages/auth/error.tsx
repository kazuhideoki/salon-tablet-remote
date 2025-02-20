import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { PlainButton } from '../../app/components/pages/PlainButton';
import { SEO } from '../../app/components/pages/SEO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signinButton: {
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
      textDecoration: 'none',
    },
  })
);

export const Error = () => {
  const classes = useStyles();
  return (
    <>
      <SEO noindex />
      <div className="error">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          サインインに失敗しました
        </Typography>
        <Typography
          variant="body1"
          component="p"
          align="center"
          className="message"
          gutterBottom>
          入力内容をご確認ください。
        </Typography>
        <Link href="/auth/signin">
          <PlainButton className={classes.signinButton} variant="outlined">
            Sign In
          </PlainButton>
        </Link>
      </div>
    </>
  );
};

export default Error;
