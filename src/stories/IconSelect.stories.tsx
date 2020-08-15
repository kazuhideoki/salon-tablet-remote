import React from 'react';
import {
  SelectIcon,
  IconItem,
} from "../app/View/Drawer/ItemEditor/iconSelect/SelectIcon";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { EditorContext } from "../app/Store/EditorContext";
import { WifiTwoTone } from '@material-ui/icons';

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
  let selectedIcon = null, dispatchSelectedIcon

  return (
    <>
      <SelectIcon selectedIcon={selectedIcon} dispatchSelectedIcon={dispatchSelectedIcon}/>

    </>
);
};
export const Selected = () => {
  const selectedIcon = [WifiTwoTone, "WifiTwoTone"]
  let dispatchSelectedIcon;

  return (
    //@ts-ignore
      <SelectIcon selectedIcon={selectedIcon} dispatchSelectedIcon={dispatchSelectedIcon}/>
  );
};




