import React from 'react';
import { EditButtonsBox } from "../app/View/viewComponents/buttons/EditButtonsBox";
import { SwitchOrderButton } from '../app/View/viewComponents/buttons/SwitchOrderButton';
import { UpdateButton } from '../app/View/viewComponents/buttons/UpdateButton';
import { DeleteButton } from "../app/View/viewComponents/buttons/DeleteButton";
import { samplefooterItems } from './lib/sampleFooterItems';
export default {
  title: "viewComponents/buttons/EditButtonsBox",
  component: EditButtonsBox,
};

const onClick = null
const className = ""

export const Normal = () => {

  return (
    <EditButtonsBox className={className}>
      <SwitchOrderButton smaller={samplefooterItems[0]} larger={samplefooterItems[1]}/>
      <UpdateButton onClick={null} value={null} />
      <DeleteButton onClick={null} value={null} />
    </EditButtonsBox>
  );
}