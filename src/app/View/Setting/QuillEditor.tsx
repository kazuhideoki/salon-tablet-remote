import React from 'react'
import ReactQuill, { Quill }from "react-quill";
import * as TQuill from "quill";
import ImageCompress from "quill-image-compress";
import { Typography, CircularProgress } from '@material-ui/core';
// ↓使ってみたが, 導入するとeditorが表示されなくなった。アンイストール済み
// import { ImageResize } from "quill-image-resize-module";


// deltaコンテンツの中にimageがあるか判定して、あればsetHasImgでtrueにして、なければfalseにする
export const checkImg = (
  deltaContents: TQuill.DeltaStatic,
  setHasImg: React.Dispatch<React.SetStateAction<boolean>>,
  removeImg: () => void
) => {
  // ※もしかしたらquillのなんらかのメソッドで簡潔に書けるかも
  let isCheckImg = false;
  let isCheckMoreImgs = false;
  for (let n in deltaContents.ops) {
    // console.log(deltaContents.ops[n]);

    for (let value in deltaContents.ops[n]) {
      if (value === "insert") {
        // console.log(deltaContents.ops[n]["insert"]);

        for (let value2 in deltaContents.ops[n]["insert"]) {
          if (value2 === "image") {
            // console.log(deltaContents.ops[n]["insert"]["image"]);

            // 2つ目の画像でisCheckMoreImgsをtrueに
            isCheckMoreImgs = isCheckImg ? true : false;
            // 1つめの画像でischeckimgをtrueに
            isCheckImg = true;
          }
        }
      }
    }
  }
  isCheckImg ? setHasImg(true) : setHasImg(false);

  // 画像が複数ある場合最初のimgを削除する。その後onChangeが再発火してcheckInsertImgも再発火。imgが一つになるまで続く。
  isCheckMoreImgs ? removeImg() : null;
};


export const removeImg = (elementName) => {
  const editor = document.getElementsByClassName(elementName);
  console.log(editor);
  
  for (const key in editor) {
    if (editor.hasOwnProperty(key)) {
      const element = editor[key];
      const imgs = element.querySelectorAll("img");
      console.log(imgs);

      if (imgs) {
        imgs.forEach((element) => {
          element.remove()
        })
      }  
      
    }
  }
}

// 画像圧縮のモジュールを利用可能にimageCompress;
Quill.register("modules/imageCompress", ImageCompress);
// Quill.register("modules/imageResize", ImageResize);

type Props = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setEditorTextExcerpt?: React.Dispatch<React.SetStateAction<string>>
  charCount: number
  setCharCount:React.Dispatch<React.SetStateAction<number>>,
}
export const QuillEditor = ({ value, setValue, setEditorTextExcerpt, charCount, setCharCount }:Props) => {
  
  const [hasImg, setHasImg] = React.useState(false)
  
  const handleOnChange = (content, delta, source, editor) => {
    setValue(content)
    if (setEditorTextExcerpt) {
      setEditorTextExcerpt(editor.getText(0, 100))
    }
    // console.log(delta)
    // console.log(source)
    
    checkImg(editor.getContents(), setHasImg, () => removeImg('react_quill_editor'));

    // エディターから文字数を取得して文字数カウントのためのcharCountに値を格納
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
      // ["link", "image"],
      ["clean"],
    ],
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: "image/jpeg", // default
      debug: true, // default
    },
  };

  // let formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "color",
  //   "background",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "clean",
  // ];

  return (
    <>
      <ReactQuill
        className="react_quill_editor"
        value={value}
        onChange={(content, delta, source, editor) =>
          handleOnChange(content, delta, source, editor)
        }
        theme="snow"
        modules={modules}
        // formats={formats}
      />
      <Typography
        variant="body2"
        align="right"
        color={charCount < 1001 ? "textPrimary" : "error"}
      >
        {charCount < 1001 ? null : "文字数をオーバーしています"}
        {`${charCount}/1000`}
      </Typography>
    </>
  );
};

export default QuillEditor
