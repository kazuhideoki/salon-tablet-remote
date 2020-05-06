import React from 'react'
import { NoteAddTwoTone } from "@material-ui/icons";
import { Button, withStyles } from "@material-ui/core";
import { Store } from '../../Store/Store';
import { EditorContext } from '../../Store/EditorContext';

export const CreateButton = (props) => {
    const { dispatchAppState } = React.useContext(Store)
    const { setTitleText, setEditorText, setIsEdittingArticle } = React.useContext(
      EditorContext
    );

    const AddPost = () => {
      dispatchAppState({ type: "OPEN_MODAL", payload: 'edit_article' })
      setIsEdittingArticle(false)
      setTitleText('')
      setEditorText('')
    }
    const AddFooterIcon = () => {
      dispatchAppState({ type: "OPEN_MODAL", payload: 'edit_footer_icon' })
    }

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={props.createPostButton}
          endIcon={<NoteAddTwoTone />}
          onClick={() => AddPost()}
        >
          新規投稿
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={props.createPostButton}
          endIcon={<NoteAddTwoTone />}
          onClick={() => AddFooterIcon()}
        >
          アイコン追加
        </Button>
      </>
    );
}
