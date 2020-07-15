import React from 'react';
import { EditButtonsBox } from "../app/View/component/buttons/EditButtonsBox";
import { SwitchOrderButton } from '../app/View/component/buttons/SwitchOrderButton';
import { UpdateButton } from '../app/View/component/buttons/UpdateButton';
import { DeleteButton } from "../app/View/component/buttons/DeleteButton";
export default {
  title: 'EditButtonsBox',
  component: EditButtonsBox,
};

const onClick = null
const className = ""

export const Normal = () => {

  return (
    <EditButtonsBox className={className}>
      <SwitchOrderButton params={{footer_item_id: 1, order:2}} />
      <UpdateButton onClick={null} />
      <DeleteButton onClick={null} />
    </EditButtonsBox>
  );
}