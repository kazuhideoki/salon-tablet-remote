import React from 'react';
import { DeleteForeverTwoTone } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';
import { useDeleteFooterItem } from '../../View/tablet/Footer/Footer/context/useDeleteFooterItem';
import { useDeleteArticle } from '../../View/tablet/Main/context/useDeleteArticle';

export type TDeleteButton = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick:
    | ReturnType<typeof useDeleteFooterItem>
    | ReturnType<typeof useDeleteArticle>;
  value: any;
};

type Props = TDeleteButton & { handleClose?: () => void };

export const DeleteButton = (props: Props) => {
  const handleOnClick = () => {
    props.onClick(props.value);
    props.handleClose();
  };

  return (
    <StyledIconButtonEditButton onClick={() => handleOnClick()}>
      <DeleteForeverTwoTone />
    </StyledIconButtonEditButton>
  );
};
