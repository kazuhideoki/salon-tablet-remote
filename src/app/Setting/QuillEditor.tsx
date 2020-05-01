import React from 'react'
import ReactQuill from "react-quill";

export const QuillEditor = ({ value ,setValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];
  return (
    <ReactQuill
      value={value}
      onChange={(e) => setValue(e)}
      theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};
