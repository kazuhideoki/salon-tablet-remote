import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { removeExceededImgs } from './context/removeExceededImgs';

// ※■■■ReactQuillのスタイルはquill.scssに記述■■■

const maxNumberOfImgs = 5;

// コピペ、ドラック/ドロップのモジュール
// ※コピペはできるが、ドラック/ドロップができない？
// import { ImageDrop } from "quill-image-drop-module";
// Quill.register("modules/imageDrop", ImageDrop);

// コピペ、ドラック/ドロップのモジュール 動作確認
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const QuillImageDropAndPaste = require('quill-image-drop-and-paste');
// ↑requireはエラーになる

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

// 画像圧縮のモジュールを利用可能にimageCompress;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const ImageCompress = require('quill-image-compress');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);

// 画像サイズ変更のモジュールregister
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const ImageResize = require('quill-image-resize');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ImageResize from 'quill-image-resize';
import { Resize } from './context/quill/quillImageResizeModuleFixedForTouchEvent';
// import { Toolbar } from './context/quill/toolbar';
Quill.register('modules/imageResize', ImageResize);

type Props = {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
  setEditorImg?: React.Dispatch<React.SetStateAction<string>>;
};
export const QuillEditor: React.FC<Props> = ({
  editorText,
  setEditorText,
  setEditorTextExcerpt,
  setEditorImg,
  setCharCount,
}) => {
  const [hasMaxImgs, setHasMaxImgs] = React.useState(false);

  const handleOnChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorText(content);
    setEditorTextExcerpt(editor.getText(0, 100));
    // エディターから文字数を取得して文字数カウントのためのeditorText.lengthに値を格納
    const plainText = editor.getText();
    setCharCount(plainText.length);

    const ImgNode = document.querySelectorAll<HTMLImageElement>(
      '#react_quill_editor .ql-editor img'
    );
    removeExceededImgs(ImgNode, maxNumberOfImgs);
    if (ImgNode.length === maxNumberOfImgs) {
      setHasMaxImgs(true);
    } else {
      setHasMaxImgs(false);
    }

    //imgタグ内のheightを削除
    ImgNode.forEach((element) => {
      element.removeAttribute('height');
    });

    // サムネイルのセット
    // ↓パフォーマンスが悪いときはuseMemoか？
    if (setEditorImg) {
      setEditorImg(ImgNode.length ? ImgNode[0]['src'] : '');
    }
  };

  const image = hasMaxImgs ? '' : 'image'; // 画像が挿入されているか判定して、なければ画像追加ボタンを表示
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] as [] }, { background: [] as [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] as [] }],
      ['link', image, 'video'],
      ['clean'],
    ],
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: 'image/jpeg', // default
      debug: process.env.NODE_ENV !== 'production', // default
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      // ResizeはimageのResizeをtouchイベントでも適応
      modules: ['DisplaySize', 'Toolbar', Resize],
    },
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
        scrollingContainer="body"
      />
    </>
  );
};

export default QuillEditor;
