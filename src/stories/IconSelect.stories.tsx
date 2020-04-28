import React from 'react';
import { IconSelect } from '../app/Setting/IconSelect';
export default {
title: 'IconSelect',
component: IconSelect,
};
export const Normal = () => <IconSelect />;
export const bottomSet = () => 
  <div style={{ position: 'relative' }}>
    <IconSelect style={{ position: 'fixed', right: 50, bottom: 50 }} />
  </div>;
