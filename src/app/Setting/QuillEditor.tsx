import React from 'react'
import ReactQuill, { Quill }from "react-quill";
import ImageCompress from "quill-image-compress";
// ↓使ってみたが, 導入するとeditorが表示されなくなった。アンイストール済み
// import { ImageResize } from "quill-image-resize-module";


// deltaコンテンツの中にimageがあるか判定して、あればsetHasImgでtrueにして、なければfalseにする
export const checkInsertImg = (deltaContents, setHasImg) => {
  // もしかしたらquillのなんらかのメソッドで簡潔に書けるかも
  let ischeckimg = false
  for (let n in deltaContents.ops) {
    // console.log(deltaContents.ops[n]);

    for (let value in deltaContents.ops[n]) {
      if (value === "insert") {
        // console.log(deltaContents.ops[n]["insert"]);

        for (let value2 in deltaContents.ops[n]["insert"]) {
          if (value2 === "image") {
            // console.log(deltaContents.ops[n]["insert"]["image"]);
            ischeckimg = true
          }
        }
      } 
    }
  }
  ischeckimg ? setHasImg(true) : setHasImg(false);
}

Quill.register("modules/imageCompress", ImageCompress);
// Quill.register("modules/imageResize", ImageResize);

export const QuillEditor = ({ value ,setValue }) => {
  
  const [hasImg, setHasImg] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)
  
  const handleOnChange = (content, delta, source, editor) => {
    setValue(content)
    // console.log(delta)
    // console.log(source)
    
    checkInsertImg(editor.getContents(), setHasImg);
    setCharCount(editor.getLength());
    
    // console.log(editor.getText());
    // console.log(editor.getContents());
    // console.log(editor.getHTML());
    
  }
  
  const image = hasImg ? "" : "image"; // 画像が挿入されているか判定して、なければ画像追加ボタンを表示
  const modules = {
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
      ["link", image],
      // ["link", imageButton],
      ["clean"],
    ],
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: "image/jpeg", // default
      debug: true, // default
    },
    // ImageResize: {
    //   // https://www.npmjs.com/package/quill-image-resize-module
    //   },
    
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
    <>
      <ReactQuill
        value={value}
        // onChange={(e) => setValue(e)}
        onChange={(content, delta, source, editor) =>
          handleOnChange(content, delta, source, editor)
        }
        theme="snow"
        modules={modules}
        formats={formats}
      />
      {charCount}
    </>
  );
};

export default QuillEditor
