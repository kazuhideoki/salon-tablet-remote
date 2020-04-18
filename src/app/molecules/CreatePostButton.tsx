import React from 'react'
import { NoteAddTwoTone } from "@material-ui/icons";
import { Button, withStyles } from "@material-ui/core";
import { Store } from '../modules/Store';

export const CreatePostButton = (props) => {
    const { dispatchAppState } = React.useContext(Store)
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={props.createPostButton}
            endIcon={<NoteAddTwoTone />}
            onClick={() => dispatchAppState({ type: "OPEN_MODAL", payload: 'edit_article' })}
        >
            Save
        </Button>
    );
}
