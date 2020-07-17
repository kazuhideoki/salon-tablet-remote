import React from 'react'
import { AllTags } from './AllTags'
import { Store, T_tag_id } from '../../Store/Store';
import {
  Chip,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    header: {
      padding: theme.spacing(2),
    },
    tags: {
      padding: theme.spacing(2),
    },
  })
);

export const SelectTags = () => {
  const classes = useStyles()
  const {tags, dispatchAppState, dispatchLoading} = React.useContext(Store)
  const [selectingTags, setSelectingTags] = React.useState([] as number[])
  const getArticles = useGetArticles()
  const { paginationParams } = React.useContext(Store)

  const handleSelectTag = (tagId: T_tag_id) => {
    let newValue;

    if (selectingTags.includes(tagId)) {
      newValue = selectingTags.filter((value) => {
        return value !== tagId;
      });
    } else {
      newValue = selectingTags.concat(tagId);
    }

    setSelectingTags(newValue);
  };

  const handleGetArticle = () => {
    const isLoaded = getArticles(1, selectingTags);
    if (isLoaded) {
      dispatchAppState({type: "CLOSE_MODAL"})
      dispatchLoading({type: "ON_IS_LOADING_MAIN_ARTICLES"})
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ選択
      </Typography>
      <div className={classes.tags}>
        {tags.map((value, key) => {
          return (
            <Chip
              key={key}
              label={value.tag_name}
              color={
                selectingTags.includes(value.tag_id) ? "primary" : undefined
              }
              onClick={() => handleSelectTag(value.tag_id)}
            />
          );
        })}
      </div>
      <Button onClick={() => handleGetArticle()}>記事を読み込む</Button>
    </div>
  );
}
