import React from 'react'
import { PostData, Store } from "./Store";
import { reducerLogger } from "./reducerLogger";
import fetch from "node-fetch";

export type PostDataAction = 
{ type: "GET"; payload: PostData }
| { type: "CREATE_POST", payload: {id: number, title: string, date: string, content: string} }
| { type: "UPDATE_CONTENT"; payload: {id: number, content: string} }

export function postDataReducer(state: PostData, action: PostDataAction) {
    let newState: PostData;
    const func = postDataReducer;
    switch (action.type) {
      case "GET":
        newState = action.payload;
        break;
      case "CREATE_POST":
        const arr = [...state, action.payload]
        newState = arr.concat();
        break;
      case "UPDATE_CONTENT":
        const targetArticle = state[action.payload.id];
        const newArticle = Object.assign(targetArticle, {
          content: action.payload.content,
        });
        let articles = state.concat();
        articles[action.payload.id] = newArticle;
        newState = articles;
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
        dispatchPostData({
          type: "CREATE_POST",
          payload: params,
        });
        }
    }
}

export const useUpdateContent = () => {
    const { dispatchPostData } = React.useContext(Store)
    return async (id: number, content: string) => {
        console.log(id + content);
        
      const res = await fetch(
        `http://${location.host}/post_data/update/content`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            id: id,
            content: content,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      
      if (data.err === true) {
        alert("更新できませんでした");
      } else {
        dispatchPostData({ type: "UPDATE_CONTENT", payload: {id, content} });
      }
    };

}
export const useDeletePost = () => {
    const { dispatchPostData } = React.useContext(Store)
    return async (id: number, content: string) => {
        console.log(id + content);
        
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
        dispatchPostData({ type: "UPDATE_CONTENT", payload: {id, content} });
      }
    };

}