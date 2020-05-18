import React from 'react';
import { SwitchOnTapModal } from '../app/View/Setting/SwitchOnTapModal';
export default {
title: 'SwitchOnTapModal',
component: SwitchOnTapModal,
};

export const Normal = () =>{ 
    const [onTap, setOnTap] = React.useState('modal');


  return <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />

}