import React from "react";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../../QuillEditor/view/QuillEditor"), {
  ssr: false,
});
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { TCreateArticle } from "../../../../ActionCreator/articles/useCreateArticle";
import { SelectTagsPopover } from "../components/SelectTagsPopover";
import { CharCounter } from "../../../../pureComponents/CharCounter";
import { Store } from "../../../../Store/Store";
import { SaveTwoTone, PublishTwoTone } from "@material-ui/icons";
import { SwitchDataTypeBox } from "../../QuillEditor/components/SwitchDataTypeBox";
import pure from "recompose/pure";
import { useHandleSubmit } from '../context/useHandleSubmit'


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

  const [charCountArticleContent, setCharCountArticleContent] = React.useState(
    0
  );

  const handleOnChangeTitleText = (e) => {
    setTitleText(e.target.value);
  };

  const params: TCreateArticle = {
    is_published: null,
    titleText,
    editorText,
    editorTextExcerpt,
    editorImg,
    selectedTags,
    dataType
  };

  const handleSubmit = useHandleSubmit(params, isEditting)

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
    setCharCountArticleContent,
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

export const ArticleEditorPresenterOriginal: React.FC<TUseArticleEditorProps> = (
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

             <QuillEditor
               editorText={props.editorText}
               setEditorText={props.setEditorText}
               setEditorTextExcerpt={props.setEditorTextExcerpt}
               setEditorImg={props.setEditorImg}
               setCharCount={props.setCharCountArticleContent}
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

export const ArticleEditorPresenter = pure(ArticleEditorPresenterOriginal)

const ArticleEditor = () => {
  const props = useArticleEditorProps()

  return <ArticleEditorPresenter {...props}/>
}
export default ArticleEditor

