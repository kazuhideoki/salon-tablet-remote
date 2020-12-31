import React from 'react';
import { SelectModalSize } from '../app/View/tablet/Drawer/FooterItemEditor/components/SelectModalSize';
import { T_modal_size } from '../app/Store/Interface';
import { propsFooterItemEditor } from './lib/propsFooterItemEditor';
export default {
  title: "Setting/SelectModalSize",
  component: SelectModalSize,
};
export const Normal = () =>{ 
const [modalSize, setModalSize] = React.useState("large" as T_modal_size)

return <SelectModalSize {...propsFooterItemEditor} modalSizeRadio={modalSize} />;

}
export const isMobile = () =>{ 
const [modalSize, setModalSize] = React.useState("large" as T_modal_size)

return <SelectModalSize {...propsFooterItemEditor} modalSizeRadio={modalSize} isMobile={true}/>;

}