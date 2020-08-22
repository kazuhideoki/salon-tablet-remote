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
import { SaveTwoTone, PublishTwoTone } from "@material-ui/icons";
import { SwitchDataTypeBox } from "../Editor/SwitchDataTypeBox";

const useArticleEditorProps = () => {
  const { appState } = React.useContext(Store);
  const { is_admin } = appState.userInfo
  const { isEditting, article } = appState.edittingPrams;

  const [titleText, setTitleText] = React.useState(
    isEditting ? article.title : ""
  );
  const [editorText, setEditorText] = React.useState(
    isEditting ? article.article_content : ""
  );
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(
    isEditting ? article.article_excerpt : ""
  );
  const [createdAt, setCreatedAt] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState("");

  const [dataType, setDataType] = React.useState(isEditting ? article.data_type : 'default_data');

  // ArticleEditor特有のもの
  const [editorImg, setEditorImg] = React.useState(
    isEditting ? article.article_img : ""
  );
  const [selectedTags, setSelectedTags] = React.useState(
    isEditting ? article.tag_ids : []
  );

  const [charCountArticleContent, setCharCountArticlContent] = React.useState(
    0
  );
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const handleOnChangeTitleText = (e) => {
    setTitleText(e.target.value);
  };

  const handleSubmit = ({ is_published }) => {
    const params: TCreateArticle = {
      is_published: is_published,
      titleText,
      editorText,
      editorTextExcerpt,
      editorImg,
      selectedTags,
      dataType
    };
    // 記事編集
    if (isEditting) {
      updateArticle(params);
      // 記事作成
    } else {
      createArticle(params);
    }
  };

  return {
    is_admin,
    isEditting,
    titleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    createdAt,
    setCreatedAt,
    updatedAt,
    setUpdatedAt,
    setEditorImg,
    selectedTags,
    setSelectedTags,
    charCountArticleContent,
    setCharCountArticlContent,
    handleOnChangeTitleText,
    handleSubmit,
    tags: appState.tags,
    dataType,
    setDataType,
  };

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      // flexDirection: 'column',
    },
    header: {
      margin: theme.spacing(2),
    },
    topDiv: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    title: {
      width: "50%",
      marginLeft: theme.spacing(2),
      maxWidth: "100%",
    },
    selectTagsPopover: {
      margin: `0 ${theme.spacing(2)}px`,
    },

    bottomDiv: {
      position: "sticky",
      bottom: 0,
      // right: theme.spacing(2),
      marginRight: theme.spacing(2),
      zIndex: 100,
    },
    charCounter: {
      textAlign: "right",
    },
    submitButton: {
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
  })
);

export type TUseArticleEditorProps = ReturnType<typeof useArticleEditorProps>

export const ArticleEditorPresenter: React.FC<TUseArticleEditorProps> = (
         props
       ) => {
         const classes = useStyles();

         return (
           <div className={classes.root}>
             <Typography variant="h4" component="h2" className={classes.header}>
               {props.isEditting ? "記事編集" : "記事作成"}
             </Typography>
             {props.is_admin ? (
               <SwitchDataTypeBox
                 dataType={props.dataType}
                 setDataType={props.setDataType}
               />
             ) : null}
             <div className={classes.topDiv}>
               <TextField
                 id="article-title-text-field"
                 label="タイトル"
                 value={props.titleText}
                 onChange={(e) => props.handleOnChangeTitleText(e)}
                 className={classes.title}
                 // onKeyPress title エンターで 本文へ quillとの連携がやろうとしたが難しい。
               />
               <CharCounter
                 charCount={props.titleText.length}
                 limitCount={100}
               />
               <SelectTagsPopover
                 className={classes.selectTagsPopover}
                 selectedTags={props.selectedTags}
                 setSelectedTags={props.setSelectedTags}
                 tags={props.tags}
               />
             </div>

             {/* {props.createdAt ? (
          <Typography>作成日:{sqlToDate(props.createdAt)}</Typography>
        ) : null}
        {props.updatedAt ? (
          <Typography>編集日:{sqlToDate(props.updatedAt)}</Typography>
        ) : null} */}

             <QuillEditor
               editorText={props.editorText}
               setEditorText={props.setEditorText}
               setEditorTextExcerpt={props.setEditorTextExcerpt}
               setEditorImg={props.setEditorImg}
               charCount={props.charCountArticleContent}
               setCharCount={props.setCharCountArticlContent}
             />

             <div className={classes.bottomDiv}>
               <div className={classes.charCounter}>
                 <CharCounter
                   charCount={props.charCountArticleContent}
                   limitCount={1000}
                   align="right"
                   isShowCount
                 />
               </div>
               <Grid container>
                 <Grid item className={classes.submitButton}>
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={() => props.handleSubmit({ is_published: true })}
                     startIcon={<PublishTwoTone />}
                     disabled={
                       props.titleText.length < 101 &&
                       props.charCountArticleContent < 1001
                         ? false
                         : true
                     }
                   >
                     {props.isEditting ? "更新" : "投稿"}
                   </Button>
                 </Grid>
                 <Grid item>
                   <Button
                     onClick={() => props.handleSubmit({ is_published: false })}
                     startIcon={<SaveTwoTone />}
                     disabled={
                       props.titleText.length < 101 &&
                       props.charCountArticleContent < 1001
                         ? false
                         : true
                     }
                   >
                     下書き保存
                   </Button>
                 </Grid>
               </Grid>
             </div>
           </div>
         );
       };

const ArticleEditor = () => {
  const props = useArticleEditorProps()

  return <ArticleEditorPresenter {...props}/>
}
export default ArticleEditor
