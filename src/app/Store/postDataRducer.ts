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

export const useGetPost = () => {
    const {
      paginationParams, 
      dispatchPaginationParams,
      dispatchPostData,
      dispatchAppState,
    } = React.useContext(Store);

    return async (pagination) => {
        const res = await fetch(
          `http://localhost:3000/post_data/get/${pagination.page}`
        );
        console.log(JSON.stringify(res));

        const data = await res.json();
        // const pageCount = data.pagination.pageCount;

         if (data.err === true) {
           alert("投稿できませんでした");
         } else {
            dispatchPostData({
                type: "GET",
                payload: data.rawData,
            });
            dispatchAppState({ type: "END_LOADING" });
            if (paginationParams !== data.pagination) {
                dispatchPaginationParams({
                    type: "SET_PAGINATION_PARAMS",
                    payload: data.pagination,
                });
            }
        }
        
    }
}

export const useCreatePost = () => {
         const { paginationParams, dispatchPaginationParams, dispatchPostData, dispatchAppState } = React.useContext(Store);
         const { setEditorText, setTitleText } = React.useContext(
           EditorContext
         );
         return async (params) => {
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
           console.log(
             "useCreatePostの戻ってくるdataダヨ→" + JSON.stringify(data)
           );
           params.id = data.rawData.id;
           const pageCount = data.pagination.pageCount;

           if (data.err === true) {
             alert("投稿できませんでした");
           } else {
             dispatchPostData({
               type: "CREATE_POST",
               payload: params,
             });
             setEditorText("");
             setTitleText("")
             dispatchAppState({type: "CLOSE_MODAL"})
             if (paginationParams !== data.pagination) {
               dispatchPaginationParams({
                 type: "SET_PAGINATION_PARAMS",
                 payload: data.pagination,
               });
             }

           }
         };
       };

export const useGetSinglePost = () => {
    const { dispatchAppState } = React.useContext(Store);
    const {
        setTitleText,
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
             setTitleText(title);
             setIsEdittingPost(true);
             setEdittingPostParams(data.rawData);
             setEditorText(content);
            //  dispatchAppState({
            //    type: "OPEN_MODAL",
            //    payload: "edit_article",
            //  });
           }
    };
};

export const useUpdatePost = () => {
    const { dispatchPostData, dispatchAppState } = React.useContext(Store);
    const { setTitleText, setEditorText, setIsEdittingPost } = React.useContext(
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
        setTitleText('')
        setEditorText('')
        dispatchAppState({ type: "CLOSE_MODAL" });
    }
    };

}
export const useDeletePost = () => {
    const {
      paginationParams,
      dispatchPaginationParams,
      dispatchPostData,
    } = React.useContext(Store);
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
    const pageCount = data.pagination.pageCount;
    
    if (data.err === true) {
        alert("削除できませんでした");
    } else {
        dispatchPostData({ type: "DELETE_POST", payload: {id} });
        if (paginationParams !== data.pagination) {
          dispatchPaginationParams({
            type: "SET_PAGINATION_PARAMS",
            payload: data.pagination,
          });
        }
    }
    };

}