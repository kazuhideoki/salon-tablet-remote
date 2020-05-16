import React from "react";
import {
  useCreateArticle,
  useUpdateArticle,
  TCreateArticle,
  TUpdateArticle,
} from "../Store/articles/articlesActionCreator";
import { EditorContext } from "../Store/EditorContext";
import { QuillEditor } from "./QuillEditor";
import { Button, TextField } from "@material-ui/core";


const ArticleEditor = () => {
  const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingArticle,
    edittingArticleParams,
  } = React.useContext(EditorContext);
  const [charCount, setCharCount] = React.useState(0);
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const handleSubmit = ({ isPublishing }) => {
    // let is_published: boolean;
    // if (isDraft) {
    //   is_published = false;
    // } else {
    //   is_published = true;
    // }
    // 記事編集
    if (isEdittingArticle) {
      const params: TUpdateArticle = {
        id: edittingArticleParams.id,
        is_published: isPublishing,
        title: titleText,
        article_content: editorText,
      };
      updateArticle(params);

      // 新規投稿
    } else {
      const params: TCreateArticle = {
        is_published: isPublishing,
        title: titleText,
        article_content: editorText,
      };
      createArticle(params);
    }
  };

  return (
    <>
      <h2>記事</h2>
      <TextField
        id="article-title-text-field"
        label="タイトル"
        variant="outlined"
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        style={{ marginBottom: "20px" }}
        // バリデーション出来る？
        // focusは？
        autoFocus={isEdittingArticle? false : true}
      />
      {/* <input
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        style={{ marginBottom: "20px" }}
      /> */}
      <QuillEditor
        value={editorText}
        setValue={setEditorText}
        charCount={charCount}
        setCharCount={setCharCount}
      />
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: true })}
        disabled={charCount < 1001 ? false : true}
      >
        {isEdittingArticle ? "更新" : "投稿"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: false })}
        disabled={charCount < 1001 ? false : true}
      >
        下書き保存
      </Button>

      {/* <button onClick={() => handleSubmit({ isDraft: false })}>
        {isEdittingArticle ? "更新" : "投稿"}
      </button>
      <button onClick={() => handleSubmit({ isDraft: true })}>
        下書き保存
      </button> */}
    </>
  );
};

export default ArticleEditor
