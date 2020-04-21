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
import { EditorContext } from "../Store/EditorContext";

const Editor = () => {
//   const [editorText, setEditorText] = React.useState("");
const {
  editorText,
  setEditorText,
  isEdittingPost,
  setIsEdittingPost,
  edittingPostParams,
} = React.useContext(EditorContext);
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
    const updatePost = useUpdatePost();


  const hundleSubmit = () => {
      if (isEdittingPost) {
          const params = {
            id: edittingPostParams.id,
            title: "update後のtitle",
            date: dateToSql(edittingPostParams.date),
            content: editorText,
          };
          updatePost(params, setIsEdittingPost);

      }else{
          const today = new Date();
          const date = dateToSql(today);
          const params = {
            id: 0,
            title: "quillで作成",
            date: date,
            content: editorText,
          };
        createPostD(params);

      }
  };
  const enableCreateMode = () => {
    setIsEdittingPost(false);
    // setTitle("");
    setEditorText("");
  };

  const modeNotice = isEdittingPost
    ? `${edittingPostParams.title}の記事を編集中`
    : "新規投稿";

  return (
    <>
      <p>{modeNotice}</p>
      <button onClick={() => enableCreateMode()}>新規投稿にする</button>
      <ReactQuill
        value={editorText}
        onChange={(e) => setEditorText(e)}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <button onClick={() => hundleSubmit()}>投稿</button>
    </>
  );
};

export default Editor
