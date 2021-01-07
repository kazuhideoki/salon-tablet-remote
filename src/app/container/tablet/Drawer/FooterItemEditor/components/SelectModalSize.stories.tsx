import React from 'react';
import { SelectModalSize } from './SelectModalSize';
import { ModalSize } from '../../../../../../util/interface/Interface';
import { propsFooterItemEditor } from '../../../../../../util/dev/sampleProps/propsFooterItemEditor';
export default {
  title: 'Setting/SelectModalSize',
  component: SelectModalSize,
};
export const Normal = () => {
  const [modalSize, setModalSize] = React.useState('large' as ModalSize);

  return (
    <SelectModalSize {...propsFooterItemEditor} modalSizeRadio={modalSize} />
  );
};
export const isMobile = () => {
  const [modalSize, setModalSize] = React.useState('large' as ModalSize);

  return (
    <SelectModalSize
      {...propsFooterItemEditor}
      modalSizeRadio={modalSize}
      isMobile={true}
    />
  );
};
