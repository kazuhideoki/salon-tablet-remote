import React from 'react';
import { SwapHorizontalCircleOutlined } from '@material-ui/icons';
import { StyledIconButtonEditButton } from './EditButtonsBox';
import { FooterItem } from '../../../util/interface/Interface';

// 一番目のアイテムかどうか判定させるためにsmalllerがいる
export type TSwitchOrderButton = {
  smaller: FooterItem;
  switchOrder: () => Promise<void>;
};

type Props = TSwitchOrderButton & { handleClose: () => void };

export const SwitchOrderButton = (props: Props) => {
  // 一番目のアイテムには必要ないので表示させない
  if (!props.smaller) {
    return null;
  }

  return (
    <StyledIconButtonEditButton
      onClick={() => {
        props.switchOrder();
        props.handleClose();
      }}>
      <SwapHorizontalCircleOutlined />
    </StyledIconButtonEditButton>
  );
};
