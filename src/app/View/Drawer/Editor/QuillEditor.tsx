import React from 'react'
import ReactQuill, { Quill }from "react-quill";
import ImageCompress from "quill-image-compress";
// import ImageResize from "quill-image-resize-module-react";

import ImageResize from "quill-image-resize";

import { Typography } from '@material-ui/core';
import { checkImg, removeImg } from "./()handleImg";
import { Resize } from './quillImageResizeModuleFixedForTouchEvent';
import { CharCounter } from '../../viewComponents/CharCounter';
import { removeExceededImgs } from './removeExceededImgs';


// ※■■■ReactQuillのスタイルはquill.scssに記述■■■


const maxNumberOfImgs = 5

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
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>,
  charCount: number;
  setCharCount:React.Dispatch<React.SetStateAction<number>>,
  setEditorImg?: React.Dispatch<React.SetStateAction<string>>,
}
export const QuillEditor:React.FC<Props> = ({ editorText, setEditorText, setEditorTextExcerpt, setEditorImg, charCount, setCharCount }) => {  
  
  const [hasMaxImgs, setHasMaxImgs] = React.useState(false)
  
  const handleOnChange = (content, delta, source, editor) => {
    setEditorText(content)
    setEditorTextExcerpt(editor.getText(0, 100)) 
    // エディターから文字数を取得して文字数カウントのためのeditorText.lengthに値を格納
    const plainText = editor.getText();
    setCharCount(plainText.length);

    
    const ImgNode = document.querySelectorAll("#react_quill_editor .ql-editor img");
    removeExceededImgs(ImgNode,maxNumberOfImgs);
    if (ImgNode.length === maxNumberOfImgs) {
      setHasMaxImgs(true)
    } else {
      setHasMaxImgs(false)
    }
    // サムネイルのセット
    // ↓パフォーマンスが悪いときはuseMemoか？
    setEditorImg(ImgNode ? ImgNode[0]["src"] : '');
    
  }
  
  const image = hasMaxImgs ? "" : "image"; // 画像が挿入されているか判定して、なければ画像追加ボタンを表示
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
      modules: [ "DisplaySize", "Toolbar", Resize],
    },
    
    // imageDrop: true,
  };

  return (
    // ※ReactQuillのスタイルはquill.scssに記述
    <>
      <ReactQuill
        className="react_quill_editor"
        id="react_quill_editor"
        value={editorText}
        onChange={(content, delta, source, editor) =>
          handleOnChange(content, delta, source, editor)
        }
        theme="snow"
        modules={modules}
        scrollingContainer='body'
        // formats={formats}
        
      />
    </>
  );
};

export default QuillEditor
