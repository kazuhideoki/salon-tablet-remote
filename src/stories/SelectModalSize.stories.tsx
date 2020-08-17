import React from 'react';
import { SelectModalSize } from '../app/View/Setting/SelectModalSize';
import { T_modal_size } from '../app/Store/Types';
export default {
  title: "Setting/SelectModalSize",
  component: SelectModalSize,
};
export const Normal = () =>{ 
const [modalSize, setModalSize] = React.useState("large" as T_modal_size)

return <SelectModalSize modalSize={modalSize} />;

}