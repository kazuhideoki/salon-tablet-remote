import React from 'react';
import { EditButtonsBox } from '../app/pureComponents/editButtonBox/EditButtonsBox';
import { samplefooterItems } from './lib/sampleFooterItems';
export default {
  title: 'viewComponents/buttons/EditButtonsBox',
  component: EditButtonsBox,
};

const className = '';

export const Normal = () => {
  return (
    <EditButtonsBox
      className={className}
      handleSwitchButton={{
        smaller: samplefooterItems[0],

        switchOrder: null,
      }}
      handleUpdateButton={{ onClick: null }}
      handleDeleteButton={{ onClick: null }}
    />
  );
};
