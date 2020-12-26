import React from 'react'
import { Store } from "../../../Store/Store";
import { T_tag_id } from '../../../Store/Types';
import {
  Chip,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';

const useSelectTagsProps = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { tags } = appState;

  const [selectingTags, setSelectingTags] = React.useState(
    appState.selectedArticlesTags
  );

  const getArticles = useGetArticles();
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
    const isLoaded = getArticles(appState.isSetting, 1, selectingTags);
    if (isLoaded) {
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };

  return { tags, selectingTags, handleSelectTag, handleGetArticle };
}

type Props = ReturnType<typeof useSelectTagsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    tagsWrap: {
      display: "flex",
      flexWrap: "wrap",
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

export const SelectTagsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles()
  

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
                  ? "primary"
                  : undefined
              }
              onClick={() => props.handleSelectTag(value.tag_id)}
            />
          );
        })}
      </div>
      <Button onClick={() => props.handleGetArticle()} className={classes.button}>記事を読み込む</Button>
    </div>
  );
}

export const SelectTags = () => {
  const props = useSelectTagsProps()

  return <SelectTagsPresenter {...props}/>
}
