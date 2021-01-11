import React from 'react';
import { Home } from '@material-ui/icons';

type Props = {
  className?: string;
};

export const HomeButton = ({ className }: Props) => {
  return <Home className={className ? className : ''} />;
};
