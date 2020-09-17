import React from "react";
import {
  Grid,
  CardActionArea,
  Card,
  Button,
  Typography,
} from "@material-ui/core";
import { EditButtonsBox } from "../../viewComponents/buttons/EditButtonsBox";
import { DeleteButton } from "../../viewComponents/buttons/DeleteButton";
import { UpdateButton } from "../../viewComponents/buttons/UpdateButton";
import { TUseMainProps, TMainClasses } from "../PMain";
import { showDataType } from "./showDataType";
import { Skeleton } from "@material-ui/lab";
import { sqlToDate } from "../../../ActionCreator/organizeSql/sqlToDate";
import { SelectedTags } from "./SelectedTags";
import { PlayArrowRounded } from "@material-ui/icons";

// 記事がなかった場合の表示
export const noArticlesJsx = (classes: TMainClasses, StyledCardContent) => (
         <Grid item>
           <CardActionArea className={classes.cardActionArea} component="div">
             <Card className={classes.card}>
               <StyledCardContent className={classes.cardContent}>
                 <div className={classes.thumbnailDiv}>
                   <div
                     className={`p-main-thumbnail ${classes.thumbnail}`}
                   ></div>
                 </div>

                 <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                   <Typography gutterBottom variant="subtitle1" align="center">
                     記事がありません
                   </Typography>
                 </div>
               </StyledCardContent>
             </Card>
           </CardActionArea>
         </Grid>
       );
