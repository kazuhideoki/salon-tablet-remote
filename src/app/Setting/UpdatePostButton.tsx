import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useGetSinglePost } from "../Store/postDataRducer";
import { Store } from '../Store/Store';
import Editor from '../react-quill/Editor';
import { EditorContext } from '../Store/EditorContext';

export const UpdatePostButton = (props) => { 
    const { dispatchAppState } = React.useContext(Store);
    const { setIsEdittingPost } = React.useContext(EditorContext);
    const GetSinglePost = useGetSinglePost();

    const hundleOnClick = () => {
        dispatchAppState({ type: "OPEN_MODAL", payload: "edit_article" });
        setIsEdittingPost(true);
        GetSinglePost(props.params);
    };
    return (
      <IconButton
        className={props.position}
        onClick={() => hundleOnClick()}
      >
        <EditTwoTone />
      </IconButton>
    );
};

