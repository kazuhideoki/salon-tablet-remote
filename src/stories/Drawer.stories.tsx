import React from 'react';
import { Drawer } from "../app/View/Drawer";
import App from '../app/View/App';
import { sampleData } from './SampleData';
export default {
  title: "Drawer",
  component: Drawer,
};
export const Normal = () => {
    const [open, setOpen] = React.useState(false);


return (
  <Drawer open={open} setOpen={setOpen}>
    fdas fdas CHILDREN内容
  </Drawer>
);}
