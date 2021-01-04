import React from 'react';
import { EditTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';

export type THandleUpdateButton = { onClick: () => void };

export type TUpdateButton = THandleUpdateButton & { handleClose: () => void };

export const UpdateButton = (props: TUpdateButton) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    props.onClick();

    props.handleClose();
  };

  return (
    <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
      <EditTwoTone />
    </StyledIconButtonEditButton>
  );
};
