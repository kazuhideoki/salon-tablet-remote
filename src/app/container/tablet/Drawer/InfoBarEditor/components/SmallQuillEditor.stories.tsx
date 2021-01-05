import React from 'react';
import SmallQuillEditor, { TSmallQuillEditor } from './SmallQuillEditor';
export default {
  title: 'Drawer/InfoBar/SmallQuillEditor',
  component: SmallQuillEditor,
};

export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');
  const setCharCount = () => {
    return;
  };

  const props: TSmallQuillEditor = {
    editorText,
    setEditorText,
    setCharCount,
  };
  return <SmallQuillEditor {...props} />;
};
