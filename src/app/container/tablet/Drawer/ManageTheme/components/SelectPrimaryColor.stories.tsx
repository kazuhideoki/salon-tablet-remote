import React from 'react';
import { sampleManageThemePresenterProps } from '../../../../../../util/dev/sampleProps/sampleManageThemePresenterProps';
import {
  SelectPrimaryColor,
  SelectPrimaryColorProps,
} from './SelectPrimaryColor';
export default {
  title: 'Drawer/ManageTheme/SelectPrimaryColor',
  component: SelectPrimaryColor,
};

export const Normal = () => {
  const [color, setColor] = React.useState({ hex: '#FFFFFF' });

  const props: SelectPrimaryColorProps = sampleManageThemePresenterProps;
  return <SelectPrimaryColor {...props} />;
};
