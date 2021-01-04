import React from 'react';
import ReactQuill from 'react-quill';

export type TSmallQuillEditor = {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
};
export const SmallQuillEditor: React.FC<TSmallQuillEditor> = ({
  editorText,
  setEditorText,
  setCharCount,
}) => {
  const handleOnChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorText(content);
    // エディターから文字数を取得して文字数カウントのためのeditorText.lengthに値を格納
    const plainText = editor.getText();
    setCharCount(plainText.length);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] as [] }, { background: [] as [] }],
      ['clean'],
    ],
  };
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'clean',
  ];

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
        // コピペなどで他のformatのせいで一行表示ができなくなるのを防ぐ
        formats={formats}
        scrollingContainer="body"
      />
    </>
  );
};

export default SmallQuillEditor;
