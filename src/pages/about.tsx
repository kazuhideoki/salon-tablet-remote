import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { SEO } from '../app/components/pages/SEO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(3),
    },
  })
);

function About(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <SEO title="About" noindex />
      <Typography
        className={classes.typography}
        align="center"
        variant="h4"
        component="h2"
        gutterBottom
        color="textSecondary">
        製作中
      </Typography>
    </div>
  );
}

export default About;
