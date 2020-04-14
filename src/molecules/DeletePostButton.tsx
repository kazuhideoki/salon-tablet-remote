import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";

export const DeletePostButton = (props) => {

    return (
        <IconButton className={props.position}>
            <DeleteForeverTwoTone />
        </IconButton>
    );
};
