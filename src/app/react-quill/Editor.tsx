import React from "react";
import ReactQuill from "react-quill"; 
import {
  useCreatePost,
  useCreatePostD,
  useGetSinglePost,
  useUpdatePost,
  useDeletePost,
} from "../Store/postDataRducer";
import { dateToSql } from "../modules/organizeSql/dateToSql";

const Editor = () => {
  const [editorText, setEditorText] = React.useState("");
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const createPostD = useCreatePostD();

  const hundleSubmit = () => {
      const today = new Date();
      const date = dateToSql(today);
      const params = {
        id: 0,
        title: "quillで作成",
        date: date,
        content: editorText,
      };
    createPostD(params);
  };

  return (
    <>
        <ReactQuill
            value={editorText}
            onChange={(e) => setEditorText(e)} theme="snow"
            modules={modules}
            formats={formats}
        />
      <button onClick={() => hundleSubmit()}>投稿</button>
    </>
  );
};

export default Editor
