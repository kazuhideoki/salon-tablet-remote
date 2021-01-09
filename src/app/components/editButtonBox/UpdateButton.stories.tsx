import React from 'react';
import { UpdateButton } from './UpdateButton';
export default {
  title: 'viewComponents/buttons/UpdateButton',
  component: UpdateButton,
};
export const Normal = () => {
  const props = {
    onClick: () => {
      return;
    },
    handleClose: () => {
      return;
    },
  };
  return <UpdateButton {...props} />;
};
