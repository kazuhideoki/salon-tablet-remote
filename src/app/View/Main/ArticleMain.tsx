import React from 'react'
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
import { Store } from "../../Store/Store";
import { T_article_id, TArticle, TArticles, TTags } from "../../Store/Types";
import { useDeleteArticle } from "../../ActionCreator/articles/useDeleteArticle";
import { useGetSingleArticle } from "../../ActionCreator/articles/useGetSingleArticle";
import { sqlToDate } from "../../ActionCreator/organizeSql/sqlToDate";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
import { SelectedTags } from "./SelectedTags";
import { TUseMainProps, TMainClasses } from "./PMain";

// type Props = {props.classes: TMainClasses, props: TUseMainProps}
type Props = {classes: TMainClasses} & TUseMainProps

export const ArticleMain:React.FC<Props> = (props) => {

  const StyledCardContent = withStyles({
    root: {
      "&:last-child": {
        padding: 0,
      },
    },
  })(CardContent);

  return (
    <>
      {props.articles.map((value, key) => {
        <Grid
          item
          key={key}
          // articlesの場合投稿済みか下書きかで見た目を変える
          className={`${props.classes.gridItem}
            ${
              props.isShowInstagram! && !value.is_published ? props.classes.itemIsDraft : ""
            }
          `}
        >
          {props.isShowInstagram! && props.appState.isSetting ? (
            <EditButtonsBox className={props.classes.editButtonsBox}>
              <UpdateButton onClick={() => props.handleOnUpDate(value)} />
              <DeleteButton
                onClick={() => props.handleOnDelete(value.article_id)}
              />
            </EditButtonsBox>
          ) : null}
          <CardActionArea
            className={props.classes.cardActionArea}
            onClick={() =>
              props.openModal(value.title, value.article_content)
            }
          >
            <Card className={props.classes.card}>
              <StyledCardContent className={props.classes.cardContent}>
                <div className={props.classes.thumbnailBox}>
                  {value.article_img.length ? (
                    <img
                      className={`p-main-thumbnail ${props.classes.thumbnail}`}
                      src={value.article_img}
                    />
                  ) : (
                    <div
                      className={`p-main-thumbnail ${props.classes.thumbnail}`}
                    ></div>
                  )}
                  <Typography
                    variant="h5"
                    component="h2"
                    className={props.classes.title}
                  >
                    {value.title}
                  </Typography>
                </div>
                <div className={props.classes.tagsAndDate}>
                  <SelectedTags
                    className={props.classes.tags}
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
                <div className={`p-main-article-excerpt ${props.classes.excerpt}`}>
                  <Typography gutterBottom variant="body1">
                    {value.article_excerpt}
                    {value.article_excerpt.length === 100 ? "..." : ""}
                  </Typography>
                </div>
              </StyledCardContent>
            </Card>
          </CardActionArea>
        </Grid>;
      })}
    </>
 
  );

}