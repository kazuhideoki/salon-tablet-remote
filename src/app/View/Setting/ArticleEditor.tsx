import React from "react";
import { EditorContext } from "../../Store/EditorContext";
import { QuillEditor } from "./QuillEditor";
import { Button, TextField, Typography } from "@material-ui/core";
import { useCreateArticle } from "../../ActionCreator/articles/useCreateArticle";
import { useUpdateArticle } from "../../ActionCreator/articles/useUpdateArticle";
import { Store } from "../../Store/Store";


const ArticleEditor = () => {
  const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingArticle,
  } = React.useContext(EditorContext);
  const [charCountArticleTitle, setCharCountArticlTitle] = React.useState(0);
  const [charCountArticleContent, setCharCountArticlContent] = React.useState(0);
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const handleOnChangeTitleText = (e) => {
    setTitleText(e.target.value);
    setCharCountArticlTitle(e.target.value.length);
  }

  const handleSubmit = ({ isPublishing }) => {
    // 記事編集
    if (isEdittingArticle) {
      updateArticle(isPublishing);
      // 新規投稿
    } else {
      createArticle(isPublishing);
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
        onChange={(e) => handleOnChangeTitleText(e)}
        style={{ marginBottom: "20px" }}
        autoFocus={isEdittingArticle ? false : true}
      />
      {charCountArticleTitle < 101 ? null : (
        <Typography
          variant="body2"
          color={"error"}
        >
          文字数をオーバーしています(100文字以下)
        </Typography>
      )}
      <QuillEditor
        value={editorText}
        setValue={setEditorText}
        charCount={charCountArticleContent}
        setCharCount={setCharCountArticlContent}
      />
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: true })}
        disabled={
          charCountArticleTitle < 101 && charCountArticleContent < 1001
            ? false
            : true
        }
      >
        {isEdittingArticle ? "更新" : "投稿"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: false })}
        disabled={
          charCountArticleTitle < 101 && charCountArticleContent < 1001
            ? false
            : true
        }
      >
        下書き保存
      </Button>
    </>
  );
};

export default ArticleEditor
