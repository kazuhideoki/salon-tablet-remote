import React from 'react'
import { NoteAddTwoTone } from "@material-ui/icons";
import { Button, withStyles } from "@material-ui/core";
import { Store } from '../Store/Store';
import { EditorContext } from '../Store/EditorContext';

export const CreatePostButton = (props) => {
    const { dispatchAppState } = React.useContext(Store)
    const { setTitleText, setEditorText, setIsEdittingPost } = React.useContext(
      EditorContext
    );

    const hundleOnClick = () => {
        dispatchAppState({ type: "OPEN_MODAL", payload: 'edit_article' })
        setIsEdittingPost(false)
        setTitleText('')
        setEditorText('')
    }
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={props.createPostButton}
        endIcon={<NoteAddTwoTone />}
        onClick={() => hundleOnClick()}
      >
        Save
      </Button>
    );
}
