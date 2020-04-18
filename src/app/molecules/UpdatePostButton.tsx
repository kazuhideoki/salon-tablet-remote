import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useUpdatePost } from '../Store/postDataRducer';

export const UpdatePostButton = (props) => {
    const updatePost = useUpdatePost()
    return (
        <IconButton
        className={props.position} 
        // onClick={() => updatePost(props.id)}
        >
            <EditTwoTone />
        </IconButton>
    );
};

