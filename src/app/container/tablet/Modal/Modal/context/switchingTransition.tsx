import { Fade, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import { SelectedTheme } from '../../../../../../util/interface/Interface';

export const switchingTransition = (
  selected_theme: SelectedTheme
): React.ForwardRefExoticComponent<
  TransitionProps & React.RefAttributes<unknown>
> => {
  switch (selected_theme) {
    case 'white':
      return React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>
      ) {
        return <Fade ref={ref} {...props} />;
      });

    default:
      return React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
  }
};
