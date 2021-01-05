import { Fade, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import { SelectedTheme } from '../../../../../../util/interface/Interface';

export const switchingTransition = (selected_theme: SelectedTheme) => {
  switch (selected_theme) {
    case 'white':
      return React.forwardRef<unknown, TransitionProps>(function Transition(
        props,
        ref
      ) {
        //@ts-ignore
        return <Fade direction="up" ref={ref} {...props} />;
      });

    default:
      return React.forwardRef<unknown, TransitionProps>(function Transition(
        props,
        ref
      ) {
        //@ts-ignore
        return <Slide direction="up" ref={ref} {...props} />;
      });
  }
};
