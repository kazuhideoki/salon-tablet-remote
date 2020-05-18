import React from "react";
import { Store, T_id } from "./Store/Store";
import { sqlToDate } from "./modules/organizeSql/sqlToDate";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { UpdateArticleButton } from "./Setting/buttons/UpdateArticleButton";
import { DeleteArticleButton } from "./Setting/buttons/DeleteArticleButton";
import { useDeleteArticle, useGetSingleArticle } from "./Store/articles/articlesActionCreator";
import { EditorContext } from "./Store/EditorContext";

// 主に位置情報に関するスタイルは親コンポーネントからpropsを通して渡される。
const useStyles = makeStyles((theme) =>
  createStyles({
  root: {
    overflow: "scroll",
    height: "100%",
  },
  itemIsPublished: {
    position: "relative",
    height: "100%",
  },
  itemIsDraft: {
    position: "relative",
    height: "100%",
    border: "3px solid red",
  },
  cardActionArea: {
    width: 350,
    height: "100%",
  },
  card: {
    // width: 350,
    height: "100%",
  },
  insta: {
    width: 408,
    height: "100%",
  },
  instaDiv: {
    position: "relative",
  },
  titleImgDiv: {
    position: "relative",
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: 300,
    backgroundSize: "cover",
  },
  staffImg: {
    width: 50,
  },
  updateArticleButton: {
    position: "absolute",
    top: 0,
    right: 50,
    zIndex: 100,
  },
  deleteArticleButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  createArticleButton: {
    position: "absolute",
    top: 50,
    left: 100,
    zIndex: 100,
  },
}))

export type HandleOnUpDate = (params: any) => void;


export const PMain = () => {
    const classes = useStyles();
    const {
      appState,
      articles,
      dispatchAppState,
    } = React.useContext(Store);
    const deleteArticle = useDeleteArticle();
    const { setIsEdittingArticle } = React.useContext(EditorContext);
    const getSingleArticle = useGetSingleArticle();

    const handleOnUpDate: HandleOnUpDate = (id: T_id) => {
      dispatchAppState({ type: "OPEN_MODAL", payload: "edit_article" });
      setIsEdittingArticle(true);
      getSingleArticle(id);
    };

    const openArticle = (article_content) => {
      dispatchAppState({ type: "SET_ARTICLE_CONTENT", payload: article_content})
      dispatchAppState({ type: "OPEN_MODAL", payload: "article_modal"})

    }

    const props = {
      articles,
      classes,
      deleteArticle,
      handleOnUpDate,
    };
    type Props = typeof props

    const PMainPresenter: React.FC<Props> = ({
      articles,
      classes,
      deleteArticle,
      handleOnUpDate,
    }: Props) => {
      const displayArticles = articles.map((value, key: number) => {
          return (
            <Grid
              item
              key={key}
              // 投稿済みか下書きかで見た目を変える
              className={
                value.is_published == true
                  ? classes.itemIsPublished
                  : classes.itemIsDraft
              }
            >
              {appState.isSetting ? (
                <UpdateArticleButton
                  position={classes.updateArticleButton}
                  id={value.id}
                  handleOnClick={handleOnUpDate}
                />
              ) : null}
              {appState.isSetting ? (
                <DeleteArticleButton
                  position={classes.deleteArticleButton}
                  id={value.id}
                  handleOnClick={deleteArticle}
                />
              ) : null}

              <CardActionArea
                className={classes.cardActionArea}
                onClick={() => openArticle(value.article_content)}
              >
                <Card
                  variant="outlined"
                  className={classes.card}
                  id={`p_main_` + key}
                >
                  <CardContent>
                    <Typography variant="h5">{value.title}</Typography>
                    <Typography gutterBottom variant="h6" align="right">
                      {sqlToDate(value.created_at)}
                    </Typography>
                    <div
                      className="p-main-article"
                      dangerouslySetInnerHTML={{
                        __html: value.article_content,
                      }}
                    />
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          );
        });
        // 記事がもしなかった場合の表示
      const noArticles = (
        <Grid item >
          <Card
            variant="outlined"
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
          {/* ↓使うかも */}
          {/* {appState.isSetting ? (
              <CreateButton position={classes.createArticleButton} />
            ) : null} */}
          {(articles.length)? displayArticles : noArticles}
        </Grid>
      );
    };



    return PMainPresenter(props);

}

