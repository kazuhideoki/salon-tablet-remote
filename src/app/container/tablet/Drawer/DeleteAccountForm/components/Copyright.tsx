import React from 'react';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { server } from '../../../../../../util/loadUrl';

export function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={server}>
        SALON TABLET
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
