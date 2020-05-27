import React from 'react'
import ReactQuill, { Quill }from "react-quill";
import ImageCompress from "quill-image-compress";
import { Typography, CircularProgress } from '@material-ui/core';
import { checkImg, removeImg } from "./handleImg";

// ※ReactQuillのスタイルはquill.scssに記述


// ↓使ってみたが, 導入するとeditorが表示されなくなった。アンイストール済み
// import { ImageResize } from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);

// 画像圧縮のモジュールを利用可能にimageCompress;
Quill.register("modules/imageCompress", ImageCompress);

// 動的にアイコンを変えるのは難しいか。。。stateの変化を反映させられないみたい
// const icons = Quill.import('ui/icons');


type Props = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>
  setEditorImg?: React.Dispatch<React.SetStateAction<string>>
  charCount: number
  setCharCount:React.Dispatch<React.SetStateAction<number>>,
}
export const QuillEditor = ({ value, setValue, setEditorTextExcerpt, setEditorImg, charCount, setCharCount }:Props) => {
  
  const [hasImg, setHasImg] = React.useState(false)
  
  const handleOnChange = (content, delta, source, editor) => {
    setValue(content)
    // if (setEditorTextExcerpt) {
      setEditorTextExcerpt(editor.getText(0, 100))
    // }  

    // checkImgで２個以上画像がある場合一つにする。画像データが返り値
    const imgData = checkImg(editor.getContents(), setHasImg, () => removeImg('react_quill_editor'));
    if (setEditorImg) {
      // ImgDataをarticle_img用に格納する
      setEditorImg(imgData)
    }
    // エディターから文字数を取得して文字数カウントのためのcharCountに値を格納
    setCharCount(editor.getLength());

    // console.log(delta)
    // console.log(source)
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
        // { indent: "-1" },
        // { indent: "+1" },
      ],
      ["link", image, "video"],
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
    // ※ReactQuillのスタイルはquill.scssに記述
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
