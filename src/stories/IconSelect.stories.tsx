import React from 'react';
import {
  SelectIcon,
  IconItem,
} from "../app/View/Drawer/ItemEditor/iconSelect/SelectIcon";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { EditorContext } from "../app/Store/EditorContext";

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
const {selectedIcon, dispatchSelectedIcon} = React.useContext(EditorContext)

return (
  <>
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
    {/* fdddddddddddddddddd<SelectIcon selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/> */}
    fdddddddddddddddddd
    <SelectIcon />
  </>
);
};




// export const bottomSet = () => {
//   const { selectedIcon, dispatchSelectedIcon } = React.useContext(
//     EditorContext
//   );
//   const classes = useStyles()

//   return (
//     <div className={classes.root}>
//       fdsa
//       {/* <SelectIcon selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/> */}
//       <SelectIcon />
//       {(selectedIcon)? <IconItem icon={selectedIcon}/> : null}
//     </div>
//   );
// }
