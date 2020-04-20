import React from "react";
import ReactQuill from "react-quill"; 
import {
  useCreatePost,
  useCreatePostD,
  useGetSinglePost,
  useUpdatePost,
  useDeletePost,
} from "../Store/postDataRducer";

const Editor = () => {
  const [editorText, setEditorText] = React.useState("");
  const createPostD = useCreatePostD();

//   const hundleSubmit = () => {
//     createPostD();
//   };

  return (
    <>
      <ReactQuill value={editorText} onChange={(e) => setEditorText(e)} />
      {/* <button onClick={() => hundleSubmit()}></button> */}
    </>
  );
};

export default Editor
