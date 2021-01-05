import React from 'react';
import { DeleteForeverTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';

export type HandleDeleteButton = {
  onClick: () => void;
};

type Props = HandleDeleteButton & { handleClose?: () => void };

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
