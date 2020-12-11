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
    <EditButtonsBox
      className={className}
      switch
      switchProps={{
        smaller: samplefooterItems[0],
        larger: samplefooterItems[1],
      }}
      update
      updateProps={{ onClick: null, value: null }}
      delete
      deleteProps={{ onClick: null, value: null }}
    />
  );
}