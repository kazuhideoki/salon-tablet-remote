import React from 'react';
import { SwitchOnTapModal } from '../../app/View/Drawer/ItemEditor/SwitchOnTapModal';
export default {
  title: "Drawer/SwitchOnTapModal",
  component: SwitchOnTapModal,
};

export const Normal = () =>{ 
    const [onTap, setOnTap] = React.useState('modal');


  return <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />

}