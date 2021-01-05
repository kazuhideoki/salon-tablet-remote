import React from 'react';
import { EditButtonsBox } from './EditButtonsBox';
import { samplefooterItems } from '../../../stories/lib/sampleFooterItems';
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

        switchOrder: async () => {
          return;
        },
      }}
      handleUpdateButton={{
        onClick: () => {
          return;
        },
      }}
      handleDeleteButton={{
        onClick: () => {
          return;
        },
      }}
    />
  );
};
