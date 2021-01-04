import React from 'react';
import SmallQuillEditor, {
  TSmallQuillEditor,
} from '../app/View/tablet/Drawer/InfoBarEditor/components/SmallQuillEditor';
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
