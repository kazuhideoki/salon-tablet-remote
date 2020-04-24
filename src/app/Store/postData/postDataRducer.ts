import { PostData, PostDataSingle } from "../Store";
import { reducerLogger } from "../reducerLogger";

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

