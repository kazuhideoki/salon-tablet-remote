import React from 'react';
import { PersistentDrawerLeft } from "../app/View/PersistentDrawerLeft";
import App from '../app/View/App';
import { sampleData } from './SampleData';
export default {
  title: "PersistentDrawerLeft",
  component: PersistentDrawerLeft,
};
export const Normal = () => {
    const [open, setOpen] = React.useState(false);


return (
  <PersistentDrawerLeft open={open} setOpen={setOpen}>
    fdas fdas CHILDREN内容
  </PersistentDrawerLeft>
);}
