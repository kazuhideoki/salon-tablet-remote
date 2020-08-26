import React from "react";
import ReactQuill, { Quill } from "react-quill";

type Props = {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
};
export const SmallQuillEditor: React.FC<Props> = ({
  editorText,
  setEditorText,
  setCharCount,
}) => {

  const handleOnChange = (content, delta, source, editor) => {
    setEditorText(content);
    // エディターから文字数を取得して文字数カウントのためのeditorText.lengthに値を格納
    const plainText = editor.getText();
    setCharCount(plainText.length);

  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],

  };
  const formats = 
    ["bold", "italic", "underline", "strike", 'color', 'background', 'clean']
  

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
        // formats={formats}
      />
    </>
  );
};

export default SmallQuillEditor;
