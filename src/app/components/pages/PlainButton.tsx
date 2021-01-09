import { Button } from '@material-ui/core';
import React from 'react';

type Props = {
  className?: string;
  variant?: 'text' | 'outlined' | 'contained';
};

export const PlainButton: React.FC<Props> = (props) => {
  return (
    <Button
      className={props.className}
      variant={props.variant}
      style={{ backgroundImage: 'none' }}>
      {props.children}
    </Button>
  );
};
