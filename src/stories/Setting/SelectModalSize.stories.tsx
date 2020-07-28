import React from 'react';
import { SelectModalSize } from '../../app/View/Setting/SelectModalSize';
export default {
  title: "Setting/SelectModalSize",
  component: SelectModalSize,
};
export const Normal = () =>{ 
const [modalSize, setModalSize] = React.useState("large")

return <SelectModalSize/>;

}