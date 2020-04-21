import React from 'react'
import { PostData, Store, PostDataSingle } from "./Store";
import { reducerLogger } from "./reducerLogger";
import fetch from "node-fetch";
import { EditorContext } from './EditorContext';

export type PostDataAction =
| { type: "GET"; payload: PostData }
| { type: "CREATE_POST", payload: PostDataSingle }
| { type: "UPDATE_POST"; payload: PostDataSingle }
| { type: "DELETE_POST"; payload: { id: number } };

export function postDataReducer(state: PostData, action: PostDataAction) {
    let newState: PostData;
    const func = postDataReducer;
    switch (action.type) {
    case "GET":
        newState = action.payload;
        break;
    case "CREATE_POST":
        const arr = [...state, action.payload];
        newState = arr.concat();
        break;
    case "UPDATE_POST":
        newState = state.map((value, index) => {
        if (value.id === action.payload.id) {
            return action.payload
        } else {
            return value
        }
        })
        break;
    case "DELETE_POST":
        newState = state.filter((value, index) =>{
            return value.id !== action.payload.id;
        })
        break;

    default:
        console.log("エラーだよ, postDataReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action });
    return newState;
}


export const useCreatePost = () => {
    const { dispatchPostData } = React.useContext(Store);
    return async (title:string, date:string, content:string) => {
        let params = { id:0 , title, date, content }
        const res = await fetch(
        `http://${location.host}/post_data/create/post`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            mode: "cors",
            body: JSON.stringify(params),
        }
        );
        const data = await res.json();
        console.log(data);
        params.id = data.insertId;

        if (data.err === true) {
        alert("投稿できませんでした");
        } else {
        params.id = data.rawData.id
        dispatchPostData({
        type: "CREATE_POST",
        payload: params,
        });
        }
    } 
}
export const useCreatePostD = () => {
    const { dispatchPostData } = React.useContext(Store);
    return async (params) => {
        const res = await fetch(
            `http://${location.host}/post_data/create/postd`,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                mode: "cors", 
                body: JSON.stringify(params),
            }
        );
        const data = await res.json();
        console.log('useCreatePostDの戻ってくるdataダヨ→' + JSON.stringify(data));
        params.id = data.rawData.id;

        if (data.err === true) {
        alert("投稿できませんでした");
        } else {
        // params.id = data.rawData.id
        dispatchPostData({
        type: "CREATE_POST",
            payload: params,
        });
        }
    }
}
export const useGetSinglePost = () => {
    return async (
    id: number,
        setTitle,
        setContent,
    //   titleRef,
    //   contentRef,
    setIsEdit,
    setEdittingPostParams
    ) => {
    console.log(id);
    //   console.log(JSON.stringify({ id }));
    //   console.log(JSON.stringify(id));

    const res = await fetch(
        `http://${location.host}/post_data/get/singlepost`,
        {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id }),
        }
    );
    const data = await res.json();
    console.log(data);

    if (data.err === true) {
        alert("記事を取得できませんでした");
    } else {
        const {title, content} = data.rawData
        setTitle(title);
        setContent(content);
        setIsEdit(true);
        setEdittingPostParams(data.rawData);

    }
    };
};
export const useGetSinglePostD = () => {
    const { dispatchAppState } = React.useContext(Store);
    const {
      setEditorText,
      setIsEdittingPost,
      setEdittingPostParams,
    } = React.useContext(EditorContext);
    return async (
        params
    ) => {
    console.log(params.id);

    const res = await fetch(
        `http://${location.host}/post_data/get/singlepost`,
        {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: params.id }),
        }
    );
    const data = await res.json();
    console.log(data);

    if (data.err === true) {
        alert("記事を取得できませんでした");
    } else {
             const { title, content } = data.rawData;
             // setTitle(title);
             setIsEdittingPost(true);
             setEdittingPostParams(data.rawData);
             setEditorText(content);
             dispatchAppState({
               type: "OPEN_MODAL",
               payload: "edit_article",
             });
           }
    };
};

export const useUpdatePost = () => {
    const { dispatchPostData } = React.useContext(Store)
    const { setEditorText, setIsEdittingPost } = React.useContext(
      EditorContext
    );
    return async (params, setIsEdit) => {
    const res = await fetch(`http://${location.host}/post_data/update/post`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
    });
    const data = await res.json();
    console.log(data);

    if (data.err === true) {
        alert("更新できませんでした");
    } else {
        dispatchPostData({ type: "UPDATE_POST", payload: params });
        setIsEdit(false);
        setIsEdittingPost(false);
        setEditorText('')

    }
    };

}
export const useDeletePost = () => {
    const { dispatchPostData } = React.useContext(Store)
    return async (id: number) => {
        console.log(id);
        
    const res = await fetch(
        `http://${location.host}/post_data/delete/post`,
        {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({id}),
        }
    );
    const data = await res.json();
    console.log(data);
    
    if (data.err === true) {
        alert("削除できませんでした");
    } else {
        dispatchPostData({ type: "DELETE_POST", payload: {id} });
    }
    };

}