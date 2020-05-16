import React from 'react';
// import { QuillEditor } from "../app/Setting/QuillEditor";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../app/Setting/QuillEditor"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";


export default {
title: 'QuillEditor',
component: QuillEditor,
};
export const Normal = () => {
  const [value, setValue] = React.useState('')
  const [charCount, setCharCount] = React.useState(0);

  return (
    <QuillEditor
      value={value}
      setValue={setValue}
      charCount={charCount}
      setCharCount={setCharCount}
    />
  );
}