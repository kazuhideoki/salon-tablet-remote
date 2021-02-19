import React from 'react';
import {
  makeStyles,
  createStyles,
  Fab,
  Theme,
  Typography,
} from '@material-ui/core';
import { server } from '../../util/loadUrl';
import { ScrollButton } from '../../app/components/pages/ScrollButton';
import { ArrowDownward, KeyboardArrowUp } from '@material-ui/icons';
import { SEO } from '../../app/components/pages/SEO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paragraphDiv: {
      padding: theme.spacing(4),
    },
    iframe: {
      width: '100vw',
      height: '100vh',
      borderTop: 'none',
      borderBottom: 'none',
    },
    scrollIcon: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

function Tablet(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <SEO title="サンプルページ" />

      <div className={classes.paragraphDiv}>
        <Typography variant="h5" component="h1" align="center">
          SALON TABLETの表示サンプルです。
        </Typography>
        <Typography variant="body1" component="p" align="center">
          タブレットやパソコンなどの大画面端末で御覧ください。
          <ScrollButton to="#sample-iframe" threshold={0} alwaysShow={true}>
            <Fab color="secondary" size="small" aria-label="scroll to iframe">
              <ArrowDownward />
            </Fab>
          </ScrollButton>
        </Typography>
      </div>

      <iframe
        id="sample-iframe"
        className={classes.iframe}
        src={`${server}/public_page/bu2j6bfup547?sample=tablet`}></iframe>
      <ScrollButton
        to="#back-to-top-anchor"
        threshold={1}
        className={classes.scrollIcon}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollButton>
    </div>
  );
}

export default Tablet;
