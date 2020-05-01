import React from "react";
import {
  useCreatePost,
  useUpdatePost,
} from "../Store/postData/postDataActionCreator";
import { dateToSql } from "../modules/organizeSql/dateToSql";
import { EditorContext } from "../Store/EditorContext";
import { QuillEditor } from "./QuillEditor";

const ArticleEditor = () => {
  const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingPost,
    setIsEdittingPost,
    edittingPostParams,
  } = React.useContext(EditorContext);
  const createPost = useCreatePost();
      const updatePost = useUpdatePost();


  const hundleSubmit = () => {
      if (isEdittingPost) {
          const params = {
              id: edittingPostParams.id,
              title: titleText,
              date: dateToSql(edittingPostParams.date),
              content: editorText,
          };
          updatePost(params, setIsEdittingPost);

      }else{
          const today = new Date();
          const date = dateToSql(today);
          const params = {
              id: 0,
              title: titleText,
              date: date,
              content: editorText,
          };
          createPost(params);

      }
  };
  const enableCreateMode = () => {
      setIsEdittingPost(false);
      setTitleText("");
      setEditorText("");
  };

  const ModeNotice = () => {
      return(
          <>
              <p>{`${edittingPostParams.title}の記事を編集中`}</p>
              <button onClick={() => enableCreateMode()}>新規投稿にする</button>
          </>
      )
  }


  return (
    <>
      {isEdittingPost ? <ModeNotice /> : <p>"新規投稿"</p>}

      <h2>記事タイトル</h2>
      <input
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <QuillEditor value={editorText} setValue={setEditorText} />
      <button onClick={() => hundleSubmit()}>投稿</button>
    </>
  );
};

export default ArticleEditor
