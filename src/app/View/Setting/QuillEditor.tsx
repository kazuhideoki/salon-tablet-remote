import React from 'react'
import ReactQuill, { Quill }from "react-quill";
import ImageCompress from "quill-image-compress";
// import ImageResize from "quill-image-resize-module-react";

import ImageResize from "quill-image-resize";

import { Typography } from '@material-ui/core';
import { checkImg, removeImg } from "./handleImg";
import { Resize } from './quillImageResizeModuleFixedForTouchEvent';
import { CharCount } from '../viewComponents/CharCount';

// ※■■■ReactQuillのスタイルはquill.scssに記述■■■




// コピペ、ドラック/ドロップのモジュール
// import { ImageDrop } from "quill-image-drop-module";
// Quill.register("modules/imageDrop", ImageDrop);


// 画像圧縮のモジュールを利用可能にimageCompress;
Quill.register("modules/imageCompress", ImageCompress);

// 画像サイズ変更のモジュールregister
Quill.register("modules/imageResize", ImageResize);


type Props = {
  editorText: string,
  setEditorText: React.Dispatch<React.SetStateAction<string>>,
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>
  setEditorImg?: React.Dispatch<React.SetStateAction<string>>
  setCharCount:React.Dispatch<React.SetStateAction<number>>,
}
export const QuillEditor = ({ editorText, setEditorText, setEditorTextExcerpt, setEditorImg, setCharCount }:Props) => {
  console.log("QuillEditorだよ");
  
  
  const [hasImg, setHasImg] = React.useState(false)
  
  const handleOnChange = (content, delta, source, editor) => {
    setEditorText(content)
    setEditorTextExcerpt(editor.getText(0, 100)) 

    // checkImgで２個以上画像がある場合一つにする。画像データが返り値
    const imgData = checkImg(editor.getContents(), setHasImg, () => removeImg('react_quill_editor'));
    if (setEditorImg) {
      // ImgDataをarticle_img用に格納する
      setEditorImg(imgData)
    }
    // エディターから文字数を取得して文字数カウントのためのeditorText.lengthに値を格納
    setCharCount(editor.getLength());
    
  }
  
  const image = hasImg ? "" : "image"; // 画像が挿入されているか判定して、なければ画像追加ボタンを表示
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ 'align': [] }],
      ["link", image, "video"],
      ["clean"],
    ],
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: "image/jpeg", // default
      debug: true, // default
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      // ResizeはimageのResizeをtouchイベントでも適応
      // ※画像をタップしたときに t.onUpdateのエラーが出るが、動作に問題はない？
      // modules: ["Resize", "DisplaySize", "Toolbar", Resize],
      modules: ["Resize", "DisplaySize", Resize],
    },
    // imageDrop: true,
  };

  return (
    // ※ReactQuillのスタイルはquill.scssに記述
    <>
      <ReactQuill
        className="react_quill_editor"
        value={editorText}
        onChange={(content, delta, source, editor) =>
          handleOnChange(content, delta, source, editor)
        }
        theme="snow"
        modules={modules}
        // formats={formats}
      />
      {/* <Typography
        variant="body2"
        align="right"
        color={editorText.length < 1001 ? "textPrimary" : "error"}
      >
        {editorText.length < 1001 ? null : "文字数をオーバーしています"}
        {`${editorText.length}/1000`}
      </Typography> */}

      <CharCount charCount={editorText.length} limitCount={1000} align="right" isShowCount/>
    </>
  );
};

export default QuillEditor
