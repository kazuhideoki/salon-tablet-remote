import React from "react";
import {
  useCreatePost,
  useUpdatePost,
} from "../Store/articles/articlesActionCreator";
import { dateToSql } from "../modules/organizeSql/dateToSql";
import { EditorContext } from "../Store/EditorContext";
import { QuillEditor } from "./QuillEditor";
import { ArticleWithoutId, TArticle } from "../Store/Store";

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
    const today = new Date();
      if (isEdittingPost) {
          const params: TArticle = {
            article_id: edittingPostParams.article_id,
            is_published: true,
            created_at: dateToSql(edittingPostParams.created_at),
            updated_at: dateToSql(today),
            title: titleText,
            article_content: editorText,
          };
          updatePost(params, setIsEdittingPost);

      }else{
          const params: TArticle = {
            // article_idはauto incrementalだがuseCreateから返り値があるので入れてある
            article_id: 0,
            is_published: true,
            created_at: dateToSql(today),
            updated_at: null,
            title: titleText,
            article_content: editorText,
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
