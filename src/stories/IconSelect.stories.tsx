import React from 'react';
import { IconSelect, IconItem } from "../app/Setting/iconSelect/IconSelect";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { EditorContext } from "../app/Store/EditorContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'relative', width: '100%', height: '100%' },
    button: { position: 'absolute', left: 300, top: 300 }
  }),
);
export default {
title: 'IconSelect',
component: IconSelect,
};
export const Normal = () => {
const {selectedIcon, dispatchSelectedIcon} = React.useContext(EditorContext)

return <>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
<p>a</p>
{/* fdddddddddddddddddd<IconSelect selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/> */}
fdddddddddddddddddd<IconSelect />
</>
};




export const bottomSet = () => {
  const { selectedIcon, dispatchSelectedIcon } = React.useContext(
    EditorContext
  );
  const classes = useStyles()

  return (
    <div className={classes.root}>
      fdsa
      {/* <IconSelect selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/> */}
      <IconSelect />
      {(selectedIcon)? <IconItem icon={selectedIcon}/> : null}
    </div>
  );
}
