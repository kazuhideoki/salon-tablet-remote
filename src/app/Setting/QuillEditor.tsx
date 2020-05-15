import React from 'react'
import ReactQuill from "react-quill";

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



export const QuillEditor = ({ value ,setValue }) => {

  const [hasImg, setHasImg] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)

  const handleOnChange = (content, delta, source, editor) => {
    setValue(content)
    // console.log(delta)
    // console.log(source)

    checkInsertImg(editor.getContents(), setHasImg);

    console.log(editor.getText());
    console.log(editor.getContents());
    console.log(editor.getHTML());
     
    


  }

  const image = hasImg ? "" : "image"; // 画像が挿入されているか判定して、なければ画像追加ボタンを表示
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
