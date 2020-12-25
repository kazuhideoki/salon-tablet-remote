import React from 'react';
import { SwitchOnTapModal } from '../app/View/Drawer/FooterItemEditor/components/SwitchOnTapModal';
import { T_on_tap } from '../app/Store/Types';
import { propsFooterItemEditor } from './lib/propsFooterItemEditor';
export default {
  title: "Drawer/ItemEditor/SwitchOnTapModal",
  component: SwitchOnTapModal,
};


export const Normal = () => {

  return (
    <>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <SwitchOnTapModal {...propsFooterItemEditor} onTapRadio={'modal'} />;
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
      <SwitchOnTapModal
        {...propsFooterItemEditor}
        onTapRadio={"modal"}
        isMobile={true}
      />
      ;
    </>
  );
}