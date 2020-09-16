import { Grid, CardActionArea, Card, Button, Typography } from "@material-ui/core";
import { EditButtonsBox } from "../../viewComponents/buttons/EditButtonsBox";
import { DeleteButton } from "../../viewComponents/buttons/DeleteButton";
import { UpdateButton } from "../../viewComponents/buttons/UpdateButton";
import { TUseMainProps, TMainClasses } from "../PMain";
import { showDataType } from "./showDataType";
import { Skeleton } from "@material-ui/lab";
import { sqlToDate } from "../../../ActionCreator/organizeSql/sqlToDate";
import { SelectedTags } from "./SelectedTags";
import { PlayArrowRounded } from "@material-ui/icons";

export const displayInstagramMediasJsx = (props: TUseMainProps, classes: TMainClasses, StyledCardContent: any) => props.instagramMedias.data.map((value, key) => {
  return (
    <Grid
      item
      key={key}
      // articlesの場合投稿済みか下書きかで見た目を変える
      className={classes.gridItem}
    >
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() =>
          props.dispatchAppState({
            type: "OPEN_INSTAGRAM_MEDIA_MODAL",
            payload: key,
          })
        }
      >
        <Card className={classes.card}>
          <StyledCardContent className={classes.cardContent}>
            <div className={classes.thumbnailDiv}>
              {props.loading ? (
                <Skeleton
                  variant="rect"
                  className={classes.thumbnail}
                  style={{ marginBottom: "32px" }}
                />
              ) : (
                <>
                  <img
                    className={`p-main-thumbnail ${classes.thumbnail}`}
                    src={
                      value.media_type === "VIDEO"
                        ? value.thumbnail_url
                        : value.media_url
                    }
                  />
                  {value.media_type === "VIDEO" ? (
                    <PlayArrowRounded className={classes.playIcon} />
                  ) : null}
                </>
              )}
            </div>

            {props.loading ? null : (
              <Typography
                gutterBottom
                variant="subtitle1"
                align="right"
                className={classes.date}
              >
                {sqlToDate(value.timestamp)}
              </Typography>
            )}

            <div className={`p-main-article-excerpt ${classes.excerpt}`}>
              <Typography gutterBottom variant="body1">
                {props.loading ? (
                  <>
                    <Skeleton width="80%" style={{ margin: "auto" }} />
                    <Skeleton width="80%" style={{ margin: "auto" }} />
                    <Skeleton width="80%" style={{ margin: "auto" }} />
                  </>
                ) : (
                  <>
                    {value.caption && value.caption.slice(0, 100)}
                    {value.caption && value.caption.length > 100 ? "..." : ""}
                  </>
                )}
              </Typography>
            </div>
          </StyledCardContent>

          {props.loading ? null : (
            <Button
              // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
              component="div"
              variant="contained"
              color="primary"
              size="small"
              className={classes.readMore}
            >
              Read More
            </Button>
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
});
