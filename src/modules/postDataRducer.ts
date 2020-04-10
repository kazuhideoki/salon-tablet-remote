import React from 'react'
import { PostData, PostDataSingle, Store } from "./Store";
import { reducerLogger } from "./reducerLogger";
import fetch from "node-fetch";

export type PostDataAction = 
{ type: "SET_ARTICLES"; payload: PostData }
| { type: "UPDATE_ARTICLE"; payload: PostDataSingle,  }

export function postDataReducer(state: PostData, action: PostDataAction) {
         let newState: PostData;
         const func = postDataReducer;
         switch (action.type) {
           case "SET_ARTICLES":
             newState = action.payload;
             break;
        //    case "UPDATE_ARTICLE":
        //     // const newPostDataSingle = state[action.payload.id] = action.payload

        //      newState = {...state, action.payload}
        //      break;

           default:
             console.log("エラーだよ, postDataReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       }

export const useUpdateArticle = async () => {
    const { dispatchPostData } = React.useContext(Store)

    const res = await fetch("http://localhost:3000/post_data/update", {method: 'POST'});
    const data = JSON.parse(res)
    if (data.err === true) {
      alert("うまく更新できなかったよ");
    } else {
      dispatchPostData({ type: "UPDATE_ARTICLE", payload: data });
    }

}