import React from 'react';
import { SwitchOnTapModal } from './SwitchOnTapModal';
import { Ontap } from '../../../../../../util/interface/Interface';
import { propsFooterItemEditor } from '../../../../../../util/dev/sampleProps/propsFooterItemEditor';
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
export const isMobile: React.FC = () => {
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
