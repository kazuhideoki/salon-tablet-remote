import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useGetSinglePostD } from "../Store/postDataRducer";

export const UpdatePostButton = (props) => { 
    const GetSinglePost = useGetSinglePostD();
    return (
      <IconButton
        className={props.position}
        onClick={() => GetSinglePost(props.params)}
      >
        <EditTwoTone />
      </IconButton>
    );
};

