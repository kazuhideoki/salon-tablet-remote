import React from 'react';
import { SelectFont } from '../app/View/tablet/Drawer/ManageTheme/components/SelectFont';
export default {
  title: 'Drawer/ManageTheme/SelectFont',
  component: SelectFont,
};

export const Normal = () => {
  const [font1, setFont1] = React.useState('')
  const handleChangeThemeFont = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFont1(event.target.value as string);
  };

  const props = {
    font1,
    handleChangeThemeFont
  }

  return (
    //@ts-ignore
    <SelectFont {...props}/>
  )
}