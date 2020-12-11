import { Grid, CardActionArea, Card, Button, Typography } from "@material-ui/core";
import { EditButtonsBox } from "../../viewComponents/buttons/EditButtonsBox";
import { DeleteButton } from "../../viewComponents/buttons/DeleteButton";
import { UpdateButton } from "../../viewComponents/buttons/UpdateButton";
import { TUseMainProps, TMainClasses } from "../PMain";
import { showDataType } from "./showDataType";
import { Skeleton } from "@material-ui/lab";
import { sqlToDate } from "../../../ActionCreator/organizeSql/sqlToDate";
import { SelectedTags } from "./SelectedTags";

export const displayArticlesScrollJsx = (props: TUseMainProps, classes: TMainClasses, StyledCardContent: any) =>
         props.articles.map((value, key: number) => {
           return (
             <Grid
               item
               key={key}
               // 投稿済みか下書きかで見た目を変える
               className={`${classes.gridItem}
            ${!value.is_published ? classes.itemIsDraft : ""}
          `}
             >
               <CardActionArea
                 className={classes.cardActionArea}
                 onClick={() =>
                   props.dispatchAppState({
                     type: "OPEN_ARTICLE_MODAL",
                     payload: key,
                   })
                 }
                 component="div"
               >
                 <Card className={classes.card}>
                   <StyledCardContent className={classes.cardContent}>
                     {props.isSetting ? (
                       <EditButtonsBox className={classes.editButtonsBox} update updateProps={{onClick: props.onClickUpdate, value: value}} delete deleteProps={{onClick:props.deleteArticle, value: value.article_id}}/>
                    
                     ) : null}
                     {showDataType(value.data_type, classes.showDataType)}

                     <div className={classes.thumbnailDiv}>
                       {props.loading ? (
                         <Skeleton
                           variant="rect"
                           className={classes.thumbnail}
                           style={{ marginBottom: "32px" }}
                         />
                       ) : value.article_img.length ? (
                         <img
                           className={`p-main-thumbnail ${classes.thumbnail}`}
                           src={value.article_img}
                         />
                       ) : (
                         <div
                           className={`p-main-thumbnail ${classes.thumbnail}`}
                         ></div>
                       )}
                       {props.loading ? null : (
                         <Typography
                           variant="h5"
                           component="h2"
                           className={classes.title}
                         >
                           {props.loading ? null : <>{value.title}</>}
                         </Typography>
                       )}
                     </div>

                     {props.loading ? null : (
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
                     )}

                     <div
                       className={`p-main-article-excerpt ${classes.excerpt}`}
                     >
                       <Typography gutterBottom variant="body1">
                         {props.loading ? (
                           <>
                             <Skeleton width="80%" style={{ margin: "auto" }} />
                             <Skeleton width="80%" style={{ margin: "auto" }} />
                             <Skeleton width="80%" style={{ margin: "auto" }} />
                           </>
                         ) : (
                           <>
                             {value.article_excerpt}
                             {value.article_excerpt.length > 100 ? "..." : ""}
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
