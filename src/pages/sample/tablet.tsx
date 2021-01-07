import React from 'react';
import { makeStyles, createStyles, Fab } from '@material-ui/core';
import { server } from '../../util/loadUrl';
import { ScrollTop } from '../../app/components/pages/ScrollTop';
import { KeyboardArrowUp } from '@material-ui/icons';
import { SEO } from '../../app/components/pages/SEO';

const useStyles = makeStyles(() =>
  createStyles({
    iframe: {
      width: '100vw',
      height: '100vh',
      borderTop: 'none',
      borderBottom: 'none',
    },
  })
);

function Tablet(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <SEO title="サンプルページ Tablet" />
      <iframe
        id="sample-tablet"
        className={classes.iframe}
        src={`${server}/public_page/bu2j6bfup547?sample=tablet`}></iframe>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default Tablet;
