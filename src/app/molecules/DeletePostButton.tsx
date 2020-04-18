import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { useDeletePost } from '../Store/postDataRducer';

export const DeletePostButton = (props) => {
    const deletePost = useDeletePost()

    return (
        <IconButton className={props.position} onClick={() => deletePost(props.id)}>
            <DeleteForeverTwoTone />
        </IconButton>
    );
};
