import React from "react";
import {
  useCreateArticle,
  useUpdateArticle,
  TCreateArticle,
  TUpdateArticle,
} from "../Store/articles/articlesActionCreator";
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
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const handleSubmit = ({isDraft}) => {
    let is_published: boolean
    if (isDraft) {
      is_published = false
    }else{
      is_published = true
    }
      // 記事編集
      if (isEdittingArticle) {
          const params: TUpdateArticle = {
            id: edittingArticleParams.id,
            is_published: is_published,
            title: titleText,
            article_content: editorText,
          };
          updateArticle(params);

      // 新規投稿
      }else{
          const params: TCreateArticle = {
            is_published: is_published,
            title: titleText,
            article_content: editorText,
          };
          //@ts-ignore
          createArticle(params);

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
