import React from "react";
import { EditorContext } from "../../Store/EditorContext";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
});
// import { QuillEditor } from "./QuillEditor";
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme } from "@material-ui/core";
import { useCreateArticle } from "../../ActionCreator/articles/useCreateArticle";
import { useUpdateArticle } from "../../ActionCreator/articles/useUpdateArticle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width: 350,
      marginBottom: 20,
      maxWidth: "100%",
    },
    submitButton: {
      position: "sticky",
      bottom: 0,
      zIndex: 100,
      background: "white",
    },
  })
);

const ArticleEditor = () => {
  const classes = useStyles()
  const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    setEditorImg,
    isEdittingContent,
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
    if (isEdittingContent) {
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
        className={classes.title}
        style={{ marginBottom: "20px" }}
        autoFocus={isEdittingContent ? false : true}
        // onKeyPress title エンターで 本文へ quillとの連携がやろうとしたが難しい。
      />
      {charCountArticleTitle < 101 ? null : (
        <Typography variant="body2" color={"error"}>
          文字数をオーバーしています(100文字以下)
        </Typography>
      )}
      <QuillEditor
        value={editorText}
        setValue={setEditorText}
        setEditorTextExcerpt={setEditorTextExcerpt}
        setEditorImg={setEditorImg}
        charCount={charCountArticleContent}
        setCharCount={setCharCountArticlContent}
      />
      <Button
        variant="outlined"
        className={classes.submitButton}
        onClick={() => handleSubmit({ isPublishing: true })}
        disabled={
          charCountArticleTitle < 101 && charCountArticleContent < 1001
            ? false
            : true
        }
      >
        {isEdittingContent ? "更新" : "投稿"}
      </Button>
      <Button
        variant="outlined"
        className={classes.submitButton}
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
