import React from 'react';
import { DeleteForeverTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';

export type THandleDeleteButton = {
  onClick: () => void;
};

type Props = THandleDeleteButton & { handleClose?: () => void };

export const DeleteButton = (props: Props) => {
  const handleOnClick = () => {
    props.onClick();
    props.handleClose && props.handleClose();
  };

  return (
    <StyledIconButtonEditButton onClick={() => handleOnClick()}>
      <DeleteForeverTwoTone />
    </StyledIconButtonEditButton>
  );
};
