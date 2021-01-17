import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { removeExceededImgs } from './context/removeExceededImgs';

// ※■■■ReactQuillのスタイルはquill.scssに記述■■■

const maxNumberOfImgs = 5;

import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);

import ImageResize from 'quill-image-resize-module-react';
import { Resize } from './context/quill/quillImageResizeModuleFixedForTouchEvent';
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

  const handleOnChange = (content: string, editor: any) => {
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
      modules: ['DisplaySize', Resize],
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
          handleOnChange(content, editor)
        }
        theme="snow"
        modules={modules}
        scrollingContainer="body"
      />
    </>
  );
};

export default QuillEditor;
