import React from 'react';
import {InfoBarEditorPresenter} from '../app/View/Drawer/InfoBar/InfoBarEditor';
import { T_info_bar_type } from '../app/Store/Types';
export default {
  title: 'Drawer/InfoBar/InfoBarEditorPresenter',
  component: InfoBarEditorPresenter,
};


export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');
  const [charCount, setCharCount] = React.useState(0);
  const [infoBarType, setInfoBarType] = React.useState('shop_name' as T_info_bar_type);

  
  const props = {
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    infoBarType,
    setInfoBarType,
  };


  return (
    <InfoBarEditorPresenter {...props}/>
  )
}