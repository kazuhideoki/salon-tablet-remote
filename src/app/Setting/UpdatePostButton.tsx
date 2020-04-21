import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useGetSinglePost } from "../Store/postDataRducer";

export const UpdatePostButton = (props) => { 
    const GetSinglePost = useGetSinglePost();
    return (
      <IconButton
        className={props.position}
        onClick={() => GetSinglePost(props.params)}
      >
        <EditTwoTone />
      </IconButton>
    );
};

