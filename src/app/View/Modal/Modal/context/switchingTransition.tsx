import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react'
import { T_selected_theme } from '../../../../Store/Types';

export const switchingTransition = (selected_theme: T_selected_theme) => {
  switch (selected_theme) {
    case "white":
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
