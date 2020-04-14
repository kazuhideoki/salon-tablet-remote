import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";

export const UpdatePostButton = (props) => {
    return (
        <IconButton className={props.position}>
            <EditTwoTone />
        </IconButton>
    );
};

