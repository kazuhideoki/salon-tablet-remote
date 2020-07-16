import React from 'react';
import { SelectAppLink } from '../app/View/Drawer/ItemEditor/selectAppLink/SelectAppLink';
export default {
title: 'SelectAppLink',
component: SelectAppLink,
};
export const Normal = () => {
  const [appLinkUrl, setAppLinkUrl] = React.useState('')

  return <SelectAppLink appLinkUrl setAppLinkUrl/>
}