import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { TAllArticles } from '../../../../../store/Interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export type TSelectArticleInfoBar = {
  AllArticles: TAllArticles;
  articleInfoBar: number;
  setArticleInfoBar: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export const SelectArticleInfoBar: React.FC<TSelectArticleInfoBar> = ({
  AllArticles,
  articleInfoBar,
  setArticleInfoBar,
  className,
}) => {
  const classes = useStyles();

  const menuItems = AllArticles.map((value, index) => {
    return (
      <MenuItem key={index} value={String(value.article_id)}>
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
        onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
          setArticleInfoBar(Number(e.target.value as string))
        }
        label="記事">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  );
};
