import React from 'react';
// import { QuillEditor } from "../app/Setting/QuillEditor";
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(
  () => import('../app/container/tablet/Drawer/QuillEditor/QuillEditor'),
  {
    ssr: false,
  }
);
import 'react-quill/dist/quill.snow.css';

export default {
  title: 'Drawer/Editor/QuillEditor',
  component: QuillEditor,
};
export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');
  const [charCounts, setCharCount] = React.useState(0);
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState('');
  const [editorImg, setEditorImg] = React.useState('');

  return (
    <QuillEditor
      editorText={editorText}
      setEditorText={setEditorText}
      setEditorTextExcerpt={setEditorTextExcerpt}
      setCharCount={setCharCount}
      setEditorImg={setEditorImg}
    />
  );
};
