import React from 'react';
import {
  Button,
  Popover,
  makeStyles,
  createStyles,
  Theme,
  Chip,
} from '@material-ui/core';

import { TagsButton } from '../../../Footer/PaginationBar/components/TagsButton';
import { TUseArticleEditorProps } from '../ArticleEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    gridList: {
      width: 300,
      height: 300,
    },
    selectedTagsField: {
      width: 70,
    },
    noTag: {
      color: theme.palette.text.disabled,
    },
  })
);

type Props = TUseArticleEditorProps & { className: string };

export const SelectTagsPopover: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleOnClick = (tagId: number) => {
    // 重複選択を防ぐため、すでに含まれていなかったらsetState
    if (!props.selectedTags.includes(tagId)) {
      props.setSelectedTags(props.selectedTags.concat(tagId));
    }
  };
  const handleDelete = (tagId: number) => {
    // selectedTagsからtagIdひとつひとつけす

    const newSelectedTags = props.selectedTags.filter((value) => {
      return value !== tagId;
    });
    props.setSelectedTags(newSelectedTags);
  };

  // 選択されたタグのtag_idをtag_nameと照合して表示
  const ShowSelectedTagsChip = () => {
    const showSelectedTags = props.tags.filter((value) => {
      return props.selectedTags.includes(value.tag_id);
    });

    return (
      <>
        {showSelectedTags.map((value, index) => (
          <Chip
            key={index}
            label={value.tag_name}
            onDelete={() => handleDelete(value.tag_id)}></Chip>
        ))}
      </>
    );
  };

  // 以下アイコン選択のPopoverのための設定
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'tag-popover' : undefined;
  // 以上アイコン選択のPopoverのための設定

  return (
    <div className={props.className}>
      <Button
        className={classes.button}
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        size="large"
        startIcon={<TagsButton />}>
        タグ
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        {props.tags.length ? (
          props.tags.map((value, key) => {
            return (
              <>
                {props.selectedTags.includes(value.tag_id) ? (
                  // セレクトされてる
                  <Chip
                    key={key}
                    label={value.tag_name}
                    onClick={() => handleDelete(value.tag_id)}
                    color="primary"
                  />
                ) : (
                  // セレクトされてない
                  <Chip
                    key={key}
                    label={value.tag_name}
                    onClick={() => handleOnClick(value.tag_id)}
                  />
                )}
              </>
            );
          })
        ) : (
          <Chip label="タグがありません" className={classes.noTag} />
        )}
      </Popover>
      {props.selectedTags.length ? (
        <ShowSelectedTagsChip />
      ) : (
        <Chip label="未選択" disabled />
      )}
    </div>
  );
};
