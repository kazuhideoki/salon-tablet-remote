import React from 'react';
import { SwitchOnTapModal } from './SwitchOnTapModal';
import { T_on_tap } from '../../../../../../util/interface/Interface';
import { propsFooterItemEditor } from '../../../../../../util/dev/propsFooterItemEditor';
export default {
  title: 'Drawer/ItemEditor/SwitchOnTapModal',
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
};
export const isMobile = () => {
  const [onTap, setOnTap] = React.useState('' as T_on_tap);

  return (
    <>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <SwitchOnTapModal
        {...propsFooterItemEditor}
        onTapRadio={'modal'}
        isMobile={true}
      />
      ;
    </>
  );
};
