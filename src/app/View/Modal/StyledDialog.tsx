import React from 'react'
import { large, useModalSize } from '../viewComponents/useModalSize';
import { withStyles, Dialog } from '@material-ui/core';
import { T_modal_size, Store } from '../../Store/Store';

type Props = {
  isEditting: boolean
  modalStyle: any
  className: string
  open: boolean
  TransitionComponent: any
  // 再レンダーのときtransitonアニメーションさせたくないときは、値を0に
  transitionDuration: any
  onClose: () => void
  maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl"
}

export const StyledDialog: React.FC<Props> = (props) => {
  const { appState } = React.useContext(Store);
  const modalSize = appState.edittingPrams.modalSize
  let paperStyle: any = useModalSize(modalSize)

  console.log(JSON.stringify(paperStyle));
  

  // 中のcssを変えないといけなかったのでwithStylesで
  const StyledDialog = withStyles({
    paper: paperStyle,
  })(Dialog);

  return (
    <StyledDialog
      className={props.className}
      open={props.open}
      TransitionComponent={props.TransitionComponent}
      // 再レンダーのときtransitonアニメーションさせたくないときは、値を0に
      transitionDuration={props.transitionDuration}
      // transitionDuration={0}
      onClose={props.onClose}
      maxWidth={props.maxWidth}
    >
     {props.children}
    </StyledDialog>
  )
}
