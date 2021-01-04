import React from 'react';
import { EditTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';

export type TUpdateButton = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any;
  value?: any;
};

type Props = TUpdateButton & { handleClose?: () => void };

export const UpdateButton = (props: Props) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (props.value) {
      props.onClick(props.value);
    } else {
      props.onClick();
    }

    if (props.handleClose) props.handleClose();
  };

  return (
    <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
      <EditTwoTone />
    </StyledIconButtonEditButton>
  );
};
