import React from 'react';
import { SwitchOnTapModal } from '../app/View/Setting/SwitchOnTapModal';
export default {
title: 'SwitchOnTapModal',
component: SwitchOnTapModal,
};
export const Normal = () => {
  const [onTap, setOnTap] = React.useState("");

  return (<>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />;
  </>)
}