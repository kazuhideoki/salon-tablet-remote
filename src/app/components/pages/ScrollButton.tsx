import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

interface Props {
  className?: string;
  to: string;
  threshold: number;
  alwaysShow?: boolean;
  children: React.ReactElement;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-block',
    },
  })
);

export const ScrollButton: React.FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    threshold: props.threshold,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(props.to);

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buttonDiv = (
    <div
      onClick={handleClick}
      role="presentation"
      className={`${classes.root} ${props.className}`}>
      {children}
    </div>
  );

  if (props.alwaysShow) {
    return buttonDiv;
  }

  return <Zoom in={trigger}>{buttonDiv}</Zoom>;
};
