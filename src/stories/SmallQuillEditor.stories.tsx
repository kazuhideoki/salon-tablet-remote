import React from 'react';
import SmallQuillEditor from '../app/View/Drawer/InfoBar/SmallQuillEditor';
export default {
  title: 'Drawer/InfoBar/SmallQuillEditor',
  component: SmallQuillEditor,
};


export const Normal = () => {
  const [editorText, setEditorText] = React.useState('')
  const setCharCount = null
  
  const props = {
    editorText,
    setEditorText,
    setCharCount,
  };
  return (
    <SmallQuillEditor {...props}/>
  )
}