import React from 'react';
import { SelectModalSize } from '../app/View/Drawer/FooterItemEditor/components/SelectModalSize';
import { T_modal_size } from '../app/Store/Types';
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