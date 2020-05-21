import React from 'react'
import ReactQuill, {Quill} from "react-quill";
import { removeImg } from '../Setting/QuillEditor';

const QuillExcerpt = (props) => {
  const [text, setText] = React.useState('')

  // まず画像を消す
  React.useEffect(() => {
    removeImg("react_quill_pmain");
    setText(props.article_content);
  }, []);
  
  // その後にonChangeが発動し、抜粋表示になる
  const handleOnChange = (editor, length) => {
    console.log();
  };

  return (
    <ReactQuill
      // id="react_quill_pmain"
      className="react_quill_pmain"
      theme="bubble"
      readOnly
      onChange={(content, delta, source, editor) =>
        handleOnChange(editor.getText(), 100)
      }
      // value={props.article_content}
      value={text}
    />
  );
};

export default QuillExcerpt
