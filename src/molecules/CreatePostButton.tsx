import React from 'react'
import { NoteAddTwoTone } from "@material-ui/icons";
import { Button, withStyles } from "@material-ui/core";

export const CreatePostButton = (props) => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={props.createPostButton}
            endIcon={<NoteAddTwoTone />}
        >
            Save
        </Button>
    );
}
