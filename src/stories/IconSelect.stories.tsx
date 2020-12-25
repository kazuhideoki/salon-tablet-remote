import React from 'react';
import {
  SelectIcon,
} from "../app/View/Drawer/FooterItemEditor/components/iconSelect/SelectIcon";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { WifiTwoTone } from '@material-ui/icons';
import { propsFooterItemEditor } from './lib/propsFooterItemEditor';

const props = propsFooterItemEditor

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'relative', width: '100%', height: '100%' },
    button: { position: 'absolute', left: 300, top: 300 }
  }),
);
export default {
  title: "Drawer/ItemEditor/iconSelect/SelectIcon",
  component: SelectIcon,
};
export const Normal = () => {
  return (
    <>
      <SelectIcon {...props}/>

    </>
);
};
export const Selected = () => {
  const selectedIcon = [WifiTwoTone, "WifiTwoTone"]
  return (
    //@ts-ignore
      <SelectIcon {...props} selectedIcon={selectedIcon} />
  );
};




