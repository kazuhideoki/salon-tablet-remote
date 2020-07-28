import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
  Chip,
  withStyles,
} from "@material-ui/core";
import { UpdateButton } from "../viewComponents/buttons/UpdateButton";
import { DeleteButton } from "../viewComponents/buttons/DeleteButton";
import { Store,T_article_id, TArticle } from "../../Store/Store";
import {
  useDeleteArticle,
} from "../../ActionCreator/articles/useDeleteArticle";
import { EditorContext } from "../../Store/EditorContext";
import { useGetSingleArticle } from "../../ActionCreator/articles/useGetSingleArticle";
import { sqlToDate } from "../../ActionCreator/organizeSql/sqlToDate";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
import { SelectedTags } from "./SelectedTags";

// export type HandleOnUpDate = (params: any) => void;
export const usePMainProps = () => {
  const { appState, articles, dispatchAppState, tags } = React.useContext(
    Store
  );
  const deleteArticle = useDeleteArticle();
  const { setIsEdittingContent } = React.useContext(EditorContext);
  const getSingleArticle = useGetSingleArticle();

  const handleOnUpDate = (article: TArticle) => {
    dispatchAppState({
      type: "SET_EDITTING_PARMS_ARTICLE",
      payload: article,
    });
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_article" });
    // setIsEdittingContent(true);
    // getSingleArticle(article_id);
  };

  const handleOnDelete = (article_id: T_article_id) => {
    const deleting = confirm("本当に削除してよろしいですか？");
    deleting ? deleteArticle(article_id) : null;
  };

  const openArticle = (title: string, article_content: string) => {
    dispatchAppState({
      type: "SET_MODAL_CONTENT",
      payload: { title: title, content: article_content },
    });
    dispatchAppState({ type: "OPEN_MODAL", payload: "content_modal" });
  };

  return {
    appState,
    articles,
    tags,
    handleOnUpDate,
    handleOnDelete,
    openArticle,
  };
};

type Props = ReturnType<typeof usePMainProps>


// 主に位置情報に関するスタイルは親コンポーネントからpropsを通して渡される。
const useStyles = makeStyles((theme) => {
  const cardWidth = 350

  return createStyles({
    root: {
      overflow: "scroll",
      height: "100%",
    },
    gridItem: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    itemIsDraft: {
      border: "3px solid red",
    },
    cardActionArea: {
      width: cardWidth,
      height: "100%",
      flexGrow: 1,
    },
    card: {
      overflowY: "scroll",
      height: "100%",
    },
    cardContent: {
      // paddingRight: 0,
      // paddingLeft: 0,
      padding: 0,
    },
    thumbnailBox: {
      position: "relative",
      // marginBottom: theme.spacing(2),
    },
    thumbnail: {
      // maxWidth: cardWidth * 0.8,
      // maxHeight: cardWidth * 0.6,
      display: "block",
      width: "100%",
      objectFit: "cover",
      height: "300px",
      marginRight: "auto",
      marginLeft: "auto",
    },
    title: {
      width: "100%",
      bottom: 0,
      padding: "40px 10px 0 10px",
      position: "absolute",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)",
    },
    tagsAndDate: {
      display: "flex",
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(
        1
      )}px`,
    },
    tags: {
      flexGrow: 1,
    },
    date: {},

    excerpt: {
      fontSize: "1rem",
      margin: `${theme.spacing(1)}px`,
    },
    editButtonsBox: {
      margin: "0 0 0 auto",
      zIndex: 100,
    },
  });

})

export const PMainPresenter = (props: Props) => {
  const classes = useStyles();

  const StyledCardContent = withStyles({
    root: {
      '&:last-child': {
        padding: 0,
      },
    },
  })(CardContent)


  const displayArticles = props.articles.map((value, key: number) => {
      return (
        <Grid
          item
          key={key}
          // 投稿済みか下書きかで見た目を変える
          className={`${classes.gridItem}
            ${!value.is_published ? classes.itemIsDraft : ""}
          `}
        >
          {props.appState.isSetting ? (
            <EditButtonsBox className={classes.editButtonsBox}>
              <UpdateButton
                onClick={() => props.handleOnUpDate(value)}
              />
              <DeleteButton
                onClick={() => props.handleOnDelete(value.article_id)}
              />
            </EditButtonsBox>
          ) : null}

          <CardActionArea
            className={classes.cardActionArea}
            onClick={() =>
              props.openArticle(value.title, value.article_content)
            }
          >
            <Card className={classes.card}>
              <StyledCardContent className={classes.cardContent}>
                <div className={classes.thumbnailBox}>
                  {value.article_img.length ? (
                    <img
                      className={`p-main-thumbnail ${classes.thumbnail}`}
                      src={value.article_img}
                    />
                  ) : (
                    <div
                      className={`p-main-thumbnail ${classes.thumbnail}`}
                    ></div>
                  )}
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {value.title}
                  </Typography>
                </div>
                <div className={classes.tagsAndDate}>
                  <SelectedTags
                    className={classes.tags}
                    article={value}
                    tags={props.tags}
                  />
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    align="right"
                    // className={}
                  >
                    {sqlToDate(value.created_at)}
                  </Typography>
                </div>
                <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                  <Typography gutterBottom variant="body1">
                    {value.article_excerpt}
                    {value.article_excerpt.length === 100 ? "..." : ""}
                  </Typography>
                </div>
              </StyledCardContent>
            </Card>
          </CardActionArea>
        </Grid>
      );
    });
    // 記事がもしなかった場合の表示
  const noArticles = (
    <Grid item >
      <Card
        className={classes.card}
      >
        記事がありません
      </Card>
    </Grid>
  );

  return (
    <Grid
      id="p_main"
      container
      wrap="nowrap"
      className={classes.root}
      spacing={2}
    >

      {props.articles.length ? displayArticles : noArticles}
    </Grid>
  );

}

export const PMain = () => {
  const props = usePMainProps()

  return <PMainPresenter {...props} />
}

