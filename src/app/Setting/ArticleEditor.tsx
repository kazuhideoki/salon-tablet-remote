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
    isEdittingArticle,
    setIsEdittingArticle,
    edittingArticleParams,
  } = React.useContext(EditorContext);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const handleSubmit = ({isDraft}) => {
    let is_published: boolean
    if (isDraft) {
      is_published = false
    }else{
      is_published = true
    }
      // 記事編集
      if (isEdittingArticle) {
          // const params: TArticle = {
          const params = {
            id: edittingArticleParams.id,
            is_published: is_published,
            // created_at: edittingArticleParams.created_at,
            // updated_at: dateToSql(new Date()),
            title: titleText,
            article_content: editorText,
          };
          updatePost(params, setIsEdittingArticle);

      // 新規投稿
      }else{
          // const params: ArticleWithoutId = {
          const params = {
            // idは自動で付与
            is_published: is_published,
            // created_atは自動で現在の日時を付与
            // created_at: dateToSql(new Date()),
            // updated_at: null,
            title: titleText,
            article_content: editorText,
          };
          //@ts-ignore
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
        {isEdittingArticle ? "更新" : "投稿"}
      </button>
      <button onClick={() => handleSubmit({ isDraft: true })}>
        下書き保存
      </button>
    </>
  );
};

export default ArticleEditor
