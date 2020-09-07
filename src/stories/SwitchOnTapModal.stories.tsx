import React from 'react';
import { SwitchOnTapModal } from '../app/View/Drawer/ItemEditor/SwitchOnTapModal';
import { T_on_tap } from '../app/Store/Types';
import { propsFooterItemEditor } from "./FooterItemEditorPresenter.stories";
export default {
  title: "Drawer/ItemEditor/SwitchOnTapModal",
  component: SwitchOnTapModal,
};


export const Normal = () => {
  const [onTap, setOnTap] = React.useState("" as T_on_tap);

  return (
    <>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <SwitchOnTapModal {...propsFooterItemEditor} onTap={onTap} setOnTap={setOnTap}/>;
    </>
  );
}
export const isMobile = () => {
  const [onTap, setOnTap] = React.useState("" as T_on_tap);

  return (
    <>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <SwitchOnTapModal {...propsFooterItemEditor} onTap={onTap} setOnTap={setOnTap} isMobile={true}/>;
    </>
  );
}