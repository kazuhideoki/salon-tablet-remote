import React from 'react'
import ReactQuill, { Quill } from "react-quill";

export const checkInsertImg = (delta, setHasImg) => {
  for (let n in delta.ops) {
    console.log(delta.ops[n]);

    for (let value in delta.ops[n]) {
      if (value === "insert") {
        console.log(delta.ops[n]["insert"]);

        for (let value2 in delta.ops[n]["insert"]) {
          if (value2 === "image") {
            console.log(delta.ops[n]["insert"]["image"]);
            setHasImg(true);
          }
        }
      }
    }
  }
}

export const QuillEditor = ({ value ,setValue }) => {

  const [hasImg, setHasImg] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)

  const handleOnChange = (content, delta, source, editor) => {
    setValue(content)
    console.log(delta)
    console.log(source)

    checkInsertImg(delta, setHasImg)

  }

  const image = hasImg ? "" : "image";
  const modules = {
    // うまくいかない
    // "image-tooltip": true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", image ],
      // ["link", imageButton],
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
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "clean",
  ];
  return (
      <ReactQuill
        value={value}
        // onChange={(e) => setValue(e)}
        onChange={(content, delta, source, editor) => handleOnChange(content, delta, source, editor)}
        theme="snow"
        modules={modules}
        formats={formats}
      />

  );
};

export default QuillEditor
