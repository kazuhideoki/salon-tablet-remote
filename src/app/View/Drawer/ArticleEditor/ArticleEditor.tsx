import React from "react";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../Editor/QuillEditor"), {
  ssr: false,
});
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { useCreateArticle, TCreateArticle } from "../../../ActionCreator/articles/useCreateArticle";
import { useUpdateArticle } from "../../../ActionCreator/articles/useUpdateArticle";
import { sqlToDate } from "../../../ActionCreator/organizeSql/sqlToDate";
import { SelectTagsPopover } from "./SelectTagsPopover";
import { CharCounter } from "../../viewComponents/CharCounter";
import { Store } from "../../../Store/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2)
    },
    title: {
      width: 350,
      marginBottom: 20,
      maxWidth: "100%",
    },
    submitButtons: {
      position: "sticky",
      bottom: 0,
      zIndex: 100,
      background: "white",
    },
  })
);

const ArticleEditor = () => {
  const classes = useStyles()
  const { appState } = React.useContext(Store)
  const { isEditting, article } = appState.edittingPrams

  const [titleText, setTitleText] = React.useState(isEditting ? article.title : "");
  const [editorText, setEditorText] = React.useState(isEditting ? article.article_content : "");
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(isEditting ? article.article_excerpt : "");
  const [createdAt, setCreatedAt] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState("");

  // ArticleEditor特有のもの
  const [editorImg, setEditorImg] = React.useState(isEditting ? article.article_img : "");
  const [selectedTags, setSelectedTags] = React.useState(isEditting ? article.tag_ids : [])

  const params: TCreateArticle = {
    titleText,
    editorText,
    editorTextExcerpt,
    editorImg,
    selectedTags,
  };



  const [charCountArticleContent, setCharCountArticlContent] = React.useState(0);
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const handleOnChangeTitleText = (e) => {
    setTitleText(e.target.value);
  }

  const handleSubmit = ({ isPublishing }) => {
    // 記事編集
    if (isEditting) {
      updateArticle(isPublishing, params);
      // 記事作成
    } else {
      createArticle(isPublishing, params);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.header}>
        {isEditting ? "記事編集" : "記事作成"}
      </Typography>
      <TextField
        id="article-title-text-field"
        label="タイトル"
        value={titleText}
        onChange={(e) => handleOnChangeTitleText(e)}
        className={classes.title}
        style={{ marginBottom: "20px" }}
        // onKeyPress title エンターで 本文へ quillとの連携がやろうとしたが難しい。
      />

      <CharCounter charCount={titleText.length} limitCount={100} />

      {createdAt ? (
        <Typography>作成日:{sqlToDate(createdAt)}</Typography>
      ) : null}
      {updatedAt ? (
        <Typography>編集日:{sqlToDate(updatedAt)}</Typography>
      ) : null}

      <SelectTagsPopover selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>

      <QuillEditor
        editorText={editorText}
        setEditorText={setEditorText}
        setEditorTextExcerpt={setEditorTextExcerpt}
        setEditorImg={setEditorImg}
        //@ts-ignore
        charCount={charCountArticleContent}
        setCharCount={setCharCountArticlContent}
      />
      <Grid container className={classes.submitButtons}>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ isPublishing: true })}
            disabled={
              titleText.length < 101 && charCountArticleContent < 1001
                ? false
                : true
            }
          >
            {isEditting ? "更新" : "投稿"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ isPublishing: false })}
            disabled={
              titleText.length < 101 && charCountArticleContent < 1001
                ? false
                : true
            }
          >
            下書き保存
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ArticleEditor
