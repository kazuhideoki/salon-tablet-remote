import React from 'react'
import {
  TextField,
  Button,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import { useCreateTag } from '../../ActionCreator/tags/useCreateTag'
import { useUpdateTag } from '../../ActionCreator/tags/useUpdateTag'
import { Store } from '../../Store/Store'
import { useDeleteTag } from '../../ActionCreator/tags/useDeleteTag'
import { CharCounter } from "../viewComponents/CharCounter";
import { Skeleton } from '@material-ui/lab';
import tags_delete from '../../../pages/api/tags/delete';

const useManageTagsProps = () => {
  const { appState } = React.useContext(Store);
  const { tags, loading } = appState;
  const [tagNameField, setTagNameField] = React.useState("");
  const [isEditting, setIsEditting] = React.useState(false);
  const [edittingTagId, setEditingTagId] = React.useState(0);
  const [edittingTagName, setEditingTagName] = React.useState("");
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true);
    setEditingTagId(TagId);
    setTagNameField(tagName);
    setEditingTagName(tagName);
  };

  const handleOnCreateNew = () => {
    setIsEditting(false);
    setEditingTagId(null);
    setTagNameField("");
  };

  const handleOnClick = () => {
    console.log("ManageTagsのhandleOnClickだよ");
    if (isEditting) {
      updateTag({ edittingTagId, tagName: tagNameField });
    } else {
      createTag(tagNameField);
    }
  };

  const isValidTagName = () => {
    if (tagNameField.length === 0) {
      return false;
    } else if (tagNameField.length > 20) {
      return false;
    }
    const tagNames = tags.map((value) => {
      return value.tag_name;
    });

    if (tagNames.includes(tagNameField)) {
      return false;
    }

    return true;
  };

  return {
    tags,
    loading: loading.manageTags,
    edittingTagName,
    isEditting,
    tagNameField,
    setTagNameField,
    edittingTagId,
    handleOnClick,
    handleOnCreateNew,
    handleOnEditting,
    deleteTag,
    isValidTagName,
  };
}

type Props = ReturnType<typeof useManageTagsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    },
    header: {
      margin: theme.spacing(2)
    },
    tagsWrap: {
      display: "flex",
      flexWrap: "wrap",
    },
    tag: {
      margin: theme.spacing(1)
    },
    skeleton: {
      width: 80,
      height: 32,
      borderRadius: 16,
    }
  })
)

export const ManageTagsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  const displayTags = props.tags.map((value, key) => {
          if (props.loading) {
            return <Skeleton variant="rect" className={`${classes.tag} ${classes.skeleton}`} />;
          }

          return (
            <Chip
              key={key}
              className={classes.tag}
              label={value.tag_name}
              color={
                value.tag_id === props.edittingTagId ? "primary" : undefined
              }
              onClick={
                props.isEditting && value.tag_id === props.edittingTagId // 編集中にもう一度タップすると新規作成に戻る
                  ? () => props.handleOnCreateNew()
                  : () => props.handleOnEditting(value.tag_id, value.tag_name)
              }
              onDelete={() => props.deleteTag(value.tag_id)}
            />
          );
        })
  const noTags = <Typography variant="subtitle1">タグが作成されていません</Typography>

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ管理
      </Typography>
      <p>
        {props.isEditting
          ? `タグ"${props.edittingTagName}"を編集中`
          : "新規作成"}
      </p>
      <TextField
        name="createTag"
        label="タグ名"
        id="create_tag"
        value={props.tagNameField}
        onChange={(e) => props.setTagNameField(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            props.handleOnClick();
          }
        }}
      />

      <CharCounter charCount={props.tagNameField.length} limitCount={20} />

      <Button
        onClick={() => props.handleOnClick()}
        disabled={!props.isValidTagName()}
      >
        {props.isEditting ? "更新" : "作成"}
      </Button>
      <div className={classes.tagsWrap}>

        {props.tags.length ? displayTags : noTags}

      </div>
    </div>
  );
}

export const ManageTags = () => {
  const props = useManageTagsProps()

  return <ManageTagsPresenter {...props}/>
}
