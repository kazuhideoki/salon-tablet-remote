import React from 'react';
import {
  Chip,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import { useHandleGetArticle } from '../context/useHandleGetArticle';
import { useHandleSelectTag } from '../context/useHandleSelectTag';
import { useStateSelectTags } from '../context/useStateSelectTags';

const useSelectTagsProps = () => {
  const { tags, selectingTags, setSelectingTags } = useStateSelectTags();

  const handleSelectTag = useHandleSelectTag(selectingTags, setSelectingTags);

  const handleGetArticle = useHandleGetArticle(selectingTags);

  return { tags, selectingTags, handleSelectTag, handleGetArticle };
};

export type TSelectTagsPresenter = ReturnType<typeof useSelectTagsProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    tagsWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
      // padding: theme.spacing(2),
    },
    tag: {
      margin: theme.spacing(1),
    },
    button: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
  })
);

export const SelectTagsPresenter: React.FC<TSelectTagsPresenter> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ選択
      </Typography>
      <div className={classes.tagsWrap}>
        {props.tags.map((value, key) => {
          return (
            <Chip
              key={key}
              className={classes.tag}
              label={value.tag_name}
              color={
                props.selectingTags.includes(value.tag_id)
                  ? 'primary'
                  : undefined
              }
              onClick={() => props.handleSelectTag(value.tag_id)}
            />
          );
        })}
      </div>
      <Button
        onClick={() => props.handleGetArticle()}
        className={classes.button}>
        記事を読み込む
      </Button>
    </div>
  );
};

export const SelectTags = () => {
  const props = useSelectTagsProps();

  return <SelectTagsPresenter {...props} />;
};
