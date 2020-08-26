import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { TAllArticles } from "../../../Store/Types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type Props = {
  AllArticles: TAllArticles
  articleInfoBar: number;
  setArticleInfoBar: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export const SelectArticleInfoBar: React.FC<Props> = ({
         AllArticles,
         articleInfoBar,
         setArticleInfoBar,
         className,
       }) => {
         const classes = useStyles();

         const menuItems = AllArticles.map((value) => {
           return (
             <MenuItem value={String(value.article_id)}>
               {value.title}
             </MenuItem>
           );
         });

         return (
           <FormControl className={`${classes.formControl} ${className}`}>
             <InputLabel id="select-app-label">記事</InputLabel>
             <Select
               labelId="select-app-label"
               id="select-app"
               value={articleInfoBar}
               onChange={(e: React.ChangeEvent<{ value: string }>) =>
                 setArticleInfoBar(Number(e.target.value))
               }
               label="記事"
             >
               {/* <ArticleInfoBars/> */}
               <MenuItem value="">
                 <em>None</em>
               </MenuItem>
               {menuItems}
             </Select>
           </FormControl>
         );
       };
