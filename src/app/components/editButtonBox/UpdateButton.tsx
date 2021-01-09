import React from 'react';
import { EditTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';

export type HandleUpdateButton = { onClick: () => void };

export type Props = HandleUpdateButton & { handleClose: () => void };

export const UpdateButton = (props: Props) => {
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
