import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { UpdateArticleButton } from "../Setting/buttons/UpdateArticleButton";
import { DeleteArticleButton } from "../Setting/buttons/DeleteArticleButton";
import { Store,T_id } from "../../Store/Store";
import {
  useDeleteArticle,
} from "../../ActionCreator/articles/useDeleteArticle";
import { EditorContext } from "../../Store/EditorContext";
import { useGetSingleArticle } from "../../ActionCreator/articles/useGetSingleArticle";
import { sqlToDate } from "../../ActionCreator/organizeSql/sqlToDate";

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
    },
    itemIsDraft: {
      border: "3px solid red",
    },
    cardActionArea: {
      width: cardWidth,
      height: "100%",
    },
    card: {
      height: "100%",
    },
    thumbnail: {
      // objectFit: "contain",
      maxWidth: cardWidth * 0.8,
      maxHeight: cardWidth * 0.6,
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
    },
    excerpt: {
      fontSize: "1rem",
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
  });

})

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

    const handleOnDelete = (id: T_id) => {
      const deleting = confirm("本当に削除してよろしいですか？");
      deleting ? deleteArticle(id) : null
    };

    const openArticle = (article_content: string) => {
      dispatchAppState({ type: "SET_CONTENT", payload: article_content})
      dispatchAppState({ type: "OPEN_MODAL", payload: "content_modal" });

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
              className={`${classes.gridItem}
                ${!value.is_published ? classes.itemIsDraft : ''}
              `}
            >
              {appState.isSetting ? (
                <UpdateArticleButton
                  position={classes.updateArticleButton}
                  // id={value.id}
                  // handleOnClick={handleOnUpDate}
                  onClick={() => handleOnUpDate(value.id)}
                />
              ) : null}
              {appState.isSetting ? (
                <DeleteArticleButton
                  position={classes.deleteArticleButton}
                  // id={value.id}
                  // handleOnClick={handleOnDelete}
                  onClick={() => handleOnDelete(value.id)}
                />
              ) : null}

              <CardActionArea
                className={classes.cardActionArea}
                onClick={() => openArticle(value.article_content)}
              >
                <Card
                  variant="outlined"
                  className={classes.card}
                >
                  <CardContent>

                    <Typography variant="h5" component="h2">{value.title}</Typography>
                    <Typography gutterBottom variant="subtitle1" align="right">
                      {sqlToDate(value.created_at)}
                    </Typography>                   
                    <img className={`p-main-thumbnail ${classes.thumbnail}`} src={value.article_img}/>
                    <div
                      className={`p-main-article-excerpt ${classes.excerpt}`}
                      dangerouslySetInnerHTML={{
                        __html: value.article_excerpt + '...',
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

