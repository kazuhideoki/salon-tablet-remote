import React from 'react';
// import { QuillEditor } from "../app/Setting/QuillEditor";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../app/View/Setting/QuillEditor"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";


export default {
title: 'QuillEditor',
component: QuillEditor,
};
export const Normal = () => {
  const [editorText, setEditorText] = React.useState("");
  const [charCount, setCharCount] = React.useState(0);
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState('');

  return (
    <QuillEditor
      editorText={editorText}
      setEditorText={setEditorText}
      setEditorTextExcerpt={setEditorTextExcerpt}
      charCount={charCount}
      setCharCount={setCharCount}
    />
  );
}