import React from 'react';
import { SelectIcon } from './SelectIcon';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MoodBad, WifiTwoTone } from '@material-ui/icons';
import { propsFooterItemEditor } from '../../../../../../../util/dev/sampleProps/propsFooterItemEditor';

const props = propsFooterItemEditor;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'relative', width: '100%', height: '100%' },
    button: { position: 'absolute', left: 300, top: 300 },
  })
);
export default {
  title: 'Drawer/ItemEditor/iconSelect/SelectIcon',
  component: SelectIcon,
};
export const Normal = () => {
  return (
    <>
      <SelectIcon {...props} />
    </>
  );
};
export const Selected = () => {
  const selectedIcon = [WifiTwoTone, 'WifiTwoTone'];
  return (
    <SelectIcon
      {...props}
      selectedIcon={selectedIcon}
      dispatchSelectedIcon={() => {
        return;
      }}
    />
  );
};
