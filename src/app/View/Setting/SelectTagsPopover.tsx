import React from 'react'
import {
  Button,
  Popover,
  GridList,
  makeStyles,
  createStyles,
  Theme,
  GridListTile,
  Chip,
} from "@material-ui/core";
import { EditorContext } from '../../Store/EditorContext';
import { Store } from '../../Store/Store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 300,
      height: 300,
    },
    selectedTagsField: {
      width: 70,
    },
  })
);

export const SelectTagsPopover = () => {
  const classes = useStyles();
  const { selectedTags, setSelectedTags } = React.useContext(EditorContext)
  const { tags } = React.useContext(Store)

  
  const handleOnClick = (tagId: number) => {
    // 重複選択を防ぐため、すでに含まれていなかったらsetState
    if (!selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.concat(tagId))
    }
  }
  const handleDelete = (tagId: number) => {
    // selectedTagsからtagIdひとつひとつけす

    const newselectedTags = selectedTags.filter((value) => {
      return value !== tagId;
    });
    setSelectedTags(newselectedTags);
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
    <>
      <Button aria-describedby={id} color="primary" onClick={handleClick}>
        タグ選択
      </Button>
      {/* ButtonをタップするとPopoverが表示される */}
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
        {tags.map((value, index) => {
          return (
            <>
            {selectedTags.includes(value.tag_id) ?
            <Chip label={value.tag_name} onClick={() => handleDelete(value.tag_id)} color="primary"/> :
            <Chip label={value.tag_name} onClick={() => handleOnClick(value.tag_id)}/>
            }
            </>
          );
        })}
      </Popover>
      {selectedTags ? <ShowSelectedTagsChip /> : null}
    </>
  );
}
