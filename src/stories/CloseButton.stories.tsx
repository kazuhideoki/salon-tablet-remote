import React from 'react';
import { CloseButton } from '../app/components/editButtonBox/CloseButton';
export default {
  title: 'viewComponents/buttons/CloseButton',
  component: CloseButton,
};

export const Normal = () => <CloseButton />;

export const fix = () => <CloseButton fix />;
