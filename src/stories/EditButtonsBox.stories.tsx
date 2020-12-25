import React from 'react';
import { EditButtonsBox } from "../app/pureComponents/buttons/EditButtonsBox";
import { SwitchOrderButton } from '../app/pureComponents/buttons/SwitchOrderButton';
import { UpdateButton } from '../app/pureComponents/buttons/UpdateButton';
import { DeleteButton } from "../app/pureComponents/buttons/DeleteButton";
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