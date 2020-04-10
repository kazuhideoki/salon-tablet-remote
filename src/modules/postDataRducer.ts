import { PostData } from "./Store";
import { reducerLogger } from "./reducerLogger";

export type PostDataAction = 
{ type: "SET_ARTICLES"; payload: PostData }

export function postDataReducer(state: PostData, action: PostDataAction) {
         let newState: PostData;
         const func = postDataReducer;
         switch (action.type) {
           case "SET_ARTICLES":
             newState = action.payload;
             break;

           default:
             console.log("エラーだよ, postDataReducer");
             newState = { ...state };
         }
         reducerLogger({ state, newState, func, action });
         return newState;
       }
