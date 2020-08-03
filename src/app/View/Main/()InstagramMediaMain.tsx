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
import { Store } from "../../Store/Store";
import { T_article_id, TArticle, TArticles, TInstagramMedia } from "../../Store/Types";
import { useDeleteArticle } from "../../ActionCreator/articles/useDeleteArticle";
import { useGetSingleArticle } from "../../ActionCreator/articles/useGetSingleArticle";
import { sqlToDate } from "../../ActionCreator/organizeSql/sqlToDate";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
import { SelectedTags } from "./SelectedTags";
import { TUseMainProps, TMainClasses } from "./PMain";

type Props = {classes: TMainClasses} & TUseMainProps

export const InstagramMediaMain: React.FC<Props> = (props) => {
  
  const StyledCardContent = withStyles({
    root: {
      "&:last-child": {
        padding: 0,
      },
    },
  })(CardContent);

  return (
    <>
      {props.instagramMedias.map((value,key) => {
        <Grid
          item
          key={key}
          // articlesの場合投稿済みか下書きかで見た目を変える
          className={props.classes.gridItem}
        >
          <CardActionArea
            className={props.classes.cardActionArea}
            onClick={() => props.openInstagramModal(value)}
          >
            <Card className={props.classes.card}>
              <StyledCardContent className={props.classes.cardContent}>
                <div className={props.classes.thumbnailBox}>
                  <img
                    className={`p-main-thumbnail ${props.classes.thumbnail}`}
                    src={value.thumbnail_url}
                  />
                </div>
                <div className={props.classes.tagsAndDate}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    align="right"
                    // className={}
                  >
                    {sqlToDate(value.timestamp)}
                  </Typography>
                </div>
                <div
                  className={`p-main-article-excerpt ${props.classes.excerpt}`}
                >
                  <Typography gutterBottom variant="body1">
                    {value.caption.slice(0, 100)}
                    {value.caption.length === 100 ? "..." : ""}
                  </Typography>
                </div>
              </StyledCardContent>
            </Card>
          </CardActionArea>
        </Grid>;
      })}
    
    </>
  );
};