import React from 'react'
import {
  Button,
  Popover,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  useTheme,
} from "@material-ui/core";

import { TagsButton } from '../../../Footer/PaginationBar/TagsButton';

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
      color: theme.palette.text.disabled
    }
  })
);

export const SelectTagsPopover = ({ selectedTags, setSelectedTags, tags, className}) => {
  const classes = useStyles();

  const handleOnClick = (tagId: number) => {
    // 重複選択を防ぐため、すでに含まれていなかったらsetState
    if (!selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.concat(tagId))
    }
  }
  const handleDelete = (tagId: number) => {
    // selectedTagsからtagIdひとつひとつけす

    const newSelectedTags = selectedTags.filter((value) => {
      return value !== tagId;
    });
    setSelectedTags(newSelectedTags);
  }

  // 選択されたタグのtag_idをtag_nameと照合して表示
  const ShowSelectedTagsChip = () => {
    const showSelectedTags = tags.filter((value) => {
      return selectedTags.includes(value.tag_id)
    });

    return (
      <>
        {showSelectedTags.map((value) => (
          <Chip label={value.tag_name} onDelete={() => handleDelete(value.tag_id)}></Chip>
        ))}
      </>
    );

  }

  // 以下アイコン選択のPopoverのための設定
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
    <div className={className}>
      <Button
        className={classes.button}
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        size="large"
        startIcon={<TagsButton/>}
      >
        タグ
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {tags.length ? (
          tags.map((value, key) => {
            return (
              <>
                {selectedTags.includes(value.tag_id) ? (
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
      {selectedTags.length ? (
        <ShowSelectedTagsChip />
      ) : (
        <Chip label="未選択" disabled />
      )}
    </div>
  );
}
