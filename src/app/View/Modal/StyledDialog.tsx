import React from 'react'
import { withStyles, Dialog } from '@material-ui/core';

import { T_modal_size } from '../../Store/Types';

type Props = {
  modalSize: T_modal_size
  setModal: string
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

// 受け取ったmodalStyle元にサイズ変更して描画
export const StyledDialog: React.FC<Props> = (props) => {
  
  // 中のcssを変えないといけなかったのでwithStylesで
  const StyledDialog = withStyles({
    // paper: paperStyle,
    paper: props.modalStyle,
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
