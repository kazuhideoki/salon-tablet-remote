import React from 'react';
import SmallQuillEditor, { SmallQuillEditorProps } from './SmallQuillEditor';
export default {
  title: 'Drawer/InfoBar/SmallQuillEditor',
  component: SmallQuillEditor,
};

export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');
  const setCharCount = () => {
    return;
  };

  const props: SmallQuillEditorProps = {
    editorText,
    setEditorText,
    setCharCount,
  };
  return <SmallQuillEditor {...props} />;
};
