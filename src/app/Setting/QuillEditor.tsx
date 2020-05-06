import React from 'react'
import ReactQuill from "react-quill";
import { Quill } from "quill";

export const QuillEditor = ({ value ,setValue }) => {
  const imageHandler = () => {
    // Quill.insertEmbed(10, "image", "https://quilljs.com/images/cloud.png");
    alert("imageHandler");
  }

  const modules = {
    // うまくいかない
    // "image-tooltip": true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      // [{ color: [] }, { background: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    // handlers: {
    //   image: imageHandler,
    // },
  };

  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //     ['blockquote', 'code-block'],

  //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //     [{ 'direction': 'rtl' }],                         // text direction

  //     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //     [{ 'font': [] }],
  //     [{ 'align': [] }],

  //     ['clean']                                         // remove formatting button
  //   ]
  // };

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
    "image",
    "color",
  ];
  return (
    <ReactQuill
      value={value}
      onChange={(e) => setValue(e)}
      theme="snow"
      modules={modules}
      // formats={formats}
    />
  );
};

export default QuillEditor
