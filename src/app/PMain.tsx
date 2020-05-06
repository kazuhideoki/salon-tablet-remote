import React from "react";
import { Store } from "./Store/Store";
import { sqlToDate } from "./modules/organizeSql/sqlToDate";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { useStylesFactory } from "./Store/useStylesFactory";
import { UpdatePostButton } from "./Setting/buttons/UpdatePostButton";
import { DeletePostButton } from "./Setting/buttons/DeletePostButton";
import { CreateButton } from "./Setting/buttons/CreateButton";



// 主に位置情報に関するスタイルは親コンポーネントからpropsを通して渡される。
const styles = {
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
  article: {
    width: 350,
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
  updatePostButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  deletePostButton: {
    position: "absolute",
    top: 0,
    right: 50,
    zIndex: 100,
  },
  createPostButton: {
    position: "absolute",
    top: 50,
    left: 100,
    zIndex: 100,
  },
};

export const PMain = () => {
    const classes = useStylesFactory(styles);

    const {
        appState,
        articles,
        dispatchAppState,
    } = React.useContext(Store);

    const props = {
        articles,
        classes,
        dispatchAppState,
    };
    type Props = typeof props


    const PMainPresenter: React.FC<Props> = ({
        articles,
        classes,
    }: Props) => {
        let displayArticles;

        if (articles) {
            displayArticles = articles.map((value, key: number) => {

                // 通常画面で下書き記事は表示させない
                if ( appState.isSetting === false && value.is_published == false ) {
                  return null
                }

                // 下書きは下書き用classNameを付与
                // const isDraft =
                //   value.is_published == true ? classes.itemIsPublished : classes.itemIsDraft

                return (
                  // <Grid item key={key} className={`${classes.item} ${isDraft}`}>
                  <Grid
                    item
                    key={key}
                    // 下書きは下書き用classNameを付与
                    className={
                      value.is_published == true
                        ? classes.itemIsPublished
                        : classes.itemIsDraft
                    }
                  >
                    {appState.isSetting ? (
                      <UpdatePostButton
                        position={classes.updatePostButton}
                        params={value}
                      />
                    ) : null}
                    {appState.isSetting ? (
                      <DeletePostButton
                        position={classes.deletePostButton}
                        id={value.id}
                      />
                    ) : null}

                    <Card
                      variant="outlined"
                      className={classes.article}
                      id={`p_main_` + key}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="h5">{value.title}</Typography>
                          <Typography gutterBottom variant="h6" align="right">
                            {sqlToDate(value.created_at)}
                          </Typography>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: value.article_content,
                            }}
                          />
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
            });
            // 記事がもしなかった場合の表示
        } else {
            displayArticles = <div>No articles</div>;
        }

        return (
          <Grid
            id="p_main"
            container
            wrap="nowrap"
            className={classes.root}
            spacing={2}
          >
            {/* {appState.isSetting ? (
              <CreateButton position={classes.createPostButton} />
            ) : null} */}
            {displayArticles}
          </Grid>
        );
    };



    return PMainPresenter(props);

}

