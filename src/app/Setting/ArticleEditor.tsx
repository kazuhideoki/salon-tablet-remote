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

  type handleSubmit = {
    isDraft?: boolean
  }
  const handleSubmit = ({isDraft}) => {
    let is_published: boolean
    if (isDraft) {
      is_published = false
    }else{
      is_published = true
    }
    const today = new Date();
      // 記事編集
      if (isEdittingPost) {
          const params: TArticle = {
            id: edittingPostParams.id,
            is_published: is_published,
            created_at: dateToSql(edittingPostParams.created_at),
            updated_at: dateToSql(today),
            title: titleText,
            article_content: editorText,
          };
          updatePost(params, setIsEdittingPost);

      // 新規投稿
      }else{
          const params: ArticleWithoutId = {
            // idは自動で付与
            is_published: is_published,
            created_at: dateToSql(today),
            updated_at: null,
            title: titleText,
            article_content: editorText,
          };
          createPost(params);

      }
  };

  return (
    <>
      <h2>記事タイトル</h2>
      <input
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <QuillEditor value={editorText} setValue={setEditorText} />
      <button onClick={() => handleSubmit({ isDraft: false })}>
        {isEdittingPost ? "更新" : "投稿"}
      </button>
      <button onClick={() => handleSubmit({ isDraft: true })}>
        下書き保存
      </button>
    </>
  );
};

export default ArticleEditor
