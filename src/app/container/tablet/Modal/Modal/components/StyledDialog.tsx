import React from 'react';
import { withStyles, Dialog } from '@material-ui/core';

import { ModalSize } from '../../../../../../util/interface/Interface';
import { UseModalSize } from '../context/useModalStyle';
import { TransitionHandlerProps } from '@material-ui/core/transitions';

type Props = {
  modalSize: ModalSize;
  setModal: string;
  isEditting: boolean;
  modalStyle: UseModalSize;
  modalStyleMobile: UseModalSize;
  className: string;
  open: boolean;
  TransitionComponent: React.ForwardRefExoticComponent<
    TransitionHandlerProps & React.RefAttributes<unknown>
  >;
  // 再レンダーのときtransitionアニメーションさせたくないときは、値を0に
  transitionDuration:
    | number
    | {
        enter: number;
        exit: number;
      };
  onClose: () => void;
  maxWidth: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isMobile: boolean;
};

// 受け取ったmodalStyle元にサイズ変更して描画
export const StyledDialog: React.FC<Props> = (props) => {
  const modalStyle = props.isMobile ? props.modalStyleMobile : props.modalStyle;

  // 中のcssを変えないといけなかったのでwithStylesで
  const StyledDialog = withStyles({
    // paper: paperStyle,
    paper: modalStyle,
  })(Dialog);

  return (
    <StyledDialog
      className={props.className}
      open={props.open}
      TransitionComponent={props.TransitionComponent}
      // 再レンダーのときtransitionアニメーションさせたくないときは、値を0に
      transitionDuration={props.transitionDuration}
      // transitionDuration={0}
      onClose={props.onClose}
      maxWidth={props.maxWidth}>
      {props.children}
    </StyledDialog>
  );
};
