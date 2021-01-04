import React from 'react';
import { CloseButton } from '../app/pureComponents/editButtonBox/CloseButton';
export default {
  title: 'viewComponents/buttons/CloseButton',
  component: CloseButton,
};

export const Normal = () => <CloseButton />;

export const fix = () => <CloseButton fix />;
